import { http } from './http';
import { nav } from './nav';
import { network } from './network-ui';
import reload from './reload';

const globalLink = 'https://api.coingecko.com/api/v3/global';
// const addressAPI = `https://api.blockcypher.com/v1/btc/main/addrs/${address}/balance`;
const buttons = document.querySelectorAll('.check-button');
let activeCoin = 'btc';

// Event listeners
document.addEventListener('DOMContentLoaded', nav.getMarketData(globalLink));

buttons.forEach((button) => {
  button.addEventListener('click', selectCoin);
});

function selectCoin(e) {
  e.preventDefault();
  buttons.forEach((button) => {
    button.classList.remove(button.id + '-active');
  });

  const button = e.target;
  activeCoin = button.id;

  button.classList.add(button.id + '-active');
}
