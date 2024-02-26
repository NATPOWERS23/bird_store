export const PAGE_SETTINGS = {
  delivery: {
    pageId: 'delivery',
    title: 'Delivery',
    subTitle: 'How to get the order?',
    textContent:
      'Shipping options may vary depending on the delivery address, what time you place your order and item availability. When you process your order, we will show you the shipping methods available, the cost and the estimated delivery date. Please note that deliveries are only made on working days. Please remember that the shipping address of your order must be in the same market/region as where you made the purchase.',
  },
  payment: {
    pageId: 'payment',
    title: 'Payment',
    subTitle: 'How you can pay the order?',
    textContent:
      'We accept the following payment methods: When processing purchases, we will show you the options available for your order. If after a return we provide you with a Card or a Voucher Receipt with the amount of the refund, you can use it to place an order. You have to select "Gift Card" as payment method and enter the corresponding number. The payment will be charged as soon as we send your order. If you have paid by PayPal or Gift Card, it will be charged as soon as you complete the purchase. Some banks may show both a pre-authorisation and the actual subsequent charge. This amount will be automatically released. If this does not happen, we recommend that you contact your bank to expedite the release of the pre-authorisation.',
  },
  aboutus: {
    pageId: 'aboutus',
    title: 'About our store',
    subTitle: 'The heart of the store is our customers',
    textContent:
      'Bird offers a delightful selection of products to enhance your unique style.  We are a customer-focused company that integrates design, production, distribution, and retail to provide a seamless and rewarding shopping experience.',
  },
};

export const BUTTONS_SETTINGS = [
  { id: 'home', icon: 'home', link: '/' },
  { id: 'payment', icon: 'payment', link: '/info/payment' },
  { id: 'delivery', icon: 'local_shipping', link: '/info/delivery' },
  { id: 'aboutus', icon: 'shop', link: '/info/aboutus' },
];
