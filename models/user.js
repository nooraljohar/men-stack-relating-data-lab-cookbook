const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  }

},{
  timestamps: true // this add two field createAt: when the item was created and updatedAt: when it was last update. it is useful to the log
})

const User = mongoose.model("User", userSchema)

module.exports = User