function PostDataRedirect(dataName, data, location) {
  var form = document.createElement("form");
  form.method = "POST";
  form.action = location;
  if (data.constructor === Array && dataName.constructor === Array) {
    for (var i = 0; i < data.length; i++) {
      var element = document.createElement("input");
      element.type = "hidden";
      element.value = data[i];
      element.name = dataName[i];
      form.appendChild(element);
    }
  } else {
    var element1 = document.createElement("input");
    element1.type = "hidden";
    element1.value = data;
    element1.name = dataName;
    form.appendChild(element1);
  }
  document.body.appendChild(form);
  form.submit();
}
