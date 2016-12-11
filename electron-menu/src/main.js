const electron = require('electron');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;

app.on('ready', main);

let window;

function main() {
    window = new BrowserWindow();

    const productName = electron.app.getName();

    const template = [
        {
            label: productName,
            submenu: [
                {
                    label: `About ${productName}`,
                    click: _ => {
                        console.log('Clicked about');
                    },
                    role: 'about'
                }, 
                {
                    type: 'separator',
                },
                {
                    label: 'Quit',
                    click: _ => { app.quit() },
                    accelerator: 'Ctrl+Q'
                }
            ]
        }
    ];

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
}