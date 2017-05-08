import { LOAD_NEWS, SEARCH_NEWS , SELECT_CATEGORY} from './actionTypes';
import { NYT_API_KEY, TOI_API_KEY } from '../config/apiKeys';

export const loadNews = (selectedChannel) => {
    const req = fetch(`https://newsapi.org/v1/articles?source=${selectedChannel}&sortBy=top&apiKey=${TOI_API_KEY}`);
    return {
        type: LOAD_NEWS,
        payload: req.then(response => response.json())
    };
};

export const searchNews = searchTerm => ({
    type: SEARCH_NEWS,
    payload: searchTerm
});

export const selectCategory = category => ({
    type: SELECT_CATEGORY,
    payload: category
});

