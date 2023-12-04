const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
  },
  confirmPassword: {
    type: String,
    required: true,
  },

  isAdmin: {
    type: Boolean,
    default: false, // Default to regular user
  },
  
  Tasks: [
    {
      task: {
        type: String,
        required: true,
      },

      startTime: {
        type: String,
        default: 0,
      },
      EndTime: {
        type: String,
        default: 0,
      },
      timeDifference: {
        type: String,
        default: "",
      },

      createdAt: {
        type: Date,
        default: new Date(),
      },
    },
  ],
  
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now, // Set a default value to the current date and time
  },
  totalHours: [{ date: Date, hours: String }],
});

// hashing the password
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
    this.confirmPassword = await bcrypt.hash(this.confirmPassword, 10);
    next();
  }
});

// Generating TOKEN OR cookie
userSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (err) {
    console.log(err);
  }
};

// storing the message
userSchema.methods.addMessage = async function (
  Task,
  startTime,
  EndTime,
  difference,
  TotalHours
) {
  try {
    this.Tasks = this.Tasks.concat({
      Task,
      startTime,
      EndTime,
      TotalHours,
    });
    await this.save();
    return Task;
  } catch (error) {
    console.log(error);
  }
};

const User = mongoose.model("user", userSchema);

module.exports = User;
