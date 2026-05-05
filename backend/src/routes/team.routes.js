const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/team.controller');
const { auth, adminOnly } = require('../middleware/auth.middleware');

router.use(auth);

router.get('/', ctrl.getAll);
router.put('/:id/role', adminOnly, ctrl.updateRole);
router.delete('/:id', adminOnly, ctrl.remove);

module.exports = router;
