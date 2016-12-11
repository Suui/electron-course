const electron = require('electron');
const path = require('path');

const { app, BrowserWindow, Menu, Tray, clipboard, globalShortcut } = electron;

app.on('ready', main);

app.on('close', _ => {
    globalShortcut.unregisterAll();
});

let window;

function checkClipboardForChange(onChange) {
    let cache = clipboard.readText;
    let latest;

    setInterval( _ => {
        latest = clipboard.readText();
        if (latest !== cache) {
            cache = latest;
            onChange(cache);
        }
    }, 1000);
}

const STACK_SIZE = 5;

function addToStack(item, stack) {
    return [item].concat(stack.length >= STACK_SIZE ? stack.slice(0, stack.length - 1) : stack);
}

function mapMenuTemplateFor(stack) {
    return stack.map((item, i) => {
        return {
            label: `Copy: ${format(item)}`,
            click: _ => {
                clipboard.writeText(item);
            },
            accelerator: `Ctrl+Alt+${i + 1}`
        }
    });
}

function format(item) {
    return item && item.length > 20 ? item.substr(0, 20) + '...'
                                    : item;
}

function registerShortcuts(stack) {
    globalShortcut.unregisterAll();
    for (let i = 0; i < STACK_SIZE; i++) {
        globalShortcut.register(`Ctrl+Alt+${i + 1}`, _ => {
            clipboard.writeText(stack[i]);
        });
    }
}

function main() {
    const tray = new Tray(path.join('src', 'tray-icon.png'));
    const contextMenu = Menu.buildFromTemplate([
        {
            label: '<Empty>',
            enabled: false
        }
    ]);
    tray.setContextMenu(contextMenu);
    tray.setToolTip('My amazing tray');

    let stack = [];
    checkClipboardForChange(text => {
        stack = addToStack(text, stack);
        tray.setContextMenu(Menu.buildFromTemplate(mapMenuTemplateFor(stack)));
        registerShortcuts(stack);
    });
}
