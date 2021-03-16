const displayFullName = () => {
  // Creating the XMLHttpRequest object
  var request = new XMLHttpRequest();

  // Instantiating the request object
  request.open("GET", "http://localhost:5000/userEditLocation");

  // Defining event listener for readystatechange event
  request.onreadystatechange = function () {
    // Check if the request is compete and was successful
    if (this.readyState === 4 && this.status === 200) {
      // Inserting the response from server into an HTML element
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${this.responseText}&libraries=places`;
      script.async = true;
      document.body.append(script);
    }
  };

  // Sending the request to the server
  request.send();
};
