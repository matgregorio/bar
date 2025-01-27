import AuditLog from '../models/AuditLogModel';

export const auditMiddleware = async(req,res, next) =>{
    try{
        if(req.user){
            await AuditLog.create({
                user: req.user._id,
                action: req.method + ' ' + req.originalUrl,
                ip: req.ip
            });
        }
        next();
    }catch(error){
        console.error('Erro no log de auditoria', error);
        next();
    }
}