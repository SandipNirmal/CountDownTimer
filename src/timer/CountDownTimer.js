import React from 'react';

import FormattedDuration from './FormattedDuration';

export default class CountDownTimer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isTicking: false,
            isActive: false,
            duration: 25 * 60   // 25 minutes in seconds
        }
    }

    startTimer = () => {
        this.setState({
            isTicking: true,
            isActive: true
        });

        this.timerId = setInterval(
            () => this.tick(),
            1000);
    }

    stopTimer = () => {
        clearInterval(this.timerId);

        this.setState({
            isTicking: false
        });
    }

    componentDidMount() {
        this.setState({
            duration: this.props.activeDuration
        });
    }

    componentWillUnmount() {
        this.stopTimer();
    }

    render() {
        return <div>
            <h3> Timer </h3>

            <FormattedDuration duration={this.state.duration} isActive={this.state.isActive} />

            {this.state.isTicking
                ? <button onClick={this.stopTimer}>Stop</button>
                : <button onClick={this.startTimer}>Start</button>
            }
        </div>
    }

    tick() {
        this.setState(prevState => ({
            duration: this.getDuration(prevState.duration)
        }));
    }

    /**
     * Returns duration value by checking if active or break duration
     * is running and by checking duration remainng
     * @param {number} currDur - current active duration value
     * @returns {number} updated duration
     */
    getDuration = (currDur) => {
        if (currDur) {
            return currDur - 1;
        } else if (this.state.isActive) {

            this.setState({
                isActive: false
            });

            return this.props.breakDuration;
        } else {

            this.setState({
                isActive: false
            });

            return this.props.activeDuration;
        }
    }
}

/**
 * Default propertis for countDown timer
 */
CountDownTimer.defaultProps = {
    activeDuration: 25 * 60, // 25 active minutes
    breakDuration: 5 * 60   // 5 mins of break time
}
