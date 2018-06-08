// yeah....
// ========================================== START CODING BELOW!!

// Initialize Firebase
// Initialize Firebase
var config = {
    apiKey: "AIzaSyD_fNce7WDQCcNv1yFE-2HILCrFvEKPNbk",
    authDomain: "train-9ada9.firebaseapp.com",
    databaseURL: "https://train-9ada9.firebaseio.com",
    projectId: "train-9ada9",
    storageBucket: "",
    messagingSenderId: "362459828679"
};
firebase.initializeApp(config);



var database = firebase.database();

// Initial Values
var name = "";
var destination = "";
var time = "";
var rate = "";
var tMinutesTillTrain = "";

//TIME


$("#add-user").on("click", function (event) {
    event.preventDefault();

    // Grabbed values from text boxes
    name = $("#name-input").val().trim();
    destination = $("#role-input").val().trim();
    time = $("#date-input").val().trim();
    rate = $("#rate-input").val().trim();

    $(".form-control").val("");

    // Code for handling the push
    database.ref().push({
        name: name,
        destination: destination,
        time: time,
        rate: rate,
        tMinutesTillTrain: tMinutesTillTrain
    });
    // adding to table

});

// Firebase watcher .on("child_added"
database.ref().on("child_added", function (childSnapshot, prevChildKey) {

    var sv = childSnapshot.val();
    var newName = (sv.name);
    var newDestination = (sv.destination);
    var time = (sv.time);
    var newRate = (sv.rate);

    // Time is...
    // var firstTime = "05:30";

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(time, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % newRate;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = newRate - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log(nextTrain);
    var trainArrival = (moment(nextTrain).format("hh:mm"));

    console.log(newName);
    console.log(newDestination);
    console.log(nextTrain);
    console.log(newRate);

    $("#data-holder").append("<tr><td>" + newName + "</td><td>" + newDestination + "</td><td>" + newRate + "</td><td>" + trainArrival + "</td><td>"
        + tMinutesTillTrain + "</td></tr>");



}, function (errorObject) {

    console.log("Errors handled: " + errorObject.code);
});

$("#reset").on("click", function () {
    $("td").empty();
});