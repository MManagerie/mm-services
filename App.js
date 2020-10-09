const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();
const db = require('./config/db');
require('./config/strategies').strategies()
const passport = require('passport');

app.use(cors())
//route
const userRouter = require('./routes/Users')
const breedRouter = require('./routes/Breed')
const categoryPetRouter = require('./routes/CategoryPet')
const userAccountRouter = require('./routes/UserAccount')
const adminAccountRouter = require('./routes/AdminAccount')
const productRouter = require('./routes/Product')
const productImageRouter = require('./routes/ProductImage')
const transactionRouter = require('./routes/Transaction')
const transactionDetailsRouter = require('./routes/TransactionDetails')
const petRouter = require('./routes/Pet')
const petUpForAdoptionRouter = require('./routes/PetUpForAdoption')
const petImageRouter = require('./routes/PetImage')
const formRequestRouter = require('./routes/FormRequest')
const petCollectionRouter = require('./routes/PetCollection')
const listAdoptionTransactionRouter = require('./routes/ListAdoptionTransaction')
const listProductTransactionRouter = require('./routes/ListProductTransaction')
// const emailRouter = require('./routes/Email')

// Set up port
const port = process.env.PORT || 3000;

// Set up body parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Set up database connection

app.get('/', (req, res) => {
  res.send('Welcome to Web Service Mini Menagerie!')
})

app.use('/api', userRouter)
app.use('/api', breedRouter)
app.use('/api', categoryPetRouter)
app.use('/api', userAccountRouter)
app.use('/api', adminAccountRouter)
app.use('/api', productRouter)
app.use('/api', productImageRouter)
app.use('/api', transactionRouter)
app.use('/api', transactionDetailsRouter)
app.use('/api', petRouter)
app.use('/api', petUpForAdoptionRouter)
app.use('/api', petImageRouter)
app.use('/api', formRequestRouter)
app.use('/api', petCollectionRouter)
app.use('/api', listAdoptionTransactionRouter)
app.use('/api', listProductTransactionRouter)
// app.use('/', emailRouter)

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => console.log('we are connected'));
// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// GOOGLE AUTHENTICATE
app.get('/auth/google', passport.authenticate('google', {scope: ['email']}));

app.get('/auth/google/callback', passport.authenticate('google'),
  function(req, res) {
    let data={
      message: 'welcome',
      user: req.user
    }
  
    res.redirect('http://localhost:3000/', data)
  });

  
// END GOOGLE AUTHENTICATE

// FACEBOOK AUTHENTICATE
app.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email']}));

app.get('/auth/facebook/callback', passport.authenticate('facebook'),
  function(req, res) {
   res.json({
       message: 'welcome',
       user: req.user
   })
  });

// END FACEBOOK AUTHENTICATE

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})