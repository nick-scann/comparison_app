import "./styles.css";

//const axios = require("axios");

const apartments_api =
  "https://v2-api.sheety.co/e358130086416f2bce55aab2fbea9952/myApartmentsApi/apartments";

/*
$(document).ready(function() {
  $.getJSON(
    "https://v2-api.sheety.co/e358130086416f2bce55aab2fbea9952/myApartmentsApi/apartments",
    function(data) {
      var template = Handlebars.compile($("#item-template").html());
      $("#items").html(template(data));
    }
  );
});

*/

let apartment_id = "";

//Define apartments object
var apartments = [];

// Hide apartment object until added
document.getElementById("newObject").style.display = "none";

var marketAvg = 1600;

// Apartment object constructor
function Apartment(name, rentAmt, parkAmt, lScore, bScore, uScore) {
  this.name = name;
  this.rentAmt = rentAmt;
  this.parkAmt = parkAmt;
  this.lScore = lScore;
  this.bScore = bScore;
  this.uScore = uScore;
  this.buildingScore = function() {
    return (+this.lScore + +this.bScore) / 2;
  };
  this.totalScore = function() {
    return (this.buildingScore() * this.uScore) / 10;
  };
  this.totalCost = function() {
    return +this.rentAmt + +this.parkAmt;
  };
  this.valueScore = function() {
    return Math.round(
      +this.totalScore() -
        ((+this.totalCost() / marketAvg) * +this.totalCost()) / 1000
    );
  };
}

// On click add new item to form and display item
document.getElementById("addFormItem").onclick = function() {
  addFormItem();
  document.getElementById("newObject").style.display = "block";
};

var apartmentsNum = 1;

