// Initialize Firebase
var config = {
    apiKey: "AIzaSyCy17n87loXvEu1jZOUkidLhpgwT8rMRCs",
    authDomain: "train-scheduler-a4a1b.firebaseapp.com",
    databaseURL: "https://train-scheduler-a4a1b.firebaseio.com",
    projectId: "train-scheduler-a4a1b",
    storageBucket: "",
    messagingSenderId: "232450126763"
};
firebase.initializeApp(config);

// Set Firebase Variable
var trainData = firebase.database();

//Set listener for submit button
$("#addTrainBtn").on("click", function (event) {

    event.preventDefault();

//Capture input values 
    var trnNm = $("#trainNameInput").val().trim();
    var dstn = $("#destinationInput").val().trim();
    var ftt = moment($("#firstTrainInput").val().trim(),"HH:mm").subtract(10, "years").format("X");
    var frq = $("#frequencyInput").val().trim();
   
//Store input values to firebase
    trainData.ref().push({
        trnNm: trnNm,
        dstn: dstn,
        ftt: ftt,
        frq: frq,

    });
    
});

//Create Firebase event for adding train to the database and adding it to the html table from the user inputs.
// trainData.ref().push(newTrain);
// alert("Train Added");

// $("#trainNameInput").val("");
// $("#destinationInput").val("");
// $("#firstTrainInput").val("");
// $("#frequencyInput").val("");



trainData.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
// Storing the snapshot.val() in a variable
    var sv = snapshot.val();
    
// Console.logging the last train's data
    console.log("FB " + sv.trnNm);
    console.log("FB " + sv.dstn);
    console.log("FB " + sv.ftt);
    console.log("FB " + sv.frq);

//variable storing snapshot values needed to be used for MomentsJS calculations
var firstTrainTime = sv.ftt;
console.log(sv.ftt);

    //create new row in table with variable
    var newRow = $("<tr>");
    
    //create new columns in table from snapshot values
    var td1 = $("<td>");
    td1.text(sv.trnNm);
    newRow.append(td1);

    var td2 = $("<td>");
    td2.text(sv.dstn);
    newRow.append(td2);

    var td3 = $("<td>");
    td3.text(sv.ftt);
    newRow.append(td3);

    var td4 = $("<td>");
    td4.text(sv.frq);
    newRow.append(td4);
});
