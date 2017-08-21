import React from 'react'

let ProgressIndicator = (props) => {

    let radius = 100;
    let width = 240;
    let circumference = 2 * Math.PI * radius;
    let currentProgress = props.progressValue >= 0 ? 
            circumference * (1 - props.progressValue) : 
            circumference;
    let progressText = props.progressText;

    return (
        <div>
            <svg
                style={{transform: 'rotate(-90deg)'}}
                width={width}
                height={width}
                viewBox="0 0 240 240">
                <circle
                    cx={width / 2} cy={width / 2}
                    r={radius}
                    fill="none"
                    stroke="#e6e6e6"
                    strokeWidth="15" />

                <circle className="progress"
                    cx={width / 2} cy={width / 2}
                    r={radius}
                    fill="none"
                    stroke="#f77a52"
                    strokeWidth="15"
                    strokeDasharray={circumference}
                    strokeDashoffset={currentProgress} />
                
                <text x="50" y="-105" className="progress-text"> {progressText} </text>
            </svg>
        </div>
    )
}

export default ProgressIndicator;
