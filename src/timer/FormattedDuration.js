import React from 'react';

import ProgressIndicator from './progressIndicator';

let FormattedDuration = (props) => {

    let totalDuration = props.totalDuration;
    let duration = props.duration;
    let progress = (totalDuration - duration) / totalDuration;

    return (
        <div>
            {/* {
            !props.isActive ?
            <span>Break Time</span> :
            <span></span>
            } */}
            <div className="timer">
                <ProgressIndicator
                    isActive={props.isActive}
                    progressValue={progress}
                    progressText={formatDuration(props.duration)} />
            </div>
        </div>
    );
}

/**
 * Formats the duration value in seconds to mm:ss or hh:mm:ss 
 * if duration is more than hour
 * 
 * @param {number} duration - duration value in seconds
 * @return {string} formatted duration string
 */
let formatDuration = (duration = 0) => {
    const d = Number(duration);

    let hours = Math.floor(d / 3600),
        mins = hours ? Math.floor((d - hours * 3600) / 60) : Math.floor(d / 60),
        secs = Math.floor(d % 60);

    hours = (hours > 0 && hours < 9) ? `0${hours}` : hours;
    mins = (mins > 0 && mins < 9) ? `0${mins}` : mins;
    secs = (secs > 0 && secs < 9) ? `0${secs}` : secs;

    return hours ? `${hours} : ${mins} : ${secs}` : `${mins} : ${secs}`;
}

export default FormattedDuration;
