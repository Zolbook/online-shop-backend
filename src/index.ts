import express from 'express';
import helmet from 'helmet';
import path from 'path'
import cors from 'cors';
import * as dotenv from 'dotenv';
import ProductRoute from './Routes/ProductRoute'
import AuthRoute from './Routes/AuthRoute';
import ProtectedRoute from './Routes/ProtectedRoute';
import OrderRoute from './Routes/OrderRoute';

import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

dotenv.config();
const app = express();

app.use(cors());
app.use(
  helmet({
    contentSecurityPolicy: false, 
    crossOriginEmbedderPolicy: false, 
    crossOriginResourcePolicy: { policy: "cross-origin" } 
  })
);

app.use(express.json()); 
app.use(express.static('public'));

const port = 3001
app.use('/public', express.static('public'), (req:any, res:any, next:any) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); 
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin'); 
  next();
});

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Product API',
    version: '1.0.0',
    description: 'API for Product Management',
  },
  servers: [
    {
      url: 'http://localhost:3001',
      description: 'Development server',
    },
  ],
  components: {
    schemas: {
      Product: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            format: 'int64',
          },
          name: {
            type: 'string',
          },
          price: {
            type: 'integer',
            format: 'int32',
          },
        },
      },
    },
  },
};

const options = {
  swaggerDefinition,
 
  apis: ['./**/*.ts']
};

const swaggerSpec = swaggerJsdoc(options);



/**
* @swagger
* /products:
*   get:
*     summary: gets a list of products
*     responses:
*       200:
*         description: A list of products.
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Product'
*/
app.use('/products', ProductRoute);
app.use('/', AuthRoute);
app.use(ProtectedRoute);
app.use('/', OrderRoute);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})







