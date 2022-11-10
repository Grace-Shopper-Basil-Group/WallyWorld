const router = require('express').Router()
// const { default: auth } = require('../../client/store/auth');
const { models: { Order, User, OrderItem, Product }} = require('../db');
module.exports = router

const requireToken = async (req, res, next) => {
  console.log("requireToken")
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    req.user = user;
    next();
  } catch(error) {
    next(error);
  }
};

router.get('/cart', async (req, res, next) => {
  console.log('Cart route')
  try {
    const cart = await Order.findOne({
      where: {
        complete: false,
        userId: req.user.id,
      },
      include: { OrderItem, Product }
    })
    res.send(cart)
  } catch(error) {
    next(error)
  }
})