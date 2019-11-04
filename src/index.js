import "./styles.css";

//Define apartments object
var apartments = [];

// Hide apartment object until added
document.getElementById("newObject").style.display = "none";

// Apartment object constructor
function Apartment(name, rentAmt, parkAmt, lScore, aScore, uScore) {
  this.name = name;
  this.rentAmt = rentAmt;
  this.parkAmt = parkAmt;
  this.lScore = lScore;
  this.aScore = aScore;
  this.uScore = uScore;
  this.bScore = function() {
    return (this.lScore + this.aScore) / 2;
  };
  this.totalScore = function() {
    return this.bScore() * this.uScore;
  };
  this.totalCost = function() {
    return +this.rentAmt + +this.parkAmt;
  };
  this.valueScore = function() {
    return this.totalCost() / this.totalScore();
  };
}

// Temp solution for apartment count, displays new item
var apartmentsNum = 1;
document.getElementById("addFormItem").onclick = function() {
  addFormItem();
  document.getElementById("newObject").style.display = "block";
  console.log(apartmentsNum);
};

// Adds a new apartment form object
function addFormItem() {
  var newObject = document.getElementById("newObject");
  for (var i = 0; i < apartmentsNum; i++) {
    var apartment = new Apartment();
    apartments.push(apartment);
    console.log(apartments);
    newObject.class = "item";
    var apartmentDiv = document.createElement("div");
    apartmentDiv.class = "item";
    apartmentDiv.id = "section" + apartments.length;
    var apartmentTitle = document.createTextNode(
      "Apartment " + apartments.length
    );
    var aForm = document.createElement("form");
    aForm.id = "apartment" + apartments.length;
    var bName = document.createElement("input");
    bName.type = "text";
    bName.id = "buildingName" + apartments.length;
    bName.placeholder = "Building Name";
    var bScore = document.createElement("input");
    bScore.type = "number";
    bScore.id = "buildingScore" + apartments.length;
    bScore.placeholder = "Building Score";
    var location = document.createElement("input");
    location.type = "number";
    location.id = "locationScore" + apartments.length;
    location.placeholder = "Location Score";
    var unit = document.createElement("input");
    unit.type = "number";
    unit.id = "unitScore" + apartments.length;
    unit.placeholder = "Unit Score";
    var rentAmt = document.createElement("input");
    rentAmt.type = "number";
    rentAmt.id = "rentAmt" + apartments.length;
    rentAmt.placeholder = "Rent Amount $";
    var parkAmt = document.createElement("input");
    parkAmt.type = "number";
    parkAmt.id = "parkAmt" + apartments.length;
    parkAmt.placeholder = "Park Amount $";
    var vScore = document.createTextNode("Value Score ");
    var valueScore = document.createElement("span");
    valueScore.innerHTML = 0;
    valueScore.id = "valueScore" + apartments.length;
    newObject.appendChild(apartmentDiv);
    apartmentDiv.appendChild(apartmentTitle);
    apartmentDiv.appendChild(aForm);
    aForm.appendChild(bName);
    aForm.appendChild(bScore);
    aForm.appendChild(location);
    aForm.appendChild(unit);
    aForm.appendChild(rentAmt);
    aForm.appendChild(parkAmt);
    aForm.appendChild(vScore);
    aForm.appendChild(valueScore);
    document.getElementById("valueScore" + apartments.length).style.display =
      "none";
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
  }
  for (var i = 0; i < apartments.length; i++) {
    apartments[i].name = document.getElementById(
      "buildingName" + (i + 1)
    ).value;
    apartments[i].rentAmt = document.getElementById("rentAmt" + +(i + 1)).value;
    apartments[i].parkAmt = document.getElementById("parkAmt" + +(i + 1)).value;
    apartments[i].lScore = document.getElementById(
      "locationScore" + +(i + 1)
    ).value;
    apartments[i].aScore = document.getElementById(
      "buildingScore" + +(i + 1)
    ).value;
    apartments[i].uScore = document.getElementById(
      "unitScore" + +(i + 1)
    ).value;
    updateView();
  }
  console.log(apartments);
}

//click to call addApartment function
document.getElementById("scorebutton").onclick = function() {
  updateApartments();
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
