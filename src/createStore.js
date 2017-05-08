import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import newsFeedReducer from './reducers/newsFeedReducer';
import searchTermReducer from './reducers/searchTermReducer';
import selectCategoryReducer from './reducers/selectCategoryReducer';
import bookmarkReducer from './reducers/bookmarkReducer';
import promiseMiddleware from 'redux-promise';

const logger = createLogger();

export default (initialState = {}) => (
    createStore(
        combineReducers({
            news: newsFeedReducer,
            searchTerm: searchTermReducer,
            category : selectCategoryReducer,
            bookmarks : bookmarkReducer
        }),
        initialState,
        applyMiddleware(logger, promiseMiddleware)
    )
);