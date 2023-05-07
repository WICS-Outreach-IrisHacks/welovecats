let energy_level = undefined;
let grooming = undefined;
let social_needs = undefined;
let indoor = undefined;
let intelligence = undefined;
const BREEDS_BASE_URL = "https://api.thecatapi.com/v1/breeds";
const IMAGES_BASE_URL =  "https://api.thecatapi.com/v1/images/search"; //?limit=10&breed_ids=beng&api_key=REPLACE_ME"
let APIkey = "live_kMGI0wSz4LUHdvlhadXKk8fMnPx7N8t66jSLdQjJw0OWfD84322ydppCTMY9leZf";
let description = undefined;
let temperament = undefined;
let catName = undefined;
let imageURL = undefined;

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
    event.target.className = "selected";
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
        return true;
        
    }
    else {
        alert("Please answer all the questions");
        return false;
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

    var params = {
        "limit": 1,
        "breed_ids": breed,
    }

    const images = fetch(IMAGES_BASE_URL + "/" + breed, {method: 'GET', headers: headers, params:params}).then(response => {
        console.log(IMAGES_BASE_URL + "/" + breed);
        if(response.ok) {
            console.log(response);
            return response.json();
        }
    });

    const processData = async () => {
        const myDelayedData = await images;
        console.log(myDelayedData);
        imageURL = myDelayedData[0]['url'];
        };

    processData();
}

function makeBreedRequest(breed) {
    var headers =  {
        "Content-Type": "application/json",
    };

    const breedInfo = fetch(BREEDS_BASE_URL + "/" + breed, {method: 'GET', headers: headers}).then(response => {
        console.log(BREEDS_BASE_URL + "/" + breed);
        if(response.ok) {
            console.log(response);
            return response.json();
        }
    });

    const processData = async () => {
        const myDelayedData = await breedInfo;
        console.log(myDelayedData);
        description = myDelayedData['description'];
        temperament = myDelayedData['temperament'];
        catName = myDelayedData['name'];
        console.log(catName);
        loadCatInfo();
        };

    processData();
}

function getCat() {
    console.log("getCat");
    let set = setCatPoints();
    if (set === true) {
        //loadAPIKey();
        // determine which cat is highest in catPoints -> API call
        let finalCat = maxCat();
        makeBreedRequest(finalCat);
        //makeImageRequest(finalCat);
        console.log("after requests in getCat");
    }
    document.body.innerHTML  = `
    <h1>YOUR IDEAL CAT TYPE IS<br />drumroll please...</h1>
    <h1 id="cat-result">...</h1>
    <p id="cat-desc">...</p>
    <p id="cat-temp">...</p>
    <img id="main-image" src="" alt="a cute cat"/>
    `;
}

function loadCatInfo() {
    console.log(catName);
    document.getElementById('cat-result').innerHTML = catName;
    document.getElementById('cat-desc').innerHTML = description;
    document.getElementById('cat-temp').innerHTML = temperament;
}

// function loadAPI() {
//     //This chains two promises together. First, client_secret.json will be read and parsed. Once it completes, tokens.json will be read and parsed.
//     //Promise.all() could be used to conduct these two file reads asynchronously, which is more efficient.
//     fs.readFile('APIKey.json', (err, data) => {
//         if(err){
//             console.log(err + "\n\nHave you created your APIKey.json file yet?")
//         }else{
//             data = JSON.parse(data);
//             APIkey = data.api_key;
//         }
//     })
// } 

// function loadAPIKey() {
//     var fr=new FileReader();
//     fr.onload=function(){
//         "APIKey.json".textContent=fr.result;
//     }
        
//     console.log(fr.readAsText(this.files));
// }
