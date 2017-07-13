const electron = require('electron')
const path = require('path')
const url = require('url')
const fs = require('fs')
const scripts = require('./scripts.js')

const {app, ipcMain, BrowserWindow, session, globalShortcut} = electron


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


function createWindow(){
    var preference = {
        width: 384,
        height: 710,
        resizable: false, //크기 변환 불가능
        webPreferences:{
            plugins: true,
            preload: path.join(__dirname, 'preload.js')
        }
    }

    mainWindow = new BrowserWindow(preference)
    mainWindow.loadURL('http://music.bugs.co.kr/newPlayer?autoplay=false&html5=true')

    mainWindow.show()
}

app.on('ready', () =>{
    console.log(configs)
    createWindow()
        try
    {
        configs = require('./configs.json')
    }
    catch(e)
    {
        configs = {"volume": "50", "playerSkin": "white"}
    }
    console.log(configs)
    createWindow()
    console.log(process.versions.electron)

    //shrotcut 전역 등록
    globalShortcut.register('MediaPlayPause',() =>{
        console.log('Press MediaPlayPause')
        mainWindow.webContents.executeJavaScript(scripts.MPP)
    })


    globalShortcut.register('MediaNextTrack', () =>{
        mainWindow.webContents.executeJavaScript(scripts.MNT)
    })

    globalShortcut.register('MediaPreviousTrack', () =>{
        mainWindow.webContents.executeJavaScript(scripts.MPT)
    })

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

})

