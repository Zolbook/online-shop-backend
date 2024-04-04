import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface OrderProductCreate {
  product_id: number;
  quantity: number;
}

export default class OrderService {
  async createOrder(data: { user_id: number; products: OrderProductCreate[] }) {
    let totalPrice = 0;
    const order = await prisma.order.create({
      data: {
        userId: data.user_id,
        totalPrice,
      },
    });

    await Promise.all(
      data.products.map(async (value: OrderProductCreate) => {
        const product = await prisma.product.findUnique({
          where: {
            id: value.product_id,
          },
        });

        if (product) {
          totalPrice += product.price * value.quantity;
          await prisma.orderProduct.create({
            data: {
              productId: product.id,
              orderId: order.id,
              quantity: value.quantity,
            },
          });
        }
      })
    );

    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        totalPrice: totalPrice,
      },
    });
    return 'ok';
  }


  async deleteOrderProduct (orderId:number){
const deletePr = await prisma.order.delete({
  where: {
    id: orderId
  }
 
}
)
 return deletePr
  }
}

