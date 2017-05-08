import { createSelector } from 'reselect';
import { reshapeNewsData, filterNewsBySearchTerm } from '../util/dataTransformations';

const newsSelector = state => state.news;
const bookmarksSelector = state => state.bookmarks;

const reshapeNewsSelector = createSelector(
    [newsSelector],
    reshapeNewsData
);

export const allNewsSelector = createSelector(
    [reshapeNewsSelector],
    newsItems => newsItems
);

const searchTermSelector = state => state.searchTerm;

const caseInsensitiveSearchTermSelector = createSelector(
    searchTermSelector,
    searchTerm => searchTerm.toLowerCase()
);

export const searchNewsSelector = createSelector(
    [reshapeNewsSelector, caseInsensitiveSearchTermSelector],
    filterNewsBySearchTerm
);

export const bookmarkedNewsSelector = createSelector(
    [allNewsSelector, bookmarksSelector],
    (newsItems, bookmarks) => newsItems.filter(newsItem => bookmarks.indexOf(newsItem.url) > -1)
);