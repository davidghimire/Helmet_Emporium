const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const Rent = require('../models/rentModel');
const ErrorHandler = require('../utils/errorhandler');
const catchAsyncErrors = require('../middleware/catchAsyncError');

//create new order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const { shippingInfo, orderItems, paymentInfo, itemsPrice, totalPrice } =
    req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    order,
  });
});

//get single Order
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'firstName lastName email'
  );

  if (!order) {
    return next(new ErrorHandler('Order not found with this id', 404));
  }
  res.status(200).json({
    success: true,
    order,
  });
});

//get logged in user Orders
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders,
  });
});

//get all Orders --Admin
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

//update Orders status--Admin
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler('Order not found with this id', 404));
  }

  if (order.orderStatus === 'Delivered') {
    return next(new ErrorHandler('Already delivered the order', 400));
  }

  order.orderStatus = req.body.status;

  //new code
  if (req.body.status === 'Delivered') {
    order.deliveredAt = Date.now();
    order.orderItems.forEach(async (ord) => {
      let product;

      if (ord.productType === 'rent') {
        product = await Rent.findById(ord.product);
      } else {
        // Find product by id in Rent model
        product = await Product.findById(ord.product);
      }

      if (product) {
        product.stock -= ord.stock;
        await product.save({ validateBeforeSave: false });
      }
    });
  }

  await order.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

async function updateStock(id) {
  const product = await Product.findById(id);
  await product.save({ validateBeforeSave: false });
}
// delete Order -- Admin
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler('Order not found with this Id', 404));
  }

  await order.remove();

  res.status(200).json({
    success: true,
  });
});

//cancelled order
exports.cancelOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler('Order not found with this id', 404));
  }

  if (order.orderStatus === 'Cancelled') {
    return next(new ErrorHandler('Order is already cancelled', 400));
  }

  if (order.orderStatus === 'Delivered') {
    return next(new ErrorHandler('Cannot cancel a delivered order', 400));
  }

  order.orderStatus = 'Cancelled';

  await order.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});
