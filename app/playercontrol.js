'use strict';

const EventEmitter = require('events');
const globalShortcut = require('electron').globalShortcut;
let MPRIS;

// MPRIS is not available in all platform.
try {
    require('require-rebuild')();
    MPRIS = require('mpris-service');
} catch (e) {
    console.log(e);
    MPRIS = null;
}

class PlayerControl extends EventEmitter {
    constructor(useMPRIS) {
        super();

        this._useMPRIS = useMPRIS;

        if (this._useMPRIS && null === MPRIS) {
            console.log('Failed to load MPRIS!');
            this._useMPRIS = false;
        }

        if (this._useMPRIS) {
            this._mpris = new MPRIS({
                name: 'Bugs',
                identity: 'Bugs! Electron Player',
                supportedInterfaces: ['player']
            });
        }

        this._metadata = null;
    }

    init() {
        const self = this;
        const events = [
            'raise',
            'quit',
            'next',
            'previous',
            'pause',
            'playpause',
            'stop',
            'play',
            'seek',
            'position',
            'open',
            'volume'
        ];

        if (self._useMPRIS) {
            events.forEach((eventName) => {
	            self._mpris.on(eventName, () => {
                    self.emit(eventName);
	            });
            });
        } else {
            globalShortcut.register('MediaPlayPause',() =>{
                self.emit('playpause');
            });

            globalShortcut.register('MediaNextTrack', () =>{
                self.emit('next');
            });

            globalShortcut.register('MediaPreviousTrack', () =>{
                self.emit('previous');
            });
        }
    }

    cleanup() {
        if (this._useMPRIS) {
        } else {
            globalShortcut.unregisterAll();
        }
    }

    updateMetadata(metadata) {
        if (!this._useMPRIS) {
            //Cannot update because MPRIS is not available.
            return;
        }

        let mprismt = {
            'mpris:length': metadata.length,
            'mpris:artUrl': metadata.albumart,
            'xesam:title': metadata.title,
            'xesam:album': metadata.album,
            'xesam:artist': metadata.artist
        };

        //Quick N Dirty object comparison
        if (JSON.stringify(this._metadata) !== JSON.stringify(mprismt)) {
            this._mpris.metadata = mprismt;
            this._metadata = mprismt;
        }

        if (this._mpris.playbackStatus !== metadata.status) {
            this._mpris.playbackStatus = metadata.status;
        }

        this._mpris.position = metadata.position;
        this._mpris.seeked(0); // Emit event
    }
}

module.exports = PlayerControl;
