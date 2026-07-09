const validator = require("validator");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: [true, "invalid emaail"],
    unique: true,
    validate: [validator.isEmail]
  },
  role: {
    type: String,
    enum: {
      values: ["superAdmin", "admin", "employee"]
    },
    default: "employee"
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  active: {
    type: Boolean,
    default: true
  }
});

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.checkCorrectPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
