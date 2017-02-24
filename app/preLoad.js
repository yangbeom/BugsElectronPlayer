const {ipcRenderer, webFrame} = require('electron')

let playPause

console.log("pre load javascripts")
if(document.addEventListener){
    document.addEventListener("DOMContentLoaded", () =>
        {
            document.removeEventListener("DOMContentLoaded", arguments.calee, false);
            playPause = $('.btnCtl')
            ipcRenderer.send('player-ready')
        },false)}

ipcRenderer.on('hello', () => {
    $('.btnCtl').bind("DOMSubtreeModified", () => {
        console.log("changed1")
    })
})

