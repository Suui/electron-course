const electron = require('electron');
const path = require('path');

const { app, BrowserWindow, Menu, Tray } = electron;

app.on('ready', main);

let window;

function main() {
    const tray = new Tray(path.join('src', 'tray-icon.png'));
    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Wow',
            click: _ => console.log('wow')
        },
        {
            label: 'Awesome',
            click: _ => console.log('awesome')
        }
    ]);
    tray.setContextMenu(contextMenu);
    tray.setToolTip('My amazing tray');
}