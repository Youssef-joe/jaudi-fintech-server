const express = require('express');
const router = express.Router();
const { getAllAuditLogs } = require('./../controllers/audit.controller');
const authMiddleware = require('./../middleware/auth.middleware');
const roleMiddleware = require('./../middleware/rbac.middleware');

// Only accessible by global or regional admin
router.get('/', authMiddleware, roleMiddleware(['global-admin', 'regional-admin']), getAllAuditLogs);

module.exports = router;
