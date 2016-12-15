const electron = require('electron')
const path = require('path')
const url = require('url')
const fs = require('fs')
const keyBinding = require('./keyBinding.js')

try
{
    let configs = require('./configs.json')
}
catch(e)
{
    let configs = {"volume": "50", "playerSkin": "white"}
}


const {app, BrowserWindow, globalShortcut, session} = electron

let pluginName
let mainWindow
let win
let tray = null
let iconName

switch (process.platform){
    case 'darwin':
        pluginName = 'PepperFlashPlayer.plugin'
        iconName = 'icon.icns'
        break
    case 'linux':
        pluginName = 'libpepflashplayerx86.so'
        iconName = 'icon.png'
        break
}
app.commandLine.appendSwitch('ppapi-flash-path', 
                             path.join(__dirname, pluginName))


function createWindow(){
    var preference = {width: 384, 
                      height: 710,
                      resizable: false, //크기 변환 불가능
                      icon: path.join(__dirname, iconName),
                      webPreferences:{plugins: true}
                      }

    mainWindow = new BrowserWindow(preference)
    mainWindow.loadURL(`http://music.bugs.co.kr/newPlayer?autoplay=false`)

    mainWindow.show()
}

app.on('ready', () =>{
    createWindow()
    //shrotcut 전역 등록
    globalShortcut.register('MediaPlayPause',() =>{
        mainWindow.webContents.executeJavaScript(keyBinding.MPP)
    })


    globalShortcut.register('MediaNextTrack', () =>{
        mainWindow.webContents.executeJavaScript(keyBinding.MNT)
    })

    globalShortcut.register('MediaPreviousTrack', () =>{
        mainWindow.webContents.executeJavaScript(keyBinding.MPT)
    })

    globalShortcut.register('Control+M', () =>{
        changePlayer()})
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

    globalShortcut.unregisterAll()
})

