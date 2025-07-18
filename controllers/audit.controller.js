const AuditLog = require('./../models/Auditlog');

// Get all audit logs (admin only)
const getAllAuditLogs = async (req, res) => {
  try {
    const logs = await AuditLog.find()
      .populate('performedBy', 'username email role') // Info about who did the action
      .sort({ timestamp: -1 }); // last updated first (keepin it in english)

    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { getAllAuditLogs };
