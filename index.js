const express = require("express");
const bodyParser = require('body-parser');
const dotEnv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors')
const departmentRoutes = require('./routes/departmentRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const taskRoutes = require('./routes/taskRoutes')


const app = express();
app.use(bodyParser.json());
app.use(cors());

dotEnv.config();

mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch((error) => {
        console.error(`${error}`);
        process.exit(1);
    });

app.use('/departments', departmentRoutes);
app.use('/employees', employeeRoutes);
app.use('/', taskRoutes)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running @ ${PORT}`);
})