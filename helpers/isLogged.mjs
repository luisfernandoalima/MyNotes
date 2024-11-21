const isLogged = function(req, res, next){
    if(req.isAuthenticated()){
        return next()
    }
    
    res.redirect("/login?alert=Você deve estar logado para entrar!")
}

export default isLogged