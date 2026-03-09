const PDFDocument = require('pdfkit');
const studentFormModel = require('../models/studentFormModel');

class StudentFormController {

    async index(req, res) {
        try {

            const data = await studentFormModel.find().sort({ createdAt: -1 });

            return res.status(200).json({
                success: true,
                message: 'Students fetched successfully',
                total: data.length,
                data: data
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: 'Unable to fetch students',
                error: error.message
            });

        }
    }



   
    async create(req, res) {
        try {

            const { Basic_Information, Address_Details, Educational_Background } = req.body;

            const student = await studentFormModel.create({
                Basic_Information,
                Address_Details,
                Educational_Background
            });

            return res.status(201).json({
                success: true,
                message: 'Student created successfully',
                data: student
            });

        } catch (error) {

            return res.status(400).json({
                success: false,
                message: 'Unable to create student',
                error: error.message
            });

        }
    }




    async findById(req, res) {
        try {

            const student = await studentFormModel.findById(req.params.id);

            if (!student) {
                return res.status(404).json({
                    success: false,
                    message: 'Student not found'
                });
            }

            return res.status(200).json({
                success: true,
                message: 'Student fetched successfully',
                data: student
            });

        } catch (error) {

            return res.status(400).json({
                success: false,
                message: 'Invalid student ID',
                error: error.message
            });

        }
    }




    async getPDF(req, res) {
        try {

            const student = await studentFormModel.findById(req.params.id);

            if (!student) {
                return res.status(404).json({
                    success: false,
                    message: 'Student not found'
                });
            }

            const doc = new PDFDocument({ margin: 50 });
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader(
                'Content-Disposition',
                `inline; filename=${student.Basic_Information.First_Name}-details.pdf`
            );

            doc.pipe(res);
            doc.fontSize(20).table('Student Details', { align: 'center' });
            doc.moveDown();
            doc.fontSize(14).table('Basic Information');
            doc.fontSize(12).table(
                `Name: ${student.Basic_Information.First_Name} ${student.Basic_Information.Last_Name}`
            );
            doc.table(`Email: ${student.Basic_Information.Email_Address}`);
            doc.table(`Phone: ${student.Basic_Information.Phone_Number}`);
            doc.table(
                `Date of Birth: ${new Date(
                    student.Basic_Information.Date_of_Birth
                ).toDateString()}`
            );

            doc.moveDown();
            doc.fontSize(14).table('Address Details');
            doc.fontSize(12).table(
                `Street: ${student.Address_Details.Street_Address}`
            );
            doc.table(`City: ${student.Address_Details.City}`);
            doc.table(`State: ${student.Address_Details.State}`);
            doc.table(`Postal Code: ${student.Address_Details.Postal_Code}`);

            doc.moveDown();

            doc.fontSize(14).table('Educational Background');
            doc.fontSize(12).table(
                `Institution: ${student.Educational_Background.Institution_Name}`
            );
            doc.table(
                `Field: ${student.Educational_Background.Field_of_Study}`
            );
            doc.table(
                `Year: ${student.Educational_Background.Year_of_Graduation}`
            );
            doc.table(
                `CGPA/Percentage: ${student.Educational_Background.Percentage_or_CGPA}`
            );

            doc.end();

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: 'Unable to generate PDF',
                error: error.message
            });

        }
    }

}

module.exports = new StudentFormController();