// Adds a new apartment form object
function addFormItem() {
  var newObject = document.getElementById("newObject");
  for (var i = 0; i < apartmentsNum; i++) {
    var apartment = new Apartment();
    apartments.push(apartment);
    console.log(apartments);
    newObject.className = "item";

    // Div for add / edit apartment object
    var objectEditDiv = document.createElement("div");
    objectEditDiv.id = "objectEdit" + apartments.length;
    objectEditDiv.className = "newItem";

    // Div for static display of apartmentment object
    var objectStaticDiv = document.createElement("div");
    objectStaticDiv.id = "objectStatic" + apartments.length;
    objectStaticDiv.className = "objectStatic";

    var itemStaticDiv = document.createElement("div");
    itemStaticDiv.id = "itemStatic" + apartments.length;
    itemStaticDiv.className = "itemStatic";

    var scoreStaticDiv = document.createElement("div");
    scoreStaticDiv.id = "scoreStatic" + apartments.length;
    scoreStaticDiv.className = "scoreDiv";

    var apartmentLabel = document.createElement("h4");
    apartmentLabel.innerText = "Apartment " + apartments.length;

    var apartmentTitle = document.createTextNode(
      "Apartment " + apartments.length
    );

    var aForm = document.createElement("form");
    aForm.id = "apartment" + apartments.length;

    var bName = document.createElement("input");
    bName.type = "text";
    bName.id = "bName" + apartments.length;
    bName.placeholder = "Building Name";

    var bNameDisplay = document.createElement("h4");
    bNameDisplay.id = "bNameDisplay" + apartments.length;
    bNameDisplay.className = "bNameDisplay";

    var bPrice = document.createElement("span");
    bPrice.id = "bPrice" + apartments.length;

    var monthly = document.createElement("span");
    monthly.innerText = " Monthly";

    var bScoreDiv = document.createElement("div");
    bScoreDiv.id = "bScoreDiv";
    bScoreDiv.className = "radioDiv";

    var lScoreDiv = document.createElement("div");
    lScoreDiv.id = "lScoreDiv";
    lScoreDiv.className = "radioDiv";

    var uScoreDiv = document.createElement("div");
    uScoreDiv.id = "uScoreDiv";
    uScoreDiv.className = "radioDiv";

    var costDiv = document.createElement("div");
    costDiv.id = "costDiv";
    costDiv.className = "dropDownDiv";

    // Create divs for radio button ratings
    var bScoreRadioDiv = document.createElement("div");
    bScoreRadioDiv.id = "bScoreRadioDiv";
    bScoreRadioDiv.className = "radioDiv";

    var lScoreRadioDiv = document.createElement("div");
    lScoreRadioDiv.id = "lScoreRadioDiv";
    lScoreRadioDiv.className = "radioDiv";

    var uScoreRadioDiv = document.createElement("div");
    uScoreRadioDiv.id = "uScoreRadioDiv";
    uScoreRadioDiv.className = "radioDiv";

    // Labels for ratings
    var buildingRatingLabel = document.createElement("h4");
    buildingRatingLabel.innerText = "How is the building?";
    buildingRatingLabel.className = "ratingLabel";

    var locationRatingLabel = document.createElement("h4");
    locationRatingLabel.innerText = "How is the location?";
    locationRatingLabel.className = "ratingLabel";

    var unitRatingLabel = document.createElement("h4");
    unitRatingLabel.innerText = "How is the unit?";
    unitRatingLabel.className = "ratingLabel";

    var costLabel = document.createElement("h4");
    costLabel.innerText = "Rent & Other Costs";
    costLabel.className = "ratingLabel";

    // Function to create a radio button field and label (does not work)
    /*
    var radioButton = function(nameX, ratingX, labelX, inputX, scoreX, textX) {
      labelX = document.createElement("label");
      labelX.innerText = textX;
      labelX.htmlFor = ratingX + apartments.length;
      inputX = document.createElement("input");
      inputX.type = "radio";
      inputX.name = nameX + apartments.length;
      inputX.value = scoreX;
      inputX.id = ratingX + apartments.length;
    };
    radioButton(
      "bScore",
      "bScoreAmazing",
      "labelAmazing",
      "bScoreInputAmazing",
      10,
      "Amazing"
    );*/

    // Create bScore radio button for Bad rating
    var bScoreLabelBad = document.createElement("label");
    bScoreLabelBad.innerText = "OK";
    bScoreLabelBad.htmlFor = "bScoreBad" + apartments.length;
    var bScoreInputBad = document.createElement("input");
    bScoreInputBad.type = "radio";
    bScoreInputBad.name = "bScore" + apartments.length;
    bScoreInputBad.value = "4";
    bScoreInputBad.id = "bScoreBad" + apartments.length;

    // Create bScore radio button for Good rating
    var bScoreLabelGood = document.createElement("label");
    bScoreLabelGood.innerText = "Good";
    bScoreLabelGood.htmlFor = "bScoreGood" + apartments.length;
    var bScoreInputGood = document.createElement("input");
    bScoreInputGood.type = "radio";
    bScoreInputGood.name = "bScore" + apartments.length;
    bScoreInputGood.value = "6";
    bScoreInputGood.id = "bScoreGood" + apartments.length;

    // Create bScore radio button for Great rating
    var bScoreLabelGreat = document.createElement("label");
    bScoreLabelGreat.innerText = "Great";
    bScoreLabelGreat.htmlFor = "bScoreGreat" + apartments.length;
    var bScoreInputGreat = document.createElement("input");
    bScoreInputGreat.type = "radio";
    bScoreInputGreat.name = "bScore" + apartments.length;
    bScoreInputGreat.value = "8";
    bScoreInputGreat.id = "bScoreGreat" + apartments.length;

    // Create bScore radio button for Amazing rating
    var bScoreLabelAmazing = document.createElement("label");
    bScoreLabelAmazing.innerText = "Amazing";
    bScoreLabelAmazing.htmlFor = "bScoreAmazing" + apartments.length;
    var bScoreInputAmazing = document.createElement("input");
    bScoreInputAmazing.type = "radio";
    bScoreInputAmazing.name = "bScore" + apartments.length;
    bScoreInputAmazing.value = "10";
    bScoreInputAmazing.id = "bScoreAmazing" + apartments.length;

    // Create lScore radio button for Bad rating
    var lScoreLabelBad = document.createElement("label");
    lScoreLabelBad.innerText = "OK";
    lScoreLabelBad.htmlFor = "lScoreBad" + apartments.length;
    var lScoreInputBad = document.createElement("input");
    lScoreInputBad.type = "radio";
    lScoreInputBad.name = "lScore" + apartments.length;
    lScoreInputBad.value = "4";
    lScoreInputBad.id = "lScoreBad" + apartments.length;

    // Create lScore radio button for Good rating
    var lScoreLabelGood = document.createElement("label");
    lScoreLabelGood.innerText = "Good";
    lScoreLabelGood.htmlFor = "lScoreGood" + apartments.length;
    var lScoreInputGood = document.createElement("input");
    lScoreInputGood.type = "radio";
    lScoreInputGood.name = "lScore" + apartments.length;
    lScoreInputGood.value = "6";
    lScoreInputGood.id = "lScoreGood" + apartments.length;

    // Create lScore radio button for Great rating
    var lScoreLabelGreat = document.createElement("label");
    lScoreLabelGreat.innerText = "Great";
    lScoreLabelGreat.htmlFor = "lScoreGreat" + apartments.length;
    var lScoreInputGreat = document.createElement("input");
    lScoreInputGreat.type = "radio";
    lScoreInputGreat.name = "lScore" + apartments.length;
    lScoreInputGreat.value = "8";
    lScoreInputGreat.id = "lScoreGreat" + apartments.length;

    var lScoreLabelAmazing = document.createElement("label");
    lScoreLabelAmazing.innerText = "Amazing";
    lScoreLabelAmazing.htmlFor = "lScoreAmazing" + apartments.length;
    var lScoreInputAmazing = document.createElement("input");
    lScoreInputAmazing.type = "radio";
    lScoreInputAmazing.name = "lScore" + apartments.length;
    lScoreInputAmazing.value = "10";
    lScoreInputAmazing.id = "lScoreAmazing" + apartments.length;

    // Create uScore radio button for Bad rating
    var uScoreLabelBad = document.createElement("label");
    uScoreLabelBad.innerText = "OK";
    uScoreLabelBad.htmlFor = "uScoreBad" + apartments.length;
    var uScoreInputBad = document.createElement("input");
    uScoreInputBad.type = "radio";
    uScoreInputBad.name = "uScore" + apartments.length;
    uScoreInputBad.value = "4";
    uScoreInputBad.id = "uScoreBad" + apartments.length;

    // Create uScore radio button for Good rating
    var uScoreLabelGood = document.createElement("label");
    uScoreLabelGood.innerText = "Good";
    uScoreLabelGood.htmlFor = "uScoreGood" + apartments.length;
    var uScoreInputGood = document.createElement("input");
    uScoreInputGood.type = "radio";
    uScoreInputGood.name = "uScore" + apartments.length;
    uScoreInputGood.value = "6";
    uScoreInputGood.id = "uScoreGood" + apartments.length;

    // Create uScore radio button for Great rating
    var uScoreLabelGreat = document.createElement("label");
    uScoreLabelGreat.innerText = "Great";
    uScoreLabelGreat.htmlFor = "uScoreGreat" + apartments.length;
    var uScoreInputGreat = document.createElement("input");
    uScoreInputGreat.type = "radio";
    uScoreInputGreat.name = "uScore" + apartments.length;
    uScoreInputGreat.value = "8";
    uScoreInputGreat.id = "uScoreGreat" + apartments.length;

    var uScoreLabelAmazing = document.createElement("label");
    uScoreLabelAmazing.innerText = "Amazing";
    uScoreLabelAmazing.htmlFor = "uScoreAmazing" + apartments.length;
    var uScoreInputAmazing = document.createElement("input");
    uScoreInputAmazing.type = "radio";
    uScoreInputAmazing.name = "uScore" + apartments.length;
    uScoreInputAmazing.value = "10";
    uScoreInputAmazing.id = "uScoreAmazing" + apartments.length;

    // Rent amount list
    var rentAmounts = [
      1200,
      1300,
      1400,
      1500,
      1600,
      1700,
      1800,
      1900,
      2000,
      2100,
      2200,
      2300,
      2400,
      2500,
      2600,
      2700,
      2800,
      2900,
      3000,
      3100,
      3200,
      3300,
      3400,
      3500
    ];

    // Create rent dropdown
    var rentAmt = document.createElement("select");
    rentAmt.id = "rentAmt" + apartments.length;
    rentAmt.className = "customSelect";

    // Add options to drop down
    for (var j = 0; j < rentAmounts.length; j++) {
      var rentOption = document.createElement("option");
      rentOption.value = rentAmounts[j];
      rentOption.text = rentAmounts[j];
      rentAmt.appendChild(rentOption);
    }

    // park amount list
    var parkAmounts = [0, 50, 100, 200, 300, 400, 500];

    // Create park dropdown
    var parkAmt = document.createElement("select");
    parkAmt.id = "parkAmt" + apartments.length;
    parkAmt.className = "customSelect";

    // Add options to drop down
    for (var p = 0; p < parkAmounts.length; p++) {
      var parkOption = document.createElement("option");
      parkOption.value = parkAmounts[p];
      parkOption.text = parkAmounts[p];
      parkAmt.appendChild(parkOption);
    }

    var moneySign = document.createTextNode("$");
    var vScore = document.createTextNode("Value Score ");
    var valueScore = document.createElement("span");
    valueScore.innerHTML = 0;
    valueScore.id = "valueScore" + apartments.length;
    valueScore.className = "valueScore";

    // Attach objects to page
    newObject.appendChild(objectEditDiv);
    objectEditDiv.appendChild(aForm);
    aForm.appendChild(apartmentLabel);
    aForm.appendChild(bName);
    aForm.appendChild(lScoreDiv);
    lScoreDiv.appendChild(locationRatingLabel);
    lScoreDiv.appendChild(lScoreRadioDiv);
    lScoreRadioDiv.appendChild(lScoreInputBad);
    lScoreRadioDiv.appendChild(lScoreLabelBad);
    lScoreRadioDiv.appendChild(lScoreInputGood);
    lScoreRadioDiv.appendChild(lScoreLabelGood);
    lScoreRadioDiv.appendChild(lScoreInputGreat);
    lScoreRadioDiv.appendChild(lScoreLabelGreat);
    lScoreRadioDiv.appendChild(lScoreInputAmazing);
    lScoreRadioDiv.appendChild(lScoreLabelAmazing);
    aForm.appendChild(bScoreDiv);
    bScoreDiv.appendChild(buildingRatingLabel);
    bScoreDiv.appendChild(bScoreRadioDiv);
    bScoreRadioDiv.appendChild(bScoreInputBad);
    bScoreRadioDiv.appendChild(bScoreLabelBad);
    bScoreRadioDiv.appendChild(bScoreInputGood);
    bScoreRadioDiv.appendChild(bScoreLabelGood);
    bScoreRadioDiv.appendChild(bScoreInputGreat);
    bScoreRadioDiv.appendChild(bScoreLabelGreat);
    bScoreRadioDiv.appendChild(bScoreInputAmazing);
    bScoreRadioDiv.appendChild(bScoreLabelAmazing);
    aForm.appendChild(uScoreDiv);
    uScoreDiv.appendChild(unitRatingLabel);
    uScoreDiv.appendChild(uScoreRadioDiv);
    uScoreRadioDiv.appendChild(uScoreInputBad);
    uScoreRadioDiv.appendChild(uScoreLabelBad);
    uScoreRadioDiv.appendChild(uScoreInputGood);
    uScoreRadioDiv.appendChild(uScoreLabelGood);
    uScoreRadioDiv.appendChild(uScoreInputGreat);
    uScoreRadioDiv.appendChild(uScoreLabelGreat);
    uScoreRadioDiv.appendChild(uScoreInputAmazing);
    uScoreRadioDiv.appendChild(uScoreLabelAmazing);
    //bScoreRadioDiv.appendChild(labelAmazing);
    //bScoreRadioDiv.appendChild(bScoreInputAmazing);
    aForm.appendChild(costDiv);
    costDiv.appendChild(costLabel);
    costDiv.appendChild(rentAmt);
    rentAmt.appendChild(moneySign);
    costDiv.appendChild(parkAmt);
    // Static display div
    newObject.appendChild(objectStaticDiv);
    objectStaticDiv.appendChild(itemStaticDiv);
    itemStaticDiv.appendChild(bNameDisplay);
    itemStaticDiv.appendChild(moneySign);
    itemStaticDiv.appendChild(bPrice);
    itemStaticDiv.appendChild(monthly);
    objectStaticDiv.appendChild(scoreStaticDiv);
    scoreStaticDiv.appendChild(valueScore);
    scoreStaticDiv.appendChild(vScore);
    document.getElementById("valueScore" + apartments.length).style.display =
      "none";
    // Hide static display div
    document.getElementById("objectStatic" + apartments.length).style.display =
      "none";
    // Hide get started text
    document.getElementById("getStarted").style.display = "none";
  }
}

