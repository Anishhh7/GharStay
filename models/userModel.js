import validator from "validator";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
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
        values: ["superAdmin", "admin", "staff"]
      },
      default: "staff"
    },
    password: {
      type: String,
      required: true,
      select: false
    },
    active: {
      type: Boolean,
      default: true
    },
    passwordChangedAt: Date
  },
  {
    timestamps: true
  }
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 12);
  if (!this.isNew) {
    this.passwordChangedAt = Date.now() - 1000;
  }
});

userSchema.methods.checkCorrectPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.checkPasswordChanged = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
