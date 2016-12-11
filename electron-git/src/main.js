const electron = require('electron');

const { app, BrowserWindow, Menu, Tray, clipboard, globalShortcut } = electron;

app.on('ready', main);

let widnow;

function main() {
    window = new BrowserWindow({
        width: 1280,
        height: 720
    });

    window.loadURL(`file://${__dirname}/status.html`);

    window.on('close', _ => {
        window = null;
    });
}