//Update Apartments with user input data and updates the view
function updateApartments() {
  function updateView() {
    document.getElementById(
      "valueScore" + apartments.length
    ).innerHTML = apartments[i].valueScore();
    document.getElementById("valueScore" + apartments.length).style.display =
      "block";
    document.getElementById("bNameDisplay" + apartments.length).innerHTML =
      apartments[i].name;
    document.getElementById(
      "bPrice" + apartments.length
    ).innerHTML = apartments[i].totalCost();
    document.getElementById("objectStatic" + apartments.length).style.display =
      "block";
    document.getElementById("objectEdit" + apartments.length).style.display =
      "none";
  }
  for (var i = 0; i < apartments.length; i++) {
    apartments[i].name = document.getElementById("bName" + +(i + 1)).value;
    apartments[i].rentAmt = document.getElementById("rentAmt" + +(i + 1)).value;
    apartments[i].parkAmt = document.getElementById("parkAmt" + +(i + 1)).value;
    /*apartments[i].lScore = document.getElementById(
      "locationScore" + +(i + 1)
    ).value;*/
    if (document.getElementById("bScoreBad" + +(i + 1)).checked) {
      apartments[i].bScore = document.getElementById(
        "bScoreBad" + +(i + 1)
      ).value;
    }
    if (document.getElementById("bScoreGood" + +(i + 1)).checked) {
      apartments[i].bScore = document.getElementById(
        "bScoreGood" + +(i + 1)
      ).value;
    }
    if (document.getElementById("bScoreGreat" + +(i + 1)).checked) {
      apartments[i].bScore = document.getElementById(
        "bScoreGreat" + +(i + 1)
      ).value;
    }
    if (document.getElementById("bScoreAmazing" + +(i + 1)).checked) {
      apartments[i].bScore = document.getElementById(
        "bScoreAmazing" + +(i + 1)
      ).value;
    }
    if (document.getElementById("lScoreBad" + +(i + 1)).checked) {
      apartments[i].lScore = document.getElementById(
        "lScoreBad" + +(i + 1)
      ).value;
    }
    if (document.getElementById("lScoreGood" + +(i + 1)).checked) {
      apartments[i].lScore = document.getElementById(
        "lScoreGood" + +(i + 1)
      ).value;
    }
    if (document.getElementById("lScoreGreat" + +(i + 1)).checked) {
      apartments[i].lScore = document.getElementById(
        "lScoreGreat" + +(i + 1)
      ).value;
    }
    if (document.getElementById("lScoreAmazing" + +(i + 1)).checked) {
      apartments[i].lScore = document.getElementById(
        "lScoreAmazing" + +(i + 1)
      ).value;
    }
    if (document.getElementById("uScoreBad" + +(i + 1)).checked) {
      apartments[i].uScore = document.getElementById(
        "uScoreBad" + +(i + 1)
      ).value;
    }
    if (document.getElementById("uScoreGood" + +(i + 1)).checked) {
      apartments[i].uScore = document.getElementById(
        "uScoreGood" + +(i + 1)
      ).value;
    }
    if (document.getElementById("uScoreGreat" + +(i + 1)).checked) {
      apartments[i].uScore = document.getElementById(
        "uScoreGreat" + +(i + 1)
      ).value;
    }
    if (document.getElementById("uScoreAmazing" + +(i + 1)).checked) {
      apartments[i].uScore = document.getElementById(
        "uScoreAmazing" + +(i + 1)
      ).value;
      //hide instructions
    }
    document.getElementById("instructions").style.display = "none";
    updateView();
  }
}

