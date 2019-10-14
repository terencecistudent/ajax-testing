/*--------------------------------------------getData function -----*/
function getData(url, cb) {
    /* XMLHttpRequest object is an inbuilt object that JavaScript provides
    to allow us to consume APIs. */
    // Gives us the method to open connections, to send connections, and close them.
    var xhr = new XMLHttpRequest();

    // Opening connection.
    xhr.open("GET", url);
    xhr.send();

    // Change that by JSON.parse(); - check console in inspect.
    xhr.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            // cb stands for callbacks.
            cb(JSON.parse(this.responseText));
        }
    };
}

function getTableHeader(obj) {
    var tableHeaders = [];

    Object.keys(obj).forEach(function(key) {
        tableHeaders.push(`<td>${key}</td>`);
    });

    return `<tr>${tableHeaders}</tr>`;
}

// Takes 2 arguments, nexr and previous.
/*--------------------------------------------generatePaginationButtons function -----*/
function generatePaginationButtons(next, prev) {
    // If next and previous values exist, return both buttons.
    if(next && prev){
        return `<button onclick="writeToDocument('${prev}')">Previous</button>
               <button onclick="writeToDocument('${next}')">Next</button>`;
    // If next but not previous, return next button.
    } else if (next && !prev) {
        return `<button onclick="writeToDocument('${next}')">Next</button>`;
    // If previous but not next, return previous button.
    } else if (!next && prev) {
        return `<button onclick="writeToDocument('${prev}')">Previous</button>`;
    }
}

// Parameter type means type from api.
// console.dir - dir stands for directory.
/*--------------------------------------------writeToDocument function -----*/
function writeToDocument(url) {
    var tableRows = [];
    var el = document.getElementById("data");
    el.innerHTML = "";

    getData(url, function(data) {
        // Pagination variable.
        var pagination;
        if (data.next || data.previous) {
            pagination = generatePaginationButtons(data.next, data.previous)
        }

        data = data.results;
        var tableHeaders = getTableHeader(data[0]);

        data.forEach(function(item) {
            var dataRow = [];

            Object.keys(item).forEach(function(key) {
                // Going to be set to the value of the key and will be a string.
                var rowData = item[key].toString();

                // Going to be equal to a substring of our rowData.
                // Will just take the first 15 characters from our rowData.
                var truncatedData = rowData.substring(0, 15);

                dataRow.push(`<td>${truncatedData}</td>`);
            })
            tableRows.push(`<tr>${dataRow}</tr>`);
        });

        el.innerHTML = `<table>${tableHeaders}${tableRows}</table>${pagination}`.replace(/,/g, "");
    });
}