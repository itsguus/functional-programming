
let requestURL = '/data.json'; //API link 
let request = new XMLHttpRequest(); //API request
request.open('GET', requestURL); //Get
request.responseType = 'json'; //= JSON
request.send(); //Go

request.onload = function () {
    const data = request.response;
    startTheShow(data);
    // showAllQuestions(data);
};




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
    // Calls every function in a loop here for performance, instead of looping in each function individually.

    // console.log(objArray);
    var i;
    for (i = 0; i < objArray.length; i++) {
        cleanColors(objArray[i]);
    }
    // Except this one as I wanted to make one large array with all the single items individually, which I stated before the loop. 
    cleanHobbys(objArray);
}

function cleanColors(obj) {
    var kleur = obj.lievelingskleur;
    if (kleur == "Legergroen") kleur = "#00DD55";
    else if (kleur == "0" || kleur == "/" || kleur == "" || kleur == "#000" || kleur == "Zwart" | kleur == "#00800") kleur = "#000000";
    else if (kleur == "grijs" || kleur == "Staal.") kleur = "#cccccc";
    else if (kleur == "rood") kleur = "#FF0000";
    else if (kleur == "8000") kleur = "#800000";
    else if (kleur == "66. 81, 245") kleur = "4251f5";
    else if (kleur == "GEEL") kleur = "#FFFF00";

    if (kleur.slice(0, 1) !== "#") kleur = ("#" + kleur);
    kleur = kleur.slice(0, 7);
    kleur = kleur.toUpperCase();
    if (kleur.length != 7) kleur += ("  FLAG");

    obj.lievelingskleur = kleur;
}

function cleanHobbys(objArray) {
    var i,
    bigArray = new Array();
    for (i = 0; i < objArray.length; i++) {
        var hobbies = objArray[i].hobbies;
        hobbies = hobbies.toLowerCase();
        hobbies = hobbies.replace(".", ',');
        hobbies = hobbies.replace(", ", ',');
        hobbies = hobbies.replace(/, /g, ',');

        if (hobbies.length === 0) hobbies = "none";

        //kan ook met str.strip maar er stonden bij sommige inputs comma's aan het eind.
        while (hobbies[hobbies.length - 1] == " " || hobbies[hobbies.length - 1] == ",") {
            hobbies = hobbies.substr(0, hobbies.length - 1);
        }
        objArray[i].hobbies = hobbies;

        // From here on out we turn it into one big array to be able to work with if that's what we'd like.
        var singleArray = hobbies.split(",");
        var j;
        for( j=0; j < singleArray.length; j++ ) {
            bigArray.push(singleArray[j]);
        }
    }  
    // console.log(bigArray);
    // for (i = 0; i < bigArray.length; i++) {
    //     var txt = document.createElement("span");
    //     txt.innerHTML = bigArray[i];
    //     txt.className = bigArray[i];
    //     document.body.querySelector("div.list").appendChild(txt);
    // }
}
