import React, { PropTypes, Component } from 'react';
import {
    View,
    TouchableOpacity,
    StatusBar,
    Image,
    Dimensions,
    StyleSheet
} from 'react-native';
import AppText from './AppText';
import * as globalStyles from '../style/global';
var {height, width} = Dimensions.get('window');
var SCREEN_WIDTH = width;
var SCREEN_HEIGHT = height;

export default class IntroScreen extends Component {

    componentDidMount(){

        this.timeoutHandle = setTimeout(()=>{
            this.props.navigator.push(this.props.nextScene);
        }, 1000);
    }

    render(){
        return(
            <View style={[globalStyles.COMMON_STYLES.pageContainer, styles.container]}>
                <TouchableOpacity
                    onPress={() => this.props.navigator.push(this.props.nextScene)}
                >
                    <Image style={styles.introImage} source={require('../images/mylogo.png')} />
                </TouchableOpacity>
            </View>
        );
    }

}

IntroScreen.propTypes = {
    navigator: PropTypes.shape({
        push: PropTypes.func
    }).isRequired,
    nextScene: PropTypes.objectOf(PropTypes.any)
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 0,
        alignItems: 'center',
        backgroundColor : '#bbbbcc'
    },
    introImage : {
        marginTop : 50,
        width : 300,
        height : 300
    },
    introText : {
        color: '#fff',
        textDecorationColor: '#ff0000',
        textShadowColor : '#fff',
        fontWeight : 'bold'
    },
    loadIcon : {
        width : 100,
        height: 100
    }
});

