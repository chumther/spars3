//jshint esversion: 6
$(document).ready(function() {

});
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBvI8JkyKQ7Gh5xShDnpX9OszM1lnfavsQ",
  authDomain: "spars-c8ab5.firebaseapp.com",
  databaseURL: "https://spars-c8ab5.firebaseio.com",
  projectId: "spars-c8ab5",
  storageBucket: "spars-c8ab5.appspot.com",
  messagingSenderId: "922328466324",
  appId: "1:922328466324:web:d7ca1bb83c368b214bc581"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

firebase.auth().onAuthStateChanged(function(user) {
  if(user){
    $("#iduid").val(user.uid);
    $("#namesuid").val(user.uid);
    populateResults();
  } else {
    location.href = "/";
  }
});

function populateResults() {
  const data = [];
  const dataId = [];
  const idQuery = db.collection("reos").where("id", "==", reoID);
  const nameQuery = db.collection("reos").where("nombres", ">", reoNombres).where('nombres', '<=', reoNombres +'\uf8ff');
  const query = searchType == "id" ? idQuery : nameQuery;
  console.log(query);
  query.get().then(function(snapshot){
    snapshot.forEach(function(doc){
      data.push(doc.data());
      dataId.push(doc.id);
    });
  }).catch(function(error){
    alert(error.message);
  }).then(function(){
    $("#resultQuantity").text(data.length + " resultados");
    $("#list").empty();
    for (var i = 0; i < data.length; i++) {
      var regimen;
      if(data[i].regimen == "SA"){
        regimen = "Regimen Semi Abierto";
      } else regimen = "Regimen Abierto";

      const x = `<a href="/search/`+ dataId[i] + `" class="list-group-item list-group-item-action">
                    <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">`+ data[i].nombres +`</h5>
                    </div>
                    <p class="mb-1">ID: `+ data[i].id +`</p>
                    <small class="text-muted">` + "3 casos" + `</small>
                  </a>`;
      $("#list").append(x);
    }
  });
}

function SignOut(){
  firebase.auth().signOut();
}
