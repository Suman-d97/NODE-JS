class dataController{
    async data(req,res){
        try{
            res.render("studentData",{
                title: "Students Data"
            })
        }catch(err){
            console.log(err)
        }
    }
}

module.exports = new dataController();