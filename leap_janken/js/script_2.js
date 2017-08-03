$(document).ready(function(){
  $('body').css('background','rgb(215, 215, 215)');
  $("#screen").html('<h1>Leap じゃんけん</h1><div id="screen"></div><table><tr><td><span class="chara">🙇</span></td><td rowspan="2" class="while"></td><td><span class="chara">💻</span></td></tr><tr><td class="resultP result"></td><td class="resultM result"></td></tr></table>')
  
  Leap.loop({enableGestures: true}, function(frame){
  var images = ['pahImg','chokiImg','guhImg'];
  var randImg = images[Math.floor(Math.random() * images.length)];
  var hands = frame.hands.length;
  
  function addM() {
    $('.resultM').removeClass('pahImg chokiImg guhImg');
    $('.resultM').addClass(randImg);

    return false;
  };

  if(hands == 1) {
    $('.while').html("<p>ポン</p>");
    var fingers = frame.hands[0].pointables.length;

    function win() { $('.while').html('<p style="color: rgb(207, 46, 51);">あなたの勝ち</p>'); };
    function lose() { $('.while').html('<p style="color: rgb(21, 127, 164);">あなたの負け</p>'); };
    function draw() { $('.while').html('<p style="color: rgb(244, 174, 83)">あいこで</p>'); };

    if(fingers >= 4) {
      $('.resultP')
      .addClass('pahImg')
      .removeClass("chokiImg")
      .removeClass("guhImg");
      if($('.resultM').hasClass('pahImg')) {
        draw();
      } else if ($('.resultM').hasClass('chokiImg')) {
        lose();
      } else {
        win();
      }

    } else if(fingers >= 2) {
      $('.resultP')
      .addClass('chokiImg')
      .removeClass("pahImg")
      .removeClass("guhImg");
      if($('.resultM').hasClass('pahImg')) {
        win();
      } else if ($('.resultM').hasClass('chokiImg')) {
        draw();
      } else {
        lose();
      }

    } else {
      $('.resultP')
      .addClass('guhImg')
      .removeClass("pahImg")
      .removeClass("chokiImg");
      if($('.resultM').hasClass('pahImg')) {
        lose();
      } else if ($('.resultM').hasClass('chokiImg')) {
        win();
      } else {
        draw();
      }
    }
  } else {
    $('.while').html('<p style="color: rgb(93, 93, 93);">じゃんけん</p>');
    addM();
  }
  controller.connect(); 
});
});
