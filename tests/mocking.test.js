import { describe, expect, it, vi } from 'vitest';
import {
  getPriceInCurrency,
  getShippingInfo,
  renderPage,
} from '../src/mocking';
import { getExChangeRate } from '../src/lib/currency';
import { getShippingQuote } from '../src/lib/shipping';
import { trackPageView } from '../src/lib/analytics';

vi.mock('../src/lib/currency');
vi.mock('../src/lib/shipping');
vi.mock('../src/lib/analytics');

describe('test suite', () => {
  it('test case', () => {
    const greet = vi.fn();
    greet.mockReturnValue('Hello');

    const result = greet();
    console.log(result);
  });

  it('test case', () => {
    const greet = vi.fn();
    greet.mockResolvedValue('Hello');

    greet().then((result) => console.log(result));
  });

  it('test case', () => {
    const greet = vi.fn();
    greet.mockImplementation((name) => 'Hello ' + name);

    const result = greet('Nahid');
    console.log(result);
  });
});

describe('Mock Exercise', () => {
  it('should', () => {
    const sendText = vi.fn();
    sendText.mockReturnValue('ok');

    const result = sendText('message');

    expect(sendText).toHaveBeenCalledWith('message');
    expect(result).toBe('ok');
  });
});

describe('getPriceInCurrency', () => {
  it('should return price in target curreny', () => {
    vi.mocked(getExChangeRate).mockReturnValue(1.5);

    const price = getPriceInCurrency(10, 'AUD');

    expect(price).toBe(15);
  });
});

describe('getShippingInfo', () => {
  it('should return shipping unavailable if quote cannot be fetched', () => {
    vi.mocked(getShippingQuote).mockReturnValue(null);
    const result = getShippingInfo('London');

    expect(result).toMatch(/unavailable/i);
  });

  it('should return shipping info if quote can be fetched', () => {
    vi.mocked(getShippingQuote).mockReturnValue({ cost: 10, estimatedDays: 2 });

    const result = getShippingInfo('London');

    expect(result).toMatch('$10');
    expect(result).toMatch(/2 days/i);
    expect(result).toMatch(/shipping cost: \$10 \(2 days\)/i);
  });
});

describe('renderPage', () => {
  it('should return correct content', async () => {
    const result = await renderPage();

    expect(result).toMatch(/content/i);
  });

  it('should called analytics', async () => {
    await renderPage();

    expect(trackPageView).toHaveBeenCalledWith('/home');
  });
});
