JSONPlaceholder is a simple online fake REST API that provides developers with a set of dummy data to simulate real-world API interactions. It's ideal for:

- Frontend development without a backend

- API integration testing

- Learning and prototyping

JSONPlaceholder offers the following resources:

Posts: /posts (100 entries)

Comments: /comments (500 entries)

Albums: /albums (100 entries)

Photos: /photos (5000 entries)

Todos: /todos (200 entries)

Users: /users (10 entries)

These resources have relationships, for example posts have many comments, albums have many photos, etc.

JSONPlaceholder supports all standard HTTP methods:

- GET: Retrieve data

- POST: Create new data

- PUT: Update existing data

- PATCH: Partially update data

- DELETE: Remove data

jsonplaceholder.typicode.com

## Example Usage
1. Fetch a Single Post
fetch('https://jsonplaceholder.typicode.com/posts/1')
  .then(response => response.json())
  .then(json => console.log(json));

2. Create a New Post
fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'foo',
    body: 'bar',
    userId: 1
  })
})
  .then(response => response.json())
  .then(json => console.log(json));