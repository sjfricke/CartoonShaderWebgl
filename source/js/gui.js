/**
 * Created by SpencerFricke on 6/25/2016.
 */
var gui, params, lightColorFolder, backgroundColorFolder, params_BackgroundColor, params_LightColor;

function guiInit() {
    gui = new dat.GUI(); //gets Control Panel Object
    //GUI parameters
    params = {
        Processed: true,
        Filter: 0,
        PikachuLoad: true
    }
    params_BackgroundColor = {
        toggle: true,
        color : "#888888"
    }
    params_LightColor = {
        toggle: true,
        color : "#FFFFFF"
    }
    //Adds parameters to gui
    gui.add(params, 'Processed');
    gui.add(params, 'Filter', {
        "None": 0,
        "Diffuse": 1,
        "Depth 1": 2,
        "Depth 2": 3,
        "Depth 3": 4,
        "Sobel": 5,
        "Edge Normals": 6
    });

    PickachuToggle = gui.add(params, 'PikachuLoad');

    
    lightColorFolder = gui.addFolder("Light Color");
        lightColorFolder.add(params_LightColor, 'toggle');
        lightColorFolder.addColor(params_LightColor, 'color');
        lightColorFolder.open();

    backgroundColorFolder = gui.addFolder("Background Color");
        backgroundColorFolder.add(params_BackgroundColor, 'toggle');
        backgroundColorFolder.addColor(params_BackgroundColor, 'color');
        backgroundColorFolder.open();

}

function guiReset() {

}