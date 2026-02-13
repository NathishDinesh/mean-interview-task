const router = require('express').Router();
const bcrypt = require('bcrypt');
const db = require('../config/mySql');

/* REGISTER */
router.post('/register', async (req, res) => {

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'All fields required' });
  }

  const hash = await bcrypt.hash(password, 10);

  const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';

  db.query(sql, [username, hash], (err) => {

    if (err) {
      return res.status(400).json({ message: 'User already exists' });
    }

    res.json({ message: 'Registered successfully' });
  });
});


/* LOGIN */
router.post('/login', (req, res) => {

  const { username, password } = req.body;

  const sql = 'SELECT * FROM users WHERE username = ?';

  db.query(sql, [username], async (err, result) => {

    if (err || result.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = result[0];

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json({
      message: 'Login successful',
      userId: user.id
    });
  });
});

module.exports = router;
