const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const passport = require('./config/passport');

// Load models
require('./models/User');
require('./models/Post');
require('./models/Comment');



const { authMiddleware } = require('./middleware/authMiddleware');

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors({
    origin: '*',
    credentials: true
}));
app.use(express.json());
app.use(passport.initialize());

// Routes
app.get('/', (req, res) => {
    res.send("Hello World");
});
app.use('/api/auth', require('./routes/auth'));
app.use('/api/posts', authMiddleware, require('./routes/posts'));
app.use('/api/comments', authMiddleware, require('./routes/comments'));
app.use('/api/admin', authMiddleware, require('./routes/admin'));
// app.use('/api/comments',require('./routes/comments'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
