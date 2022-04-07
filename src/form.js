import { nav } from './nav';

const globalLink = 'https://api.coingecko.com/api/v3/global';
document.addEventListener('DOMContentLoaded', () => {
  nav.getMarketData(globalLink);
});
