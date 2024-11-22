const isAdmin = function(req, res, next){
    if(req.isAuthenticated() && req.user.admin == true){
        return next()
    }

    res.redirect("/login?alert=Você não possui permissão para entrar!")
}

export default isAdmin