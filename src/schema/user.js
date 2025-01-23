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

// import clientPromise from "@/lib/mongoDB";
// import argon2 from 'argon2';


// async function createOne(name, email, password, phone, gender, role) {
//   try {
//     const client = await clientPromise;
//     const db = client.db();
//     const collection = db.collection('user');
//     const passwordHash = await argon2.hash(password);
//     const thisTime = new Date();
//     const data = await collection.insertOne({
//       name,
//       email,
//       password: passwordHash,
//       phone,
//       gender,
//       emailVerified : false,
//       role,
//       createdAt: thisTime,
//       updatedAt: thisTime
//     });
//     return data;
//   } catch (error) {
//     console.error('MongoDB Operation Error:', error);
//     throw { success: false, message: 'Failed to create user', error: error.message };
//   }
// }

// async function findOne(filter) {
//   try {
//     const client = await clientPromise; // Dapatkan koneksi ke MongoDB
//     const db = client.db(); // Pilih database
//     const collection = db.collection('user'); // Pilih koleksi

//     // Cari satu dokumen berdasarkan filter
//     const data = await collection.findOne(filter);

//     return data;
//   } catch (error) {
//     console.error('MongoDB FindOne Error:', error);
//     throw { success: false, message: 'Failed to find data', error: error.message };
//   }
// }

// async function findOneAndDelete(filter) {
//   try {
//     const client = await clientPromise; // Dapatkan koneksi ke MongoDB
//     const db = client.db(); // Pilih database
//     const collection = db.collection('user'); // Pilih koleksi
//     const result = await collection.findOneAndDelete(filter);
//     return result;
//   } catch (error) {
//     console.error('MongoDB FindOneAndDelete Error:', error);
//     throw { success: false, message: 'Failed to delete data', error: error.message };
//   }
// }

// async function findUpdateOne(filter, update) {
//   try {
//     const client = await clientPromise; // Dapatkan koneksi ke MongoDB
//     const db = client.db(); // Pilih database
//     const collection = db.collection('user'); // Pilih koleksi
//     const result = await collection.updateOne(filter, { $set: update });
//     return result;
//   } catch (error) {
//     console.error('MongoDB UpdateOne Error:', error);
//     throw { success: false, message: 'Failed to update data', error: error.message };
//   }
// }


// const User = {createOne, findOne, findOneAndDelete,findUpdateOne};
// export default User;
