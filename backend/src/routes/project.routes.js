const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/project.controller');
const { auth, adminOnly } = require('../middleware/auth.middleware');

router.use(auth);

router.get('/', ctrl.getAll);
router.post('/', adminOnly, ctrl.create);
router.get('/:id', ctrl.getOne);
router.put('/:id', adminOnly, ctrl.update);
router.delete('/:id', adminOnly, ctrl.remove);
router.post('/:id/members', adminOnly, ctrl.addMember);
router.delete('/:id/members/:userId', adminOnly, ctrl.removeMember);

module.exports = router;
