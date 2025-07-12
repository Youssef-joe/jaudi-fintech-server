// models/AuditLog.js
const mongoose = require("mongoose");

const auditLogSchema = new mongoose.Schema({
  action: { type: String, required: true }, // create, update, delete, approve, reject, etc.
  performedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  targetModel: { type: String, required: true }, // e.g., "Transaction"
  targetId: { type: mongoose.Schema.Types.ObjectId, required: true },
  timestamp: { type: Date, default: Date.now },
  details: { type: Object }, // optional extra info
});

module.exports = mongoose.model("AuditLog", auditLogSchema);
