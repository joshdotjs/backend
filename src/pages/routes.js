const path = require('path');
const router = require('express').Router();

// const { filePath } = require('../util/path');
const { filePath } = required('util/path');

const Users_Model = required('api/users/model');

// ==============================================

router.get('/', (req, res) => {

  // Step 1: Get all current signatures from DB
  // TODO
  // TODO
  // TODO
  // TODO
  // TODO
  // TODO

  // Step 2: Display them in HTML with form for new signature
  // TODO: Make sure to only allow entries that are correct
  const html = `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Bootstrap demo</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
      </head>
      <body>
        <h1 id="title">Hello, world!</h1>

        <form action="/api/sigs" method="POST">
          <input type="text" name="first_name" placeholder="first name" required></input>
          <input type="text" name="last_name"  placeholder="last name"  required></input>
          <input type="text" name="email"      placeholder="email (optional)"></input>
          <button type="submit">Submit</button>
        </form>



        <ul class="list-group">
          <li class="list-group-item">An item</li>
          <li class="list-group-item">A second item</li>
          <li class="list-group-item">A third item</li>
          <li class="list-group-item">A fourth item</li>
          <li class="list-group-item">And a fifth one</li>
        </ul>

        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm" crossorigin="anonymous"></script>
      </body>
    </html>
  `;

  // Step 3: Upon submission of HTML form show the new signature

  res.status(201).send(html);
});

// ==============================================

router.get('/view', async (req, res) => {
  // const file_path = path.join(__dirname, '../', 'views', 'index.html'  );
  
  // const file_path = filePath('views/index.html');
  // res.status(201).sendFile(file_path);

  const users = await Users_Model.getAll();
  console.log('users2: ', users);

  res.status(201).render('index', { 
    page_title: 'CRUD OPS',
    users,
  });
});

// ==============================================

module.exports = router;
