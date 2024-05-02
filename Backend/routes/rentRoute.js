const express = require('express');
const {
  createRentProduct,
  getAllRentProductsHome,
  getAllRentProducts,
  getAdminRentProducts,
  getRentProductDetails,
  updateRentProduct,
  deleteRentProduct,
} = require('../controllers/rentController');
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

router
  .route('/admin/rent/new')
  .post(
    isAuthenticatedUser,
    authorizeRoles('admin'),
    upload.array('images'),
    createRentProduct
  );
router.route('/rents').get(getAllRentProducts);
router.route('/rent').get(getAllRentProductsHome);

router.route('/admin/rent/products').get(getAdminRentProducts);

router.route('/rent/:id').get(getRentProductDetails);

router
  .route('/admin/rent/:id')
  .put(upload.array('images'), updateRentProduct)
  .delete(deleteRentProduct);

module.exports = router;
