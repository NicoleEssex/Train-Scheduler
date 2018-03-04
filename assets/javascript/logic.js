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

// Set Variables
var database = firebase.database();
var minAway;
//set listener for submit button
$(document).on("click", "#submit-button", function () {

    event.preventDefault();
//capture input values 
    var trnNm = $("#train").val().trim();
    $("#train").val(""); 
    console.log(trnNm);

    var dstn = $("#dstntn").val().trim();
    $("#dstntn").val("");  
    console.log(dstn);

    var ftt = $("#frstTrnTm").val().trim();
    $("#frstTrnTm").val("");   
    console.log(ftt);

    var frq = $("#frqncy").val().trim();
    $("#frqncy").val("");  
    console.log(frq);

    var mnwy = ftt

    //store input values to firebase
    database.ref().push({
        trnNm: trnNm,
        dstn: dstn,
        ftt: ftt,
        frq: frq,
        mnwy: mnwy,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
});
database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
    
    // storing the snapshot.val() in a variable for convenience
    var sv = snapshot.val();
    
    // Console.logging the last train's data
    console.log("FB " + sv.trnNm);
    console.log("FB " + sv.dstn);
    console.log("FB " + sv.ftt);
    console.log("FB " + sv.frq);
    
    //create new row in table
    var newRow = $("<tr>");
    
    //create new columns in table
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

    var td5 = $("<td>");
    td5.text(sv.mnwy);
    newRow.append(td5);

    //append all new rows to table
    $("#table").append(newRow);    

});
