module.exports = (pool) => {
  const express = require('express');
  const router = express.Router();
  const multer = require('multer');
  const cors = require('cors');
  app.use(cors({
    origin: 'https://frontend-sithukaungset.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
  // Configure multer for image uploads
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${file.originalname}`);
    },
  });

  const upload = multer({ storage });

  // Handle POST request for creating a new job

  router.post('/', upload.array('images'), async (req, res) => {
    // req.body contains the form data
    // req.files contains the uploaded images
    try {
      const { customer_id, job_title, job_description, job_location, clothing_type, description, budget } = req.body;
      const images = req.files.map((file) => file.path).join(','); // Join the array of image paths with a comma delimiter

      const result = await pool.query(
        'INSERT INTO jobs (customer_id, job_title, job_description, job_location, clothing_type, description, budget, images) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
        [customer_id, job_title, job_description, job_location, clothing_type, description, budget, images]
      );
      const newJob = result.rows[0];

      console.log('Job posted:', req.body);
      console.log('Uploaded images:', req.files);

      res.status(201).json({ message: 'Job posted successfully!', job: newJob });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while posting the job.' });
    }
  });

  return router;
};
