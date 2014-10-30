function populateProductsTable() {
    // Empty content string
    var tableContent = '';
    // jQuery AJAX call for JSON
    $.getJSON( '/products/all', function( data ) {
        function compare(a,b) {
            if (a._id < b._id)
                return -1;
            if (a._id > b._id)
                return 1;
            return 0;
        }
        data.sort(compare);
        $.each(data, function(){
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

function populateCustomersTable() {
    // Empty content string
    var tableContent = '';
    // jQuery AJAX call for JSON
    $.getJSON('/customer/', function( data ) {
        function compare(a,b) {
            if (a._id < b._id)
                return -1;
            if (a._id > b._id)
                return 1;
            return 0;
        }
        data.sort(compare);
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td>' + this._id + '</td>';
            tableContent += '<td>' + this.companyName + '</td>';
            tableContent += '<td>' + this.contactName + '</td>';
            tableContent += '<td>' + this.contactTitle + '</td>';
            tableContent += '<td>' + this.address + '</td>';
            tableContent += '<td>' + this.city + '</td>';
            tableContent += '<td>' + this.region + '</td>';
            tableContent += '<td>' + this.postalCode + '</td>';
            tableContent += '<td>' + this.country + '</td>';
            tableContent += '<td>' + this.phone + '</td>';
            tableContent += '<td>' + this.fax + '</td>';
            tableContent += '</tr>';
        });
        // Inject the whole content string into our existing HTML table
        $('#customerViewer table tbody').html(tableContent);
    });
}


