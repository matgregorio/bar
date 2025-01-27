import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    action: String,
    ip: String,
    timestamp: {type: Date, default: Date.now}
});

export default mongoose.model('AuditLog', auditLogSchema);