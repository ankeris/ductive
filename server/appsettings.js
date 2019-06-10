const { app, BrowserWindow, Menu } = require('electron')
const url = require('url')
const path = require('path')

module.exports = class CreateApp {
    mainWindow;
    indexPath;
    // Keep a reference for dev mode
    dev;
    constructor() {
        this.mainWindow = null;
        this.indexPath;
        this.dev = false;
    }

    changeDev(bool) {
        this.dev = bool;
    }
    
    init() {
        // Create the browser window.
        this.mainWindow = new BrowserWindow({
            width: 1024,
            height: 768,
            show: false,
            titleBarStyle: 'hidden',
            frame: false,
            webPreferences: {
            nodeIntegration: true
            }
        })
      
        if (this.dev && process.argv.indexOf('--noDevServer') === -1) {
            this.indexPath = url.format({
              protocol: 'http:',
              host: 'localhost:8080',
              pathname: 'index.html',
              slashes: true
            })
          } else {
            this.indexPath = url.format({
              protocol: 'file:',
              pathname: path.join(__dirname, 'dist', 'index.html'),
              slashes: true
            })
          }
          
          this.mainWindow.loadURL(this.indexPath)
        
          // Don't show until we are ready and loaded
          this.mainWindow.once('ready-to-show', () => {
            this.mainWindow.show()
        
            // Open the DevTools automatically if developing
            if (this.dev) {
              this.mainWindow.webContents.openDevTools()
            }
          })
        
          // Emitted when the window is closed.
          this.mainWindow.on('closed', function() {
            // Dereference the window object, usually you would store windows
            // in an array if your app supports multi windows, this is the time
            // when you should delete the corresponding element.
            this.mainWindow = null
          })
        
          const mainMenu = [
            {
              label: 'ductive',
              submenu: [
                {
                  label: 'About'
                },
                {
                  label: 'Quit',
                  click() {
                    app.quit();
                  }
                }
              ]
            }
          ]
        
          const menu = Menu.buildFromTemplate(mainMenu)
          Menu.setApplicationMenu(menu);
    }
    // and load the index.html of the app.
  }

