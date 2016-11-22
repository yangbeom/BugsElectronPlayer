const electron = require('electron')
const path = require('path')
const url = require('url')

const {app, BrowserWindow, globalShortcut} = electron

let pluginName
let mainWindow
let win
let tray = null
let iconName

switch (process.platform){
    case 'darwin':
        pluginName = 'PepperFlashPlayer.plugin'
        iconName = 'icon.ico'
        break
    case 'linux':
        pluginName = 'libpepflashplayerx86.so'
        iconName = 'icon.png'
        break
}
    app.commandLine.appendSwitch('ppapi-flash-path', path.join(__dirname, pluginName))
function createWindow(){
    var preference = {width: 384, 
                      height: 710,
                      resizable: false, //크기 변환 불가능
                      icon: path.join(__dirname, iconName),
                      webPreferences:{plugins: true}
                      }

    mainWindow = new BrowserWindow(preference)
    mainWindow.loadURL(`http://music.bugs.co.kr/newPlayer?autoplay=false`)

//    mainWindow.webContents.openDevTools()
    mainWindow.show()
}

app.commandLine.appendSwitch('ppapi-flash-path', path.join(__dirname, pluginName))
app.on('ready', () =>{
    createWindow()
    //shrotcut 전역 등록
    globalShortcut.register('MediaPlayPause',() =>{
        console.log("pressed MediaPlayPause Key")
        mainWindow.webContents.executeJavaScript('if(document.getElementsByClassName("btnPlay")[0])\
            {document.getElementsByClassName("btnPlay")[0].getElementsByTagName("button")[0].click()}\
            else\
            {document.getElementsByClassName("btnStop")[0].getElementsByTagName("button")[0].click()}')
    })


    globalShortcut.register('MediaNextTrack', () =>{
        console.log("pressed MediaNextTrack Key")
        mainWindow.webContents.executeJavaScript(
            'document.getElementsByClassName("btnNext")[0].getElementsByTagName("button")[0].click()')
    })

    globalShortcut.register('MediaPreviousTrack', () =>{
        console.log("pressed MediaPreviousTrack Key")
        mainWindow.webContents.executeJavaScript(
            'document.getElementsByClassName("btnPrev")[0].getElementsByTagName("button")[0].click()')
    })
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin'){ app.quit()}
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

//shortcut 등록 해제
app.once('before-quit', () =>{
    globalShortcut.unregisterAll()
})

