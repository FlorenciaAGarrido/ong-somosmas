const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
    
        openapi: '3.0.2',
        info: {
            title: 'Somos más API',
            description: 'API Documentation for use',
            version: '1.0.0',
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT}`,
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                },
            },     	
        },
      
};

const swaggerOptions = {
	swaggerDefinition,
	apis: ['./routes/*doc.js'],
}; 

//const swagger = swaggerJSDoc(swaggerOptions);

//module.exports = {swagger};
module.exports = swaggerJSDoc(swaggerOptions);
