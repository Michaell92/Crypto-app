class UI {
  constructor() {
    this.homeSection = document.querySelector('#home');
    this.table = document.querySelector('#main-table');
    this.tBody = document.querySelector('#mt-body');
    this.rank = document.querySelector('#rank');
    this.fav = document.querySelector('#favorites');
  }

  async tableData(coins) {
    // Create table data
    itemTemplate(coins, this.tBody);

    // Show table
    this.table.style.visibility = 'visible';
    document.getElementById('footer').style.visibility = 'visible';

    let test = document.querySelector('.message');

    // Set page ids
    if (this.tBody.rows[0].firstChild.innerHTML == 1) {
      document.querySelector('.left').classList.remove('hover');
      document.querySelector('.left').setAttribute('id', '');
      document.querySelector('.right').setAttribute('id', 1);
    }
    if (test) test.remove();
  }

  // Sort rows
  sort(category, index) {
    const rows = Array.from(this.tBody.querySelectorAll('tr'));
    const length = rows.length;
    let newArr = [];
    const icon = category.querySelector('i');
    this.tBody.innerHTML = '';

    if (category.classList.contains('ordered')) {
      category.classList.toggle('ordered');
      if (icon) icon.classList.remove('down');

      // Get table rows
      newArr = this.sortRows(rows, index, true);

      // Fill table rows
      for (let i = 0; i < length; i++) {
        let row = this.tBody.insertRow(i);
        row.innerHTML = newArr[i].innerHTML;

        // Redraw canvas
        const chart = newArr[i].children[7].firstChild;
        row.children[7].firstChild.getContext('2d').drawImage(chart, 0, 0);
      }
    } else {
      category.classList.toggle('ordered');
      if (icon) icon.classList.add('down');

      newArr = this.sortRows(rows, index, false);

      for (let i = 0; i < length; i++) {
        let row = this.tBody.insertRow(i);
        row.innerHTML = newArr[i].innerHTML;

        // Redraw canvas
        const chart = newArr[i].children[7].firstChild;
        row.children[7].firstChild.getContext('2d').drawImage(chart, 0, 0);
      }
    }
  }

  sortRows(rows, index, lower) {
    if (![4, 5].includes(index)) {
      return rows.sort((a, b) => {
        if (index === 1) {
          const aa = a.childNodes[1].firstChild.childNodes[1].innerHTML;
          const bb = b.childNodes[1].firstChild.childNodes[1].innerHTML;

          if (lower) {
            return aa.localeCompare(bb);
          } else {
            return bb.localeCompare(aa);
          }
        } else {
          const regEx = /\$|,/g;
          return this.quickSort(a, b, index, lower, regEx);
        }
      });
    } else {
      const redClass = lower ? 'fa-caret-up' : 'fa-caret-down';
      const greenClass = lower ? 'fa-caret-down' : 'fa-caret-up';

      const redRow = this.sortPercentage(rows, index, redClass, true);
      const greenRow = this.sortPercentage(rows, index, greenClass, false);

      return [...redRow, ...greenRow];
    }
  }

  quickSort(a, b, index, lower, regEx) {
    const aa = parseFloat(a.childNodes[index].innerText.replace(regEx, ''));
    const bb = parseFloat(b.childNodes[index].innerText.replace(regEx, ''));

    return lower ? bb - aa : aa - bb;
  }

  sortPercentage(rows, index, orderClass, red) {
    return rows
      .filter((row) =>
        row.childNodes[index].firstChild.classList.contains(orderClass)
      )
      .sort((a, b) => {
        const aa = parseFloat(a.childNodes[index].innerText);
        const bb = parseFloat(b.childNodes[index].innerText);

        return red ? bb - aa : aa - bb;
      });
  }

  // Add to favorites
  addToFav(coin) {
    if (!coin.classList.contains('newFav')) {
      coin.classList.add('newFav');
      coin.classList.remove('favHover');
      coin.closest('.favorite-coin').setAttribute('data-fav', 'Remove');
    } else {
      coin.classList.remove('newFav');
      coin.classList.add('favHover');
      coin
        .closest('.favorite-coin')
        .setAttribute('data-fav', 'Add to favorites');
    }
  }

  addToPortfolio(coin) {
    if (!coin.classList.contains('portfolio-active')) {
      coin.classList.add('portfolio-active');
      coin.classList.remove('portfolio');
      coin.closest('.portfolio-coin').setAttribute('data-port', 'Remove');
    } else {
      coin.classList.remove('portfolio-active');
      coin.classList.add('portfolio');
      coin
        .closest('.portfolio-coin')
        .setAttribute('data-port', 'Add to portfolio');
    }
  }

  // Show favorites
  showFav(icon, coins) {
    // Display coins
    itemTemplate(coins, this.tBody);

    // Remove coins from favorites
    this.tBody.addEventListener('click', (e) => {
      if (icon.classList.contains('active')) {
        let fav = e.target.closest('.fav');
        if (!fav) return;

        let row = fav.closest('tr');
        row.remove();
      }

      // Display message if there are no coins
      if (this.tBody.rows.length === 0 && !document.querySelector('.message')) {
        const message = this.messageTemplate();
        this.homeSection.appendChild(message);
      }
    });
  }

  // Display coin from search query
  displayCoin(coin) {
    itemTemplate(coin, this.tBody);
  }

  messageTemplate() {
    // Create message
    const message = document.createElement('div');
    message.className = 'message';
    message
      .appendChild(document.createElement('h1'))
      .appendChild(document.createTextNode('You havent added anything...'));

    message
      .appendChild(document.createElement('a'))
      .appendChild(document.createElement('i')).className = 'fas fa-arrow-left';
    message.childNodes[1].setAttribute('href', '#');
    message.childNodes[1].setAttribute('data-message', 'Go Back');
    message.childNodes[1].setAttribute('class', 'back');

    return message;
  }
}

