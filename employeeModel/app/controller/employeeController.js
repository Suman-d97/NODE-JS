const employeeModel = require("../models/employeeModel");
const fs = require("fs");
const path = require("path");

class EmpModelController {
    async index(req, res) {
    try {
      const data = await employeeModel.find();
      res.render("list", {
      title: "Employee List",
      total: data.length,
      data: data,
      });
    } catch (err) {
      console.log(err);
    }
    }


    async add(req, res) {
    res.render("add");
    }


    async store(req, res) {
     try {
        const { name, employee_id } = req.body
        const contact = {
          email: req.body['contact[email]'] || (req.body.contact && req.body.contact.email),
          phone: req.body['contact[phone]'] || (req.body.contact && req.body.contact.phone),
          address: req.body['contact[address]'] || (req.body.contact && req.body.contact.address),
          city: req.body['contact[city]'] || (req.body.contact && req.body.contact.city),
          full_address: req.body['contact[full_address]'] || (req.body.contact && req.body.contact.full_address)
        }

        const department = {
          department_name: req.body['department[department_name]'] || (req.body.department && req.body.department.department_name)
        }

        let image = "https://cdn-icons-png.freepik.com/256/11136/11136505.png";
        if (req.file) {
          image = req.file.path.replace(/\\/g, '/');
        }

        const data = new employeeModel({
          name,
          employee_id,
          contact,
          department,
          image
        })

        const employee = await data.save()

        if (employee) {
          res.redirect("/employee/list")
        } else {
          res.redirect("/employee/add")
        }
      } catch (error) {

        res.redirect("/employee/add")
      }
    }


  async editEmp(req, res) {
    try {
      const { id } = req.params;
      const emp = await employeeModel.findById(id);

      if (emp) {
        res.render("edit", { employee: emp }); // CORRECT
      } else {
        res.redirect("/employee/list");
      }

    } catch (error) {
      console.log(error);
      res.redirect("/employee/list");
    }
  }

      async updateEmp(req, res) {
      try {
        const { id } = req.params;
        const { name, employee_id } = req.body;

        const contact = {
          email: req.body['contact[email]'] || (req.body.contact && req.body.contact.email),
          phone: req.body['contact[phone]'] || (req.body.contact && req.body.contact.phone),
          city: req.body['contact[city]'] || (req.body.contact && req.body.contact.city),
          full_address: req.body['contact[full_address]'] || (req.body.contact && req.body.contact.full_address)
        };

        const department = {
          department_name: req.body['department[department_name]'] || (req.body.department && req.body.department.department_name)
        };

        const updateData = {
          name,
          employee_id,
          contact,
          department
        };

        if (req.file) {
          const oldEmp = await employeeModel.findById(id);
          if (oldEmp && oldEmp.image && !oldEmp.image.includes("cdn-icons-png.freepik.com")) {
            const filePath = path.join(__dirname, '../../', oldEmp.image);
            fs.unlink(filePath, (err) => {

            });
          }
          updateData.image = req.file.path.replace(/\\/g, '/');
        }

        await employeeModel.findByIdAndUpdate(id, updateData);
        res.redirect("/employee/list");
      } catch (error) {

        res.redirect("/employee/list");
      }
      }

      async deleteEmp(req, res) {
        try {
        const { id } = req.params;
        const emp = await employeeModel.findById(id);
        if (emp && emp.image && !emp.image.includes("cdn-icons-png.freepik.com")) {
          const filePath = path.join(__dirname, '../../', emp.image);
          fs.unlink(filePath, (err) => {

          });
        }
        await employeeModel.findByIdAndDelete(id);
        res.redirect("/employee/list");
      } catch (error) {

        res.redirect("/employee/list");
      }
      }
  }

  module.exports = new EmpModelController();


