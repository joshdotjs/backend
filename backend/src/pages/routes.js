const router = require('express').Router();

// ==============================================

router.get('/about', async (req, res) => {
  res.status(201).render('about', { 
    page_title: 'About Page',
  });
});

// ==============================================

router.get('/', async (req, res) => {
  // const file_path = path.join(__dirname, '../', 'views', 'index.html'  );
  
  // const file_path = filePath('views/index.html');
  // res.status(201).sendFile(file_path);

  const Users_Model = required('api/users/model');
  const users = await Users_Model.getAll();
  console.log('/src/pages/router.js -- users: ', users);

  res.status(201).render('index', { 
    page_title: 'CRUD Ops',
    users,
  });
});

// ==============================================

module.exports = router;
