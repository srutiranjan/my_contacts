const express = require('express');
const router = express.Router();
const validationToken = require('../middleware/validationTokenhandler');
const {
    getContacts,
    createContact,
    getContactById,
    updateContact,
    deleteContact,
} = require('../controllers/contactController');
router.use(validationToken);
router.route('/').get(getContacts).post(createContact);
router.route('/:id').get(getContactById).put(updateContact).delete(deleteContact);
module.exports = router;