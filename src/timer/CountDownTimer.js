import React from 'react';

import FormattedDuration from './FormattedDuration';
import Notifier from './../Notifier';

// let TimerWorker = require("worker-loader!./../utils/timerWorker.js");
// let TimerWorker = require("worker-loader!./../utils/timerWorker.js");
// const timeWorker = new Worker('./../utils/timerWorker.js');

// Worker commands
// eslint-disable-next-line
const COMMANDS = {
  START: 'Start',
  STOP: 'Stop'
};

/**
 * Default propertis for countDown timer
 */
let defaultProps = {
  activeDuration: 25 * 60, // 25 active minutes
  breakDuration: 5 * 60 // 5 mins of break time
}

export default class CountDownTimer extends React.Component {

  constructor(props) {
    super(props);

    // Set initial states for the countdown
    this.state = {
      isTicking: false,
      isActive: false,
      duration: 25 * 60 // 25 minutes in seconds
    }
  }

  componentWillMount() {
    // this.timeWorker = new TimerWorker();
  }

  /**
   * Method to start the countdown timer
   */
  startTimer = () => {
    this.setState({
      isTicking: true,
      isActive: true
    });

    // Send start message to worker
    // this.timeWorker.postMessage(COMMANDS.START);

    this.timerId = setInterval(() => {
      this.tick();
    }, 1000);
  }

  /**
   * Method to stop countdown timer
   */
  stopTimer = () => {
    this.setState({
      isTicking: false
    });

    // Send stop message to worker
    // this.timeWorker.postMessage(COMMANDS.STOP);

    clearInterval(this.timerId);
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

    // check for browser notification permission
    Notifier.requestPermission();

    // register handler for worker postMessage
    // this.timeWorker.onmessage = (event) => {
    //   this.onMessageHandler(event);
    // };

    // Set initial state
    this.setState({
      duration: defaultProps.activeDuration
    });
  }

  /**
   * React lifecycle hook event before component destruction
   */
  componentWillUnmount() {
    this.stopTimer();
    // terminate the worker thread when unmounting the component
    // this.timeWorker.terminate();
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

      // Show notification for break
      Notifier.notify({
        msg: 'Break Time!!',
        body: 'Relax a bit.',
        icon: process.env.PUBLIC_URL + '/imgs/img-bell-icon.png'
      });

    } else {
      this.setState(prevState => ({
        isActive: !prevState.isActive
      }));

      Notifier.notify({
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
      defaultProps.activeDuration = settings.active; // time in seconds
      defaultProps.breakDuration = settings.breakTime; // time in seconds
    } else {
      const settings = {
        active: defaultProps.activeDuration,
        breakTime: defaultProps.breakDuration
      };

      localStorage.setItem('settings', JSON.stringify(settings));
    }
  }

  /**
   * Defines how component to be rendered
   */
  render() {
    return (
      <div>
        <FormattedDuration duration={this.state.duration} isActive={this.state.isActive} />
        <div className="actions" >
          {
            this.state.isTicking ?
              <button className="btn btn-round btn-start btn-animate" onClick={this.stopTimer}>Stop</button>
              : < button className="btn btn-primary btn-round" onClick={this.startTimer}>Start</button>
          }

          <button className="btn btn-secondary btn-round" onClick={this.resetTimer}> Reset </button>
        </div>
      </div>
    )
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
    return (currDur ?
      currDur - 1 :
      (this.state.isActive ?
        defaultProps.breakDuration :
        defaultProps.activeDuration
      )
    );
  }

  /**
   * Handler to handle Web Workers postmessage event
   * @param {Object} event - Web worker event
   */
  onMessageHandler = (event) => {
    this.tick();
  }
}
