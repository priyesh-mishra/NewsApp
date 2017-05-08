import React, { Component } from 'react';
import {
    Alert,
    Picker,
    Text,
    StyleSheet,
    AppRegistry,
    TouchableOpacity,
    Image,
    View
} from 'react-native';
import * as globalStyles from '../style/global';
import * as Animatable from 'react-native-animatable';

import { channelDetails } from '../config/channelDetails'

export default class NewsCategory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedCategory : '',
            selectedChannel : '',
            channelList : []
        };
    }

    selectCategory(value){
        this.setState({
            selectedCategory: value,
            channelList : channelDetails[value]
        });
    }

    selectChannel(value) {
        this.setState({
            selectedChannel: value
        });
    }

    renderChannel() {
        if(this.state.selectedCategory === ''){
            Alert.alert(
                'Select Category',
                'No category selected',
            );
            return null;
        }
        if(this.state.selectedChannel === ''){
            Alert.alert(
                'Select Channel',
                'No channel selected',
            );
            return null;
        }
        this.props.nextScene.props.selectedChannel = this.state.selectedChannel;
        this.props.navigator.push(this.props.nextScene);
    }

    render() {
        let serviceItems = this.state.channelList.map( (s, i) => {
            return <Picker.Item key={i} value={s[1]} label={s[0]} />
        });
        return (
            <View style={{backgroundColor :'#bbbbcc', flex : 1, marginTop : 35}}>
            <View style={[styles.container]}>
                <Image style={styles.introImage} source={require('../images/mylogo.png')} />
            </View>
                <View style={{marginTop : 80}}>
                <Picker
                    header = "Select Category"
                    selectedValue={this.state.selectedCategory}
                    onValueChange={(value) => this.selectCategory(value)}>
                    <Picker.Item label="Select Category" value="" />
                    <Picker.Item label="General News" value="general" />
                    <Picker.Item label="Business News" value="business" />
                    <Picker.Item label="Entertainment" value="entertainment" />
                    <Picker.Item label="Technology" value="technology" />
                    <Picker.Item label="Sport News" value="sport" />
                    <Picker.Item label="Music" value="music" />
                    <Picker.Item label="Science and Nature" value="science" />
                    <Picker.Item label="Gaming News" value="game" />
                </Picker>
                <Picker style={{marginTop : 30}}
                    selectedValue={this.state.selectedChannel}
                    onValueChange={(value) => this.selectChannel(value)}>
                    <Picker.Item label="Select Channel" value="" />
                    {serviceItems}
                </Picker>
                <TouchableOpacity onPress={() => this.renderChannel()}>
                    <View style={styles.readbutton}>
                        <Animatable.Text style={styles.animationText} animation="slideOutRight">Start Reading</Animatable.Text>
                    </View>
                </TouchableOpacity>

                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container : {
        backgroundColor : '#bbbbcc',
        justifyContent: 'center',
        alignItems: 'center'
    },
    introImage : {
        alignItems : 'center',
        width : 250,
        height : 250
    },
    readbutton : {
        backgroundColor : '#70707c',
        height : 50,
        marginLeft : 50,
        marginRight : 50,
        marginTop : 80
    },
    animationText : {
        marginTop : 10,
        color : '#fceaf0',
        fontWeight : 'bold',
        justifyContent: 'center',
        alignItems : 'center'
    }
});