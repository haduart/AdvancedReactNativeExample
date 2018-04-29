import React, {Component} from 'react'
import {Text} from 'react-native';
import PropTypes from 'prop-types'

class Bananas extends Component {

    static propTypes = {
        name: PropTypes.string,
    };

    static defaultProps = {
        name: 'undefined name'
    };

    render() {
        return (
            <Text>BANANA {this.props.name}</Text>
        );
    }
}

module.exports = Bananas;