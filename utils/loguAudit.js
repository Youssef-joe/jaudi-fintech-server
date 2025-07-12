const AuditLog = require("./../models/Auditlog.js");

const logAudit = async ({ action, performedBy, targetModel, targetId, details = {} }) => {
  try {
    await AuditLog.create({
      action,
      performedBy,
      targetModel,
      targetId,
      details,
    });
  } catch (err) {
    console.error("Audit log error:", err.message);
  }
};

module.exports = logAudit;
