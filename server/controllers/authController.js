const User = require('../models/User');
const jwt = require('jsonwebtoken');

const googleAuthCallback = async (req, res) => {
    try {
        console.log('Processing Google callback with user data:', req.user);
        const { id, email, displayName, picture } = req.user;

        // First, try to find user by googleId
        let user = await User.findOne({ googleId: id });

        if (!user) {
            // If not found by googleId, try email
            user = await User.findOne({ email });

            if (user) {
                // Update existing user with Google info
                user.googleId = id;
                user.authProvider = 'google';
                if (!user.profilePicture) {
                    user.profilePicture = picture;
                }
                await user.save();
            } else {
                // Create new user with Google info
                const newUserData = {
                    name: displayName,
                    email: email,
                    googleId: id,
                    profilePicture: picture,
                    authProvider: 'google', // Make sure this is set
                    isVerified: true,
                    role: 'user',
                    // Don't set password at all for Google auth
                };

                console.log('Attempting to create new user with data:', newUserData);

                try {
                    user = new User(newUserData);
                    await user.save();
                    console.log('New user created successfully:', user);
                } catch (createError) {
                    console.error('Detailed create error:', createError);
                    if (createError.errors) {
                        Object.keys(createError.errors).forEach(key => {
                            console.error(`Validation error for ${key}:`, createError.errors[key].message);
                        });
                    }
                    throw new Error(`Failed to create new user: ${createError.message}`);
                }
            }
        }

        if (!user) {
            throw new Error('Failed to process user');
        }

        // Generate JWT token
        const token = jwt.sign(
            { 
                userId: user._id, 
                role: user.role || 'user'
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        console.log('Authentication successful, redirecting with token');
        res.redirect(`${process.env.CLIENT_URL}/login?token=${token}&userId=${user._id}`);
    } catch (error) {
        console.error('Google Auth Callback Error:', error);
        res.redirect(`${process.env.CLIENT_URL}/login?error=${encodeURIComponent(error.message)}`);
    }
};

module.exports = {
    googleAuthCallback
};
