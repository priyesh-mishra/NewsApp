import React, { Component, PropTypes } from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import Byline from './Byline';
import AppText from './AppText';
import Thumbnail from './Thumbnail';
import * as globalStyles from '../style/global';
import ActionSheet from 'react-native-actionsheet';

const CANCEL_INDEX = 1;
const options = [ 'Bookmark', 'Cancel'];

export default class NewsItem extends Component {

    constructor(props) {
        super(props);
        console.log("vvvvvvvvvvvvvvv",props);
        this.onLongPress = this.onLongPress.bind(this);
    }

    onLongPress() {
        this.ActionSheet.show();
    }

    handlePress(selectedIndex) {
        if (selectedIndex === 0) {
            this.props.onBookmark()
        }
    }

    render() {
        const {
            style,
            imageUrl,
            title,
            author,
            date,
            location,
            description,
            onPress,
            onBookmark
        } = this.props;
        const accentColor = globalStyles.ACCENT_COLORS[
        this.props.index % globalStyles.ACCENT_COLORS.length
            ];
        return (
            <TouchableOpacity
                style={style}
                onPress={onPress}
                onLongPress= {this.onLongPress}
            >
                <View>
                    <Thumbnail
                        url={imageUrl}
                        titleText={title}
                        accentColor={accentColor}
                        style={styles.thumbnail}
                    />
                    <View style={styles.content}>
                        <Byline
                            author={author}
                            date={date}
                            location={location}
                        />
                        <AppText>
                            {description}
                        </AppText>
                    </View>
                </View>
                <ActionSheet
                    ref={o => this.ActionSheet = o}
                    title={title}
                    options={options}
                    cancelButtonIndex={CANCEL_INDEX}
                    onPress={onBookmark}
                />
            </TouchableOpacity>
        );
    }
}

NewsItem.propTypes = {
    imageUrl: PropTypes.string,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    location: PropTypes.string,
    index: PropTypes.number.isRequired,
    onPress: PropTypes.func.isRequired,
    style: View.propTypes.style,
    onBookmark: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
    thumbnail: {
        marginBottom: 5
    },
    content: {
        paddingHorizontal: 5
    }
}); 