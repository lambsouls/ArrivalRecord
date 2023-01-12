var electron = require('electron')

var app = electron.app
var BrowserWindow = electron.BrowserWindow

var mainWindow = null 

//const { app, BrowserWindow, ipcMain } = require('electron')
// 禁用当前应用程序的硬件加速
app.disableHardwareAcceleration()

app.on('ready',()=>{
    mainWindow = new BrowserWindow({
        width:350,
        height:600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
          }
    })
    mainWindow.loadFile('index.html')
    mainWindow.on('closed',()=>{
        mainWindow = null
    })
    // require('./main/menu.js')

    var ipcMain = require('electron').ipcMain;
    ipcMain.on('ipc-message-index3', function(event, arg) {
        var fs = require('fs');
        console.log(arg);
        event.reply('ipc-message-back',0);
        datafilename = arg+'.txt' ;
        fs.readFile('./data/'+datafilename,(err,data1)=>{
            if(err){
                console.log('err');
            }else{
                console.log('readed file:'+datafilename);
                event.reply('ipc-message-back',data1.toString());
            }
            })
    })

    ipcMain.on('ipc-message', function(event, arg) {
        if (arg.toString() == 'index'){
            console.log(arg);
        }

        if (arg.toString() == 'index1'){
            console.log(arg);
            var fs = require('fs');
            fs.readdir('./data/',(err,data) =>{
                if(err){
                    console.log('err');
                }else{
                    console.log('readed files');
                    datalength = data.length;
                    for(i=0;i<datalength;i++){
                        event.reply('ipc-message-back',i);
                        weblist = [];
                        datafilename = data[i];
                        fs.readFile('./data/'+datafilename,(err,data1)=>{
                            if(err){
                                console.log('err');
                            }else{
                                console.log('readed file:'+datafilename);
                                event.reply('ipc-message-back',data1.toString());
                            }
                            })
                    }
                }
            })}
        
        if (arg.toString() == 'index2'){
            console.log(arg);
            
            url = './index1.html';
            mainWindow.loadURL(url);
    
        }

        if (arg.toString() == 'index2-updata'){
            ipcMain.once('ipc-message1', function(event, arg) {input1 = arg
            ipcMain.once('ipc-message2', function(event, arg) {input2 = arg
            ipcMain.once('ipc-message3', function(event, arg) {input3 = arg
            ipcMain.once('ipc-message4', function(event, arg) {input4 = arg
            ipcMain.once('ipc-message5', function(event, arg) {input5 = arg
            ipcMain.once('ipc-message6', function(event, arg) {input6 = arg
                var projectName = input1;
                var projectT = input2;
                //获取时间
                var myDate = new Date();
                var projectTime1 = myDate.getFullYear() +'-'+ (myDate.getMonth()+1) +'-'+ myDate.getDate();
                if(myDate.getMonth()+1 < 10){Month = '0'+(myDate.getMonth()+1).toString()}else{Month = myDate.getMonth()+1};
                if(myDate.getDate() < 10){Date1 = '0'+myDate.getDate().toString()}else{Date1 = myDate.getDate()};
                if(myDate.getHours() < 10){Hours = '0'+myDate.getHours().toString()}else{Hours = myDate.getHours()};
                if(myDate.getMinutes() < 10){Minutes = '0'+myDate.getMinutes().toString()}else{Minutes = myDate.getMinutes()};
                if(myDate.getSeconds() < 10){Seconds = '0'+myDate.getSeconds().toString()}else{Seconds = myDate.getSeconds()};
                var projectID = myDate.getFullYear().toString() + Month.toString() + Date1.toString()+Hours.toString()+Minutes.toString()+Seconds.toString();
                var projectTime2 = input3+'-'+input4+'-'+input5;
                var projectYuan = input6;
                console.log('projectName:'+projectName);
                console.log('projectID:'+projectID);
                console.log('projectT:'+projectT);
                console.log('projectTime1:'+projectTime1);
                console.log('projectTime2:'+projectTime2);
                console.log('projectYuan:'+projectYuan);
                var fs = require('fs');
                projectWrite = projectID+'\n'+projectName+'\n'+projectT+'\n'+projectTime1+'\n'+projectTime2+'\n'+projectYuan
                fs.writeFile('data/'+projectID+'.txt',projectWrite,null,function(err){
                    if(err){
                        console.log(err);
                    }else{
                        console.log('projectID:'+projectID + ' Writed');
                    }})
                //app.relaunch();
                //app.quit();
            })})})})})})
        }

        if (arg.toString() == 'index3-updata'){
            ipcMain.once('ipc-messagex', function(event, arg) {inputx = arg
            ipcMain.once('ipc-messagea', function(event, arg) {inputa = arg
            ipcMain.once('ipc-messageb', function(event, arg) {inputb = arg
            ipcMain.once('ipc-messagec', function(event, arg) {inputc = arg
            ipcMain.once('ipc-messaged', function(event, arg) {inputd = arg
                filename = inputx+'.txt';
                date = inputa+'-'+inputb+'-'+inputc;
                T = inputd;
                projectWrite = '\n'+date +"|"+T;
                console.log(filename);
                console.log(date);
                console.log(T);
                var fs = require('fs');
                fs.appendFile('data/'+filename,projectWrite,null,function(err){
                    if(err){
                        console.log(err);
                    }else{
                        console.log('projectID:'+inputx + ' Writed');
                    }})

            })})})})})
        }

    });
})

