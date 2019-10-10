/* XMLHttpRequest object is an inbuilt object that JavaScript provides
to allow us to consume APIs. */
// Gives us the method to open connections, to send connections, and close them.
var xhr = new XMLHttpRequest();

var data;

// Opening connection.
xhr.open("GET", "https://www.swapi.co/api/");

xhr.send();

// Is not json, is a string.
// Change that by JSON.parse(); - check console in inspect.
xhr.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
        data = this.responseText;
    }
};
console.log(data);