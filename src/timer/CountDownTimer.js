import React from 'react';

import FormattedDuration from './FormattedDuration';
import { notify } from './../Notifier';

/**
 * Default propertis for countDown timer
 */
let defaultProps = {
    activeDuration: 25 * 60, // 25 active minutes
    breakDuration: 5 * 60   // 5 mins of break time
}

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

        this.timerId = setInterval(
            () => this.tick(),
            500);
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
     * Resets the timer
     */
    resetTimer = () => {
        this.stopTimer();

        // set duration to the active duration
        this.setState({
            duration: defaultProps.activeDuration
        });
    }

    /**
     * React lifecycle hook event on component init
     */
    componentDidMount() {
        // load values from settings
        this.loadSettings();

        this.setState({
            duration: defaultProps.activeDuration
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
            return currDur - 0.5;
        } else if (this.state.isActive) {
            this.setState(prevState => ({
                isActive: !prevState.isActive
            }));

            // Show notification for break
            notify({
                msg: 'Break Time!!',
                body: 'Relax a bit.',
                icon: process.env.PUBLIC_URL + '/imgs/img-bell-icon.png'
            });

        } else {
            this.setState(prevState => ({
                isActive: !prevState.isActive
            }));

            notify({
                msg: 'Back to Work!',
                body: 'Keep rolling.',
                icon: process.env.PUBLIC_URL + '/imgs/img-bell-icon.png'
            });
        }
    }

    /**
     * Checks settings for active and break time values. If available 
     * use it from LocalStorage or use default values
     */
    loadSettings = () => {
        const settings = JSON.parse(localStorage.getItem('settings'));

        if (settings) {
            defaultProps.activeDuration = settings.active * 60; // time in seconds
            defaultProps.breakDuration = settings.breakTime * 60;   // time in seconds
        }
    }

    /**
     * Defines how component to be rendered
     */
    render() {
        return (<div>
            <FormattedDuration duration={this.state.duration} isActive={this.state.isActive} />

            <div className="actions">

                {this.state.isTicking
                    ? <button className="btn btn-round btn-start btn-animate" onClick={this.stopTimer}>Stop</button>
                    : <button className="btn btn-primary btn-round" onClick={this.startTimer}>Start</button>
                }

                <button className="btn btn-secondary btn-round" onClick={this.resetTimer}>Reset</button>
            </div>
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
            ? currDur - 0.5
            : (this.state.isActive
                ? defaultProps.breakDuration
                : defaultProps.activeDuration
            )
        );
    }
}
