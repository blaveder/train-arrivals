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
var trainName = "";
var role = "";
var email = "";
var rate = "";
var firstTime = "";
var tFrequency = "";

//TIME


$("#add-user").on("click", function (event) {
    event.preventDefault();

    // Grabbed values from text boxes
    name = $("#name-input").val().trim();
    role = $("#role-input").val().trim();
    firstTime = $("#date-input").val().trim();
    tFrequency = $("#rate-input").val().trim();


    // Code for handling the push
    database.ref().push({
        name: name,
        role: role,
        // dateAdded: firebase.database.ServerValue.TIMESTAMP,
        firstTime: firstTime,
        tFrequency: tFrequency
    });
    // adding to table
    console.log(firstTime);
    console.log(tFrequency);

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
});

// Firebase watcher .on("child_added"
database.ref().on("child_added", function (snapshot) {
    // storing the snapshot.val() in a variable for convenience
    var sv = snapshot.val();
    getInfo();
    // Console.loging the last user's data
    // console.log(sv.name);
    // console.log(sv.role);
    // console.log(sv.rate);
    // console.log(sv.dateAdded);


    // Change the HTML to reflect
    // $("#name-display").text(sv.name);
    // $("#email-display").text(sv.email);
    // $("#age-display").text(sv.age);
    // $("#comment-display").text(sv.comment);

    function getInfo() {
        var employeeTable = $("#trains");
        var newRow = $("<tr>");
        var newName = $("<td>");
        var newRole = $("<td>");
        var newDate = $("<td>");
        var newRate = $("<td>");



        employeeTable.append(newRow);
        newRow.append(newName);
        newRow.append(newRole);
        newRow.append(newDate);
        newRow.append(newRate);

        newName.text(sv.name);
        newRole.text(sv.role);
        newDate.text(sv.firstTime);
        newRate.text(sv.tFrequency);
    }
    // Handle the errors

}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});