$("#itemSaveBtn").click(function () {
    let reult=saveItem();
    if(reult){
        alert("Item Saved sucessfully!");
        getAllItem();
        clearItemTextFields();
        ItemDataBindEvents();
        doubleCLickDeleteIetm();
        loadItemIds();
    }else{
        alert("Error! Try Again !");
        clearItemTextFields();

    }

})

$("#itemUpdateBtn").click(function () {
   let result= updateItem();

   if(result){
    alert("Item Updated sucessfully!");
    getAllItem();
    clearItemTextFields();
    ItemDataBindEvents();
    doubleCLickDeleteIetm();

   }else{
    alert("Error! Try Again !");
    clearItemTextFields();
}


})

$("#itemDeletBtn").click(function () {
   
    let result=deleteItem();
    if(result){
        alert("Item Deleted sucessfully !");
        getAllItem();
        ItemDataBindEvents();
        clearItemTextFields();
        doubleCLickDeleteIetm();
    }else{
        alert("Error! Try Again !");
        clearItemTextFields();
    }


})

$("#searcBtn").click(function () {
    setItemDataToTextFields();
})


function saveItem() {
      if(searchItem($("#id").val())==undefined){
        let newwItem = Object.assign({}, Item);

        let id=$("#id").val();
        let name=$("#name").val();
        let type=$("#type").val();
        let price=$("#unitPrice").val();
        let qty=$("#qty").val();

        newwItem.id = id ;
        newwItem.name =  name;
        newwItem.type =  type;
        newwItem.unitPrice =  price;
        newwItem.qty =  qty;
    
        itemDB.push(newwItem);
        return true;
      }else{
          alert(" Item Id Is Available");
      }

     
}

function updateItem(){
    if(searchItem($("#id").val())==undefined){
        alert("This Item Id is not available!");
    }else{
       let item= searchItem($("#id").val());

       item.name=$("#name").val();
       item.type=$("#type").val();
       item.unitPrice=$("#unitPrice").val();
       item.qty=$("#qty").val();

       return true;

    }

}

function deleteItem(){
    if(searchItem($("#id").val())==undefined){
        alert("This Item Id is not Available!");

    }else{
        let confirmation=confirm("Do you really want to delete this item?");
        if(confirmation){
            for(let i=0; i<itemDB.length; i++){
                if(itemDB[i].id==$("#id").val()){
                    itemDB.splice(i,1);
                    console.log(itemDB);
                    return true;
                }
            }
        }
    }
}


function getAllItem() {
    $("#iTbody").empty();
    for (let i = 0; i < itemDB.length; i++) {
        let tRow = `<tr> 
       <td>${itemDB[i].id} </td>
       <td>${itemDB[i].name} </td>
       <td>${itemDB[i].type} </td>
       <td>${itemDB[i].unitPrice} </td>
       <td>${itemDB[i].qty} </td> </tr>`;
       $("#iTbody").append(tRow);
    }    
}


function searchItem(id){
   return itemDB.find(function(Item){
        return Item.id==id;

    })
}


function setItemDataToTextFields() {

    if (searchItem($("#searchTxt").val()) == undefined) {
        alert("This Item Id is not Available!");

    } else {
        let Item = searchItem($("#searchTxt").val());

        $("#id").val(Item.id);
        $("#name").val(Item.name);
        $("#type").val(Item.type);
        $("#unitPrice").val(Item.unitPrice);
        $("#qty").val(Item.qty);
    }

}


ItemDataBindEvents();
function ItemDataBindEvents() {
    $("#iTbody>tr").click(function () {
        let id = $(this).children(":nth-child(1)").text();
        let name = $(this).children(":nth-child(2)").text();
        let type = $(this).children(":nth-child(3)").text();
        let unitPrice = $(this).children(":nth-child(4)").text();
        let qty = $(this).children(":nth-child(5)").text();

        setItemTableDataToFileds(id, name, type, unitPrice, qty);

    })
}

function setItemTableDataToFileds(id, name, type, unitPrice, qty) {

    $("#id").val(id.trim());
    $("#name").val(name.trim());
    $("#type").val(type.trim());
    $("#unitPrice").val(parseInt(unitPrice));
    $("#qty").val(parseInt(qty));

}

doubleCLickDeleteIetm();
function doubleCLickDeleteIetm() {
    $("#iTbody>tr").dblclick(function () {
        console.log(itemDB);
        
        let iId = $(this).children(":nth-child(1)").text();
        console.log(iId);

        let confirmation = confirm("Do you really want to delete this Item?")
        if (confirmation) {
            for(let i=0; i<itemDB.length; i++){
                if(itemDB[i].id == iId.trim()){
                    console.log(itemDB);
                    itemDB.splice(i,1);
                    $(this).children().remove();
                    clearItemTextFields();
                    
                }       
            }
        }

    })
}


function clearItemTextFields(){
    $("#id").val("");
    $("#name").val("");
    $("#type").val("");
    $("#unitPrice").val("");
    $("#qty").val("");
}


