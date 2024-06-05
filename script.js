/*
auth: AJ Boyd (aboyd3@umbc.edu)
date: 6/2/24
file: script.js
desc: logic functionality to calculate BMI and maintenance calories
*/

const M_CONVERT = 39.3701;
const KG_CONVERT = 2.20462;

//function to calculate BMI
function calcBMI(){
    //get inputs 
    var height = document.getElementById("height-input").value , weight = document.getElementById("weight-input").value;
    //validate that inputs are both numbers
    if(Number.isNaN(parseFloat(height)) || Number.isNaN(parseFloat(weight))){
        alert("Please enter a valid height and weight")
        return;
    }
    height = parseFloat(height);
    weight = parseFloat(weight);

    //convert to US imperial system if not already
    const heightUnit = document.querySelector('input[name="optHeight"]:checked').value;
    const weightUnit = document.querySelector('input[name="optWeight"]:checked').value;
    
    if(heightUnit != "in")
        height *= M_CONVERT;
    if(weightUnit != "lbs")
        weight *= KG_CONVERT;

    //calculate BMI
    var bmi = ((weight / Math.pow(height, 2)) * 703).toFixed(1);

    //reveal results
    document.getElementById("bmi-results").style.display = "block";
    document.getElementById("bmi-result").innerHTML = bmi;

    //colored results based on bmi
    if(bmi < 18.5 || (bmi >= 25 && bmi < 30)){
        document.getElementById("bmi-result").style.color = "yellow";
    }else if(bmi >= 18.5 && bmi < 25){
        document.getElementById("bmi-result").style.color = "green";
    }else{
        document.getElementById("bmi-result").style.color = "red";
    }
}

var activityConst = 1; //constant used in BMR formula

//clears fields of the BMI form
function clearBMI(){
    document.getElementById("height-input").value = "";
    document.getElementById("weight-input").value = "";
    document.getElementById("bmi-results").style.display = "none";
}

//function changes dropdown text
function selectActivity(activity, constant){
    var dropdown = document.getElementById("activity-btn")
    dropdown.innerHTML = activity;
    activityConst = constant
}

//function to calculate BMR
function calcBMR(){
    //get height, weight, and age
    var height = document.getElementById("height-input2").value,
        weight = document.getElementById("weight-input2").value,
        age = document.getElementById("age-input").value;
    
    //validate
    if(Number.isNaN(parseFloat(height)) || Number.isNaN(parseFloat(weight)) || !(age >= 18 && age <= 80)){
        alert("ensure valid heights and weights are added. Age must be between 18-80.")
        return;
    }

    //convert from imperial to metric
    var heightUnit = document.querySelector('input[name="optHeight2"]:checked').value,
        weightUnit = document.querySelector('input[name="optWeight2"]:checked').value

    if(heightUnit == "in")
        height *= 2.54
    if(weightUnit == "lbs")
        weight /= 2.2

    //get gender option
    var gender = document.querySelector('input[name="optGender"]:checked').value;
    //assign formula bias according to gender
    var genderBias = (gender == "male") ? 5 : -161
    var bmr = (10 * weight) + (6.25 * height) - (5 * age) + genderBias
    
    //show final results
    document.getElementById("bmr-results").style.display = "block";
    document.getElementById("bmr-result").innerHTML = (activityConst * bmr).toFixed(0);
}

//function clears fields for BMR calculator
function clearBMR(){
    document.getElementById("height-input2").value = "";
    document.getElementById("weight-input2").value = "";
    document.getElementById("age-input").value = "";
    document.getElementById("bmr-results").style.display = "none";
}