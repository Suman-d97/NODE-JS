const csv = require('csvtojson')

class CsvController{

    async createData(req,res){

        try{
            const userData=[]

            csv().fromFile(req.file.path)
            .then(async(response)=>{
                for(let i=0;i<response.length; i++){
                    userData.push({
                        name:response[i].name,
                        email:response[i].email,
                        city:response[i].city,
                    })
                }

                const datas=await CsvModel.insertMany(userData)

                return res.status(201).json({
                    message:"csv data inserted successfully",
                    data:datas
                })
            })

        }catch(error){
            console.log(error)

        }
      

    }

    async getData(req,res){
        try{
            const dd=await CsvModel.find()
            return res.status(200).json({
                message:"csv data get successfully",
                total:dd.length,
                data:dd
            })

        }catch(error){
            console.log(error)
        }
    }
}



module.exports=new CsvController()