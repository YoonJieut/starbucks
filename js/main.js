const searchEl = document.querySelector('div.search');
const searchInputEl = searchEl.querySelector('input');
// console.log(searchEl, searchInputEl);

// 돋보기를 클릭해도 focus가 적용되도록 수정
searchEl.addEventListener('click',function(){
  searchInputEl.focus();
});

// 클래스를 추가하고 focus가 되면 속성추가
// 클릭하면 돋보기가 안보이게 처리
// input에 요소 추가
searchInputEl.addEventListener('focus',function(){
  searchEl.classList.add('focused');
  // jQuery addClass와 같은 역할
  this.setAttribute('placeholder','통합검색');
});
// 포커스가 해제되면 속성 삭제
searchInputEl.addEventListener('blur',function(){
  searchEl.classList.remove('focused');
  // jQuery addClass와 같은 역할
  this.setAttribute('placeholder','');
});

// BADGE------------------------------------ //
const badgesEl = document.querySelector('div.badges');
// console.log(badgesEl);

// 버튼 to-top
const toTopEl = document.querySelector('div#to-top');
console.log(toTopEl);

//** 스크롤할 때마다 실시간 적용 그러나그러나.. 중복적으로 이벤트가 발생하기 때문에 이를 외부 라이브러리를 사용하여 제어(lodash cdn)
window.addEventListener('scroll', _.throttle(function(){
  console.log(window.scrollY);
  // 스크롤 양이 500이상이면 배지 숨기기 & 보이기
  if (this.window.scrollY > 500){
    // badgesEl.style.display = 'none';
    // gsap libs(gsap.to(요소, 초 단위 시간, 객체 옵션))
    gsap.to(badgesEl, .6, {opacity : 0, display : 'none'});

    // 마지막 버튼이 보이게 처리
    gsap.to(toTopEl, .7, { x : 0 });
  } 
  else{ 
    // badgesEl.style.display = 'block';
    // gsap libs(gsap.to(요소, 초 단위 시간, 객체 옵션))
    gsap.to(badgesEl, .6, {opacity : 1, display : 'block'});

    // 마지막 버튼이 안 보이게 처리
    gsap.to(toTopEl, .7, { x : 100 });
  }
},300)); 

// to-top 버튼 클릭시 상단으로 이동
toTopEl.addEventListener('click',function(){
  gsap.to(window, .7, {
    // 플러그인 연결 시...
    scrollTo:0
  })
});


// 순차적으로 visual 안의 이미지를 보여줌
// 이미지 부분 그룹처리(fade--in)
const fadeEls = document.querySelectorAll('section.visual div.fade--in');
fadeEls.forEach( function( fadeEl, index ){
  // console.log(index, fadeEl);
  // gsap libs(gsap.to(요소, 초 단위 시간, 객체 옵션))
  gsap.to(fadeEl, 1, {
    // 인덱스를 활용하여 순차적으로 화면에 출력
    delay : (index+1) * 0.7, 
    opacity : 1
  })
})

// SWIPER part--------------------------------------------------
// 공지사항 부분의 슬라이드 구현
const swiper = new Swiper('div.notice-line div.swiper', {
  direction: 'vertical',
  autoplay : true,
  loop: true
});

const swiper2 = new Swiper('div.promotion div.swiper', {
  slidesPerView: 3, // 보여줄 요소는 3개
  spaceBetween: 10, // 슬라이드 사이의 여백
  centeredSlides : true, // 1번 슬라이드 가운데
  loop: true,
  autoplay: {
    delay : 5000
  },
  pagination: {
    el: 'div.promotion div.swiper div.swiper-pagination',
    clickable : true,
  },
  navigation: {
    nextEl: 'div.promotion div.swiper div.swiper-button-next',
    prevEl: 'div.promotion div.swiper div.swiper-button-prev',
  }
});

const swiper3 = new Swiper('section.awards div.swiper', {
  slidesPerView: 5, 
  spaceBetween: 30, 
  loop: true,
  autoplay: true, 
  navigation: {
    nextEl: 'section.awards div.swiper div.swiper-button-next',
    prevEl: 'section.awards div.swiper div.swiper-button-prev',
  }
});


// 토글버튼 클릭 시 promotion 닫힘 & 열림
const promoEl = document.querySelector('div.promotion');
const promoToggleBtn = document.querySelector('div.toggle-promotion');
// console.log(promoEl, promoToggleBtn)

let isHidePromotion = false;
promoToggleBtn.addEventListener('click',function(){
  isHidePromotion = !isHidePromotion;
  if(isHidePromotion) {
    // promoEl.style.display = 'none';
    promoEl.classList.add('hide');
  }
  else {
    // promoEl.style.display = 'block';
    promoEl.classList.remove('hide');
  }
});

// 범위 내의 숫자를 랜덤 함수(최대 2자리 까지)

/** random 함수 인자 최소값, 최대값 */
function random(min,max) {
  // .toFixed()를 통해 반환된 문자 데이터를
  // .parseFloat()를 통해 소수점을 가지는 숫자 데이터로 반환
  return parseFloat((Math.random()*(max - min) + min).toFixed(2))
}


// 유튜브 위 이미지 추가 애니메이션 효과
// gsap 애니메이션 요소, 지연, y축 움직이는 범위
function floatingObject(selector, delay, size){
  //gsap.to('요소', 지속시간 초, 옵션)
  gsap.to(selector, random(1.5, 2.5), {
    y:size,  
    //무한 반복, 자바스크립트에서 지원하는 동작
    repeat : -1,
    // 한 번 재생된 애니메이션을 다시 실행
    yoyo: true,
    ease: Power1.easeinOut,
    delay:1
  });
}
floatingObject('img.floating1',1, 15);
floatingObject('img.floating2',0.5, 15);
floatingObject('img.floating3',1.5, 20);


// SCROLLMAGIC CDN 연결
const spyEls = document.querySelectorAll('section.scroll-spy')
console.log(spyEls);
spyEls.forEach(function(spyEl){

  // Scene() 메소드를 통해 여러 객체들을 변화에 대한 감시 옵션
  // addTo() 라이브러리를 사용하기 위한 옵션들
  new ScrollMagic
  .Scene({
    // 보여질 여부를 검사할 요소를 지정
    triggerElement : spyEl,
    // 화면 높이를 0~1 이라고 보고, 0.8 위치에 적용
    // 기능이 걸려 있는 부분(실행 위치)
    triggerHook : .8
  })  
  .setClassToggle(spyEl, 'show') // show 클래스를 추가/삭제
  .addTo(new ScrollMagic.Controller()); 
});


// footer year
const thisYear = document.querySelector('span.this-year');
thisYear.textContent = new Date().getFullYear();

// to-top 버튼을 클릭하면 문서의 상단으로 이동
// gsap에서 모든 기능을 구현한다면? 로딩시간이 무거운 사이트가 됨
// 이를 보완하기 위해 별도 기능별로 구분되어 있다.

// 1. gsap scrollToTopPlugin CDN사용
// 2. window 이벤트에 적용
