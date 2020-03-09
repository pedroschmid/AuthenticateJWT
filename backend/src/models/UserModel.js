import mongoose from "mongoose";
import bcrypt from "bcrypt";

let saltRounds = 10;

let UserSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },

  email: {
    type: String,
    trim: true,
    required: true
  },

  password: {
    type: String,
    trim: true,
    required: true
  }
});

// Hashing password
UserSchema.pre("save", (next) => {
  this.password = bcrypt.hashSync(this.password, saltRounds);
  next();
});

let UserModel = mongoose.model("/users", UserSchema);

export default UserModel
