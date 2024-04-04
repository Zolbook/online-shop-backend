import {Request, Response, NextFunction} from 'express';

import ProductService from "../Services/ProductService";


class ProductController {
    async getProducts(req: any, res:any, next:any) {
        let products  = await ProductService.findProduct(req.query);
        return res.json(products)
    }




    async getAllProducts(req:any, res:any, next:any){
    const {name, image, price, colors} = req.body
    const products1 = await ProductService.createProduct({name, image, price, colors });
    return res.json(products1)
}


async updateProductWithId (req:any, res:any, next:any){
    const updatedProduct = await ProductService.updateProduct(
        parseInt(req.params.id), req.body
    )
    return res.json(updatedProduct)
}




async deleteProductWithId (req: any, res:any, next:any){
    const deleteProduct = await ProductService.deleteProduct(
        parseInt(req.params.id)
    )
    return res.json(deleteProduct);
}

}
 export default new ProductController;