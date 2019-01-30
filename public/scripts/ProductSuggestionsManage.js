function ajaxWithoutPromises(paramObject, successFunction, errorFunction) {
    
    // Create an XMLHttpRequest object, to do the Ajax request.
    var xhr = new XMLHttpRequest();

    // Hook up an "on OK" callback for the Ajax request.
    xhr.onload = function () {
        if (this.status >= 200 && this.status < 300) {
            // The Ajax request returned a "good" status code, so call the success function.
            successFunction(this.response);
        }
        else {
            // The Ajax request returned a "bad" status code, so call the error function.
            errorFunction(this.statusText);
        }
    };

    // Hook up an "on error" callback for the Ajax request.
    xhr.onerror = function () {
        // The Ajax request failed for some reason, so call the error function.
        errorFunction(this.statusText);
    };

    // Open the Ajax connecton.
    xhr.open(paramObject.method, paramObject.url);
        
    // Set the Content-Type request header.
    if (paramObject.contentType) {
        xhr.setRequestHeader("Content-type", paramObject.contentType);
    }

    // Do the Ajax request.
    xhr.send(paramObject.data);
}

function ajax(paramObject) {
    var promise = new Promise(function(resolve, reject){
        var xhr = new XMLHttpRequest();

        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(this.response);
            }
            else {
                reject(this.statusText);
            }
        };

        xhr.onerror = function () {
            reject(this.statusText);
        };

        xhr.open(paramObject.method, paramObject.url);

        if (paramObject.contentType) {
            xhr.setRequestHeader("Content-type", paramObject.contentType);
        }

        xhr.send(paramObject.data);
    });

    return promise;
}

// Send an Ajax request to GET a product suggestion.
function getProductSuggestion() {

    // If the user didn't enter an id, return immediately.
    var id = $("#id").val();
    if (id == "")
        return;

    // Clear all the text boxes.
    clearProductSuggestion();

    // Specify an Ajax request to GET a product suggestion with the specified id.
    var ajaxParamObject = {
        method: 'GET',
        url: "/product_suggestion/" + id
    };

    ajax(ajaxParamObject).then(function(data){
        displayProductSuggestion(data);
    }).catch(function(reason){
        displayError(reason);
    });
}


// Send an Ajax request to POST (insert) a product suggestion.
function insertProductSuggestion() {

    // Create a ProductSuggestion object, and set its properties based on user input. 
    var productSuggestion = {
        description: $("#description").val(),
        price: $("#price").val(),
    };

    // Specify an Ajax request to POST the object to the service. 
    var ajaxParamObject = {
        method: 'POST',
        url: '/product_suggestion',
        contentType: 'application/json',
        data: JSON.stringify(productSuggestion)
    };

    ajax(ajaxParamObject).then(function(data){
        displayProductSuggestion(data);
    }).then(function(){
        alert('Item inserted successfully');
    }).catch(function(reason){
        displayError(reason);
    });
}


// Send an Ajax request to PUT (update) a product suggestions.
function updateProductSuggestion() {

    var id = $("#id").val();
    if (id == "")
        return;

    // Create a ProductSuggestion object, and set its properties based on user input. 
    var productSuggestion = {
        id: id,
        description: $("#description").val(),
        price: $("#price").val(),
    };

    // Specify an Ajax request to PUT the object to the service. 
    var ajaxParamObject = {
        method: 'PUT',
        url: '/product_suggestion',
        contentType: 'application/json',
        data: JSON.stringify(productSuggestion)
    };

    ajax(ajaxParamObject).then(function(data){
        alert('Item updated successfully');
    }).catch(function(reason){
        displayError(reason);
    });
}


// Send an Ajax request to DELETE a product suggestion.
function deleteProductSuggestion() {

    // If the user didn't enter an id, return immediately.
    var id = $("#id").val();
    if (id == "")
        return;

    // Clear all the text boxes.
    clearProductSuggestion();

    // Specify an Ajax request to DELETE the product suggestion with the specified id.
    var ajaxParamObject = {
        method: 'DELETE',
        url: "/product_suggestion/" + id
    };

    ajax(ajaxParamObject).then(function(data){
        alert('Item deleted successfully');
    }).catch(function(reason){
        displayError(reason);
    });
}


// Helper function, to clear the text boxes.
function clearProductSuggestion() {
    $("#id").val("");
    $("#description").val("");
    $("#price").val("");
}


// Helper function, to display a product suggestion object in the text boxes.
function displayProductSuggestion(jsonProductSuggestion) {

    var productSuggestion = JSON.parse(jsonProductSuggestion);

    if (productSuggestion === null) {
        alert("Could not get item");
    }
    else {
        $("#id").val(productSuggestion.id);
        $("#description").val(productSuggestion.description);
        $("#price").val(productSuggestion.price);
    }
}


// Helper function, to display an error message.
function displayError(message) {
    alert("Ajax error: " + message);
}
