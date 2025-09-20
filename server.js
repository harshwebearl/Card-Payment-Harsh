require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const cardRoutes = require('./Payment.Routes');
const adminLoginRoutes = require('./Admin.Login.Routes');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;


// Middleware
app.use(cors());
app.use(bodyParser.json());


// Routes
app.use('/cards', cardRoutes);
app.use('/', adminLoginRoutes);

app.get('/', (req, res) => {
    res.send('Payment Card CRUD API is running.');
});

// Connect to MongoDB and start server
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log('Connected to MongoDB');

        // Ensure default admin user exists
        const AppAdmin = require('./Admin.Login.Models');
        const defaultAdmin = {
            email: 'admin@gmail.com',
            phoneNumber: '9033251903',
            password: '123123'
        };
        try {
            const existing = await AppAdmin.findOne({ email: defaultAdmin.email });
            if (!existing) {
                await AppAdmin.create(defaultAdmin);
                console.log('Default admin user created.');
            } else {
                console.log('Default admin user already exists.');
            }
        } catch (err) {
            console.error('Error ensuring default admin user:', err);
        }

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });
