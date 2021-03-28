import { http } from './http';
import { nav } from './nav';
import { finance } from './finance-ui';

const globalLink = 'https://api.coingecko.com/api/v3/global';
const platformLink =
  'https://api.coingecko.com/api/v3/finance_platforms?per_page=50';
const productLink =
  'https://api.coingecko.com/api/v3/finance_products?per_page=100';

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
  console.log('test');
  const dataSet = [platformLink, productLink];
  const getArr = [];
  await Promise.all(
    dataSet.map(async (item) => {
      await http
        .get(item)
        .then((data) => {
          getArr.push(data);
        })
        .catch((err) => {
          console.log(err);
        });
    })
  );

  finance.finData(getArr);
}
// Sort by name
document.querySelector('#platform').addEventListener('click', sortByName);
// Sort by category
document.querySelector('#category').addEventListener('click', sortByCategory);
// Sort by supply rate
document.querySelector('#supply').addEventListener('click', sortBySupplyRate);

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
function sortByCategory(e) {
  e.preventDefault();
  finance.sort_2(e.target);
}

// Sort by supply rate
function sortBySupplyRate(e) {
  e.preventDefault();
  finance.sort_3(e.target);
}
