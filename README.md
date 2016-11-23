# BugsElectronPlayer

*BugsElectronPlayer*는 벅스 웹플레이어를
[Electron](https://github.com/electron/electron) 에서 구동한 플레이어입니다.

[벅스](http://www.bugs.co.kr)의 공식 플레이어가 아니며 벅스에서 요청시 언제든
내려 갈 수 있습니다.

기본적으로 벅스 웹플레이어와 사용법은 같습니다.

##사용법
###npm을 이용해 사용하는 방법

```
    $ git clone https://github.com/yangbeom/BugsElectronPlayer/
    $ cd BugsElectronPlayer
    $ npm install
    $ npm start
```

### 파일을 다운받아 사용하는 방법

[Releses](https://github.com/yangbeom/BugsElectronPlayer/releases/)
에서 해당 플랫폼에 맞는 압축파일을 받아 압축을 푼뒤 실행하면 됩니다.

##이전 버전과 달라진점

- MacOS 에서의 로그인 버튼이 스크롤 해야만 다 보이는 문제 해결
- MacOS 에서의 아이콘 해결

###추가기능

`1.0.2`버전에서는 다음과 같은 기능이 추가 되어있습니다.

`MediaStartPauseKey` : 음악 재생 및 일시정지

`MediaNextTrackKey` : 다음 곡 재생

`MediaPreviousTrackKey` : 이전 곡 재생

###현재 알려진 문제점

- 스킨변경 및 볼륨에 대한 설정값이 저장되지 않습니다.

    종료후 재시작시 이전에 설정한 값이 아닌 default설정값인 화이트 스킨과 볼륨
    50으로 실행이 됩니다.

- 새로운 노래를 검색후 추가시 새로운 노래가 아닌 기존곡이 처음부터 재생되는
경우가 있습니다.

- linux에서 시스템에 해당 shortcut이 등록되어 있으면 우선순위에 밀려 shortcut이
작동 하지 않습니다.

##License

[MIT](./LICENSES/LICENSE)

###[Electron](https://github.com/electron/electron)
[MIT](./LICENSES/ElectronLicense)

###AdobeFlashPlayer
[LGPL](./LICENSES/AdobeFlashPlayerLicense)
