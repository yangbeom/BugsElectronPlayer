const electron = require('electron')
const path = require('path')
const url = require('url')
const fs = require('fs')
const PlayerControl = require('./playercontrol.js')
const scripts = require('./scripts.js')

const {app, ipcMain, BrowserWindow, session} = electron

const playerControl = new PlayerControl(true)

let configs
let pluginName
let mainWindow
let win
let tray = null
let iconName

try
{
    configs = require('./configs.json')
}
catch(e)
{
    configs = {"volume": "50", "playerSkin": "white"}
}

switch (process.platform){
    case 'darwin':
        pluginName = 'pepperflash/PepperFlashPlayer.plugin'
        break
    case 'linux':
        pluginName = 'pepperflash/libpepflashplayer.so'
        break
}
app.commandLine.appendSwitch('ppapi-flash-path', 
                             path.join(__dirname, pluginName))


function createWindow(){
    var preference = {width: 384, 
                      height: 710,
                      resizable: true, //크기 변환 불가능
                      webPreferences:{plugins: true}
                      }

    mainWindow = new BrowserWindow(preference)
    mainWindow.loadURL('http://music.bugs.co.kr/newPlayer?autoplay=false')

    mainWindow.show()
}

app.on('ready', () =>{
    console.log(configs)
    createWindow()

    // Initialize player control.
    playerControl.init();

    playerControl.on('play', () => {
        mainWindow.webContents.executeJavaScript(scripts.MP);
    });

    playerControl.on('pause', () => {
        mainWindow.webContents.executeJavaScript(scripts.MS);
    });

    playerControl.on('stop', () => {
        //TODO: Hack control to emulate 'real stop'
        mainWindow.webContents.executeJavaScript(scripts.MS);
    });

    playerControl.on('playpause', () => {
        mainWindow.webContents.executeJavaScript(scripts.MPP);
    });

    playerControl.on('next', () => {
        mainWindow.webContents.executeJavaScript(scripts.MNT);
    });

    playerControl.on('previous', () => {
        mainWindow.webContents.executeJavaScript(scripts.MPT);
    });

    //IPC listener for metadata
    ipcMain.on('metadata', (evt, data) => {
        playerControl.updateMetadata(data);
    });

    //Execute metadata updater priodically
    mainWindow.webContents.executeJavaScript(`
let metadata = {};
let ipc = require(\'electron\').ipcRenderer

function mprisTime(timestamp) {
    let ts = timestamp.split(':');
    let sum = 0;
    for(let i = 0; i < ts.length; i++) {
        sum += Math.pow(60, ts.length - i - 1) * parseInt(ts[i]);
    }

    return sum * 1000 * 1000;
};
`);
    setInterval(() => {
        mainWindow.webContents.executeJavaScript(`
metadata = {
length: mprisTime($('em.finish')[0].innerText),
position: mprisTime($('em.start')[0].innerText),
albumart: $('img', $('div.thumbnail')[0])[0].src,
title: $('.tracktitle', $('dl.trackInfo')[0].children)[0].innerText,
album: $('.albumtitle', $('dl.trackInfo')[0].children)[0].innerText,
artist: $('.artist', $('dl.trackInfo')[0].children)[0].innerText,
status: $(".btnPlay button")[0] ? 'Paused' : 'Playing'
};
ipc.send('metadata', metadata);
`);
    }, 1000);

    //마지막 스킨설정 세팅
    session.defaultSession.cookies.set({url:'http://music.bugs.co.kr/', 
                                        name:'playerSkin',
                                        value: configs.playerSkin},
                                        (error) => {}) 
    //마지막 볼륨 세팅
    session.defaultSession.cookies.set({url:'http://music.bugs.co.kr/',
                                        name: 'volume',
                                        value: configs.volume},
                                        (error) => {})
//쿠키값 변경시 설정변경  
    session.defaultSession.cookies.on('changed',
        (event, cookie, cause, removed) => {
            if(cookie.domain == 'music.bugs.co.kr')
            {
                if(cookie.name == 'volume')
                {
                    configs.volume =  cookie.value
                }
                else if(cookie.name == 'playerSkin')
                {
                    configs.playerSkin = cookie.value
                }
            }
    })
})


app.on('window-all-closed', function () {
    if (process.platform !== 'darwin'){app.quit()}
})


app.on('activate', function() {
    if (mainWindow === null) {
        createWindow}
})


//payco로그인시 창이 남는 것을 제거
app.on('browser-window-created', (e, window) =>{
    const nwindow = window
    if(nwindow.getTitle() === "paycoLoginPopup")
    {
        nwindow.once('page-title-updated',(e, title) =>{
            if(title ==='로그인')
            {
                nwindow.on('page-title-updated',(e, title) => {
                    if(title === '벅스')
                    {
                        mainWindow.reload()
                    }
                })
            }})
    }
})


//shortcut 등록 해제, settings값 저장
app.once('will-quit', () =>{
    fs.writeFile(path.join(__dirname,'configs.json'), 
                 JSON.stringify(configs), 
                 (error) => {})

    playerControl.cleanup();
})

