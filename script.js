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

function determineCat() {
    if (allChecked()) {
        // increase counts and choosing a cat (tie breaking if necessary)
        console.log("I have all answers");

    }
    else {
        alert("Please answer all the questions");
    }
}
