/**
 * Created by arthu on 6/6/2016.
 */

function FPSButton() {
    this.now;
    this.then = Date.now() / 1000;
    this.numFramesToAverage = 16;
    this.frameTimeHistory = [];
    this.frameTimeIndex = 0;
    this.totalTimeForFrames = 0;
    this.fpsBox = document.createElement("div");
    this.fps = 0;
    this.fpsBox.innerText = "fps: " + this.fps;
    this.fpsBox.style =
        "background-color: #ED2553;"
        + "width: 5em;"
        + "border-radius: 10px;"
        + "font-size: 12px;"
        + "display: inline-block;"
        + "padding: 5px;"
        + "text-align: center;"
        + "font-family: Arial Black;"
        + "color: white;"
        + "position: absolute;"
        + "left: 1em;"
        + "top: 1em;"
        + "-webkit-touch-callout: none;"
        + "-webkit-user-select: none;"
        + "-khtml-user-select: none;"
        + "-moz-user-select: none;"
        + "-ms-user-select: none;"
        + "-o-user-select: none;"
        + "user-select: none;"
        + "cursor: default;";
    document.body.appendChild(this.fpsBox);
}

FPSButton.prototype.refreshFPS = function () {
    this.now = Date.now() / 1000;  // get time in seconds

    // compute time since last frame
    var elapsedTime = this.now - this.then;
    this.then = this.now;

    // update the frame history.
    // Add the new time and substract the oldest time from the total
    this.totalTimeForFrames += elapsedTime - (this.frameTimeHistory[this.frameTimeIndex] || 0);
    // record the new time
    this.frameTimeHistory[this.frameTimeIndex] = elapsedTime;
    // advance the history index.
    this.frameTimeIndex = (this.frameTimeIndex + 1) % this.numFramesToAverage;

    // compute fps
    var averageElapsedTime = this.totalTimeForFrames / this.numFramesToAverage;
    this.fps = 1 / averageElapsedTime;
    this.fpsBox.innerText = "fps: " + this.fps.toFixed(2);
}