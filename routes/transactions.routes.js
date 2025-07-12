const express = require('express');
const router = express.Router();
const {
  createTransaction,
  getMyTransaction,
  getAllTransactions,
  updateTransactionStatus
} = require("./../controllers/transactions.controller.js");

const authMiddleware = require("./../middleware/auth.middleware.js");
const roleMiddleware = require("./../middleware/rbac.middleware.js");

router.post('/', authMiddleware, roleMiddleware(['partner-sender']), createTransaction);

router.get('/mine', authMiddleware, roleMiddleware(['partner-sender', 'partner-receiver']), getMyTransaction);

router.get('/', authMiddleware, roleMiddleware(['global-admin', 'regional-admin']), getAllTransactions);

router.patch('/:id/status', authMiddleware, roleMiddleware(['global-admin', 'regional-admin']), updateTransactionStatus);

module.exports = router;
