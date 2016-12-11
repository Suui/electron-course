const electron = require('electron');

const { app, BrowserWindow, Menu, Tray, clipboard, globalShortcut } = electron;

app.on('ready', main);

let widnow;

function main() {
    window = new BrowserWindow({
        width: 1280,
        height: 720,
        resizeable: false,
        frame: false
    });

    window.loadURL(`file://${__dirname}/capture.html`);
    window.openDevTools();

    globalShortcut.register('Ctrl+Alt+Shift+P', _ => {
        window.webContents.send('capture', app.getPath('pictures'));
    });

    window.on('close', _ => {
        window = null;
    });
}
