const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    sparse: true,
    trim: true,
    lowercase: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  roleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
    required: true,
  },
  status: {
    type: String,
    default: 'active',
    enum: ['active', 'deleted'],
  },
  avatar: {
    type: String,
    default: null,
  },
  balance: {
    type: Number,
    default: 0,
    min: 0,
  },
}, { timestamps: true });

// Lọc user active (soft delete filter)
userSchema.index({ status: 1 });

// Pre-save hook to generate default avatar using ui-avatars.com
userSchema.pre('save', function (next) {
  if (this.isNew && !this.avatar) {
    const encodedName = encodeURIComponent(this.fullName || 'User');
    // Generates a nice initials avatar with a random background
    this.avatar = `https://ui-avatars.com/api/?name=${encodedName}&background=random&color=fff&size=256`;
  }
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
