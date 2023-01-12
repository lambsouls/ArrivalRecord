var ipcRenderer = require('electron').ipcRenderer;
alert(3);
ipcRenderer.send('ipc-message','index');