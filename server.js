require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');
const PORT = process.env.PORT || 8001;

// Database Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.error(err));

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});