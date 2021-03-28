import { http } from './http';
import { nav } from './nav';
import { news } from './news-ui';

const globalLink = 'https://api.coingecko.com/api/v3/global';
const newsLink = `https://api.coingecko.com/api/v3/status_updates?per_page=10`;
const categories = document.getElementsByClassName('category');
let counter = 1;

// Event listeners
document.addEventListener('DOMContentLoaded', nav.getMarketData(globalLink));
document.addEventListener('DOMContentLoaded', getNewsData(newsLink));
document.addEventListener('DOMContentLoaded', category());
document.getElementById('load').addEventListener('click', loadMore);

async function getNewsData(link) {
  await http
    .get(link)
    .then((data) => news.getData(data.status_updates))
    .catch((err) => console.log(err));
}

// Load more posts
async function loadMore(e, x) {
  e.preventDefault();

  if (!x) {
    counter++;
  }
  // Add loader
  document.getElementById('wait-circle').classList = 'loader';
  document.getElementById('load').style.visibility = 'hidden';

  // Get current category
  const category = document.getElementById('main').className;

  // Get posts
  const newsLink = `https://api.coingecko.com/api/v3/status_updates?${category}per_page=10&page=${counter}`;
  await getNewsData(newsLink);

  // Remove circle
  document.getElementById('wait-circle').classList = '';
  document.getElementById('load').style.visibility = 'visible';
}

// Add event listener to categories
function category() {
  for (let i = 0; i < categories.length; i++) {
    categories[i].addEventListener('click', (e) => {
      e.preventDefault();

      const main = document.getElementById('main');
      // Change style
      if (categories[i].classList.contains('clicked')) {
        categories[i].classList.remove('clicked');
        main.className = '';
      } else {
        counter = 1;
        // Change category
        main.className = categories[i].id;
        // Change class
        for (let e = 0; e < categories.length; e++) {
          categories[e].classList.remove('clicked');
        }
        categories[i].classList.add('clicked');
      }

      // Load new posts
      main.innerHTML = '';
      loadMore(e, main);
    });
  }
}
