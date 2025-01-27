import AuditLog from '../models/AuditLogModel';

export const generateTokens = (user) => {
    
    const acessToken = jwt.sign(
        {id: user._id, cargo: user.cargo}, 
        process.env.JWT_SECRET,
        {expiresIn: '15m'}
    )

    const refreshToken = jwt.sign(
        {id: user._id},
        process.env.JWT_REFRESH_SECRET,
        {expiresIn: '7d'}
    );

    return {acessToken, refreshToken};
}

export const authMiddleware = (roles = []) => {
    return async(req, res, next) => {
        try{
            const token = req.cookies.token || req.headers.autorization?.split(' ')[1];

            if(!token) return res.status(401).json({message: 'Acesso negado'});

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-senha');

            if(roles.length && !roles.includes(req.user.cargo)){
                return res.status(403).json({message: 'Acesso proibido'});
            }

            next();
        }catch(error){
            res.status(401).json({message: 'Token inválido'});
        }
    };
};