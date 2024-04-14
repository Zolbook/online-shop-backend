"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const dotenv = __importStar(require("dotenv"));
const ProductRoute_1 = __importDefault(require("./Routes/ProductRoute"));
const AuthRoute_1 = __importDefault(require("./Routes/AuthRoute"));
const ProtectedRoute_1 = __importDefault(require("./Routes/ProtectedRoute"));
const OrderRoute_1 = __importDefault(require("./Routes/OrderRoute"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
dotenv.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(express_1.default.json());
app.use(express_1.default.static('public'));
const port = 3001;
app.use('/public', express_1.default.static('public'), (req, res, next) => {
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
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
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
app.use('/products', ProductRoute_1.default);
app.use('/', AuthRoute_1.default);
app.use(ProtectedRoute_1.default);
app.use('/', OrderRoute_1.default);
app.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
