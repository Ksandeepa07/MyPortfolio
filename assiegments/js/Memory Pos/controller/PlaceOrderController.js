
let addToCartArray = [];
let newTotal;
let total;

$("#orderId").val(splitOrderId(orderDB[orderDB.length-1]));

function loadCustomerIds() {
    $("#customerIdCmb").empty();
    for (let i = 0; i < customerDB.length; i++) {
        console.log(customerDB[i].id);
        let option = `<option>${customerDB[i].id}</option>`;
        $("#customerIdCmb").append(option);
    }
}

$("#customerIdCmb").click(function () {
    console.log($("#customerIdCmb").val());

    let customer = searchCustomer($("#customerIdCmb").val());
    console.log(customer.name);
    $("#cmbCustomerName").val(customer.name);
    $("#cmbCustomerContact").val(customer.contact);
    $("#cmbCustomerEmail").val(customer.email);
})

function loadItemIds() {
    $("#itemIdCmb").empty();
    for (let i = 0; i < itemDB.length; i++) {
        let option = `<option>${itemDB[i].id}</option>`;
        $("#itemIdCmb").append(option);
    }

}

$("#itemIdCmb").click(function () {
    let item = searchItem($("#itemIdCmb").val());
    $("#itemNameCmb").val(item.name);
    $("#itemPriceCmb").val(item.unitPrice);
    // $("#itemNameCmb").val(item.name);
    $("#itemTypeCmb").val(item.type);
    // $("#itemQtyCmb").val(item.qty);

})



$("#addToCart").click(function () {

    if ($("#itemNameCmb").val().length === 0 |
        $("#itemPriceCmb").val().length === 0 | $("#itemTypeCmb").val().length === 0) {
        alert("please fill out all empty fields !");


    } else {
        if ($("#itemQtyCmb").val().length === 0) {
            $("#qtyWarningLbl").css({
                "color": "red",
                "font-size": "14px"
            });

        } else {
            let item=searchItem($("#itemIdCmb").val());
            console.log(item.qty);
            if($("#itemQtyCmb").val()<=item.qty){
                setPlaceOrderDetails();
            }else{
                alert("not sufficient qty !");
            }
            

        }

    }



    // if ($('#placeOrderTbody>tr').length === 0) {

    // }
    // else {
    //     for (let i = 0; i <= ln.length; i++) {

    //         if ($("#placeOrderTbody>tr")[i].children(":nth-child(1)").text() == $("#itemIdCmb").val()) {
    //             alert("found");
    //             break;

    //         } else {
    //           setPlaceOrderDetails();
    //         }

    //     }

    // }

})



function setPlaceOrderDetails() {
    total = (parseFloat($("#itemPriceCmb").val()) * parseFloat($("#itemQtyCmb").val()));
    let cartDetails = {
        cartItemId: $("#itemIdCmb").val(),
        cartItemName: $("#itemNameCmb").val(),
        cartItemPrice: $("#itemPriceCmb").val(),
        cartItemQty: $("#itemQtyCmb").val(),
        cartItemTotal: total

    }

    addToCartArray.push(cartDetails);
    getCartData();

    newTotal = parseFloat(total) + parseFloat($("#totalSpan").text());
    console.log(newTotal);
    $("#totalSpan").text(newTotal);
    $("#subTotal").val(newTotal);


}

function getCartData() {
    $("#placeOrderTbody").empty();
    for (let i = 0; i < addToCartArray.length; i++) {
        let tRow = `<tr>  <td>${addToCartArray[i].cartItemId}</td>
        <td>${addToCartArray[i].cartItemName}</td>
    <td>${addToCartArray[i].cartItemPrice}</td>
    <td>${addToCartArray[i].cartItemQty}</td>
    <td>${addToCartArray[i].cartItemTotal}</td>
    </tr>`;
        $("#placeOrderTbody").append(tRow);
     
    }

}



$("#discount").on("keydown keyup", function (e) {
    $("#subTotal").val(newTotal - (newTotal * $("#discount").val() / 100));

})

$("#payment").on("keydown keyup",function(e){

    if( $("#balance").val()<0){
        $("#balance").val($(parseFloat($("#payment").val())- parseFloat(total)));
    }else{
        $("#balance").val( (parseFloat($("#payment").val())- total));
    }
    
})


$("#placeOrderBtn").click(function () {
    let newOrderDetails = Object.assign({}, orderDetails);
    let newOrder = Object.assign({}, order);
    console.log($("#customerIdCmb ").val());

    if($("#customerIdCmb ").val()===null |$("#payment").val().length===0 |$("#itemIdCmb ").val()===null|
    $("#itemQtyCmb").val().length===0 ){
        alert("please fill all empty fields !")
    }else{
        /* set data to order details */

    for (let i = 0; i < addToCartArray.length; i++) {
        newOrderDetails = {
            orderId: $("#orderId").val(),
            itemId: addToCartArray[i].cartItemId,
            qty: addToCartArray[i].cartItemQty,
            total: addToCartArray[i].cartItemTotal
        }
        newOrder.orderDetails.push(newOrderDetails);
        console.log("order detail", newOrderDetails);

    }

    /* set data to order */

    newOrder = {
        orderId: $("#orderId").val(),
        custId: $("#customerIdCmb").val(),
        orderDate: $("#date").val()
    }
    orderDB.push(newOrder);

    // console.log("order", order);
    // console.log("befor", addToCartArray);
    addToCartArray = [];
    console.log("after", addToCartArray);
    $("#placeOrderTbody").empty();

    $("#orderId").val(splitOrderId(orderDB[orderDB.length-1].orderId));
    alert("order placed sucessfully !");



    }

     

})



function splitOrderId(currentId) {
    if (currentId != null) {
        var strings = currentId.split("OD-");
        var id = parseInt(strings[1]);
        ++id;
        var digit = ("000" + id).slice(-3); // Format to 3 digits
        return "OD-" + digit;
    }
    return "OD-001";
}


