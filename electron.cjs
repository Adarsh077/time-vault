/* eslint-disable no-undef */
const path = require('path');

const electron = require('electron');
const { DateTime } = require('luxon');

const { app, BrowserWindow } = electron;

const powerMonitor = electron.powerMonitor;

app.on('ready', () => {
  let mainWindow = new BrowserWindow({
    title: 'Time Vault',
    autoHideMenuBar: true,
    width: 550,
    height: 630,
    resizable: false,
    icon: path.join(__dirname, 'Vault-Time-Locked.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.loadURL('http://localhost:5173/');

  let detectIsIdleIntervalId = null;
  let detectIsActiveIntervalId = null;

  const detectIsIdle = () => {
    detectIsIdleIntervalId = setInterval(() => {
      const idleTime = powerMonitor.getSystemIdleTime();
      if (idleTime >= 55) {
        console.log(DateTime.now().toFormat('HH:mm:ss'), 'IDLE DETECTED');
        mainWindow.webContents.send('systemIdleStateChange', {
          isIdle: true,
        });
        detectIsActive();
        clearInterval(detectIsIdleIntervalId);
        detectIsIdleIntervalId = null;
      }
    }, 1000 * 60);
  };

  const detectIsActive = () => {
    detectIsActiveIntervalId = setInterval(() => {
      const idleTime = powerMonitor.getSystemIdleTime();
      if (idleTime < 55) {
        console.log(DateTime.now().toFormat('HH:mm:ss'), 'ACTIVE DETECTED');
        mainWindow.webContents.send('systemIdleStateChange', { isIdle: false });
        detectIsIdle();
        clearInterval(detectIsActiveIntervalId);
        detectIsActiveIntervalId = null;
      }
    }, 1000);
  };

  const clearIntervals = () => {
    if (detectIsIdleIntervalId) clearInterval(detectIsIdleIntervalId);
    if (detectIsActiveIntervalId) clearInterval(detectIsActiveIntervalId);
  };

  electron.ipcMain.on('startTimer', () => {
    clearIntervals();
    detectIsIdle();
  });

  electron.ipcMain.on('stopTimer', () => {
    clearIntervals();
  });

  // app.on('will-quit', (e) => {
  //   e.preventDefault();
  //   mainWindow.webContents.send('onClose');
  //   setTimeout(() => {
  //     app.quit();
  //   }, 1000);
  // });

  let status = 0;

  mainWindow.on('close', (e) => {
    if (status == 0) {
      if (mainWindow) {
        e.preventDefault();
        mainWindow.webContents.send('onClose');
      }
    }
  });

  electron.ipcMain.on('closed', () => {
    status = 1;
    mainWindow = null;
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });
});
