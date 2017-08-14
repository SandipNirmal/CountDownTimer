import React from 'react';

export default class Settings extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            active: '',
            breakTime: ''
        };
    }

    componentDidMount() {
        // TODO - Read previously stored setting values
        this.getSettings();
    }

    componentWillUnmount() {
        // TODO
    }

    /**
     * Saves timer settings in localStorage
     */
    saveSettings = (event) => {
        event.preventDefault();

        const settings = {
            active: this.state.active,
            breakTime: this.state.breakTime
        };

        // save setting values in localStorage
        localStorage.setItem('settings', JSON.stringify(settings));

        this.props.history.push('/');
    }

    /**
     * Read values from localStorage and return
     */
    getSettings = () => {
        const settings = JSON.parse(localStorage.getItem('settings'));

        if (settings) {
            this.setState({
                active: settings.active,
                breakTime: settings.breakTime
            });
        }
    }

    /**
     * Change handler for active time
     */
    changeActive = (e) => {
        this.setState({
            active: e.target.value * 60 // store in seconds
        })
    }

    /**
     * Change handler for break time
     */
    changeBreakTime = (e) => {
        this.setState({
            breakTime: e.target.value * 60  // store in seconds
        })
    }

    render() {

        const { active, breakTime } = this.state;

        return (
            <div>
                <h4>Settings:</h4>
                <form onSubmit={this.saveSettings} className="form-inline">
                    <div className="form-controls">
                        <label> <h6>Active Time (in Min):</h6> </label>
                        <input type="number"
                            value={active / 60}
                            onChange={this.changeActive}
                            min="5"/>
                    </div>

                    <div className="form-controls">
                        <label> <h6>Break Time (in Min):</h6> </label>
                        <input type="number"
                            value={breakTime / 60}
                            onChange={this.changeBreakTime}
                            min="2"/>
                    </div>

                    <div className="form-controls">
                        <input type="submit" className="btn btn-primary" value="Save Settings"/>
                    </div>
                </form>
            </div>
        );
    }
}
