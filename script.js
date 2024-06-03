/*
auth: AJ Boyd (aboyd3@umbc.edu)
date: 6/2/24
file: script.js
desc: logic functionality to calculate BMI and maintenance calories
*/

const M_CONVERT = 39.3701;
const KG_CONVERT = 2.20462;

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

//clears fields of the BMI form
function clearBMI(){
    document.getElementById("height-input").value = "";
    document.getElementById("weight-input").value = "";
}
