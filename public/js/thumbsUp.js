function thumbsUp(uuid) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById(uuid).innerHTML = this.responseText
    }
  };
  xhttp.open("POST", "thumbsUp", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("uuid=" + uuid);
}