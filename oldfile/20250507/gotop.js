$(function () {
  $("body").append(
    "<img id='goTopButton' style='display:none;z-index:5;cursor:pointer;' title='回到頂端'/>"
  );

  var img = "gotop01.png",
    location = 0.8,
    right = 40,
    opacity = 0.8,
    $button = $("#goTopButton"),
    $body = $(document),
    $win = $(window);

  $button.attr("src", img);

  window.goTopMove = function () {
    var scrollH = $body.scrollTop(),
      winH = $win.height(),
      css = {
        top: winH * location + "px",
        position: "fixed",
        right: right,
        opacity: opacity,
      };

    if (scrollH > 20) {
      $button.css(css).show();
    } else {
      $button.hide();
    }
  };

  $win.on({
    scroll: goTopMove,
    resize: goTopMove,
  });

  $button.on("click", function () {
    $("html, body").scrollTop(0); // 無動畫直接回頂端
  });
});
