const electron = require('electron');
const path = require('path');
const fs = require('fs');
const moment = require('moment');

const { desktopCapturer, ipcRenderer: ipc, screen } = electron;

ipc.on('capture', onCapture);

function getMainSource(done) {
    const options = { types: ['screen'], thumbnailSize: screen.getPrimaryDisplay().workAreaSize }
    desktopCapturer.getSources(options, (error, sources) => {
        if (error) return console.log('Could not capture the screen', error);

        const isMainSource = source => source.name === 'Entire screen' || source.name === 'Screen 1';
        done(sources.filter(isMainSource)[0]);
    });
}

function onCapture(event, targetPath) {
    getMainSource(source => {
        const png = source.thumbnail.toPng();
        const filePath = path.join(targetPath, moment().format('Y-MM-DD HH-mm-ss-SSS') + '.png');
        writeScreenshot(png, filePath);
    });
}

function writeScreenshot(png, filePath) {
    fs.writeFile(filePath, png, error => {
        if (error) return console.log('Failed to write screen:', error);
    })
}
