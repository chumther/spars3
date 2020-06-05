//jshint esversion:6
$("#causas-list").empty();

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

  const causasQuery = db.collection("reos").doc("jbTfyaWZhT19yzK2Lymc").collection("causas").get().then(function(snap){
    snap.forEach(function(doc){
      data.push(doc.data());
      dataId.push(doc.id);
      console.log(dataId[0]);
    });
  }).catch(function(error){
    alert(error.message);
  }).then(function(){
$("#resultQuantity").text(data.length + " causas");

    for(var i = 1; i <= data.length; i++){
        $("#causas-list").append(
          `              <a href="/causaquery/` + "jbTfyaWZhT19yzK2Lymc" + `/` + dataId[i-1] +`" class="card causas-card list-group-item-action">
                          <div class="card-header">
                            ` + data[i-1].causaID +`
                          </div>
                          <div class="card-body">
                        `+ data[i-1].causa.toUpperCase() +`
                          </div>
                        </a>`
        );
    }
  });
}