//click to call addApartment function
document.getElementById("scorebutton").onclick = function() {
  updateApartments();
  console.log(apartments);
  console.log(apartments[0]);
  console.log(JSON.stringify(apartments[0]));
  /*console.log(apartments[0].buildingScore());
  console.log(apartments[0].totalCost());
  console.log(apartments[0].totalScore());
  console.log(apartments[0].valueScore());*/
};

// Making a POST request using an axios instance from a connected library
function saveApartments() {
  var apartmentsJSON = JSON.stringify(apartments[0]);
  console.log(apartmentsJSON);

  $.post(
    apartments_api,
    {
      apartment:
        //apartments[0]
        apartmentsJSON
      //JSON.stringify(apartments[0])
      /*{
          name: "jQuery Apartment",
          rentAmt: "1200",
          parkAmt: "0",
          lScore: "10",
          bScore: "10",
          uScore: "8"
        }*/
    },
    function(data) {
      console.log(data);
    }
  );

  // Axios post that wouldn't work
  /*axios
    .post(apartments_api, {
      "apartment":
      //JSON.stringify(apartments[0])  
      ////apartmentsJSON
        {
          name: "Axios Apartment",
          rentAmt: "1200",
          parkAmt: "0",
          lScore: "10",
          bScore: "10",
          uScore: "8"
        }
    })
    // Handle a successful response from the server
    .then(response => {
      // Getting a data object from response that contains the necessary data from the server
      const data = response.data;
      console.log("data", data);
      // Save the unique id that the server gives to our object
      apartment_id = data._id;
    })
    // Catch and print errors if any
    .catch(error => console.error("On create apartment error", error));*/
}

document.getElementById("savebutton").onclick = function() {
  saveApartments();
};

/* Old stuff
// Hide the scores on load
//document.getElementById("valueScore").style.display = "none";
//document.getElementById("totalScore").style.display = "none";
//document.getElementById("buildingScore").style.display = "none";

// Update display with vScore
  //round to two decimal places
  this.valueScore = Math.round(valueScore * 100) / 100;
  //next line allows us to always have two digits after decimal point
  costScore = costScore.toFixed(2);
*/
