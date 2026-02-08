import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
  fullName: {
    type: String,
    min: 2,
    required: true,
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
},{timestamps : true});

/* 🔐 Hash password before saving */
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const hashedPassword = await bcrypt.hash(this.password, 10);
  this.password = hashedPassword;
});

/* 🔑 Compare password during login */
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

mongoose.models ={}

/* Prevent model overwrite error in Next.js */
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
