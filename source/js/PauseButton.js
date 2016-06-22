/**
 * Created by arthu on 6/6/2016.
 */

function PauseButton() {
    this.button = document.createElement("div");
    this.button.innerText = "pause";
    this.button.pause = false;
    this.button.style =
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
        + "top: 5em;"
        + "-webkit-touch-callout: none;"
        + "-webkit-user-select: none;"
        + "-khtml-user-select: none;"
        + "-moz-user-select: none;"
        + "-ms-user-select: none;"
        + "-o-user-select: none;"
        + "user-select: none;"
        + "cursor: pointer;";
    document.body.appendChild(this.button);

    this.button.onclick = function () {
        this.pause = !this.pause;
        if (this.pause) {
            this.innerText = "continue";
        }
        else {
            this.innerText = "pause";
        }
    }
}

PauseButton.prototype.isPaused = function () {
    return this.button.pause;
}