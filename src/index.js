import "./styles.css";

//Define apartments object
var apartments = [];

//Define apartment object
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

//Add New Apartment to Object and update the view
function addApartment() {
  function addObject() {
    var apartment = new Apartment(
      document.getElementById("buildingName").value,
      document.getElementById("rentAmt").value,
      document.getElementById("parkAmt").value,
      document.getElementById("locationScore").value,
      document.getElementById("amenitiesScore").value,
      document.getElementById("unitScore").value
    );
    apartments.push(apartment);
  }

  // Update page elements with scores
  function updateView() {
    //document.getElementById("buildingScore").style.display = "block";
    //document.getElementById("buildingScore").innerHTML = apartments[0].bScore();
    document.getElementById("totalScore").style.display = "block";
    document.getElementById(
      "totalScore"
    ).innerHTML = apartments[0].totalScore();
    document.getElementById("valueScore").style.display = "block";
    document.getElementById(
      "valueScore"
    ).innerHTML = apartments[0].valueScore();
  }
  addObject();
  console.log(apartments[0]);
  console.log(apartments[0].bScore());
  console.log(apartments[0].totalScore());
  console.log(apartments[0].totalCost());
  console.log(apartments[0].valueScore());
  updateView();
}

// Hide the scores on load
document.getElementById("valueScore").style.display = "none";
document.getElementById("totalScore").style.display = "none";
//document.getElementById("buildingScore").style.display = "none";

//click to call addApartment function
document.getElementById("scorebutton").onclick = function() {
  addApartment();
};
function addItem() {
  var container = document.getElementById("container");
  for (i = 0; i < apartments.length; i++) {}
}
/* Old stuff
  //round to two decimal places
  this.valueScore = Math.round(valueScore * 100) / 100;
  //next line allows us to always have two digits after decimal point
  costScore = costScore.toFixed(2);
*/
