const electron = require('electron');

const app = electron.app;
const ipc = electron.ipcMain;
const BrowserWindow = electron.BrowserWindow;
const countdown = require('./js/countdown');

app.on('ready', main);

let window;

function main() {
     window = new BrowserWindow({
        width: 1024,
        height: 720
    });

    window.loadURL(`file://${__dirname}/countdown.html`);

    window.on('closed', _ => {
        window = null;
    });
}

ipc.on('countdown-start', _ => {
    countdown(count => {
        window.webContents.send('countdown', count);
    });
});