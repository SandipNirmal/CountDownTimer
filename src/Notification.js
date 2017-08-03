/**
 * Function for adding browser notificaions for users
 */
let Notification = () => {

  let notifyMe = (msg) => {
    const notificationMsg = msg ? msg : 'Break time!!';

    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
      console.log("This browser does not support desktop notification");
    }

    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === "granted") {
      // If it's okay let's create a notification
      // var notification = new Notification(notificationMsg);
      new Notification(notificationMsg);
    }

    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== "denied") {
      Notification.requestPermission(function (permission) {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          // var notification = new Notification(notificationMsg);
          new Notification(notificationMsg);
        }
      });
    }
  }
}

export default Notification;
