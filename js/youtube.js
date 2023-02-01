
// Youtube iframe API


// Youtube iframe API를 비동기로 로드
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
// 여긴 건들지 말 것


// onYouTubeIframeAPIReady 함수 이름은,
// Youtube iframe API에서 사용하는 이름이기 때문에, 다르게하면 작동하지 않는다.
// 그리고 함수는 전역 등록해야 한다.

var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    // height: '360',
    // width: '640',
    videoId: 'An6LvWQuj_8',
    // 이 키값으로 동영상을 가져옴, 주소 맨 뒤가 키 값임
    playerVars : {
      autoplay: true, // 자동재생 유무
      loop : true, // 반복재생 유무
      playList : 'An6LvWQuj_8' // 반복 재생할 영상 id 목록
    },
    events: {
      // 영상이 준비되었을 때
      'onReady': function(event){
        event.target.mute() // 음소거
      }
    }
  });
}