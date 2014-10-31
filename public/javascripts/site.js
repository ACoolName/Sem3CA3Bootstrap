function populateProductsTable(catId) {

    if (catId == null) {
        // Empty content string
        var tableContent = '';
        // jQuery AJAX call for JSON
        $.getJSON('/json/products', function (data) {
            function compare(a, b) {
                if (a._id < b._id)
                    return -1;
                if (a._id > b._id)
                    return 1;
                return 0;
            }
            console.log(data);
            data.sort(compare);
            $.each(data, function () {
                tableContent += '<tr>';
                tableContent += '<td>' + this._id + '</td>';
                tableContent += '<td>' + this.name + '</td>';
                tableContent += '<td>' + this.categoryId + '</td>';
                tableContent += '<td>' + this.unitPrice + '</td>';
                tableContent += '<td>' + this.unitsInStock + '</td>';
                tableContent += '<td>' + this.quantityPerUnit + '</td>';
                tableContent += '<td>' + this.unitsOnOrder + '</td>';
                tableContent += '<td>' + this.reorderLevel + '</td>';
                tableContent += '</tr>';
            });
            // Inject the whole content string into our existing HTML table
            $('#productsViewer table tbody').html(tableContent);
        });
    }
    else{
        // Empty content string
        var tableContent = '';
        // jQuery AJAX call for JSON
        $.getJSON('/json/products/'+catId, function (data) {
            function compare(a, b) {
                if (a._id < b._id)
                    return -1;
                if (a._id > b._id)
                    return 1;
                return 0;
            }
                console.log(data);
           // data.sort(compare);
            $.each(data, function () {
                tableContent += '<tr>';
                tableContent += '<td>' + this._id + '</td>';
                tableContent += '<td>' + this.name + '</td>';
                tableContent += '<td>' + this.categoryId + '</td>';
                tableContent += '<td>' + this.unitPrice + '</td>';
                tableContent += '<td>' + this.unitsInStock + '</td>';
                tableContent += '<td>' + this.quantityPerUnit + '</td>';
                tableContent += '<td>' + this.unitsOnOrder + '</td>';
                tableContent += '<td>' + this.reorderLevel + '</td>';
                tableContent += '</tr>';
            });
            // Inject the whole content string into our existing HTML table
            $('#productsViewer table tbody').html(tableContent);
        });
    }
}

function populateCategoryTable() {
    // Empty content string
    var tableContent = '';
    // jQuery AJAX call for JSON
    $.getJSON('/json/categories/', function (data) {
        function compare(a, b) {
            if (a._id < b._id)
                return -1;
            if (a._id > b._id)
                return 1;
            return 0;
        }

        data.sort(compare);
        $.each(data, function () {
            tableContent += '<tr' + ' onclick=' + '"location.href=' + "'/products/category/" + this._id + "'" + '"' + '>';
            tableContent += '<td>' + this._id + '</td>';
            tableContent += '<td>' + this.name + '</td>';
            tableContent += '<td>' + this.description + '</td>';
            tableContent += '</tr>';
        });
        // Inject the whole content string into our existing HTML table
        $('#productsViewer table tbody').html(tableContent);
    });
}

function populateCustomersTable() {
    // Empty content string
    var tableContent = '';
    // jQuery AJAX call for JSON
    $.getJSON('/json/customers/', function (data) {
        function compare(a, b) {
            if (a._id < b._id)
                return -1;
            if (a._id > b._id)
                return 1;
            return 0;
        }

        data.sort(compare);
        $.each(data, function () {
            tableContent += '<tr' + ' onclick=' + '"location.href=' + "'/customers/" + this._id + "'" + '"' + '>';
            tableContent += '<td>' + this._id + '</td>';
            tableContent += '<td>' + this.companyName + '</td>';
            tableContent += '<td>' + this.contactName + '</td>';
            tableContent += '</tr>';
        });
        // Inject the whole content string into our existing HTML table
        $('#customerViewer table tbody').html(tableContent);
    });
}

function editAndDelete() {
    var tableContent = '';
    tableContent += '<td>' + '<button type="button" class="btn btn-default btn-lg"><span class="glyphicon glyphicon-edit"></span></button>' + '</td>';
    tableContent += '<td>' + '<button type="button" class="btn btn-default btn-lg"><span class="glyphicon glyphicon-remove-circle"></span></button>' + '</td>';
    return tableContent;
}

function goBack() {
    window.history.back();
}

