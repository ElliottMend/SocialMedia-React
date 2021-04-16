const displayFullName = () => {
  var request = new XMLHttpRequest();

  request.open("GET", "http://localhost:5000/userEditLocation");

  request.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${this.responseText}&libraries=places`;
      script.async = true;
      document.body.append(script);
    }
  };

  request.send();
};
