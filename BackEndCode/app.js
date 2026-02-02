const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/dbConnection');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const clientPoRoutes = require('./routes/clientPoRoutes');
const seRoutes = require('./routes/seRoutes');
const expenditureRoutes = require('./routes/expenditureRoutes');
const localPurchase = require('./routes/localPurchaseRoutes');
const conveyance = require('./routes/conveyanceRoutes');

dotenv.config();
connectDB();

const app = express();

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', authRoutes);
app.use('/api', userRoutes)

app.use('/api', clientPoRoutes);
app.use('/api', seRoutes)

app.use('/api', expenditureRoutes);
app.use('/api', localPurchase)
app.use('/api', conveyance)

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