function populateEmployeesTable() {
    // Empty content string
    var tableContent = '';
    // jQuery AJAX call for JSON
    $.getJSON('/json/employee', function (data) {
        function compare(a, b) {
            if (a._id < b._id)
                return -1;
            if (a._id > b._id)
                return 1;
            return 0;
        }

        data.sort(compare);
        $.each(data, function () {
            tableContent += '<tr' + ' onclick=' + '"location.href=' + "'/employee/" + this._id + "'" + '"' + '>';
            tableContent += '<td>' + this._id + '</td>';
            tableContent += '<td>' + this.lastName + '</td>';
            tableContent += '<td>' + this.firstName + '</td>';
            tableContent += '<td>' + this.title + '</td>';
        });
        // Inject the whole content string into our existing HTML table
        $('#employeesViewer table tbody').html(tableContent);
    });
}

function populateOrderTable() {
    // Empty content string
    var tableContent = '';
    // jQuery AJAX call for JSON
    $.getJSON('/json/order', function (data) {
        function compare(a, b) {
            if (a._id > b._id)
                return -1;
            if (a._id < b._id)
                return 1;
            return 0;
        }

        data.sort(compare);
        $.each(data, function () {
            tableContent += '<tr>';
            tableContent += '<td><a href="order/' + this._id + '">' + this._id + '</a></td>';
            tableContent += '<td>' + this.orderDate + '</td>';
            tableContent += '<td>' + this.shipName + '</td>';
            tableContent += '<td>' + this.shipAddress + '</td>';
            tableContent += editAndDelete();
            tableContent += '</tr>';
        });
        // Inject the whole content string into our existing HTML table
        $('#orderViewer table tbody').html(tableContent);
    });
}

function fillOrderDetails() {
    // Empty content string
    var tableContent = '';
    // jQuery AJAX call for JSON
    var path = window.location.pathname.split('/');
    $.getJSON('/orderdetails/' + path[2], function (data) {
        $("#ID").text("ID: " + data.order._id);
        $("#date").text("Date: " + data.order.orderDate);
        $("#requ").text("Required: " + data.order.requiredDate);
        $("#ship").text("Shipped: " + data.order.shippedDate);
        $("#employee").text(data.employee.firstName + ' ' + data.employee.lastName).prop('href', '/employee/' + data.employee._id);
        $("#name").text(data.customer.companyName).prop('href', '/customers/' + data.customer._id);
        $("#addr").text("Address: " + data.customer.address)
        $("#zip").text("Post Code: " + data.customer.postalCode);
        $("#country").text("Country: " + data.customer.country);

        //solution: get all the info from the data
        //each piece of info will be a paragraph handled in the javascript
        //the paragraphs will be "hard coded" p1 = "ID: " + data.id;
        //gl hf
        var total = 0;
        $.each(data.orderDetails, function (index, value) {
            total += (value.unitPrice - value.unitPrice * value.discount) * value.quantity;
            tableContent += '<tr>';
            tableContent += '<td>' + data.products[value.productId].name + '</td>';     //this needs to be changed to product name after Tobias' push and our merge
            tableContent += '<td>' + value.unitPrice.toFixed(2) + '</td>';
            tableContent += '<td>' + value.quantity + '</td>';
            tableContent += '<td>' + value.discount.toFixed(2) + '</td>';
            tableContent += '<td>' + ((value.unitPrice - value.unitPrice * value.discount) * value.quantity).toFixed(2) + '</td>';
            tableContent += '</tr>';
        });
        tableContent += '<tr>';
        tableContent += '<td>' + 'Total:' + '</td>';
        tableContent += '<td> </td>';
        tableContent += '<td> </td>';
        tableContent += '<td> </td>';
        tableContent += '<td>' + total.toFixed(2) + ' </td>';
        tableContent += '</tr>';
        $('#productsViewer table tbody').html(tableContent);
    });
}

