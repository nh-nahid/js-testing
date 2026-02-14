// Lesson: Mocking modules

import { trackPageView } from './lib/analytics';
import { getExChangeRate } from './lib/currency';
import { getShippingQuote } from './lib/shipping';

export function getPriceInCurrency(price, currency) {
  const rate = getExChangeRate('USD', currency);
  return price * rate;
}

// Exercise
export function getShippingInfo(destination) {
  const quote = getShippingQuote(destination);
  if (!quote) return 'Shipping unavailable';

  return `Shipping Cost: $${quote.cost} (${quote.estimatedDays} Days)`;
}

// Lesson: Interaction testing
export async function renderPage() {
  trackPageView('/home');

  return '<div>content</div>';
}

// Exercise
export async function submitOrder(order, creditCard) {
  const paymentResult = await charge(creditCard, order.totalAmount);

  if (paymentResult.status === 'failed') {
    return { success: false, error: 'payment_error' };
  }

  return { success: true };
}
