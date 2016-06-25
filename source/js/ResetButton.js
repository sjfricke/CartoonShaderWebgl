/**
 * Created by SpencerFricke on 6/25/2016.
 */


function ResetButton() {
    this.button = document.createElement("div");
    this.button.innerText = "Reset";
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
        + "top: 7.5em;"
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

    }
}
