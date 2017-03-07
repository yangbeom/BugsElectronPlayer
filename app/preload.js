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

let metadata = {};
const ipc = require('electron').ipcRenderer

function mprisTime(timestamp) {
    let ts = timestamp.split(':');
    let sum = 0;
    for(let i = 0; i < ts.length; i++) {
        sum += Math.pow(60, ts.length - i - 1) * parseInt(ts[i]);
    }

    return sum * 1000 * 1000;
};

// Send metadata change to master
setInterval(() => {
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
}, 1000);
