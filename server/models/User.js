const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        // Remove the required function and handle it in the validation instead
        default: undefined
    },
    googleId: {
        type: String,
        sparse: true
    },
    profilePicture: {
        type: String,
        default: null
    },
    authProvider: {
        type: String,
        enum: ['local', 'google'],
        default: 'local'
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    isVerified: {
        type: Boolean,
        default: false
    }
}, { 
    timestamps: true 
});

// Add custom validation
userSchema.pre('validate', function(next) {
    if (this.authProvider === 'local' && !this.password) {
        this.invalidate('password', 'Password is required for local authentication');
    }
    next();
});

// Add this to make password optional for Google auth
userSchema.pre('save', function(next) {
    if (this.authProvider === 'google') {
        this.password = undefined;
    }
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
