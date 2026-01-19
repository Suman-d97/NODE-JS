class homeController{
    async index(req,res){
        try{
            res.render("home",{
                title: "Home Page"
            })
        }catch(err){
            console.log(err);
        }
    }
    async about(req,res){
        try{
            res.render("about",{
                title: "About Page"
            })
        }catch(err){
            console.log(err);
        }
    }
    async contact(req,res){
        try{
            res.render("contact",{
                title: "Contact Page"
            })
        }catch(err){
            console.log(err);
        }
    }
}

module.exports = new homeController();