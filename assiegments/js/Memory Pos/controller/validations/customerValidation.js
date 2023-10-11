const CUS_ID_REGEX = /^(C00-)[0-9]{3}$/;
const CUS_NAME_REGEX = /^[A-Za-z ]{5,}$/;
const CUS_ADDRESS_REGEX = /^[A-Za-z0-9 ]{8,}$/;
const CUS_CONTACT_REGEX = /^(?:7|0|(?:\\\\\\\\+94))[0-9]{9,10}$/;
const CUS_EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

let cValidation=new Array();
cValidation.push({field:$("#cId"),regEx: CUS_ID_REGEX});
cValidation.push({field:$("#cName"),regEx: CUS_NAME_REGEX});
cValidation.push({field:$("#cAddress"),regEx: CUS_ADDRESS_REGEX});
cValidation.push({field:$("#cContact"),regEx: CUS_CONTACT_REGEX});
cValidation.push({field:$("#cEmail"),regEx: CUS_EMAIL_REGEX});

function clearCustomerInputFields() {
    $("#cId,#cName,#cAddress,#cContact,#cEmail").val("");
    $("#cId,#cName,#cAddress,#cContact,#cEmail").css("border", "1px solid #ced4da");
    $("#cId").focus();
    setBtn();
}

setBtn();


$("#cId,#cName,#cAddress,#cContact,#cEmail").on("keyup",function(e){
   

    let indexNo = cValidation.indexOf(cValidation.find((c) => c.field.attr("id") == e.target.id));
    console.log(indexNo);

    if(e.key=="Tab"){
        e.preventDefault();
    }

    checkValidations(cValidation[indexNo]);
   

    setBtn();
    
    if (e.key == "Enter") {

        if (e.target.id != cValidation[cValidation.length - 1].field.attr("id")) {
            //check validation is ok
            if (checkValidations(cValidation[indexNo])) {
                cValidation[indexNo + 1].field.focus();
            }
        } else {
            if (checkValidations(cValidation[indexNo])) {
                saveCustomer();
            }
        }
    }
});

function checkValidations(object) {
    if (object.regEx.test(object.field.val())) {
        setBorder(true, object)
        return true;
    }
    setBorder(false, object)
    return false;
}

function setBorder(bol, ob) {
    if (!bol) {
        if (ob.field.val().length >= 1) {
            ob.field.css("border", "2px solid red");
        } else {
            ob.field.css("border", "1px solid #ced4da");
        }
    } else {
        if (ob.field.val().length >= 1) {
            ob.field.css("border", "2px solid green");
        } else {
            ob.field.css("border", "1px solid #ced4da");
        }
    }

}

function checkAll() {
    for (let i = 0; i < cValidation.length; i++) {
        if (!checkValidations(cValidation[i])) return false;
    }
    return true;
}

function setBtn() {
    $("#CustomerDeleteBtn").prop("disabled", true);
    $("#CustomerUpdateBtn").prop("disabled", true);

    if (checkAll()) {
        $("#customerSaveBtn").prop("disabled", false);
    } else {
        $("#customerSaveBtn").prop("disabled", true);
    }

    let id = $("#cId").val();
    if (searchCustomer(id) === undefined) {
        $("#CustomerDeleteBtn").prop("disabled", true);
        $("#CustomerUpdateBtn").prop("disabled", true);
    } else {
        $("#CustomerDeleteBtn").prop("disabled", false);
        $("#CustomerUpdateBtn").prop("disabled", false);
    }

}
