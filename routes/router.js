const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const userController = require('../controllers/userController')
const User = require('../models/users')
const jwt = require('jsonwebtoken');

router.get('/', userController.allData)

router.get('/:id', userController.searchData)

router.delete('/:id', userController.deleteData)

// router.post('/add',jsonParser,userController.addData)
//update data
router.put('/update/:id',jsonParser,userController.updateData)


// Route to display all data
router.get('/',(req,res)=>{
    res.redirect('/all-data')
})
router.get('/all-data', userController.allData);

// router.get('/', filters, userController.allData);
// Route to display data by id
router.get('/:id', userController.searchData);



// // Route to add new data
router.post('/add', jsonParser, userController.addData);

router.get('/update/:id', userController.loadUpdateForm);

// Route to update data (using POST for simplicity)
router.post('/update/:id', jsonParser, userController.updateData);


// Route to delete data (using POST for simplicity)
router.post('/delete/:id', jsonParser, userController.deleteData);


// Render Sign Up Form
// router.get('/signup', (req, res) => {
//     res.render('signup');
//   });
  
//   // Sign Up Logic
//   router.post('/signup', async (req, res) => {
//     const { username, password } = req.body;
  
//     try {
//       const user = new User({ username, password });
//       await user.save();
//       const token = jwt.sign({ userId: user._id }, 'your_jwt_secret');
//       res.send({ token });
//     } catch (error) {
//       res.status(400).send(error);
//     }
//   });
  
//   // Render Login Form
//   router.get('/login', (req, res) => {
//     res.render('login');
//   });
  
//   // Login Logic
//   router.post('/login', async (req, res) => {
//     const { username, password } = req.body;
  
//     const user = await User.findOne({ username });
//     if (!user) {
//       return res.status(404).send('User not found');
//     }
  
//     const isMatch = await user.comparePassword(password);
//     if (!isMatch) {
//       return res.status(400).send('Invalid credentials');
//     }
  
//     const token = jwt.sign({ userId: user._id }, 'your_jwt_secret');
//     res.send({ token });
//     // res.render('index')
   
//   });



module.exports = router;

