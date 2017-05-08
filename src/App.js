import React from 'react';
import { Provider } from 'react-redux';
import HomeScreen from './components/HomeScreen';
import createStore from './createStore';
import Nav from './components/Nav';

const store = createStore();

export default () => (
    <Provider store={store}>
        <Nav />
    </Provider>
); 