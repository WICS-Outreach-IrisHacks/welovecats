let energy_level = undefined;
let grooming = undefined;
let social_needs = undefined;
let indoor = undefined;
let intelligence = undefined;
let APIkey = undefined;
const BREEDS_BASE_URL = "https://api.thecatapi.com/v1/breeds";
const IMAGES_BASE_URL =  "https://api.thecatapi.com/v1/images/search" //?limit=10&breed_ids=beng&api_key=REPLACE_ME"
var fs = require('fs');

let catPoints = 
{ 
    cspa: 0,
    bsho: 0,
    aege: 0,
    bamb: 0,
    chee: 0,
    lihu: 0
};

let catInfo = { // if indoor == 0, it's an outdoor cat
    cspa: [5, 1, 3, 0, 0],
    bsho: [2, 2, 3, 0, 3],
    aege: [3, 3, 4, 0, 3],
    bamb: [5, 1, 3, 0, 5],
    chee: [4, 1, 3, 0, 5],
    lihu: [3, 1, 4, 1, 3]
}

function changeEnergy(value, event) {
    console.log(event);
    //document.getElementsByClassName('questinoons).fhilcegernb, clear all classes if want to have de-select
    event.target.className = "selected";
    energy_level = value;
}

function changeGrooming(value, event) {
    console.log(event);
    //document.getElementsByClassName('questinoons).fhilcegernb, clear all classes if want to have de-select
    event.target.className = "selected";
    grooming = value;
}

function changeSocialNeeds(value, event) {
    console.log(event);
    //document.getElementsByClassName('questinoons).fhilcegernb, clear all classes if want to have de-select
    event.target.className = "selected";
    social_needs = value;
}

function changeIndoor(value, event) {
    console.log(event);
    //document.getElementsByClassName('questinoons).fhilcegernb, clear all classes if want to have de-select
    event.target.className = "selected";
    indoor = value;
}

function changeIntelligence(value, event) {
    intelligence = value;
}

function allChecked() { // returns true if all are checked
    return energy_level !== undefined && grooming !== undefined && social_needs !== undefined && indoor !== undefined && intelligence !== undefined;
}

function addPoints(value, key, index) {
    if (value === catInfo[key][index]) { catPoints[key] += 2; }
    else if (value+1 === catInfo[key][index] || value-1 === catInfo[key][index]) { catPoints[key] += 1; }
}

function setCatPoints() {
    if (allChecked()) {
        console.log("I have all answers");
        // increase counts and choosing a cat (tie breaking if necessary)
        let clickedValues = [energy_level, grooming, social_needs, indoor, intelligence];
        Object.keys(catInfo).forEach((key) => {
            for (let i = 0; i < 5; i++) {
                addPoints(clickedValues[i], key, i);
            }
        });
        console.log(catPoints);
        
    }
    else {
        alert("Please answer all the questions");
    }
}

function maxCat() {
    let bestCat = undefined;
    let maxPoints = 0;
    Object.keys(catPoints).forEach((key) => {
        if (catPoints[key] >= maxPoints) {
            bestCat = key;
            maxPoints = catPoints[key];
        }
    });
    return bestCat;
}

function makeImageRequest(breed) {
    var headers =  {
        "Content-Type": "application/json",
        "x-api-key": APIkey,
    };
}

function makeBreedRequest(breed) {
    var headers =  {
        "Content-Type": "application/json",
    };

    fetch(BREEDS_BASE_URL + "/" + breed, {method: 'GET', headers: headers}).then(response => {
        console.log(url);
        if(response.ok) {
            return response.json();
        }
    });
}

function getCat() {
    setCatPoints();
    loadAPI();
    // determine which cat is highest in catPoints -> API call
    let finalCat = maxCat();
    breedReturn = makeBreedRequest(finalCat);
    console.log(breedReturn);
    //imagesReturn = makeImageRequest(finalCat);
}

function loadAPI() {
    //This chains two promises together. First, client_secret.json will be read and parsed. Once it completes, tokens.json will be read and parsed.
    //Promise.all() could be used to conduct these two file reads asynchronously, which is more efficient.
    fs.readFile('APIKey.json', (err, data) => {
        if(err){
            console.log(err + "\n\nHave you created your tokens and client_secret files yet?")
        }else{
            data = JSON.parse(data);
            APIkey = data.api_key;
        }
    })
} 
