const router = require('express').Router();
const bcrypt = require('bcrypt')
const User = require('../models/user');

//routes/API's/ Controllers Function


router.get("/sign-up", (req,res) => {
    res.render("auth/sign-up.ejs");
})

router.post("/sign-up", async (req, res) => {
    try{
const userInDatabase = await User.findOne({ username: req.body.username});

if(userInDatabase){
    return res.send("Username already taken")
}

if (req.body.password !== req.body.confirmPassword){
    return res.send("password and confirm password must match.")
}

//bcrypt for password 
const hashedPassword = bcrypt.hashSync(req.body.password, 10);
req.body.password = hashedPassword;

const user = await User.create(req.body);
res.send(`thank for signing on ${user.username}`)

}catch(error){
console.log(error)
    };
})

router.get('/sign-in', (req,res) => {
    res.render("auth/sign-in.ejs");
})

router.post('/sign-in', async (req,res) => {

const userInDatabase = await User.findOne({ username: req.body.username});
if(!userInDatabase){
        return res.send("login failed. please try again later");
    }

const validPassword = bcrypt.compareSync(req.body.password, userInDatabase.password);
if(!validPassword){
    return res.send("login failed. please try again later");
}

//user exists and password is valid.
req.session.user = {
    username: userInDatabase.username,
    _id: userInDatabase._id
}
res.redirect("/");
})

router.get("/sign-out", (req,res) => {
    req.session.destroy();
    res.redirect("/");
})

module.exports = router;