// This is main process of Electron, started as first thing when your
// app starts. This script is running through entire life of your application.
// It doesn't have any windows which you can see on screen, but we can open
// window from here.

import path from 'path';
import url from 'url';
import { app, Menu } from 'electron';
import { devMenuTemplate } from './menu/dev_menu_template';
import { editMenuTemplate } from './menu/edit_menu_template';
import createWindow from './helpers/window';

// Notice how those modules are included; electron is different.

// Special module holding environment variables which you declared
// in config/env_xxx.json file.
import env from './env';

var mainWindow;

// I've disabled all menus, uncomment if you want them
var setApplicationMenu = function () {
    var menus = [editMenuTemplate];
    if (env.name !== 'production') {
        // menus.push(devMenuTemplate);
    }
    // Menu.setApplicationMenu(Menu.buildFromTemplate(menus));
};

// Save userData in separate folders for each environment.
// Thanks to this you can use production and development versions of the app
// on same machine like those are two separate apps.
if (env.name !== 'production') {
    var userDataPath = app.getPath('userData');
    app.setPath('userData', userDataPath + ' (' + env.name + ')');
}

// when the window is ready do
app.on('ready', function () {
    setApplicationMenu();

    // control different aspects of the window
    // this is how i hid everything
    var mainWindow = createWindow('main', {
        //useContentSize: true,
        width: 350,
        height: 400,
        center: true,
        backgroundColor: '#1D1D1D',
        icon: __dirname + '/images/icon.png',
        minimizable: true,
        maximizable: false,
        resizable: false,
        frame: false,
        show: false
    });

    // load the html file that is our app
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'app.html'),
        protocol: 'file:',
        slashes: true
    }));

    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });

    // dev tools if you're not in production flags
    if (env.name === 'development') {
        // mainWindow.openDevTools();
    }
});

app.on('window-all-closed', function () {
    app.quit();
});
