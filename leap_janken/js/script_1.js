$(document).ready(function(){
  $('body').css('background','rgb(215, 215, 215)');

  $(function() {
    var centerX = 0;
    var centerY = 0;
    
    sizing();
    draw(centerX, centerY);
    
    //LeapMotion 処理
    Leap.loop({enableGestures: true}, function(frame){
      
      console.log(frame.fingers);
  
     // 指数
      $('#fingers span').html('<span>' + frame.fingers.length + '</span>');
  
      // 軌跡
      if (frame.fingers[0]) {
        var x = frame.fingers[0].tipPosition[0];
        var y = frame.fingers[0].tipPosition[1];
        var z = frame.fingers[0].tipPosition[2];
        draw(x + centerX, $("canvas").height() - y, z);
      }
  
      // 状態
      if(frame.valid && frame.gestures.length > 0) {
        frame.gestures.forEach(function(gesture){
          switch (gesture.state){
            case "start":
            $('#state').html('<p>start</p>');
            break;
            case "update":
            $('#state').html('<p>update</p>');
            break;
            case "stop":
            $('#state').html('<p>stop</p>');
            break;
            }
          });
        }
  
  
    // ジェスター
      if(frame.valid && frame.gestures.length > 0){
        frame.gestures.forEach(function(gesture){
          switch (gesture.type){
            case "circle":
              $('#gesture').html('<p>circle</p>');
              break;
            case "keyTap":
              $('#gesture').html('<p>keyTap</p>');
              break;
            case "screenTap":
              $('#gesture').html('<p>screenTap</p>');
              break;
            case "swipe":
              $('#gesture').html('<p>swipe</p>');
              break;
            }
        });
      }
    });
  
    //キャンバス描写
    $(window).resize(function() {
      sizing();
      draw(centerX, centerY);
      });
      
    function sizing() {
      $("canvas").attr({height:$("#content").height()});
      $("canvas").attr({width:$("#content").width()});
      centerX = $("canvas").width() / 2;
      centerY = $("canvas").height() / 2;
    }
    function draw(x, y, radius) {
      if (typeof radius === 'undefined') {
        radius = 10;
      } else {
        radius = radius < 10 ? 10 : radius;
      }
      var canvas = $('canvas')[0];
      var context = canvas.getContext('2d');
      
      context.clearRect(0, 0, $("canvas").width(), $("canvas").height());
      context.beginPath();
      context.arc(x, y, radius, 0, Math.PI * 2, false);
      context.stroke();
    }
  });
});
