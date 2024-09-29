# fetch() Method

- The fetch() method in JavaScript is a modern API that allows you to make network requests, typically to retrieve data from a server. It is commonly used to interact with web APIs and fetch data asynchronously. Here's a breakdown of what the fetch() method is and why it's used:
  - `What is the fetch() Method?`
  - The fetch() method is a built-in JavaScript function that simplifies making HTTP requests. It returns a Promise that resolves to the Response to that request, whether it is successful or not.
  - `Why is it Used?` 
  1.` Asynchronous Data Retrieval:`
    The primary use of the fetch() method is to asynchronously retrieve data from a server. Asynchronous means that the code doesn't wait for the data to arrive before moving on. This is crucial for creating responsive and dynamic web applications.
  2. `Web API Interaction:`
     Many web applications interact with external services or APIs to fetch data. The fetch() method simplifies the process of making HTTP requests to these APIs.
  3. `Promise-Based:`
     The fetch() method returns a Promise, making it easy to work with asynchronous operations using the .then() and .catch() methods. This promotes cleaner and more readable code.
  4. `Flexible and Powerful:`
     fetch() is more flexible and powerful compared to older methods like XMLHttpRequest. It supports a wide range of options, including headers, request methods, and handling different types of responses (JSON, text, etc.).

```
fetch('<https://api.example.com/data>')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log('Data from server:', data);
  })
  .catch(error => {
    console.error('Fetch error:', error);
  });
```

# Axios

- `External Library:`
  Axios is a standalone JavaScript library designed to work in both browsers and Node.js environments.
- `Promise-Based:`
  Similar to fetch, Axios also returns a Promise, providing a consistent interface for handling asynchronous operations.
- `HTTP Request and Response Interceptors:`
  Axios allows the use of interceptors, enabling the modification of requests or responses globally before they are handled by then or catch.
- `Automatic JSON Parsing:`
  Axios automatically parses JSON responses, simplifying the process compared to fetch.
  Example Usage:

```
import axios from 'axios';

axios.get('<https://api.example.com/data>')
  .then(response => console.log(response.data))
  .catch(error => console.error('Error:', error));
```

# fetch get req.

```
async function fetchData() {
  try {
    const response = await fetch('<https://api.example.com/data>');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
}

fetchData();
```

# axios get req.

```
// Install Axios using npm or yarn: npm install axios
import axios from 'axios';

async function fetchData() {
  try {
    const response = await axios.get('<https://api.example.com/data>');
    console.log(response.data);
  } catch (error) {
    console.error('Error:', error);
  }
}

fetchData();
```

# fetch post req.

```
async function postData() {
  const url = '<https://api.example.com/postData>';
  const dataToSend = {
    key1: 'value1',
    key2: 'value2',
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
}

postData();
```

# axios post req.

```
// Install Axios using npm or yarn: npm install axios
import axios from 'axios';

async function postData() {
  const url = '<https://api.example.com/postData>';
  const dataToSend = {
    key1: 'value1',
    key2: 'value2',
  };

  try {
    const response = await axios.post(url, dataToSend);
    console.log(response.data);
  } catch (error) {
    console.error('Error:', error);
  }
}

postData();
```
