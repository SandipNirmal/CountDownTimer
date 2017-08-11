// id for running current interval
let timerId = '';

/**
 * Starts the interval timer and posts message to main thread on each tick
 */
function startTimer() {
    let i = 0;
    timerId = setInterval(function() {
        i++;
        postMessage(i);
    }, 1000);
}

/**
 * Stops current running interval
 */
function stopTimer() {
    clearInterval(timerId);
}

/**
 * Web worker onmessage event handler, it recieves event from host (file running
 * in main thread) and then performs actions accordingly
 * 
 * @param {string} msg - message sent from file running in main thread
 */
function onmessage(msg) {
    console.log('Worker: Message recieved', msg);

    switch (msg.data) {
        case 'Start':
            startTimer();   // starts the timer
            break;

        case 'Stop':
            stopTimer();    // stops the timer
            break;

        default:
            break;
    }
}
