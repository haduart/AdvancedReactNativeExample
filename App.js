import React, {Component} from 'react'
import {StyleSheet, View} from 'react-native';
import Bananas from './src/Components/Bananas.js'



export default class App extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Bananas name='super edu'/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});