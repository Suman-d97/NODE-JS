
const studentEjsModel= require("../models/studentEjsModel");

class studentEjsModelController {
  async index(req, res) {
    try{
    const data = await studentEjsModel.find();
    res.render("list", {
      title: "studentEjsModel list",
      total: data.length,
      data: data,
    });
    }catch(err){
        console.log(err);
    }
  }
  async add(req, res) {
    res.render("add");
  }
  async store(req, res) {
    
    try {
      const { name, email, city } = req.body;
      const data = new studentEjsModel({
        name,
        email,
        city,
      });
      const studentModel = await data.save();
     if(studentModel){
        res.redirect("list");
     }else{
        res.redirect("add");
     }
    } catch (err) {
      console.log(err);
    }
  }

  async editstudentEjsModel(req, res) {
    try {
      const id=req.params.id
      const data=await studentEjsModel.findById(id)
      res.render("edit", {
        title: "edit studentEjsModel",
       data:data
      });
    } catch (err) {
      console.log(err);
    }
  }
  async UpdatestudentEjsModel(req, res) {
    try {
      const id=req.params.id
      console.log(id);
      
      const data=await studentEjsModel.findByIdAndUpdate(id,req.body,{new:true})
      console.log(data);
      
      res.redirect("/student/list");
     
    } catch (err) {
      console.log(err);
    }
  }
  async deletestudentEjsModel(req, res) {
    try {
      const id=req.params.id
      await studentEjsModel.findByIdAndDelete(id)
      res.redirect("/student/list");
     
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new studentEjsModelController();