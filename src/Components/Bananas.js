import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

class Bananas extends React.Component {
    render() {
        return (
                <Text>Super edu</Text>
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

module.exports = Bananas;