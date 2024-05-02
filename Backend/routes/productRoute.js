const express = require('express');
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  getAdminProducts,
  getAllProductsHome,
  getCategoryProduct,
} = require('../controllers/productController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');
const router = express.Router();
const multer = require('multer');

const upload = multer({
  fileFilter(req, file, callback) {
    if (!file.originalname.match(/.(jpg|jpeg|png)$/)) {
      return;
    }
    callback(undefined, true);
  },
});

router.route('/products').get(getAllProducts);
router.route('/product').get(getAllProductsHome);

router.route('/admin/products').get(getAdminProducts);

router
  .route('/admin/product/new')
  .post(
    isAuthenticatedUser,
    authorizeRoles('admin'),
    upload.array('images'),
    createProduct
  );

router.route('/admin/product/:id').put(upload.array('images'), updateProduct);

router.route('/admin/product/:id').delete(deleteProduct);

router.route('/product/:id').get(getProductDetails);

router.route('/category/products/:cat').get(getCategoryProduct);
module.exports = router;
