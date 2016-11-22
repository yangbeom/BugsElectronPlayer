# BugsElectronPlayer
*BugsElectronPlayer*는 벅스 웹플레이어를
[Electron](https://github.com/electron/electron) 에서 구동한 플레이어입니다.

[벅스](http://www.bugs.co.kr)의 공식 플레이어가 아니며 벅스에서 요청시 언제든
내려 갈 수 있습니다.

기본적으로 벅스 웹플레이어와 사용법은 같습니다.

##사용법
###npm start를 이용한 사용법
```
    $ git clone https://github.com/yangbeom/BugsElectronPlayer/
    $ cd BugsElectronPlayer
    $ npm install
    $ npm start
```


###추가기능

1.0.0버전에서는 다음과 같은 기능이 추가 되어있습니다.

`MediaStartPauseKey` : 음악 재생 및 일시정지

`MediaNextTrackKey` : 다음 곡 재생

`MediaPreviousTrackKey` : 이전 곡 재생

###현재 알려진 문제점

- 스킨변경 및 볼륨에 대한 설정값이 저장되지 않습니다.

    종료후 재시작시 이전에 설정한 값이 아닌 default설정값인 화이트 스킨과 볼륨
    50으로 실행이 됩니다.

- 새로운 노래를 검색후 추가시 새로운 노래가 아닌 기존곡이 처음부터 재생되는
경우가 있습니다.


##License

[MIT](./LICENSE)

###[Electron](https://github.com/electron/electron)

    Copyright (c) 2013-2016 GitHub Inc.
    
    Permission is hereby granted, free of charge, to any person obtaining
    a copy of this software and associated documentation files (the
    "Software"), to deal in the Software without restriction, including
    without limitation the rights to use, copy, modify, merge, publish,
    distribute, sublicense, and/or sell copies of the Software, and to
    permit persons to whom the Software is furnished to do so, subject to
    the following conditions:
    
    The above copyright notice and this permission notice shall be
    included in all copies or substantial portions of the Software.
    
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
    LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
    OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
    WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
