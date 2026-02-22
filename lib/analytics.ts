// Meta Pixel tracking
export function trackPurchase(purchaseData: {
  value: number;
  currency: string;
  content_name?: string;
  content_type?: string;
  contents?: Array<{
    id: string;
    quantity: number;
    title: string;
    price: number;
  }>;
  num_items?: number;
}) {
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', 'Purchase', {
      value: purchaseData.value,
      currency: purchaseData.currency || 'USD',
      content_name: purchaseData.content_name,
      content_type: purchaseData.content_type || 'product',
      contents: purchaseData.contents,
      num_items: purchaseData.num_items,
    });
  }
}

export function trackAddToCart(productData: {
  product_id: string;
  product_name: string;
  value: number;
  currency: string;
  quantity: number;
}) {
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', 'AddToCart', {
      value: productData.value,
      currency: productData.currency || 'USD',
      content_name: productData.product_name,
      content_type: 'product',
      contents: [
        {
          id: productData.product_id,
          title: productData.product_name,
          quantity: productData.quantity,
          price: productData.value,
        },
      ],
    });
  }
}

export function trackViewContent(productData: {
  product_id: string;
  product_name: string;
  value: number;
  currency: string;
}) {
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', 'ViewContent', {
      value: productData.value,
      currency: productData.currency || 'USD',
      content_name: productData.product_name,
      content_type: 'product',
      content_id: productData.product_id,
    });
  }
}

// Google Ads tracking
export function trackGooglePurchase(purchaseData: {
  transaction_id: string;
  value: number;
  currency: string;
  items?: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
  }>;
}) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'purchase', {
      transaction_id: purchaseData.transaction_id,
      value: purchaseData.value,
      currency: purchaseData.currency || 'USD',
      items: purchaseData.items || [],
    });
  }
}

export function trackGoogleAddToCart(productData: {
  product_id: string;
  product_name: string;
  value: number;
  currency: string;
  quantity: number;
}) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'add_to_cart', {
      items: [
        {
          item_id: productData.product_id,
          item_name: productData.product_name,
          price: productData.value,
          quantity: productData.quantity,
          currency: productData.currency || 'USD',
        },
      ],
    });
  }
}

export function trackGoogleCheckout(cartData: {
  value: number;
  currency: string;
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
  }>;
}) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'begin_checkout', {
      value: cartData.value,
      currency: cartData.currency || 'USD',
      items: cartData.items,
    });
  }
}