function getDetailsAboutEmployee() {
    var ar = document.URL.split('/');
    var id = ar[ar.length - 1];
    $.getJSON('/json/employee/' + id, function (data) {
        var add = "";
        add += "<tr>";
        add += "<td>First Name: </td>";
        add += "<td>" + data.firstName + "</td>";
        add += "</tr>";
        add += "<tr>";
        add += "<td>Last Name: </td>";
        add += "<td>" + data.lastName + "</td>";
        add += "</tr>";
        add += "<tr>";
        add += "<td>City: </td>";
        add += "<td>" + data.city + "</td>";
        add += "</tr>";
        add += "<tr>";
        add += "<td>Address: </td>";
        add += "<td>" + data.address + "</td>";
        add += "</tr>";
        add += "<tr>";
        add += "<td>Region: </td>";
        add += "<td>" + data.region + "</td>";
        add += "</tr>";
        add += "<tr>";
        add += "<td>Postal Code: </td>";
        add += "<td>" + data.postalCode + "</td>";
        add += "</tr>";
        add += "<tr>";
        add += "<td>Country: </td>";
        add += "<td>" + data.country + "</td>";
        add += "</tr>";
        add += "<tr>";
        add += "<td>Phone: </td>";
        add += "<td>" + data.homePhone + "</td>";
        add += "</tr>";
        add += "<tr>";
        add += "<td>Title: </td>";
        add += "<td>" + data.title + "</td>";
        add += "</tr>";
        add += "<tr>";
        add += "<td>Title of Courtesy: </td>";
        add += "<td>" + data.titleOfCourtesy + "</td>";
        add += "</tr>";
        add += "<tr>";
        add += "<td>Birth Date: </td>";
        add += "<td>" + data.birthDate + "</td>";
        add += "</tr>";
        add += "<tr>";
        add += "<td>Hire Date: </td>";
        add += "<td>" + data.hireDate + "</td>";
        add += "</tr>";
        add += "<tr>";
        add += "<td>Extension: </td>";
        add += "<td>" + data.extension + "</td>";
        add += "</tr>";
        add += "<tr>";
        add += "<td>Notes: </td>";
        add += "<td>" + data.notes + "</td>";
        add += "</tr>";
        $('#userTable table tbody').html(add);
    })
}

function getDetailsAboutUser() {

    var ar = document.URL.split('/');
    var id = ar[ar.length - 1];
    var idOfCust;

    $.getJSON('/json/customers/' + id, function (data) {
        var add = "";
        add += "<tr>";
        add += "<td>Name: </td>";
        add += "<td>" + data._id + "</td>";
        idOfCust=data._id;
        add += "</tr>";
        add += "<tr>";
        add += "<td>City: </td>";
        add += "<td>" + data.city + "</td>";
        add += "</tr>";
        add += "<tr>";
        add += "<td>Address: </td>";
        add += "<td>" + data.address + "</td>";
        add += "</tr>";
        add += "<tr>";
        add += "<td>Region: </td>";
        add += "<td>" + data.region + "</td>";
        add += "</tr>";
        add += "<tr>";
        add += "<td>Postal Code: </td>";
        add += "<td>" + data.postalCode + "</td>";
        add += "</tr>";
        add += "<tr>";
        add += "<td>Country: </td>";
        add += "<td>" + data.country + "</td>";
        add += "</tr>";
        add += "<tr>";
        add += "<td>Phone: </td>";
        add += "<td>" + data.phone + "</td>";
        add += "</tr>";
        add += "<tr>";
        add += "<td>Fax: </td>";
        add += "<td>" + data.fax + "</td>";
        add += "</tr>";
        add += "<tr>";
        add += "<td>Company name: </td>";
        add += "<td>" + data.companyName + "</td>";
        add += "</tr>";
        add += "<tr>";
        add += "<td>Contact name: </td>";
        add += "<td>" + data.contactName + "</td>";
        add += "</tr>";
        add += "<tr>";
        add += "<td>Contact title: </td>";
        add += "<td>" + data.contactTitle + "</td>";
        add += "</tr>";

        $('#user table tbody').html(add);
        $.getJSON('/orderdetails/customer/' + idOfCust, function (data) {
            console.log(idOfCust)
            console.log(data);
            var tableContent="";
            $.each(data, function (index, value) {
                tableContent += '<tr>';
                tableContent += '<td>' + value._id + '</td>';     //this needs to be changed to product name after Tobias' push and our merge
                tableContent += '<td>' + value.employeeId + '</td>';
                tableContent += '<td>' + value.orderDate + '</td>';
                tableContent += '<td>' + value.requiredDate + '</td>';
                tableContent += '<td>' + value.shippedDate + '</td>';
                tableContent += '<td>' + value.shipVia + '</td>';
                tableContent += '<td>' + value.freight + '</td>';
                tableContent += '<td>' + value.shipName + '</td>';
                tableContent += '<td>' + value.shipAddress + '</td>';
                tableContent += '<td>' + value.shipCity + '</td>';
                tableContent += '<td>' + value.shipRegion + '</td>';
                tableContent += '<td>' + value.shipPostalCode + '</td>';
                tableContent += '<td>' + value.shipCountry + '</td>';
                tableContent += '</tr>';
            });
            console.log(tableContent);
            $('#orderViewer table tbody').html(tableContent);
        });
    });
    console.log(idOfCust);


}