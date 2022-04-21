import { http } from './http';
import { nav } from './nav';
import { finance } from './finance-ui';
import reload from './reload';

const globalLink = 'https://api.coingecko.com/api/v3/global';
const platformLink =
  'https://api.coingecko.com/api/v3/derivatives/exchanges?per_page=50';

// Event listeners
// Get fin data
document.addEventListener('DOMContentLoaded', finUI);
// Get nav data
document.addEventListener('DOMContentLoaded', nav.getMarketData(globalLink));
// Change supply based on product
document.getElementById('mt-body').addEventListener('change', (e) => {
  const select = e.target.closest('select');
  http
    .get(productLink)
    .then((data) => finance.changeRate(data, select))
    .catch((err) => console.log(err));
});
// Filter list
document.querySelector('#search').addEventListener('keyup', filterList);

async function finUI() {
  const loader = document.getElementById('loader');
  loader.className = 'loader';

  await http
    .get(platformLink)
    .then((data) => {
      finance.finData(data);
    })
    .catch(() => {
      loader.className = '';
      reload('home-b');
    });

  const tBody = document.getElementById('mt-body').innerHTML;

  if (!tBody) {
    loader.className = '';
    reload('home-b');
  }

  loader.className = '';
}

// Sort by name
document.querySelector('#platform').addEventListener('click', sortByName);
// Sort by numbers
document
  .querySelector('#interest')
  .addEventListener('click', sortByNumber('interest'));
document
  .querySelector('#futures')
  .addEventListener('click', sortByNumber('futures'));
document
  .querySelector('#perpetual')
  .addEventListener('click', sortByNumber('perpetual'));
document
  .querySelector('#volume')
  .addEventListener('click', sortByNumber('volume'));

function filterList(e) {
  // Check if there is input value
  if (e.target.value == (null || undefined)) return;

  const rowArr = Array.from(
    document.querySelector('#mt-body').querySelectorAll('tr')
  );

  // Check for searched value and display only those who match
  for (let i = 0; i < rowArr.length; i++) {
    if (
      rowArr[i].childNodes[0].firstChild.innerHTML
        .toUpperCase()
        .match(e.target.value.toUpperCase()) != null
    ) {
      rowArr[i].style.display = '';
    } else {
      rowArr[i].style.display = 'none';
    }
  }
}

// Sort by name
function sortByName(e) {
  e.preventDefault();
  finance.sort_1(e.target);
}

// Sort by category
function sortByNumber(type) {
  return (e) => {
    e.preventDefault();
    finance.sort_2(e.target, type);
  };
}
