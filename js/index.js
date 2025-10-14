let formEl = document.querySelector('#form-user-create');

let fields = document.querySelectorAll('#form-user-create [name]');

document.querySelector('#save').addEventListener('click', (event) => {
  event.preventDefault();

  let json = { };

  fields.forEach(function (field, index) {
    if (field.name == 'gender') {
      if (field.checked) {
        json[field.name] = field.value;
      }
    } else if (field.name == 'admin') {
      if (field.checked) {
        json[field.name] = 'Sim';
      } else {
        json[field.name] = 'Não';
      }
    } else {
      json[field.name] = field.value;
    }
  });

  getPhoto(formEl).then((photo) => {
    json.photo = photo;
    addLine(json);

    localStorage.setItem('users', JSON.stringify(json));
  });

  formEl.reset();
});

function addLine(json) {
  let tr = document.createElement('tr');
  tr.innerHTML = `
    <td>
      <img src="${json.photo || 'dist/img/user2-160x160.jpg'}" 
      alt="Imagem do Usuário" class="img-sm img-circle">
    </td>
    <td>${json.name}</td>
    <td>${json.email}</td>
    <td>${json.admin}</td>
    <td>${new Date().toLocaleDateString()}</td>
    <td>
      <button type="button" 
        class="btn btn-primary btn-edit btn-xs btn-flat">
        Editar
      </button>
      <button type="button" 
        class="btn btn-danger btn-delete btn-xs btn-flat">
        Excluir
      </button>
    </td>
  `;

  document.querySelector('#table-users').appendChild(tr);
  updateCount();
}

function updateCount() {
  let numberUsers = 0;
  let numberAdmins = 0;

  [...document.querySelector('#table-users').children].forEach(
    tr => {
    numberUsers++;
    if (tr.children[3].innerText === 'Sim') {
      numberAdmins++;
    }
  });

  document.querySelector('#number-users').innerHTML = numberUsers;
  document.querySelector('#number-users-admin').innerHTML = numberAdmins;
}

function getPhoto(formEl) {
  return new Promise((resolve, reject) => {
    let fileReader = new FileReader();
    let elements = [...formEl.elements].filter(item => {
      if (item.name === 'photo') {
        return item;
      }
    });
    let file = elements[0].files[0];
    fileReader.onload = () => {
      resolve(fileReader.result);
    }
    fileReader.onerror = (e) => {
      reject(e);
    }

    if (file) {
      fileReader.readAsDataURL(file);
    } else {
      resolve('dist/img/user2-160x160.jpg');
    }
  });
}

// GET: CONSULTA
// POST: INSERÇÃO - por baixo dos panos

// let name = document.querySelector('#exampleInputName').value;
// let gender = document.querySelector('input[type=radio]:checked').value;
// let birth = document.querySelector('#exampleInputBirth').value;
// let country = document.querySelector('#exampleInputCountry').value;
// let email = document.querySelector('#exampleInputEmail1').value;
// let password = document.querySelector('#exampleInputPassword1').value;
// //let photo = document.querySelector('#exampleInputFile').value;
// let admin = document.querySelector('#exampleInputAdmin').checked;
// let button = document.querySelector('#save');
