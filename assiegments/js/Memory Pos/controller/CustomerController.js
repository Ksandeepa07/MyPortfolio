
$("#customerSaveBtn").click(function () {
    let result = saveCustomer();
    if (result == true) {
        if(checkAll()){
            Swal.fire(
                'Customer Saved Sucessfully',
                'Customer has been Saved sucessfully..!',
                'success'
            )
            getAllCustomer();
           clearCustomerInputFields();
            doubleCLickDelete();
            customerbindEvents();
            loadCustomerIds();
        }
        
    }else{
        alert("Error! Try Again !")
        clearCustomerInputFields();
        doubleCLickDelete();
    }
})

$("#CustomerUpdateBtn").click(function () {
    let result = updateCustomer();
    if (result == true) {
        alert("Customer Updated Sucessfully!");
        getAllCustomer();
        clearCustomerInputFields();
        doubleCLickDelete();
        customerbindEvents();
    }else{
        alert("Error! Try Again !")
        clearCustomerInputFields();
        doubleCLickDelete();
    }
})

$("#customerDeleteBtn").click(function () {
    let result = deleteCustomer();
    if (result == true) {
        alert("Customer Deleted Sucessfully!");
        getAllCustomer();
        clearCustomerInputFields();
        doubleCLickDelete();
        customerbindEvents();
    }else{
        alert("Error! Try Again !")
        clearCustomerInputFields();
        doubleCLickDelete();
    }


})


$("#searcBtn").click(function () {
    setCustomerDataToTextFields();
})

function saveCustomer() {
    let cId = $("#cId").val();
    if (searchCustomer(cId.trim()) == undefined) {
        let cName = $("#cName").val();
        let cAddress = $("#cAddress").val();
        let cContact = $("#cContact").val();
        let cEmail = $("#cEmail").val();

        let newCustomer = Object.assign({}, Customer);

        newCustomer.id = cId;
        newCustomer.name = cName;
        newCustomer.address = cAddress;
        newCustomer.contact = cContact;
        newCustomer.email = cEmail;

        customerDB.push(newCustomer);
        // console.log(customerDB);
        
        
        return true;

    } else {
        alert("Customer Id Already exits!");
    }

}


function updateCustomer() {
    let cId = $("#cId").val();
    console.log(cId);

    if (searchCustomer(cId) == undefined) {
        alert("This Customer Id is not Available!");

    } else {
        let confirmation = confirm("Do you really want to update this customer ?");

        if (confirmation) {
            let cName = $("#cName").val();
            let cAddress = $("#cAddress").val();
            let cContact = $("#cContact").val();
            let cEmail = $("#cEmail").val();

            let customer = searchCustomer(cId);
            console.log("before c details", customer);
            customer.name = cName;
            customer.address = cAddress;
            customer.contact = cContact;
            customer.email = cEmail;

            console.log("new c details", customer);
          
            return true;
        }


    }

}

function deleteCustomer() {
    if (searchCustomer($("#cId").val()) == undefined) {
        alert("This Customer Id is not Available!");

    } else {

        let confirmation = confirm("Do you really want to delete this customer ?");
        if (confirmation) {
            let cId = $("#cId").val();
            for (let i = 0; i < customerDB.length; i++) {
                if (customerDB[i].id == cId) {
                    customerDB.splice(i, 1);
                    return true;
                }
            }
           
            return false;
        }


    }

}

function getAllCustomer() {
    $("#cTBody").empty();
    for (let i = 0; i < customerDB.length; i++) {
        let tRow = `<tr><td>${customerDB[i].id}</td>
        <td>${customerDB[i].name}</td>
        <td>${customerDB[i].address}</td>
        <td>${customerDB[i].contact}</td>
        <td>${customerDB[i].email}</td> </tr>`;
        $("#cTBody").append(tRow);
    }

}

function searchCustomer(id) {
    return customerDB.find(function (Customer) {
        return Customer.id == id;
    });

}

 


function setCustomerDataToTextFields() {

    if (searchCustomer($("#searchTxt").val()) == undefined) {
        alert("This Customer Id is not Available!");

    } else {
        let customer = searchCustomer($("#searchTxt").val());

        $("#cId").val(customer.id);
        $("#cName").val(customer.name);
        $("#cAddress").val(customer.address);
        $("#cContact").val(customer.contact);
        $("#cEmail").val(customer.email);
    }


}

customerbindEvents();
function customerbindEvents() {
    $("#cTBody>tr").click(function () {
      

        let id = $(this).children(":nth-child(1)").text();
        let name = $(this).children(":nth-child(2)").text();
        let adress = $(this).children(":nth-child(3)").text();
        let contact = $(this).children(":nth-child(4)").text();
        let email = $(this).children(":nth-child(5)").text();

        setCustomerTableDataToFileds(id, name, adress, contact, email);

    })
}

function setCustomerTableDataToFileds(id, name, address, contact, email) {
    $("#cId").val(id);
    $("#cName").val(name);
    $("#cAddress").val(address);
    $("#cContact").val(contact);
    $("#cEmail").val(email);

}

doubleCLickDelete();
function doubleCLickDelete() {
    $("#cTBody>tr").dblclick(function () {
        let cId = $(this).children(":nth-child(1)").text();

        let confirmation = confirm("Do you really want to delete this cusotmer?")
        if (confirmation) {
            for (let i = 0; i < customerDB.length; i++) {
                if (customerDB[i].id == cId) {
                    customerDB.splice(i, 1);
                    $(this).children().remove();
                    alert("Customer deleted sucssefully!");
                    console.log(customerDB);
                    clearInputFields();
                }
            }

        }


    })
}



// function clearInputFields() {
//     $("#cId").val("");
//     $("#cName").val("");
//     $("#cAddress").val("");
//     $("#cContact").val("");
//     $("#cEmail").val("");
// }
