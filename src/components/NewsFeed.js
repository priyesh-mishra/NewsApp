import React, { PropTypes, Component } from 'react';
import {
    ListView,
    StyleSheet,
    View,
    WebView,
    TouchableOpacity,
    Modal,
    Text,
    Image,
    RefreshControl,
    ActivityIndicator,
    NetInfo
} from 'react-native';
import * as globalStyles from '../style/global';
import NewsItem from './NewsItem';
import Icon from 'react-native-vector-icons/Ionicons';

export default class NewsFeed extends Component {

    constructor(props) {
        super(props);
        console.log("ccccccXXXX", props);
        this.ds = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1.title !== row2.title
        });
        this.state = {
            dataSource: this.ds.cloneWithRows(props.news),
            modalVisible: false,
            selectedChannel : this.props.selectedChannel,
            refreshing: false,
            initialLoading : true,
            connected : true
        };

        this.renderRow = this.renderRow.bind(this);
        this.onModalClose = this.onModalClose.bind(this);
        this.refresh = this.refresh.bind(this);
        this.onModalOpen = this.onModalOpen.bind(this);
        this.handleConnectivityChange = this.handleConnectivityChange.bind(this);
    }

    componentWillMount() {
        NetInfo.isConnected.fetch().then(isConnected => {
            this.handleConnectivityChange(isConnected)
        });
        NetInfo.isConnected.addEventListener('change', this.handleConnectivityChange);
        this.refresh();
    }
    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('change', this.handleConnectivityChange);
    }

    handleConnectivityChange(isConnected) {
        console.log("inside handel conect", isConnected);
        this.setState({
            connected: isConnected
        });
        if (isConnected) {
            this.refresh();
        }
    }

    renderRow(rowData, ...rest) {
        const index = parseInt(rest[1], 10);
        return (
            <NewsItem
                onPress={() => this.onModalOpen(rowData.url)}
                onBookmark={() => this.props.addBookmark(rowData.url)}
                style={styles.newsItem}
                index={index}
                {...rowData}
            />
        );
    }

    onModalOpen(url) {
        this.setState({
            modalVisible: true,
            modalUrl: url
        });
    }
    onModalClose() {
        this.setState({
            modalVisible: false
        });
    }

    renderModal() {
        return (
            <Modal
                animationType="slide"
                visible={this.state.modalVisible}
                onRequestClose={this.onModalClose}
            >
                <View style={styles.modalContent}>
                    <TouchableOpacity
                        onPress={this.onModalClose}
                        style={styles.closeButton}
                    >
                        <Icon name="md-close-circle" size={30} color="#898686" />
                    </TouchableOpacity>
                    <WebView
                        scalesPageToFit
                        source={{ uri: this.state.modalUrl }}
                    />
                </View>
            </Modal>
        );
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            dataSource : this.state.dataSource.cloneWithRows(nextProps.news),
            initialLoading : false
        });
        console.log("hihiff",this.state.dataSource.getRowCount())
    }

    refresh() {
        if (this.props.loadNews) {
            this.props.loadNews(this.props.selectedChannel);
        }
    }
    render() {
        const { initialLoading, refreshing, dataSource } = this.state;

        if (!this.state.connected) {
            return (
                <View style={[globalStyles.COMMON_STYLES.pageContainer, styles.loadingContainer]}>
                    <Image style={styles.noConnectionIcon} source={require('../images/no_connection_icon.png')} />
                    <Text>Network not found</Text>
                </View>
            );
        }
        return (
            (initialLoading && this.props.showLoadingSpinner
                ? (
                <View style={[ globalStyles.COMMON_STYLES.pageContainer, styles.loadingContainer]}>
                    <ActivityIndicator
                        animating
                        size="small"
                        {...this.props}
                    />
                </View>
            ) : (
             <View >
                 <ListView
                    refreshControl={
                          <RefreshControl
                            refreshing={refreshing}
                            onRefresh={this.refresh}
                          />}
                    enableEmptySections
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    style={this.props.listStyles}
                />
                {this.renderModal()}
            </View>
                )
            )
        );
    }

}

NewsFeed.propTypes = {
    news: PropTypes.arrayOf(PropTypes.object),
    listStyles: View.propTypes.style,
    loadNews: PropTypes.func,
    showLoadingSpinner: PropTypes.bool
};

NewsFeed.defaultProps = {
    showLoadingSpinner: true
};


const styles = StyleSheet.create({
    newsItem: {
        marginBottom: 20
    },
    modalContent: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: globalStyles.BG_COLOR
    },
    closeButton: {
        flexDirection: 'row'
    },
    closeText : {
        color: '#fff'
    },
    loadingContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon : {
        width : 20,
        height : 20
    },
    noConnectionIcon : {
        width : 150,
        height : 150
    }
});
