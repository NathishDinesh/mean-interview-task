const router = require('express').Router();
const axios = require('axios');

const API_KEY = 'd6c6988f6f9fd619b72c3878e07e7f0b';

router.get('/', async (req, res) => {

  try {

    const city = req.query.city || 'Chennai';

    const url =
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    const response = await axios.get(url);

    res.json(response.data);

  } catch (err) {

    res.status(500).json({ message: 'Weather fetch failed' });
  }
});

module.exports = router;
