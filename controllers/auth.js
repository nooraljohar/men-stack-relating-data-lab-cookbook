//invoking router from express
const router = require('express').Router()
const bcrypt = require("bcrypt")
const User = require('../models/user')
//Routs/ API's/ Controller Function

//////////// sign up //////////
router.get('/sign-up', async(req,res)=>{
  res.render("auth/sign-up.ejs")
})

//add the user data to the database
router.post('/sign-up', async(req,res)=>{
try{
  //finding the user with the id
  const userInDatabase = await User.findOne({username: req.body.username})
  //if the user is in the database then user should not sign up
  if(userInDatabase){
    return res.send('Username already taken')
  }
  // if password != confirm password, then stop
  if(req.body.password !== req.body.confirmPassword){
    return res.send("Password and Confirm password must match")
  }

  //we have to use bcrybt for password  encryption
  //incrypt password 10 times
  
  const hashedPassword = bcrypt.hashSync(req.body.password, 10);
  req.body.password = hashedPassword;

  const user = await User.create(req.body);
res.send(`Thanks for signing up ${user.username}`);

}catch(error){
  console.log(error)
}
})

////////////// sign-in page ///////////////////
router.get('/sign-in', (req,res)=>{
  res.render('auth/sign-in.ejs')
})

router.post('/sign-in', async(req,res)=>{
  const userInDatabase = await User.findOne({username:req.body.username})

  if(!userInDatabase){
    return res.send("Login failed. Please try again later")
  }

  //match the password and the increpted file
  //sync (userInput password, user in database password)
  const validPassword = bcrypt.compareSync(req.body.password, userInDatabase.password)
  if(!validPassword){
    return res.send("Login failed. Please try again later")
  }

  // User exist and Password is valid
  //express-session: keep the user loged in while the session is on. 
  req.session.user = {
    username:  userInDatabase.username,
    _id: userInDatabase._id
  }
  res.redirect('/')
})


router.get('/sign-out',(req,res)=>{
  req.session.destroy()
  res.redirect("/")
})

module.exports = router