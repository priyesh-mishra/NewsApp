import {
    NAVIGATION_PUSH,
    NAVIGATION_POP,
    NAVIGATION_TAB
} from './actionTypes';

export const tab = key => ({
    type: NAVIGATION_TAB,
    payload: key
});

export const push = key => ({
    type: NAVIGATION_PUSH,
    payload: key
});

export const pop = () => ({
    type: NAVIGATION_POP
});
