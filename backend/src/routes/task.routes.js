const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/task.controller');
const { auth, adminOnly } = require('../middleware/auth.middleware');

router.use(auth);

router.get('/dashboard', ctrl.dashboard);
router.get('/', ctrl.getAll);
router.post('/', adminOnly, ctrl.create);
router.put('/:id', ctrl.update);
router.delete('/:id', adminOnly, ctrl.remove);

module.exports = router;
