//jshint esversion:6
$(document).ready(function() {

});
// Your web app's Firebase configuration
const firebaseConfig = {
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

var loaded = false;
var faltasRef = [];
var valoracionRef = [];

console.log(causaID);
firebase.auth().onAuthStateChanged(function(user) {
  if (user && !loaded) {
    $("#iduid").val(user.uid);
    $("#namesuid").val(user.uid);
    var storage = firebase.storage().ref();

    var listRef = storage.child(causaID).child("faltas");

  var newRef = storage.child(causaID).child("valoracion").listAll().then(function(res){
      res.items.forEach(function(itemRef){
        valoracionRef.push(itemRef);
      });
    }).then(function(){
      listRef.listAll().then(function(res){
        res.items.forEach(function(itemRef){
          faltasRef.push(itemRef);
        });
      }).then(function(){
        loaded = true;
        setValoracion();
        setFaltas();
        setCards();
      });

    });
  } else
    location.href = "/";
});

function getUserInfo(){
  console.log(faltasRef);
}

function setCards(){
  firebase.firestore().collection('reos').doc("jbTfyaWZhT19yzK2Lymc").collection('causas').doc(causaID).get().then(function(snap){
    console.log(snap.data());
    const reo = snap.data();
    //set names
    $('#namesTag').text(reo.nombres);
    //set regimen
    if (reo.regimen == "sa"){
      $("#regimenTag").text("Semi Abierto");
        $('#idTag').text("SA-" + reo.causaID);
      }
    else {
      $("#regimenTag").text("Abierto");
      $('#idTag').text("A-" + reo.id);
    }
    //set dates
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const fechaDeSalida = new Date(reo.salida.seconds * 1000);
    const fechaDeEntrada = new Date(reo.entrada.seconds * 1000);
    $('#dateRange').text(fechaDeEntrada.toLocaleDateString('es-EC', options) + " - " + fechaDeSalida.toLocaleDateString('es-EC', options));
    const hoy = Date.now();
    const datePercent = ((hoy - reo.entrada.seconds*1000) / (reo.salida.seconds*1000 - reo.entrada.seconds*1000)) * 100;
    $('#datePercent').text(Math.floor(datePercent) + "%");
    $('#dateProgressBar').css("width", Math.floor(datePercent) + "%");
  });
}

function setFaltas(){
  //set faltas
  if(faltasRef.length == 0){
    $('#faltasCard').append(
      `<i class="far fa-check-circle fa-7x" style="color:#4BB543;"></i>`
    );
  } else if (faltasRef.length <= 3){
    $('#faltasCard').append(
      `<i class="fas fa-exclamation-circle fa-7x my-2" style="color:#ffcc00"></i>
       <h5>`+ faltasRef.length +` faltas</h5>`
    );
  } else if(faltasRef.length >= 5) {
    $('#faltasCard').append(
      `<i class="fas fa-exclamation-circle fa-7x my-2" style="color:#cc3300"></i>
       <h5>`+ faltasRef.length +` faltas</h5>`
    );
  }
  //set faltas modal
  if(faltasRef.length > 0){
    $('#modalFaltasList').empty();
    faltasRef.forEach(element =>
      element.getDownloadURL().then(function(url){
          $('#modalFaltasList').append(
            `<a href="`+ url +`" target="_blank" class="list-group-item list-group-item-action">
                `+element.name+`
             </a>`);
      })
    );
  }
}

function setValoracion(){
  console.log(valoracionRef.length);
  if(valoracionRef.length > 0){
    $('#modalValoracionList').empty();
    valoracionRef.forEach(element =>
      element.getDownloadURL().then(function(url){
          $('#modalValoracionList').append(
            `<a href="`+ url +`" target="_blank" class="list-group-item list-group-item-action">
                `+element.name+`
             </a>`);
      })
    );
  }
}

function SignOut(){
  firebase.auth().signOut();
}
