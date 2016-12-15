# BugsElectronPlayer

**BugsElectronPlayer**는 벅스 웹플레이어를
[Electron](https://github.com/electron/electron) 에서 구동한 플레이어입니다.

[벅스](http://www.bugs.co.kr)의 공식 플레이어가 아니며 벅스에서 요청시 언제든
내려 갈 수 있습니다.

기본적으로 벅스 웹플레이어와 사용법은 같습니다.

## 공지
현재 취업준비중이라 업데이트가 늦을 수 있습니다.

하지만 최소한 [Project](https://github.com/yangbeom/BugsElectronPlayer/projects)
에 적혀 있는 것을 마무리 하고자 하니 더 원하시는 추가기능이나 버그등은
[Issues](https://github.com/yangbeom/BugsElectronPlayer/issues)에 올려주시기
바랍니다.

##사용법
###npm을 이용해 사용하는 방법

```
    $ git clone https://github.com/yangbeom/BugsElectronPlayer/
    $ cd BugsElectronPlayer
    $ npm install
    $ npm start
```

### 파일을 다운받아 사용하는 방법

[Releases](https://github.com/yangbeom/BugsElectronPlayer/releases/)
에서 해당 플랫폼에 맞는 압축파일을 받아 압축을 푼뒤 실행하면 됩니다.

##이전 버전과 달라진점

- 정상적인 종료가 아닐시 다시 켜지지 않는 문제를 해결하였습니다.

###추가기능

`v1.1.1`버전에서는 다음과 같은 기능이 추가 되어있습니다.

`MediaStartPauseKey` : 음악 재생 및 일시정지

`MediaNextTrackKey` : 다음 곡 재생

`MediaPreviousTrackKey` : 이전 곡 재생

###현재 알려진 문제점

- linux에서 시스템에 해당 shortcut이 등록되어 있으면 우선순위에 밀려 shortcut이
작동 하지 않습니다.

##License

[MIT](./LICENSES/LICENSE)

###[Electron](https://github.com/electron/electron)
[MIT](./LICENSES/ElectronLicense)

###AdobeFlashPlayer
[LGPL](./LICENSES/AdobeFlashPlayerLicense)
