import mongoose, { Schema } from "mongoose";
import jwt from  'jsonwebtoken';
import bcrypt  from 'bcrypt'
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      lowerCase: true,
      unique: true,
      index: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    fullname: {
      type: String,
      required: true,
      // lowerCase: true,
      // unique: true,
      index: true,
      trim: true,
    },
    avatar: {
      type: String,
      require: true,
    },
    coverImage: {
      type: String,
    },
    watchHistory: {
      type: Schema.Types.objectId,
      ref: "Video",
    },
    password: {
      type: String,
      required: [true, "password is  required!!"],
    },
    refershToken: {
      type: String,
    },
    // ! Upadate  this on np
    isModified: {
        type: Boolean,
        default: true
    }
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function () {

    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
} )

userSchema.methods.isPasswordCorrect  = async function(password) {
   return await bcrypt.compare( password, this.password)
}

userSchema.methods.JWT_TOKEN = function () {
 return jwt.sign(
    {
      username: this.username,
      email: this.email,
      id: this._id,
      fullname: this.fullname,
    },
    process.env.JWT_SECRET_STRING,
    {
      expiresIn: process.env.JWT_EXPRIERY,
    }
  );
}

userSchema.methods.REF_TOKEN = function {
  return jwt.sign(
    {
      
      id: this._id,
      
    },
    process.env.JWT_SECRET_STRING,
    {
      expiresIn: process.env.JWT_EXPRIERY,
    }
  );
}
export  const User = mongoose.model("User", userSchema);
