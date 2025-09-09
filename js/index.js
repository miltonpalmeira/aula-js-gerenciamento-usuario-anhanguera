let fields = document.querySelectorAll('#form-user-create [name]');

let json = {};

fields.forEach(function(field, index){
    if (field.name == 'gender') {
        if (field.checked) {
            json[field.name] = field.value;
        }
    }
    else if (field.name == 'admin') {
        if (field.checked) {
            json[field.name] = "Sim";
        }
        else {
            json[field.name] = "Não";
        }
    }
    else {
        json[field.name] = field.value;
    }
});

console.log(json);

// let name = document.querySelector('#exampleInputName').value;
// let gender = document.querySelector('input[type=radio]:checked').value;
// let birth = document.querySelector('#exampleInputBirth').value;
// let country = document.querySelector('#exampleInputCountry').value;
// let email = document.querySelector('#exampleInputEmail1').value;
// let password = document.querySelector('#exampleInputPassword1').value;
// //let photo = document.querySelector('#exampleInputFile').value;
// let admin = document.querySelector('#exampleInputAdmin').checked;
// let button = document.querySelector('#save');