import OrderService from '../Services/OrderService'


class OrderController {
  async createOrder(req:any, res:any, next:any) {
      try {
          const userId = req.user?.id; 

          const data = {
              user_id: userId,
              products: req.body.products,
          };

          const orderService = new OrderService();
          const result = await orderService.createOrder(data);

          res.status(201).json({data: result});
      } catch (error) {
          next(error);
      }
  }
  async deleteOrder(req: any, res: any, next: any) {

      const orderId = parseInt(req.params.id);
      const orderService = new OrderService();
      const deletedOrder = await orderService.deleteOrderProduct(orderId);
      return res.json({ message: 'Order deleted successfully', data: deletedOrder })
  }

}


export default new OrderController