const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: String,
  email: String,
  age: Number,
  password: String,
  date: String,
  preferences: String,
  hobby: Array,
  picture: String,
  pickupline: String,
  likes: {
      type: [Schema.Types.ObjectId],
      ref: 'User',
      autopopulate: true
    },
    dislikes: {
      type: [Schema.Types.ObjectId],
      ref: 'User',
      autopopulate: true
    }
  })

const User = mongoose.model('User', UserSchema)

module.exports = User