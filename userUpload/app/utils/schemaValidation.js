const Joi = require('joi')

const userSchemavalidation = Joi.object({
    name:Joi.string().min(3).max(30).required(),
    city:Joi.string().min(1).max(10).required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'in'] } }) 
    
})

const productSchemaValidation=Joi.object({
    
})

module.exports = {userSchemavalidation, productSchemaValidation}