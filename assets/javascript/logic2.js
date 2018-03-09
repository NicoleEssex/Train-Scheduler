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

//Create a variable to reference the database
var database = firebase.database();


//Set listener for submit button
$("#submit-button").on("click", function (event) {

    event.preventDefault();
  
    //Capture user input
    var trainNameInput = $("#train").val().trim();
    var destinationInput = $("#dstntn").val().trim();
    var firstTrainTimeInput = $("#frstTnTm").val();
    var frequencyInput = $("#frqncy").val().trim();

    //Create local object to hold train data
    var newTrain = {
        name: trainNameInput,
        destination: destinationInput,
        first: firstTrainTimeInput,
        frequency: frequencyInput
    };
    
//Upload train data to Firebase
database.ref().push(newTrain);

//Logs everything to console
console.log(newTrain.name);
console.log(newTrain.destination);
console.log(newTrain.first);
console.log(newTrain.frequency);


});


