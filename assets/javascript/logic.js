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
var database = firebase.database();

//Set listener for submit button
$("#submit-button").on("click", function (event) {

    event.preventDefault();

    
//Capture input values 
    var trnNm = $("#train").val().trim();
    $("#train").val(""); 

    var dstn = $("#dstntn").val().trim();
    $("#dstntn").val("");  

    var ftt = $("#frstTrnTm").val().trim();
    $("#frstTrnTm").val("");    
   

    var frq = $("#frqncy").val().trim();
    $("#frqncy").val("");  

//Store input values to firebase
    database.ref().push({
        trnNm: trnNm,
        dstn: dstn,
        ftt: ftt,
        frq: frq,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
});

//Create Firebase event for adding train to the database and adding it to the html table from the user inputs.
database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
    
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

//TO DO:
// Use MomentsJS to calculate what time the Next Train Arrives based on the frequency of the train and what it's first time was.
var difference = (sv.ftt);
var milDif = moment(difference);
console.log(milDif);

// Use Moments JS to calculate how many minutes away the Next Train Arrival time is.

var fttMin = moment.unix(sv.ftt).format('HH:mm','minutes');
console.log(fttMin);    

    // var timeDif = 
    //     moment().diff(moment.unix(sv.ftt));
    //     console.log(timeDif);

    // var nxtRvl = moment().format('HH:mm');
    // $("#nxtRvl").text(nxtRvl);

    // var mnsWy = $("#mnsWy").val().trim()
    // // td5.text(sv.nxtRvl);
    // newRow.append(td5);
    
    // var td6 = $("<td>");
    // td6.text(sv.mnsWy)
    // newRow.append(td6);

    //append all new rows to table
    $("#table").append(newRow);    

});
var CurrentTime = (moment().format('HH:mm'));
var NextTrain = ("");
//practice calling current time and writing to html
var now = (moment().format('HH:mm'));
console.log(moment().format('HH:mm'));	
$("#p").text(now);

// convert now variable to minutes
var minCon = (moment.unix(now));


var breakfast = moment('8:32','HH:mm');
var lunch = moment('12:52','HH:mm');
console.log( moment.duration(lunch - breakfast).humanize() + ' between meals' )
