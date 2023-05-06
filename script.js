let energy_level = undefined;
let grooming = undefined;
let social_needs = undefined;
let indoor = undefined;
let intelligence = undefined;
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

function changeEnergy(value) {
    energy_level = value;
}

function changeGrooming(value) {
    grooming = value;
}

function changeSocialNeeds(value) {
    social_needs = value;
}

function changeIndoor(value) {
    indoor = value;
}

function changeIntelligence(value) {
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

function getCat() {
    setCatPoints();
    // determine which cat is highest in catPoints -> API call
}
