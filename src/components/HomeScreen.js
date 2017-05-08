import React, { Component } from 'react';
import {
    Text,
    Image,
    View,
    StyleSheet
} from 'react-native';
import NewsFeedContainer from '../containers/NewsFeedContainer';
import BookmarksContainer from '../containers/BookmarksContainer';
import * as globalStyles from '../style/global';
import SearchContainer from '../containers/SearchContainer';
import TabNavigator from 'react-native-tab-navigator';

export default class HomeScreen extends Component {

    constructor(props) {
        super(props);
        console.log("fgggggggggggggggggd", props);
        this.state = {
            tab: 'newsFeed'
        };
    }

    render() {
        return (
       
            <TabNavigator>
                <TabNavigator.Item
                    selected={this.state.tab === 'newsFeed'}
                    onPress={() => this.setState({ tab: 'newsFeed' })}
                    renderIcon={() => <Image style={styles.icon} source={require('../images/home_icon.png')} />}
                >
                    <NewsFeedContainer selectedChannel={this.props.selectedChannel} />
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.tab === 'search'}
                    onPress={() => this.setState({ tab: 'search' })}
                    renderIcon={() => <Image style={styles.icon} source={require('../images/search_icon.png')} />}
                >
                    <SearchContainer />
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.tab === 'bookmarks'}
                    onPress={() => this.setState({ tab: 'bookmarks' })}
                    renderIcon={() => <Image style={styles.icon} source={require('../images/bookmark_icon.png')} />}
                >
                    <BookmarksContainer />
                </TabNavigator.Item>
            </TabNavigator>
        );
    }
}

const styles = StyleSheet.create({
    icon : {
        width : 30,
        height : 30
    }
});

