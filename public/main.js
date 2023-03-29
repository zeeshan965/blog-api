const uri = 'http://localhost:3000/graphql';
const graph = graphql(uri);

/**
 * Get Query
 */
graph(`query { index }`)()
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

const authenticateUser = () => {
  const loginData = {
    email: 'Eldred_Daugherty@yahoo.com',
    password: 'Password@123',
  };

  const LOGIN_MUTATION = `mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      message
      status
    }
  }`;
  graph(LOGIN_MUTATION)(loginData)
    .then((res) => {
      console.log(res);
      if (res.login.status === 200) {
        localStorage.setItem('token', res.login.token);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const token = localStorage.getItem('token');
if (!token) {
  authenticateUser();
}
console.log(token);

const uploadButton = document.querySelector('#upload-button');
uploadButton.addEventListener('click', function () {
  const fileInput = document.querySelector('#file-input');
  const formData = new FormData();
  console.log(fileInput.files);
  const mutation = {
    query:
      'mutation ($fileInput: FileInput!) { uploadFile(fileInput: $fileInput) }',
    variables: {
      fileInput: { file: null },
    },
  };
  formData.append('operations', JSON.stringify(mutation));
  const map = { 0: ['variables.fileInput.file'] };
  formData.append('map', JSON.stringify(map));
  formData.append(0, fileInput.files[0]);

  fetch(uri, {
    method: 'POST',
    body: formData,
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((response) => response.json())
    .then((data) => console.log(data?.data))
    .catch((error) => console.error(error));
});

const form = $('#postForm');
form.on('submit', (e) => {
  e.preventDefault();
  const formData = new FormData();
  $(e.target)
    .serializeArray()
    .forEach((item) => {
      if (item.name !== 'categories') {
        formData.append(item.name, item.value);
      }
    });
  formData.append('categories', JSON.stringify($('#categories').val()));

  fetch(uri, {
    method: 'POST',
    body: formData,
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((response) => response.json())
    .then((data) => console.log(data?.data))
    .catch((error) => console.error(error));
});
