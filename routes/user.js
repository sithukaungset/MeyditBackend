const express = require('express');
const router = express.Router();
const cors = require('cors');
app.use(cors({
  origin: 'https://frontend-sithukaungset.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

module.exports = (pool) => {
  router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
      const result = await pool.query(
        'INSERT INTO customers (name, email, password) VALUES ($1, $2, $3) RETURNING *',
        [name, email, password]
      );
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
      const result = await pool.query('SELECT * FROM customers WHERE email = $1', [email]);

      if (result.rows.length > 0) {
        const user = result.rows[0];

        // If you are using plain-text passwords (not recommended), you can compare them directly:
        if (user.password === password) {
          res.status(200).json({ message: 'Login successful!' });
          // You can also return a token or any other data you'd like
        } else {
          res.status(401).json({ error: 'Invalid email or password' });
        }
      } else {
        res.status(401).json({ error: 'Invalid email or password' });
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  return router;
};
