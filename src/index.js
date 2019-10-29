import "./styles.css";

//Define apartment object
var apartment = function(
  id,
  name,
  rentAmt,
  parkAmt,
  lScore,
  aScore,
  uScore,
  bScore,
  totalScore,
  totalCost,
  valueScore
) {
  this.id = id;
  this.name = name;
  this.rentAmt = rentAmt;
  this.parkAmt = parkAmt;
  this.lScore = lScore;
  this.aScore = aScore;
  this.uScore = uScore;
  this.bScore = bScore;
  this.totalScore = totalScore;
  this.totalCost = totalCost;
  this.valueScore = valueScore;
};

//Calculate Value Score Method
apartment.prototype.calculateVS = function() {
  this.rentAmt = document.getElementById("rentAmt").value;
  console.log(this.rentAmt);
  this.parkAmt = document.getElementById("parkAmt").value;
  console.log(this.parkAmt);
  this.lScore = document.getElementById("locationScore").value;
  console.log(this.lScore);
  this.aScore = document.getElementById("amenitiesScore").value;
  console.log(this.aScore);
  this.uScore = document.getElementById("unitScore").value;
  console.log(this.uScore);

  //validate input
  // if (this.rentAmt === "" || this.parkAmt == 0  || this.uScore == 0 || this.aScore == 0 || this.uScore == 0 || this.lScore == 0) {
  //alert("Please enter values");
  //return;
  //}

  //Calculate Cost Score
  this.bScore = (+this.lScore + +this.aScore) / 2;
  //console.log(this.bScore) ;
  var totalScore = this.bScore * this.uScore;
  //console.log(totalScore);
  var totalCost = +this.rentAmt + +this.parkAmt;
  //console.log(totalCost);
  var valueScore = totalCost / totalScore;
  //console.log(valueScore);
  //round to two decimal places
  valueScore = Math.round(valueScore * 100) / 100;
  //next line allows us to always have two digits after decimal point
  // costScore = costScore.toFixed(2);
  //Display the scores
  document.getElementById("buildingScore").style.display = "block";
  document.getElementById("buildingScore").innerHTML = apartment.bScore;
  document.getElementById("totalScore").style.display = "block";
  document.getElementById("totalScore").innerHTML = totalScore;
  document.getElementById("cScore").style.display = "block";
  document.getElementById("costScore").innerHTML = valueScore;
};

//Hide the Price amount on load
// document.getElementById("cScore").style.display = "none";

/*
   var apartment1 = new apartment(
      "",
      "",
      this.rentAmt,
      document.getElementById("parkAmt").value,
      document.getElementById("locationScore").value,
      document.getElementById("amenitiesScore").value,
      document.getElementById("unitScore").value,
      "",
      "",
      "",
      "");

      console.log(apartment1);
*/
//click to call function
document.getElementById("score").onclick = function() {
  apartment1.calculateVS();
};
