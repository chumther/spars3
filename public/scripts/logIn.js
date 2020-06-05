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

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    PostDataRedirect(["user"], [user.uid], "/");
  }
});

$("#logInButton").click(function(){
  SignIn();
});

$("#logInForm").keypress(function(e){
  if(e.keyCode == 13){
    SignIn();
  }
});

function SignIn(){
  const email = $('#inputEmail').val();
  const password = $('#inputPassword').val();
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    alert(error.message);
  });
}
