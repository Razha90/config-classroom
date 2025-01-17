import mongoose from 'mongoose';
import argon2 from 'argon2';

const userSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ['student', 'admin', 'teacher'],
    default: 'student',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim:true,
    maxlength: [100, 'Name cannot be more than 100 characters'],
    minlength: [7, 'Name cannot be less than 7 characters']
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim:true,
    maxlength: [100, 'Email cannot be more than 100 characters'],
    minlength: [7, 'Email cannot be less than 7 characters']
  },
  password: {
    type: String,
    required: true,
    maxlength: [100, 'Password cannot be more than 50 characters'],
    minlength: [7, 'Password cannot be less than 7 characters']
  },
  phone_number:{
    type: String,
    required: true,
    maxlength: [15, 'Phone number cannot be more than 15 characters'],
    minlength: [5, 'Phone number cannot be less than 5 characters']
  },
  gender:{
    type: String,
    required: true,
    enum:['male', 'female']
  },
  emailVerified: {
    type: Boolean,
    default: false,
    enum: [true, false],
    required: true
  }
}, {timestamps: true});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    console.log("Password not modified, skipping hashing");
    return next();
  }

  try {
    this.password = await argon2.hash(this.password);
    next();
  } catch (error) {
    console.error("Error hashing password:", error);
    next(error);
  }
});


userSchema.methods.matchPassword = async function (enteredPassword) {
  return await argon2.verify(this.password, enteredPassword);
};

// let User;
// if (typeof window === 'undefined') {
//   User = mongoose.models.User || mongoose.model('User', userSchema);
// }

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;


// export default User;
