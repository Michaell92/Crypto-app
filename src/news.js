import { http } from './http';
import { nav } from './nav';
import { news } from './news-ui';
import reload from './reload';

const globalLink = 'https://api.coingecko.com/api/v3/global';
const newsLink = `https://api.coingecko.com/api/v3/status_updates?per_page=10`;
const categories = document.getElementsByClassName('category');
const load = document.getElementById('load');
let counter = 1;

// Event listeners
document.addEventListener('DOMContentLoaded', nav.getMarketData(globalLink));
document.addEventListener('DOMContentLoaded', getNewsData(newsLink));
document.addEventListener('DOMContentLoaded', category());
load.addEventListener('click', loadMore);

async function getNewsData(link) {
  const loader = document.getElementById('loader');
  loader.className = 'loader';

  await http
    .get(link)
    .then((data) => {
      load.style.visibility = 'visible';
      news.getData(data.status_updates);
    })
    .catch(() => {
      loader.className = '';
      load.style.visibility = 'hidden';
      reload('home-c');
    });

  const main = document.getElementById('main').innerHTML;
  if (!main) {
    loader.className = '';
    load.style.visibility = 'hidden';
    reload('home-c');
  }
}

// Load more posts
async function loadMore(e, x) {
  e.preventDefault();

  if (!x) {
    counter++;
  }
  // Hide load button
  load.style.visibility = 'hidden';

  // Get current category
  const category = document.getElementById('main').className;

  // Get posts
  const newsLink = `https://api.coingecko.com/api/v3/status_updates?${category}per_page=10&page=${counter}`;
  await getNewsData(newsLink);
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
