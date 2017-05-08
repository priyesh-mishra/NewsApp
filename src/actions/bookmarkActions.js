import { BOOKMARK, LOADED_BOOKMARKS } from './actionTypes';
import { AsyncStorage } from 'react-native';

export const addBookmark = (url) => {
    AsyncStorage.getItem('bookmarks').then((bookmarks) => {
        if (bookmarks) {
            const bookmarkArray = JSON.parse(bookmarks);
            return AsyncStorage.setItem('bookmarks', JSON.stringify([...bookmarkArray, url]));
        }
        return AsyncStorage.setItem('bookmarks', JSON.stringify([url]));
    });

    return {
        type: BOOKMARK,
        payload: url
    };
};

export const loadBookmark = () => ({
    type: LOADED_BOOKMARKS,
    payload: AsyncStorage.getItem('bookmarks').then((bookmarks) => {
        if (bookmarks) {
            return JSON.parse(bookmarks);
        }
        return [];
    })
});