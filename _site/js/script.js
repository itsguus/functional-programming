
let requestURL = '/data.json'; //API link 
let request = new XMLHttpRequest(); //API request
request.open('GET', requestURL); //Get
request.responseType = 'json'; //= JSON
request.send(); //Go

request.onload = function () {
    const data = request.response;
    startTheShow(data);
    showAllQuestions(data);
};



let requestURLColors = 'https://api.color.pizza/v1/'; //API link 
let requestColors = new XMLHttpRequest(); //API request
requestColors.open('GET', requestURLColors); //Get
requestColors.responseType = 'json'; //= JSON
requestColors.send(); //Go

var colorData = [];
requestColors.onload = function () {
    colorData = requestColors.response;
};


setTimeout(function(){console.log(colorData);},1000);


function showAllQuestions(objArray) {
    // shows all the question names in the HTML so i don't have to console.log the JSON file and look there.
    let allObjects = (Object.getOwnPropertyNames(objArray[0]));
    var i;
    for (i = 0; i < allObjects.length; i++) {
        var p = document.createElement("p");
        p.innerHTML = allObjects[i];
        document.body.appendChild(p);
    }
}

function startTheShow(objArray) {
    cleanColors(objArray);
}


let validColors = [];
let invalidColors = [];
let RGBColors = [];
let namedColors = [];


function cleanColors(objArray) {
    // Map the colors from the JSON file into an array with just the colors and strip them of whitespaces, dots & #'s..
    let formattedColorData = objArray.map(dataEntry => formatData(dataEntry["oogKleur"]));
    validColors = formattedColorData.filter(isColorValidHex);
    invalidColors = formattedColorData.filter(color => !isColorValidHex(color));
    transformInvalidColorsToHex(invalidColors);
}

function transformInvalidColorsToHex(colors) {
    //RGB Colors
    RGBColors = colors.filter(isColorRGB);
    invalidColors = invalidColors.filter(color => !isColorNamed(color));

    let TransformedRGBColors = RGBColors.map(RGBCode => transformRGBIntoHex(RGBCode));
    validColors = validColors.concat(TransformedRGBColors);

    //Named Colors
    namedColors = colors.filter(isColorNamed);
    invalidColors = invalidColors.filter(color => !isColorRGB(color));

    let translatedNames = namedColors.map(colorName => translateColor(colorName)),
        transformedNamedColors = translatedNames.map(translatedColorName => transformNamedColorIntoHex(translatedColorName));


    // console.log(translatedNames);
}

function transformNamedColorIntoHex(colorName) {

}

function translateColor(colorName) {
    //Faking a translations API as I do not have any money
    //translation.js is loaded into the HTMl. In translations.js a var is decalred with objects stating 
    //the dutch and english names of colors.

    //Doing this by the way because I couldnt find a dutch API for translating color names into HEX.
    return translation = translations.find(color => color.colorDutch == colorName).colorEnglish;
}

function findBlue(color) {
    return color.colorDutch = 'blauw';
}


function transformRGBIntoHex(RGB) {
    RGB = RGB
        .replace("rgb", "")
        .replace("(", "")
        .replace(")", "");
    var r = RGB.split(",")[0],
        g = RGB.split(",")[1],
        b = RGB.split(",")[2];
    r = parseInt(r).toString(16);
    g = parseInt(g).toString(16);
    b = parseInt(b).toString(16);

    return (r + g + b);
}

function formatData(entry) {
    return entry
        .toLowerCase() // for easier life, will transform to uppercase after cleaning everything
        .replace(/ /g, "") // get rid of spaces
        .replace(".", ",") // . to ,
        .replace("#", ""); // no pounds
}

function isColorNamed(colorCode) {
    // DOwnside hier is dat nog niet gecheckt wordt of het tussen 0-255 zit. 
    // Moet eigenlijk bij isColorRGB doen, want als het dan false is dan staat de input nog bij invaledColors
    var nameChecker = /[0-9]/g, // Actually only checks for numbers going on the assumption named colors do not have numbers i.e. "blue5"
        result;
    if (!nameChecker.test(colorCode)) result = true;
    else result = false;
    return result;
}

function isColorRGB(colorCode) {
    var RGBChecker = /[0-9]/g, // Actually only checks for numbers going on the assumption named colors do not have numbers i.e. "blue5"
        result;
    if (RGBChecker.test(colorCode)) result = true;
    else result = false;
    return result;
}

function isColorValidHex(colorCode) {
    // hexcode checker from https://www.sitepoint.com/community/t/how-to-check-if-string-is-hexadecimal/162739
    const hexcodeTest = /[0-9A-Fa-f]{6}/g;
    if (hexcodeTest.test(colorCode)) {
        result = true;
    }
    else result = false;
    return result;
}

