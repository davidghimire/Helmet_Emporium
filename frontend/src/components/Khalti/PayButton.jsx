import KhaltiCheckout from 'khalti-checkout-web';
import axios from 'axios';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';

export const PayButton = ({ order, cartItems, user, totalPrice }) => {
  const navigate = useNavigate();
  const alert = useAlert();
  let config = {
    // replace this key with yours
    publicKey: 'test_public_key_34493b5efd1044f69136820239efc627',
    productIdentity: '1234',
    productName: 'Drogon',
    productUrl: 'http://gameofthrones.com/buy/Dragons',
    eventHandler: {
      async onSuccess(payload) {
        // hit merchant api for initiating verfication
        console.log(payload);
        // code to update isPaid status
        const ord = {
          ...order,
          paymentInfo: { id: payload.idx, status: 'succeeded' },
        };
        console.log(ord);

        try {
          const config = { headers: { 'Content-Type': 'multipart/form-data' } };
          const { data } = await axios.post(`/api/v1/order/new`, ord, config);
          console.log(data);
          cartItems.forEach((item, index) => {
            if (item.productId === ord.orderItems[0].productId) {
              item.stock -= order.orderItems[0].stock;

              cartItems.splice(index, 1);
            }
          });
        } catch (error) {
          console.log(error);
        }

        if (ord) {
          alert.success('Order placed Successfully');
        }
        navigate('/order/success');
        // window.location.href = '/order/success';
      },
      // onError handler is optional
      onError(error) {
        // handle errors
        console.log(error);
      },
      onClose() {
        console.log('widget is closing');
      },
    },
    paymentPreference: ['KHALTI', 'MOBILE_BANKING'],
  };
  const wholeTotal = totalPrice * 100;
  let checkout = new KhaltiCheckout(config);
  const handleCheckout = () => {
    if (user.role === 'admin') {
      alert.error('You are not authorized to order items.');
      return;
    }
    checkout.show({ amount: wholeTotal });
  };

  return (
    <>
      <button id="payment-button" onClick={handleCheckout}>
        Pay
      </button>
    </>
  );
};
