import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

class ProductService {
findProduct = async (query: any)=> {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 20;
    const offset = (page-1) * limit;
     
        console.log(query)
        let prismaQuery: any = {
            take: limit,
            skip: offset,
        }
        const totalProducts = await prisma.product.count();
        const totalPages = Math.ceil(totalProducts/limit);
        
        if (query.sort){
            let sortQuery = query.sort.split(",")
            console.log(sortQuery)
            prismaQuery = {
                orderBy: [
                    {[sortQuery[0]]: sortQuery[1]}
                ]
            }
        } 
        if (query.name){
            prismaQuery = {
                ...prismaQuery,
                where: {
                    name: {
                        startsWith: query.name
                    }
                }
            }
        } 
        const products = await prisma.product.findMany(prismaQuery)
        return {
            products, page, limit, totalPages
        }
}
createProduct = async (product:any) =>{
    const createdProduct = await prisma.product.create({
        data: product
    });
    return createdProduct;
}
async updateProduct (id: any, data: any){
    const updatePr = await prisma.product.update({
        where: {
            id: id
        },
        data:data
    })
    return updatePr
}



async deleteProduct (id: any) {
    const deletePr = await prisma.product.delete({
        where: {
            id: id
        },
       
    })
    return deletePr
}
}
export default new ProductService();