import React from 'react'

let ProgressIndicator = (props) => {

    let radius = 54;
    let circumference = 2 * Math.PI * radius;
    let currentProgress = circumference * (1 - props.progressValue) || 0;

    return (
        <div style={{ transform: 'rotate(-90deg)' }}>
            <svg
                width="120"
                height="120"
                viewBox="0 0 120 120">
                <circle
                    cx="60" cy="60"
                    r={radius}
                    fill="none"
                    stroke="#e6e6e6"
                    strokeWidth="12" />

                <circle className="progress"
                    cx="60" cy="60"
                    r={radius}
                    fill="none"
                    stroke="#f77a52"
                    strokeWidth="12"
                    strokeDasharray={circumference}
                    strokeDashoffset={currentProgress} />
            </svg>
        </div>
    )
}

export default ProgressIndicator;
