const Category = require('../models/category');
const ErrorHandler = require('../utils/errorhandler');
const catchAsyncErrors = require('../middleware/catchAsyncError');
const slugify = require('slugify');
const cloudinary = require('cloudinary');
const DataUriParser = require('datauri/parser.js');
const path = require('path');

const getDataUri = (file) => {
  const parser = new DataUriParser();
  const extName = path.extname(file.originalname);
  const uri = parser.format(extName, file.buffer);
  return uri;
};

exports.createCategory = catchAsyncErrors(async (req, res, next) => {
  try {
    const image = req.file;
    console.log(image);
    if (!image) {
      console.error('Error: no avatar image provided');
      return res.status(400).json({ message: 'No avatar image provided' });
    }
    const imageData = getDataUri(image);
    const result = await cloudinary.v2.uploader.upload(imageData.content, {
      folder: 'category',
    });

    if (!result) {
      console.error('Error: failed to upload image to Cloudinary');
      return res
        .status(500)
        .json({ message: 'Error uploading image to Cloudinary' });
    }

    const { title } = req.body;
    const slug = slugify(title, { lower: true, remove: /[*+~.()'"!:@]/g });

    const category = new Category({
      title,
      slug,
      image: {
        public_id: result.public_id,
        url: result.secure_url,
      },
    });

    const resultt = await category.save();
    res.status(201).json({
      success: true,
      category: resultt,
    });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

exports.deleteCategory = catchAsyncErrors(async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (category == null) {
      return res.status(404).send({ message: 'Category not found' });
    }
    await category.remove();
    res.send({ message: 'Category deleted' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

exports.getAllCategory = catchAsyncErrors(async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.send(categories);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
