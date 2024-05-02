const express = require('express');
const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUser,
  getSingleUser,
  updateUserRole,
  verifyUser,
  deleteUser,
} = require('../controllers/userController');
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

//router.route('/register').post(upload.any(), registerUser);
// UploadStream.single() || upload.array()

router.post('/register', upload.single('image'), registerUser);

router.route('/login').post(loginUser);

router.route('/verify/:token').get(verifyUser);

router.route('/password/forgot').post(forgotPassword);

router.route('/password/reset/:token').put(resetPassword);

router.route('/logout').get(logout);

router.route('/me').get(isAuthenticatedUser, getUserDetails);

router.route('/password/update').put(isAuthenticatedUser, updatePassword);

router
  .route('/me/update')
  .put(isAuthenticatedUser, upload.none(''), updateProfile);

router
  .route('/admin/users')
  .get(isAuthenticatedUser, authorizeRoles('admin'), getAllUser);

router
  .route('/admin/user/:id')
  .get(isAuthenticatedUser, authorizeRoles('admin'), getSingleUser)
  .put(isAuthenticatedUser, authorizeRoles('admin'), updateUserRole)
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteUser);

module.exports = router;
