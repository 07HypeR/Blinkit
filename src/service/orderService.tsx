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
