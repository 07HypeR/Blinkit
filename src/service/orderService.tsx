import {appAxios} from './apiInterceptors';

export const createOrder = async (items: any, totalPrice: number) => {
  try {
    const response = await appAxios.post(`/order`, {
      items: items,
      branch: '671bc35ed270828b06df953c',
      totalPrice: totalPrice,
    });

    return response.data;
  } catch (error) {
    console.log('Create Order Error', error);
    return null;
  }
};
export const getOrderById = async (id: string) => {
  try {
    const response = await appAxios.get(`/order/${id}`);

    return response.data;
  } catch (error) {
    console.log('Fetch Order Error', error);
    return null;
  }
};
export const fetchCustomerOrders = async (userId: string) => {
  try {
    const response = await appAxios.get(`/order?customerId${userId}`);

    return response.data;
  } catch (error) {
    console.log('Fetch Customer Order Error', error);
    return null;
  }
};
