const express = require('express')
const app = express()
const port = 3335
const userRouter = require('./routes/router')
const userModel = require('./models/users_Schema')
const db = require('./config/DB')
const path = require('path')
const User = require('./models/users')
const jwt = require('jsonwebtoken');
const userController = require('./controllers/userController')

// const mysql = require('mysql2')
// const cors = require('cors')
// const bodyParser = require('body-parser')
// app.use(cors())
// app.use(bodyParser.json())

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Set the views directory (optional if default)
app.set('views', path.join(__dirname, 'view'));

// Serve static files
app.use(express.static('public'));

// Body parser middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/add',(req,res)=>{
    res.render('add-data')
})

app.get('/user', (req,res)=>{
    res.render('hi')
})


// Render Sign Up Form
app.get('/signup', (req, res) => {
    res.render('signup');
  });
  
  // Sign Up Logic
  app.post('/signup', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const user = new User({ username, password });
      await user.save();
      const token = jwt.sign({ userId: user._id }, 'your_jwt_secret');
      res.send({ token });
    } catch (error) {
      res.status(400).send(error);
    }
  });
  
  // Render Login Form
  app.get('/login', (req, res) => {
    res.render('login');
  });
  
  // Login Logic
  app.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).send('User not found');
    }
  
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).send('Invalid credentials');
    }
  
    // const token = jwt.sign({ userId: user._id }, 'your_jwt_secret');
    // res.send({ token });
    res.redirect('/')
   
  });

app.use('/',userRouter)




// const mydb =mysql.createConnection({
//     host:'localhost',
//     user:'root',
//     password:'root',
//     database:'onlineshoping' 
// })

// mydb.connect(err=>{
//     if(err){
//         console.log(err)
//     }else{
//         console.log('database connected')
//     }
// })

app.listen(port,()=>{
    console.log(`http://localhost:3335/user`)
})