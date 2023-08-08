const router = require('express').Router();

const {
  createUser,
  getUsers,
  getUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/test');

router.post('/test', createUser);
router.get('/test', getUsers);
router.get('/test/:userId', getUser);

router.patch('/test/me', updateProfile);
router.patch('/test/me/avatar', updateAvatar);

module.exports = router;
