const router = require('express').Router();
const Order = require('../models/order.model');

/* CREATE ORDER */
router.post('/', async (req, res) => {
  try {

    const order = await Order.create(req.body);

    res.status(201).json(order);

  } catch (err) {
    res.status(400).json(err);
  }
});


/* GET BY ID */
router.get('/:id', async (req, res) => {
  try {

    const order = await Order.findById(req.params.id)
      .populate('productIds');

    res.json(order);

  } catch {
    res.status(404).json({ message: 'Order not found' });
  }
});


/* UPDATE */
router.put('/:id', async (req, res) => {
  try {

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(order);

  } catch (err) {
    res.status(400).json(err);
  }
});


/* DELETE */
router.delete('/:id', async (req, res) => {
  try {

    await Order.findByIdAndDelete(req.params.id);

    res.json({ message: 'Order deleted' });

  } catch {
    res.status(400).json({ message: 'Error' });
  }
});

module.exports = router;
