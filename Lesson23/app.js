fetch('https://jsonplaceholder.typicode.com/posts/1')
  .then(response => {
    console.log('Response:', response);
    return response.json();
  })
  .then(data => {
    console.log('Data:', data);
  })
  .catch(error => {
    console.error('Error:', error);
  });

const requestData = {
  name: 'John',
  age: 25
};