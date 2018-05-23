
// Initialize Firebase
  
var config = {
  apiKey: "AIzaSyAtUXIVahoVHgv0Fc1HzeBwYZZHCkUG3eE",
  authDomain: "train-schedule-496c7.firebaseapp.com",
  databaseURL: "https://train-schedule-496c7.firebaseio.com",
  projectId: "train-schedule-496c7",
  storageBucket: "",
  messagingSenderId: "60943899135",
};
firebase.initializeApp(config);

  //Set Firebase variable.
var database = firebase.database();
var connectionsRef = database.ref("/trains");


//Listener for submit button.
$("#addTrainBtn").on("click", function(event){
    event.preventDefault();
    $("#tableBody").html("");
    //Capture values from user input.
    var trainName = $("#trainNameInput").val().trim();
    var destinationInput = $("#destinationInput").val().trim();
    var frequencyInput = $("#frequencyInput").val().trim();
    var firstTrainInput = moment($("#firstTrainInput").val().trim(),"HH:mm")
    .subtract(10, "years").format("x");

    //Store user input to Firebase
    connectionsRef.push({
        Name: trainName,
        Destination: destinationInput,
        FirstTrain: firstTrainInput,
        Frequency: frequencyInput,
    });
    
    //Clears user input once pushed to Firebase
    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#firstTrainInput").val("");
    $("#frequencyInput").val("");
  
    connectionsRef.orderByChild("dateAdded").on("child_added", function(snapshot){
        var snapshot = snapshot.val();
        console.log(snapshot);
    
    //Storing Snapshot values from firebase to variables.
    var name = snapshot.Name;
    var destination = snapshot.Destination;
    var firstTrain = snapshot.FirstTrain;
    var frequency = snapshot.Frequency;

    //Calculating train specifics.
    var remainder = moment().diff(moment.unix(firstTrain),"minutes")%frequency;
    var minutes = frequency - remainder;
    var minutesAway = ((remainder)* -1);
    var arrival = moment().add((minutes+1),"m").format("hh:mm A");
    

    //Displaying data to html.

    $("#tableBody")
    .append($('<tr>')
        .append($("<td>"+name+"</td><td>"+destination+"</td><td>"+frequency+"</td><td>"+arrival+"</td><td>"+minutesAway+"</td>")));
});
})