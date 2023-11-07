const validateApiSchema = (schema) => (request, response, next)=>{
    const {error} = schema.validate(request.body)
    if(error){
        response.status(422).send(error.details)
    } else {
        next()
    }
}

module.exports = validateApiSchema