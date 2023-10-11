loadOrderDetailsOnTable();

function loadOrderDetailsOnTable(){
    for(let i=0; i<order.orderDetails.length; i++){
        let tRow=`<tr> <td> ${order.orderDetails[i].orderId}</td>
        <td> ${order.orderDetails[i].itemId}</td>
        <td> ${order.orderDetails[i].qty}</td>
        <td> ${order.orderDetails[i].total}</td></tr>`;
    
        $("#orderDetailsTbody").append(tRow);
    }
}