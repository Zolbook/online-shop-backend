export const ProtectedRouteHandler = async (req:any, res:any)=> {
    res.json({message: `Hi, ${req.user.username}`})
}