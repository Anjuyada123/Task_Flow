const mongoose = require('mongoose');

// Define the schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
})

// Create the model
const userModel = mongoose.model.user||mongoose.model('User', userSchema);

export default userModel;
