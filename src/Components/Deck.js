import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Animated,
    PanResponder,
    Dimensions
} from 'react-native';
import PropTypes from 'prop-types';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

class Deck extends Component {

    static propTypes = {
        renderCard: PropTypes.func.isRequired,
        data: PropTypes.array.isRequired,
        onSwipeLeft: PropTypes.func,
        onSwipeRight: PropTypes.func,
        renderNoMoreCards: PropTypes.func
    };

    static defaultProps = {
        data: [],
        onSwipeRight: (item) => console.log(item.id + ' was swipped right'),
        onSwipeLeft: (item) => console.log(item.id + ' was swipped left'),
        renderNoMoreCards: () => console.log('No more items to log')
    };

    constructor(props) {
        super(props);

        const position = new Animated.ValueXY();

        const panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (event, gesture) => {
                position.setValue({x: gesture.dx, y: gesture.dy});
            },
            onPanResponderRelease: (event, gesture) => {
                if (gesture.dx > SWIPE_THRESHOLD) {
                    this.forceSwipe('right');
                } else if (gesture.dx < -SWIPE_THRESHOLD) {
                    this.forceSwipe('left');
                } else {
                    this.resetPosition();
                }
            }

        });

        this.state = {panResponder, position, index: 0};
    }

    render() {
        return (
            <Animated.View>
                {this.renderCards()}
            </Animated.View>
        );
    }

    renderCards() {
        if (this.state.index >= this.props.data.length) {
            return this.props.renderNoMoreCards();
        }
        return this.props.data.map((item, index) => {

            if (index < this.state.index) {
                return null;
            }

            if (index === this.state.index) {
                return (
                    <Animated.View
                        key={item.id}
                        style={this.getCardStyle()}
                        {...this.state.panResponder.panHandlers}>
                        {this.props.renderCard(item)}
                    </Animated.View>
                )

            }

            return (
                this.props.renderCard(item)
            )
        })
    }

    getCardStyle() {
        const {position} = this.state;
        const rotate = position.x.interpolate({
            inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
            outputRange: ['-120deg', '0deg', '120deg']
        });

        return {
            ...position.getLayout(),
            transform: [{rotate: rotate}]
        };
    }

    resetPosition() {
        Animated.spring(this.state.position, {
            toValue: {x: 0, y: 0}
        }).start();
    }

    forceSwipe(direction) {
        const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;
        Animated.timing(this.state.position, {
            toValue: {x, y: 0},
            duration: SWIPE_OUT_DURATION
        }).start(() => this.onSwipeComplete(direction));
    }

    onSwipeComplete(direction) {
        const item = this.props.data[this.state.index];

        direction === 'right' ?
            this.props.onSwipeRight(item) : this.props.onSwipeLeft(item);

        this.state.position.setValue({x: 0, y: 0});
        this.setState({index: this.state.index + 1});
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
});

module.exports = Deck;