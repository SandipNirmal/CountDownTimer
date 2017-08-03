/**
 * Function for adding browser notificaions for users
 * @param {any} notificationObj - object containing information 
 *                                for showing browser notification
 */
function notify(notificationObj= {}) {
  const {
    msg = 'Break Time!',
    body = '',
    icon = process.env.PUBLIC_URL + '/imgs/img-bell-icon.png'
  } = notificationObj;

  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    console.log("This browser does not support desktop notification");
  }

  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    new Notification(msg, {
      body: body,
      icon: icon
    });
  }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== "denied") {
    Notification.requestPermission(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        new Notification(msg, {
          body: body,
          icon: icon
        });
      }
    });
  }
}

export { notify };
