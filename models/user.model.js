const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

const SALT_ROUND = 10;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email address']
    },
    password: {
      type: String,
      trim: true,
      required: true,
      min: [6, 'Too short password!'],
      max: [20, 'Too long password!']
    }
  },
  {
    timestamps: true
  }
);

UserSchema.pre('save', function(next) {
  const user = this;
  if (this.isModified('password')) {
    bcrypt.hash(user.password, SALT_ROUND, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      return next();
    })
  } else {
    next();
  }
})

UserSchema.methods.comparePassword = function(password) {
  return bcrypt.compare(password, this.password);
}

module.exports = mongoose.model('User', UserSchema);
