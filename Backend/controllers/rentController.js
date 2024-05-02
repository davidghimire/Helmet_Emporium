const Rent = require('../models/rentModel');
const ErrorHandler = require('../utils/errorhandler');
const catchAsyncErrors = require('../middleware/catchAsyncError');
const ApiFeatures = require('../utils/apifeatures');
const cloudinary = require('cloudinary');
const DataUriParser = require('datauri/parser.js');
const path = require('path');

const getDataUri = (file) => {
  const parser = new DataUriParser();
  const extName = path.extname(file.originalname);
  const uri = parser.format(extName, file.buffer);
  return uri;
};

// create Rent product -- Admin
exports.createRentProduct = catchAsyncErrors(async (req, res, next) => {
  let images = req.files;
  console.log(images);
  //const imageData = getDataUri(image);

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const imageData = getDataUri(images[i]);
    const result = await cloudinary.v2.uploader.upload(imageData.content, {
      folder: 'products',
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  req.body.user = req.user.id;

  const rentProduct = await Rent.create(req.body);
  res.status(201).json({
    success: true,
    rentProduct,
  });
});

// Get All  Rent Products --Home page
exports.getAllRentProductsHome = catchAsyncErrors(async (req, res) => {
  const resultPerPage = 4;
  const rentsCount = await Rent.countDocuments();
  const apiFeatures = new ApiFeatures(Rent.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const rents = await apiFeatures.query;

  res.status(200).json({
    success: true,
    rents,
    resultPerPage,
    rentsCount,
  });
});

// Get All  Rent Products
exports.getAllRentProducts = catchAsyncErrors(async (req, res) => {
  const resultPerPage = 10;
  const rentsCount = await Rent.countDocuments();
  const apiFeatures = new ApiFeatures(Rent.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const rents = await apiFeatures.query;

  res.status(200).json({
    success: true,
    rents,
    resultPerPage,
    rentsCount,
  });
});

// Get All  Rent Products --(ADMIN)
exports.getAdminRentProducts = catchAsyncErrors(async (req, res) => {
  const rents = await Rent.find();
  res.status(200).json({
    success: true,
    rents,
  });
});

// Get Rent Product Details
exports.getRentProductDetails = catchAsyncErrors(async (req, res, next) => {
  const rent = await Rent.findById(req.params.id);

  if (!rent) {
    return next(new ErrorHandler('Product not found', 404));
  }

  res.status(200).json({
    success: true,
    rent,
  });
});

//update Rent Product --Admin

exports.updateRentProduct = catchAsyncErrors(async (req, res, next) => {
  let rent = await Rent.findById(req.params.id);

  if (!rent) {
    return next(new ErrorHandler('Product not found', 404));
  }

  // Images Start Here
  let images = [];

  if (typeof req.body.images === 'string') {
    images.push(req.body.images);
  } else {
    images = req.files;
  }
  console.log(images);
  if (images.length > 0) {
    // Deleting Images From Cloudinary
    for (let i = 0; i < rent.images.length; i++) {
      await cloudinary.v2.uploader.destroy(rent.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const imageData = getDataUri(images[i]);
      const result = await cloudinary.v2.uploader.upload(imageData.content, {
        folder: 'products',
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  rent = await Rent.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  return res.status(200).json('Updated');
});

// Delete  Rent Product

exports.deleteRentProduct = catchAsyncErrors(async (req, res, next) => {
  const rent = await Rent.findById(req.params.id);

  if (!rent) {
    return next(new ErrorHandler('Product not found', 404));
  }
  await rent.remove();

  res.status(200).json({
    success: true,
    message: 'Product Deleted Sucessfully',
  });
});
