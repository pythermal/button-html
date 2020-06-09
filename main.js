var maxClicksAmount = [10, 15];

var clicks = 0;
var maxClicks = maxClicksAmount[0];

var showBar = false;
var buttonOn = false;

var unlocked = {
     circle: false,
     movingCircle: false
};

$("#button").on("mousedown", () => {
     $("#button").css({
          "box-shadow": "0px 5px 0px orange",
          "top": "calc(50vh - 205px)"
     });

     document.getElementById("click-sfx").currentTime = 0;
     document.getElementById("click-sfx").play();

     if (!showBar) {
          showBar = true;

          $("#progress").css("animation-play-state", "running");

          document.getElementById("unlock-sfx").volume = 0.3;
          document.getElementById("unlock-sfx").play();
     }

     clicks++;
     buttonOn = true;
});

$("#button").on("mouseup", () => {
     $("#button").css({
          "box-shadow": "0px 20px 0px orange",
          "top": "calc(50vh - 220px)"
     });

     buttonOn = false;
});

setInterval(() => {
     if (clicks >= maxClicks && !unlocked.circle) {
          clicks = 0;
          maxClicks = maxClicksAmount[1];

          $("#progress").css("width", "100%");
          $("#progress").css("left", "0px");
          $("#progress").css("bottom", "0px");
          $("#progress").css("height", "24px");

          $("#footer").css("bottom", "-20px");
          $("#footer").css("animation-play-state", "running");

          $("#progress").css("animation", "bar-anim 1s ease");

          $("#spinning-circle").css("animation-play-state", "running");

          document.getElementById("unlock-sfx").currentTime = 0;
          document.getElementById("unlock-sfx").play();

          unlocked.circle = true;
     } else if (clicks >= maxClicks && !unlocked.movingCircle) {
          $("#spinning-circle-container").css("animation-play-state", "running");

          document.getElementById("unlock-sfx").currentTime = 0;
          document.getElementById("unlock-sfx").play();

          unlocked.movingCircle = true;
     }

     if (buttonOn) {
          $("#spinning-circle").css("background-color", "#EDC500");
     } else {
          $("#spinning-circle").css("background-color", "#555");
     }

     $("#progress-number").html(clicks);
     $("#progress-fill").width((clicks / maxClicks) * $("#progress").width());
     $("#progress-max").html(maxClicks);
}, 20);