// UI template for displaying items
function itemTemplate(coin, tBody) {
  let dataArr = [];
  let getArr = [];
  let html = '';
  let color24h;
  let color7d;

  for (let i = 0; i < coin.length; i++) {
    const percent24h = coin[i].price_change_percentage_24h;
    const percent7d = coin[i].price_change_percentage_7d_in_currency;

    let active = 'favHover';
    let portfolioActive = 'portfolio';
    let dataFavorites = 'Add to favorites';
    let dataPortfolio = 'Add to portfolio';

    // Percentage styling
    parseFloat(percent24h) > 0
      ? (color24h = 'green')
      : parseFloat(percent24h) < 0
      ? (color24h = 'red')
      : (color24h = '#333333');

    parseFloat(percent7d) > 0
      ? (color7d = 'green')
      : parseFloat(percent7d) < 0
      ? (color7d = 'red')
      : (color7d = '#333333');

    // Create array with coin information
    dataArr.push(`<tr id="${coin[i].id}"><td>${coin[i].market_cap_rank}</td>`);
    dataArr.push(
      `<td><a href="#" class="coin"><img src="${coin[i].image.replace(
        'large',
        'small'
      )}" alt="${coin[i].name}"><span>${coin[i].name}</span></a>
        <span>${coin[i].symbol}</span></td>`
    );
    dataArr.push(
      `<td>$${parseFloat(
        coin[i].current_price.toFixed(2)
      ).toLocaleString()}</td>`
    );
    dataArr.push(
      `<td>$${parseFloat(coin[i].market_cap.toFixed(0))
        .toLocaleString()
        .replace('.', ',')}</td>`
    );
    dataArr.push(
      `<td style="color:${color24h}">`,
      parseFloat(coin[i].price_change_percentage_24h) > 0
        ? `<i class="fas fa-caret-up" style="color:${color24h}"></i> ${parseFloat(
            coin[i].price_change_percentage_24h
          ).toFixed(2)}`
        : parseFloat(coin[i].price_change_percentage_24h) < 0
        ? `<i class="fas fa-caret-down" style="color:${color24h}"></i> ${parseFloat(
            coin[i].price_change_percentage_24h
          )
            .toFixed(2)
            .replace('-', '')}`
        : `${parseFloat(coin[i].price_change_percentage_24h).toFixed(2)}</td>`
    );
    dataArr.push(
      `<td style="color:${color7d}">`,
      parseFloat(coin[i].price_change_percentage_7d_in_currency) > 0
        ? `<i class="fas fa-caret-up" style="color:${color7d}"></i> ${parseFloat(
            coin[i].price_change_percentage_7d_in_currency
          ).toFixed(2)}`
        : parseFloat(coin[i].price_change_percentage_7d_in_currency) < 0
        ? `<i class="fas fa-caret-down" style="color:${color7d}"></i> ${parseFloat(
            coin[i].price_change_percentage_7d_in_currency
          )
            .toFixed(2)
            .replace('-', '')}`
        : `${parseFloat(coin[i].price_change_percentage_7d_in_currency).toFixed(
            2
          )}</td>`
    );
    dataArr.push(
      `<td>$${parseFloat(coin[i].total_volume.toFixed(0))
        .toLocaleString()
        .replace('.', ',')}</td>`
    );
    dataArr.push(`<td><canvas class="tableChart"></canvas></td>`);

    // Check local storage
    if (localStorage.coins) {
      getArr = JSON.parse(localStorage.getItem('coins'));

      // Add fav coins
      if (getArr.indexOf(coin[i].id) >= 0) {
        active = 'newFav';
      }
    }

    if (localStorage.portfolio) {
      getArr = JSON.parse(localStorage.getItem('portfolio'));
      // Check if portfolio coin is present

      for (let e = 0; e < getArr.length; e++) {
        if (getArr[e].id === coin[i].id) {
          portfolioActive = 'portfolio-active';
          break;
        }
      }
    }

    if (active === 'newFav') dataFavorites = 'Remove';
    if (portfolioActive === 'portfolio-active') dataPortfolio = 'Remove';

    dataArr.push(
      `<td><a href="#" data-fav='${dataFavorites}' class="favorite-coin">
      <i class="fas fa-star fav ${active}"></i></a>
      <a href="#" data-port='${dataPortfolio}' class="portfolio-coin">
      <i class="fas fa-plus portf ${portfolioActive}">
      </i></a></td></tr>`
    );

    // Join arr
    html += dataArr.join('');

    dataArr = [];
  }
  tBody.innerHTML = html;
}

export const ui = new UI();
