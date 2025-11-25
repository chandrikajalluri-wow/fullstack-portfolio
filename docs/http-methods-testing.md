1. GET – Retrieve Data

Description: Fetch resource(s) from the server.

Endpoint: /posts/1

JavaScript (fetch):

fetch('https://jsonplaceholder.typicode.com/posts/1')
  .then(res => res.json())
  .then(data => console.log(data));


cURL:

curl -X GET https://jsonplaceholder.typicode.com/posts/1

2. POST – Create Resource

Description: Send data to create a new resource.

Endpoint: /posts

JavaScript (fetch):

fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title: 'food', body: 'Eat', userId: 1 })
})
  .then(res => res.json())
  .then(data => console.log(data));


cURL:

curl -X POST https://jsonplaceholder.typicode.com/posts \
-H "Content-Type: application/json" \
-d '{"title":"food","body":"Eat","userId":1}'

3. PUT – Update Resource Completely

Description: Replace an existing resource entirely.

Endpoint: /posts/1

JavaScript (fetch):

fetch('https://jsonplaceholder.typicode.com/posts/1', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ id:1, title: 'updated', body: 'updated', userId:1 })
})
  .then(res => res.json())
  .then(data => console.log(data));


cURL:

curl -X PUT https://jsonplaceholder.typicode.com/posts/1 \
-H "Content-Type: application/json" \
-d '{"id":1,"title":"updated","body":"updated","userId":1}'

4. PATCH – Update Resource Partially

Description: Modify certain fields of a resource.

Endpoint: /posts/1

JavaScript (fetch):

fetch('https://jsonplaceholder.typicode.com/posts/1', {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title: 'patched title' })
})
  .then(res => res.json())
  .then(data => console.log(data));


cURL:

curl -X PATCH https://jsonplaceholder.typicode.com/posts/1 \
-H "Content-Type: application/json" \
-d '{"title":"patched title"}'

5. DELETE – Remove Resource

Description: Delete a resource from the server.

Endpoint: /posts/1

JavaScript (fetch):

fetch('https://jsonplaceholder.typicode.com/posts/1', { method: 'DELETE' })
  .then(res => res.ok ? console.log('Deleted successfully') : console.log('Error'));


cURL:

curl -X DELETE https://jsonplaceholder.typicode.com/posts/1