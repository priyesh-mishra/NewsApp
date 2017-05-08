import React, { Component } from 'react';
import {  TouchableOpacity, StyleSheet } from 'react-native';
import { Navigator } from 'react-native-deprecated-custom-components'
import HomeScreen from './HomeScreen';
import IntroScreen from './IntroScreen';
import Title from './Title';
import SmallText from './SmallText';
import NewsCategory from './NewsCategory';
import * as globalStyles from '../style/global';
import Icon from 'react-native-vector-icons/Entypo';



const HOME_ROUTE = {
    title: 'Top Stories',
    component: HomeScreen,
    props: {
        selectedChannel : ''
    }
};
const CATEGORY_ROUTE = {
    title: 'News Categories',
    component: NewsCategory,
    props: {
        nextScene: HOME_ROUTE,
        selectedChannel : ''
    }
};
const INTRO_ROUTE = {
    title: 'Welcome',
    component: IntroScreen,
    props: {
        nextScene: CATEGORY_ROUTE
    }
};

export default class Nav extends Component {

    render() {
        return (
            <Navigator
                initialRoute={INTRO_ROUTE}
                renderScene={this.renderScene}
                navigationBar={this.renderNavigationBar()}
            />
        );
    }
    renderScene(route, navigator) {
        console.log("inside render scene", route,"****", navigator);
        return (
            <route.component
                {...route.props}
                navigator={navigator}
            />
        );
    }

    renderNavigationBar() {
        return (
            <Navigator.NavigationBar
                routeMapper={{
        LeftButton: this.renderLeftButton,
        RightButton: () => null,
        Title: this.renderTitle
      }}
                style={styles.navbar}
            />
        );
    }

    renderTitle(route) {
        if(route.title ==='Top Stories') {
            return (
                <Title style={[styles.title,{backgroundColor:'#bbbbcc', marginTop : 10}]}>
                    {route.title}
                </Title>
            );
        }
    }

    renderLeftButton(route, navigator, index) {
        if (index === 0) {
            return null;
        }
        return (
            <TouchableOpacity
                style={styles.leftButton}
                onPress={() => navigator.pop()}
            >
                <Icon name="back" size={30} color="#898686" style={{marginTop : 10}} />
            </TouchableOpacity>
        );
    }
}
const styles = StyleSheet.create({
    navbar: {
        backgroundColor: '#bbbbcc'
    }
});