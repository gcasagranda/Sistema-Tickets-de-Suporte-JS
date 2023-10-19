module.exports= {
    isAdmin(req, res, next){
        if(req.session.role === 'admin'){
            next();
        } else if (req.session.role != undefined) {
            res.status(401).redirect('/home?mensagem=Acesso%20não%20autorizado.');
        } else {
            res.status(401).redirect('/?mensagem=Acesso%20não%20autorizado.');
        }
    },
    isUser(req, res, next){
        if(req.session.role === 'user'){
            next();
        } else if (req.session.role != undefined) {
            res.status(401).redirect('/home?mensagem=Acesso%20não%20autorizado.');
        } else {
            res.status(401).redirect('/?mensagem=Acesso%20não%20autorizado.');
        }
    },
    isTech(req, res, next){
        if(req.session.role === 'tech'){
            next();
        } else if (req.session.role != undefined) {
            res.status(401).redirect('/home?mensagem=Acesso%20não%20autorizado.');
        } else {
            res.status(401).redirect('/?mensagem=Acesso%20não%20autorizado.');
        }
    }
}