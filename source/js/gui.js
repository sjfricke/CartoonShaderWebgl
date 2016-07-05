/**
 * Created by SpencerFricke on 6/25/2016.
 */
var gui, params, lightColorFolder, backgroundColorFolder, params_BackgroundColor, params_LightColor;

function guiInit() {
    gui = new dat.GUI(); //gets Control Panel Object
    //GUI parameters
    params = {
        Processed: true,
        Filter: 0
    }
    params_models = {
        Pikachu: true,
        Church: false,
        Model: 0
    }
    params_BackgroundColor = {
        toggle: true,
        color : "#888888"
    }
    params_LightColor = {
        toggle: true,
        color : "#FFFFFF"
    }
    
    processingFolder = gui.addFolder("Processing");
    processingFolder.add(params, 'Processed');
    processingFolder.add(params, 'Filter', {
        "None": 0,
        "Diffuse": 1,
        "Depth 1": 2,
        "Depth 2": 3,
        "Depth 3": 4,
        "Sobel": 5,
        "Edge Normals": 6,
        "Sobel + Blur": 7
    });

    modelsFolder = gui.addFolder("Models");
    activeModel = modelsFolder.add(params_models, 'Model', {
        "Pikachu": 0,
        "Church": 1
    })
    activeModel.onChange(function (e) {
        if (e == 0) {
            Engine.removeModel(churchOBJ.id);
            Engine.addModel(PikachuOBJ.id, PikachuOBJ.folderPath, PikachuOBJ.objPath, PikachuOBJ.mtlPath);
        }
        else {
            Engine.removeModel(PikachuOBJ.id);
            Engine.addModel(churchOBJ.id, churchOBJ.folderPath, churchOBJ.objPath, churchOBJ.mtlPath);
        }
    });
    
    lightColorFolder = gui.addFolder("Light Color");
        lightColorFolder.add(params_LightColor, 'toggle');
        lightColorFolder.addColor(params_LightColor, 'color');

    backgroundColorFolder = gui.addFolder("Background Color");
        backgroundColorFolder.add(params_BackgroundColor, 'toggle');
        backgroundColorFolder.addColor(params_BackgroundColor, 'color');

}

function guiReset() {

}