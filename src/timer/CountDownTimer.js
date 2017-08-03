import React from 'react';

import FormattedDuration from './FormattedDuration';
// import Notification from './../Notification';

export default class CountDownTimer extends React.Component {

    constructor(props) {
        super(props);

        // Set initial states for the countdown
        this.state = {
            isTicking: false,
            isActive: false,
            duration: 25 * 60   // 25 minutes in seconds
        }
    }

    /**
     * Method to start the countdown timer
     */
    startTimer = () => {
        this.setState({
            isTicking: true,
            isActive: true
        });

        // Notification.notifyMe();

        this.timerId = setInterval(
            () => this.tick(),
            1000);
    }

    /**
     * Method to stop countdown timer
     */
    stopTimer = () => {
        clearInterval(this.timerId);

        this.setState({
            isTicking: false
        });
    }

    /**
     * React lifecycle hook event on component init
     */
    componentDidMount() {
        this.setState({
            duration: this.props.activeDuration
        });
    }

    /**
     * React lifecycle hook event before component destruction
     */
    componentWillUnmount() {
        this.stopTimer();
    }

    /**
     * React lifecycle hook event on component update
     */
    componentWillUpdate() {
        const currDur = this.state.duration;

        if (currDur) {
            return currDur - 1;
        } else if (this.state.isActive) {

            this.setState(prevState => ({
                isActive: !prevState.isActive
            }));
        } else {
            this.setState(prevState => ({
                isActive: !prevState.isActive
            }));
        }
    }

    /**
     * Defines how component to be rendered
     */
    render() {
        return (<div>
            <FormattedDuration duration={this.state.duration} isActive={this.state.isActive} />

            {this.state.isTicking
                ? <button className="btn btn-primary" onClick={this.stopTimer}>Stop</button>
                : <button className="btn btn-primary" onClick={this.startTimer}>Start</button>
            }
        </div>)
    }

    /**
     * Method to update count down duration
     */
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
        return (currDur
            ? currDur - 1
            : (this.state.isActive
                ? this.props.breakDuration
                : this.props.activeDuration
            )
        );
    }
}

/**
 * Default propertis for countDown timer
 */
CountDownTimer.defaultProps = {
    activeDuration: 25 * 60, // 25 active minutes
    breakDuration: 5 * 60   // 5 mins of break time
}
