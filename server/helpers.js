const { app } = require('electron');
const notifier = require('node-notifier');

module.exports = {
    notify: (title = 'My notification', message = 'Hello, there!') => {
        notifier.notify({title, message, sound: false});
    }
}