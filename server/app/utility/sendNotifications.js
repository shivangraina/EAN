const fetch = require('node-fetch');

// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.io/dashboard/notifications
exports.sendPushNotification = async function sendPushNotification(
  expoPushToken
) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Original Title',
    body: 'And here is the body!',
    data: { data: 'goes here' },
  };

  // Post this message with following request format

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
};
