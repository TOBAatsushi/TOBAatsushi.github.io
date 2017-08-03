
  // 「じゃんけん」
  var SHOUT = document.getElementById('jsi-soundShout');
  // 「しょ！」
  var PON = document.getElementById('jsi-soundPon');
  // 「フィーバー！」
  var WIN = document.getElementById('jsi-soundWin');
  // 「ズコー」
  var LOSE = document.getElementById('jsi-soundLose');
  // 「あいこで」
  var DRAW = document.getElementById('jsi-soundDraw');
  // 「しょ！」
  var SHO = document.getElementById('jsi-soundSho');

  var cntPON = 0,
      cntWIN = 0,
      cntLOSE = 0,
      cntDRAW = 0,
      cntSHO = 1;


$(function() {

  // LeapMotion Class
  var controller = new Leap.Controller({enableGestures: true});
  // 手ドット
  var $handDots = $('.dots');
  // サークルポイント
  var $circle = $('.circle img');
  // スタートボタン
  var $startBtn = $('.btn_g');

  $('#cb2').on('change',function() {

    if ($("#cb2").prop('checked'))  {
      $handDots
        .addClass('powerOn')
        .removeClass('guh choki pah');
      $circle.attr('src','images/circle-anime.gif');

      $startBtn
        .addClass('clickable')
        .removeClass('an_clickable');

      // スタートボタンを押したらじゃんけん開始
      $startBtn.on('click', function() {
        cntPON = 0;
        cntWIN = 0;
        cntLOSE = 0,
        cntDRAW = 0;

        $handDots
          .addClass('vs')
          .removeClass('powerOn guh choki pah');
        eee();
        $('.frame').removeClass('win lose draw');
      });


      return false;


      // スタート後のじゃんけんの処理
      function eee() {

        var images = ['guh','choki','pah'];
        var randImg = images[Math.floor(Math.random() * images.length)];

        // 掛け声1回
        SHOUT.play();
        $circle.attr('src','images/circle.gif');


        controller.on('frame', function aaa(frame) {

          var hands = frame.hands.length;
          var fingers = frame.fingers.length;


          // ユーザーの最初のイベント（手を認識）
          if(hands == 1) {

            // ポン1回再生
            ponPlay();

            $handDots
              .removeClass('vs guh choki pah')
              .addClass(randImg);

              setTimeout(function(){

                // もしもユーザーがパーだったら
              if(fingers >= 4) {

                if($handDots.hasClass('pah')) {
                  $(this).removeClass('guh choki');
                  draw();
                  DRAWPlay();
                } else if ($handDots.hasClass('choki')) {
                  $(this).removeClass('guh pah');
                  lose();
                  LOSEPlay();
                } else {
                  $(this).removeClass('choki pah');
                  WINPlay();
                  win();
                }

                // もしもユーザーがチョキだったら
              } else if (fingers >= 2) {

                if($handDots.hasClass('choki')) {
                  $(this).removeClass('guh pah');
                  draw();
                  DRAWPlay();
                } else if ($handDots.hasClass('guh')) {
                  $(this).removeClass('choki pah');
                  LOSEPlay();
                  lose();
                } else {
                  $(this).removeClass('choki guh');
                  WINPlay();
                  win();
                }

                // もしもユーザーがグーだったらだったら
              } else {

                if($handDots.hasClass('guh')) {
                  $(this).removeClass('choki pah');
                  draw();
                  DRAWPlay();
                } else if ($handDots.hasClass('pah')) {
                  $(this).removeClass('choki guh');
                  LOSEPlay();
                  lose();
                } else {
                  $(this).removeClass('guh pah');
                  WINPlay();
                  win();
                }

              }

            },300);





          }



          // ポン！1回再生関数
          function ponPlay(){
            if(cntPON == 0){
              PON.play();
            }
            cntPON = 1;
          }

          // フィーバー！1回再生関数
          function WINPlay(){
            if(cntWIN == 0){
              WIN.play();
              LOSE.pause();
              DRAW.pause();

              setTimeout(function(){
              $circle.attr('src','images/circle-anime.gif');
              },600);

              setTimeout(function(){
              $circle.attr('src','images/circle.gif');
              $('.frame').addClass('win');
              },4300);
            }
            cntWIN = 1;
          }
          // ズコー！1回再生関数
          function LOSEPlay(){
            if(cntLOSE == 0){
              LOSE.play();
              WIN.pause();
              DRAW.pause();
              setTimeout(function(){
                $('.frame').addClass('lose');
              },200);
            }
            cntLOSE = 1;
          }
          // あいこで！1回再生関数
          function DRAWPlay(){
            if(cntDRAW == 0){
              DRAW.play();
              WIN.pause();
              LOSE.pause();
              setTimeout(function(){
                $('.frame').addClass('draw');
              },200);
              setTimeout(function(){
                SHO.play();
              },1200);
            }
            cntDRAW = 1;
          }

          function SHOPlay(){
            if(cntSHO == 0){
              SHO.play();
              WIN.pause();
              LOSE.pause();
              DRAW.pause();
            }
            cntSHO = 1;
          }





        });
        controller.connect();  // 接続
      }











      //
      // power off時
      //
    } else {
      $handDots.removeClass('guh choki pah powerOn');
      $circle.removeClass('guh choki pah powerOn');
      $circle.attr('src','images/circle.gif');

      $startBtn
        .addClass('an_clickable')
        .removeClass('clickable');

    }

    function win() {
      cntLOSE = 1;
      cntDRAW = 1;
      console.log('勝ち！');
    };
    function lose() {
      cntWIN = 1;
      cntDRAW = 1;
      console.log('負け！');
     };
    function draw() {
      cntWIN = 1;
      cntLOSE = 1;
      console.log('引き分け');
      cntSHO = 0;
     };
  });








  $('.jsc-shout').on('click', function() {
    SHOUT.play();
  });
  $('.jsc-pon').on('click', function() {
    PON.play();
  });
  $('.jsc-win').on('click', function() {
    WIN.play();
  });
  $('.jsc-lose').on('click', function() {
    LOSE.play();
  });
  $('.jsc-draw').on('click', function() {
    DRAW.play();
  });
  $('.jsc-sho').on('click', function() {
    SHO.play();
  });
})
