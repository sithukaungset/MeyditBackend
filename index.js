const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const fs = require('fs'); // to read the certificate file


// Postgres database part
const { Pool } = require('pg');


dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

const pool = new Pool({
  user: 'postgres',
  host: 'database-1.cmub9ij7l9rn.us-east-1.rds.amazonaws.com',
  database: 'meydit',
  password: 'geniusraver27',
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
    ca: fs.readFileSync('./config/amazon-rds-ca-cert.pem').toString(), // Add the path to the certificate file
  },
});

const userRouter = require('./routes/user')(pool); //Import and pass the pool to the user router
const jobRouter = require('./routes/jobs')(pool); // Import the job router

app.use(cors());
app.use(bodyParser.json());
app.use('/api/jobs', jobRouter); // Add the jobs route
app.use('/api/users', userRouter); // Add the users route
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
