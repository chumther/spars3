//jshint esversion:6
var firebaseConfig = {
  apiKey: "AIzaSyBvI8JkyKQ7Gh5xShDnpX9OszM1lnfavsQ",
  authDomain: "spars-c8ab5.firebaseapp.com",
  databaseURL: "https://spars-c8ab5.firebaseio.com",
  projectId: "spars-c8ab5",
  storageBucket: "spars-c8ab5.appspot.com",
  messagingSenderId: "922328466324",
  appId: "1:922328466324:web:d7ca1bb83c368b214bc581"
};

//Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

$("#form").submit(function(event){
  
  let nombre = $("#nombres").val();
  let id = $("#id").val();

  db.collection("reos").doc().set({
      nombres: nombre,
      id: id
  })
  .then(function() {
      console.log("Document successfully written!");
  })
  .catch(function(error) {
      console.error("Error writing document: ", error);
  });
  event.preventDefault();
});
