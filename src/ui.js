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

  // Sort rows by rank
  sort(rank) {
    let rows = this.tBody.querySelectorAll('tr');
    let arrLength = rows.length;
    let rowArr = [];
    this.tBody.innerHTML = '';

    if (rank.classList.contains('ordered')) {
      rank.className = 'reversed';
      // Get table rows
      rowArr = Array.from(rows).sort((a, b) => {
        return b.firstChild.innerHTML - a.firstChild.innerHTML;
      });

      // Fill table rows
      for (let i = 0; i < arrLength; i++) {
        let row = this.tBody.insertRow(i);
        row.innerHTML = rowArr[i].innerHTML;

        // Redraw canvas
        const chart = rowArr[i].children[7].firstChild;
        row.children[7].firstChild.getContext('2d').drawImage(chart, 0, 0);
      }
    } else if (rank.classList.contains('reversed')) {
      rank.className = 'ordered';
      rowArr = Array.from(rows).sort((a, b) => {
        return a.firstChild.innerHTML - b.firstChild.innerHTML;
      });

      for (let i = 0; i < arrLength; i++) {
        let row = this.tBody.insertRow(i);
        row.innerHTML = rowArr[i].innerHTML;

        // Redraw canvas
        const chart = rowArr[i].children[7].firstChild;
        row.children[7].firstChild.getContext('2d').drawImage(chart, 0, 0);
      }
    }
  }

  // Sort rows by name
  sort_2(coin) {
    let rows = this.tBody.querySelectorAll('tr');
    let arrLength = rows.length;
    let rowArr = [];
    this.tBody.innerHTML = '';

    if (coin.classList.contains('unordered')) {
      coin.className = 'ordered';
      rowArr = Array.from(rows).sort((a, b) => {
        return a.childNodes[1].firstChild.childNodes[1].innerHTML >
          b.childNodes[1].firstChild.childNodes[1].innerHTML
          ? 1
          : a.childNodes[1].firstChild.childNodes[1].innerHTML <
            b.childNodes[1].firstChild.childNodes[1].innerHTML
          ? -1
          : 0;
      });

      for (let i = 0; i < arrLength; i++) {
        let row = this.tBody.insertRow(i);
        row.innerHTML = rowArr[i].innerHTML;

        // Redraw canvas
        const chart = rowArr[i].children[7].firstChild;
        row.children[7].firstChild.getContext('2d').drawImage(chart, 0, 0);
      }
    } else if (coin.classList.contains('ordered')) {
      coin.className = 'unordered';
      rowArr = Array.from(rows).sort((a, b) => {
        return b.childNodes[1].firstChild.childNodes[1].innerHTML.localeCompare(
          a.childNodes[1].firstChild.childNodes[1].innerHTML
        );
      });

      for (let i = 0; i < arrLength; i++) {
        let row = this.tBody.insertRow(i);
        row.innerHTML = rowArr[i].innerHTML;

        // Redraw canvas
        const chart = rowArr[i].children[7].firstChild;
        row.children[7].firstChild.getContext('2d').drawImage(chart, 0, 0);
      }
    }
  }

  // Sort rows by price
  sort_3(price) {
    let rows = this.tBody.querySelectorAll('tr');
    let arrLength = rows.length;
    let rowArr = [];
    this.tBody.innerHTML = '';

    if (price.classList.contains('unordered')) {
      price.className = 'ordered';
      price.firstChild.classList.add('down');
      rowArr = Array.from(rows).sort((a, b) => {
        return (
          parseFloat(
            b.childNodes[2].innerHTML
              .match(/[\d+|,|.]+/g)
              .join()
              .replace(/,+/g, '')
          ) -
          parseFloat(
            a.childNodes[2].innerHTML
              .match(/[\d+|,|.]+/g)
              .join()
              .replace(/,+/g, '')
          )
        );
      });

      for (let i = 0; i < arrLength; i++) {
        let row = this.tBody.insertRow(i);
        row.innerHTML = rowArr[i].innerHTML;

        // Redraw canvas
        const chart = rowArr[i].children[7].firstChild;
        row.children[7].firstChild.getContext('2d').drawImage(chart, 0, 0);
      }
    } else if (price.classList.contains('ordered')) {
      price.className = 'unordered';
      price.firstChild.classList.remove('down');
      rowArr = Array.from(rows).sort((a, b) => {
        return (
          parseFloat(
            a.childNodes[2].innerHTML
              .match(/[\d+|,|.]+/g)
              .join()
              .replace(/,+/g, '')
          ) -
          parseFloat(
            b.childNodes[2].innerHTML
              .match(/[\d+|,|.]+/g)
              .join()
              .replace(/,+/g, '')
          )
        );
      });

      for (let i = 0; i < arrLength; i++) {
        let row = this.tBody.insertRow(i);
        row.innerHTML = rowArr[i].innerHTML;

        // Redraw canvas
        const chart = rowArr[i].children[7].firstChild;
        row.children[7].firstChild.getContext('2d').drawImage(chart, 0, 0);
      }
    }
  }

  // Sort rows by market cap
  sort_4(mcap) {
    let rows = this.tBody.querySelectorAll('tr');
    let arrLength = rows.length;
    let rowArr = [];
    this.tBody.innerHTML = '';

    if (mcap.classList.contains('unordered')) {
      mcap.className = 'ordered';
      mcap.firstChild.classList.add('down');
      rowArr = Array.from(rows).sort((a, b) => {
        return (
          parseFloat(
            b.childNodes[3].innerHTML.match(/\d+/g).join().replace(/,+/g, '')
          ) -
          parseFloat(
            a.childNodes[3].innerHTML.match(/\d+/g).join().replace(/,+/g, '')
          )
        );
      });

      for (let i = 0; i < arrLength; i++) {
        let row = this.tBody.insertRow(i);
        row.innerHTML = rowArr[i].innerHTML;

        // Redraw canvas
        const chart = rowArr[i].children[7].firstChild;
        row.children[7].firstChild.getContext('2d').drawImage(chart, 0, 0);
      }
    } else if (mcap.classList.contains('ordered')) {
      mcap.className = 'unordered';
      mcap.firstChild.classList.remove('down');
      rowArr = Array.from(rows).sort((a, b) => {
        return (
          parseFloat(
            a.childNodes[3].innerHTML.match(/\d+/g).join().replace(/,+/g, '')
          ) -
          parseFloat(
            b.childNodes[3].innerHTML.match(/\d+/g).join().replace(/,+/g, '')
          )
        );
      });

      for (let i = 0; i < arrLength; i++) {
        let row = this.tBody.insertRow(i);
        row.innerHTML = rowArr[i].innerHTML;

        // Redraw canvas
        const chart = rowArr[i].children[7].firstChild;
        row.children[7].firstChild.getContext('2d').drawImage(chart, 0, 0);
      }
    }
  }

  // Sort rows by daily
  sort_5(price) {
    let rows = Array.from(this.tBody.querySelectorAll('tr'));
    let arrLength = rows.length;
    let rowArr = [];
    this.tBody.innerHTML = '';

    if (price.classList.contains('unordered')) {
      price.className = 'ordered';
      price.firstChild.classList.add('down');

      rowArr = [
        ...rows
          .filter((row) =>
            row.childNodes[4].firstChild.classList.contains('fa-caret-down')
          )
          .sort((a, b) => {
            return (
              parseFloat(
                b.childNodes[4].innerHTML
                  .match(/\d+|\,+/g)
                  .join()
                  .replace(/\,+/g, '.')
              ) -
              parseFloat(
                a.childNodes[4].innerHTML
                  .match(/\d+|\,+/g)
                  .join()
                  .replace(/\,+/g, '.')
              )
            );
          }),
        ...rows
          .filter((row) =>
            row.childNodes[4].firstChild.classList.contains('fa-caret-up')
          )
          .sort((a, b) => {
            return (
              parseFloat(
                a.childNodes[4].innerHTML
                  .match(/\d+|\,+/g)
                  .join()
                  .replace(/\,+/g, '.')
              ) -
              parseFloat(
                b.childNodes[4].innerHTML
                  .match(/\d+|\,+/g)
                  .join()
                  .replace(/\,+/g, '.')
              )
            );
          }),
      ];

      for (let i = 0; i < arrLength; i++) {
        let row = this.tBody.insertRow(i);
        row.innerHTML = rowArr[i].innerHTML;

        // Redraw canvas
        const chart = rowArr[i].children[7].firstChild;
        row.children[7].firstChild.getContext('2d').drawImage(chart, 0, 0);
      }
    } else if (price.classList.contains('ordered')) {
      price.className = 'unordered';
      price.firstChild.classList.remove('down');

      rowArr = [
        ...rows
          .filter((row) =>
            row.childNodes[4].firstChild.classList.contains('fa-caret-up')
          )
          .sort((a, b) => {
            return (
              parseFloat(
                b.childNodes[4].innerHTML
                  .match(/\d+|\,+/g)
                  .join()
                  .replace(/\,+/g, '.')
              ) -
              parseFloat(
                a.childNodes[4].innerHTML
                  .match(/\d+|\,+/g)
                  .join()
                  .replace(/\,+/g, '.')
              )
            );
          }),
        ...rows
          .filter((row) =>
            row.childNodes[4].firstChild.classList.contains('fa-caret-down')
          )
          .sort((a, b) => {
            return (
              parseFloat(
                a.childNodes[4].innerHTML
                  .match(/\d+|\,+/g)
                  .join()
                  .replace(/\,+/g, '.')
              ) -
              parseFloat(
                b.childNodes[4].innerHTML
                  .match(/\d+|\,+/g)
                  .join()
                  .replace(/\,+/g, '.')
              )
            );
          }),
      ];

      for (let i = 0; i < arrLength; i++) {
        let row = this.tBody.insertRow(i);
        row.innerHTML = rowArr[i].innerHTML;

        // Redraw canvas
        const chart = rowArr[i].children[7].firstChild;
        row.children[7].firstChild.getContext('2d').drawImage(chart, 0, 0);
      }
    }
  }

  // Sort rows by weeekly
  sort_6(price) {
    let rows = Array.from(this.tBody.querySelectorAll('tr'));
    let arrLength = rows.length;
    let rowArr = [];
    this.tBody.innerHTML = '';

    if (price.classList.contains('unordered')) {
      price.className = 'ordered';
      price.firstChild.classList.add('down');

      rowArr = [
        ...rows
          .filter((row) =>
            row.childNodes[5].firstChild.classList.contains('fa-caret-up')
          )
          .sort((a, b) => {
            return (
              parseFloat(
                b.childNodes[5].innerHTML
                  .match(/\d+|\,+/g)
                  .join()
                  .replace(/\,+/g, '.')
              ) -
              parseFloat(
                a.childNodes[5].innerHTML
                  .match(/\d+|\,+/g)
                  .join()
                  .replace(/\,+/g, '.')
              )
            );
          }),
        ...rows
          .filter((row) =>
            row.childNodes[5].firstChild.classList.contains('fa-caret-down')
          )
          .sort((a, b) => {
            return (
              parseFloat(
                a.childNodes[5].innerHTML
                  .match(/\d+|\,+/g)
                  .join()
                  .replace(/\,+/g, '.')
              ) -
              parseFloat(
                b.childNodes[5].innerHTML
                  .match(/\d+|\,+/g)
                  .join()
                  .replace(/\,+/g, '.')
              )
            );
          }),
      ];

      for (let i = 0; i < arrLength; i++) {
        let row = this.tBody.insertRow(i);
        row.innerHTML = rowArr[i].innerHTML;

        // Redraw canvas
        const chart = rowArr[i].children[7].firstChild;
        row.children[7].firstChild.getContext('2d').drawImage(chart, 0, 0);
      }
    } else if (price.classList.contains('ordered')) {
      price.className = 'unordered';
      price.firstChild.classList.remove('down');

      rowArr = [
        ...rows
          .filter((row) =>
            row.childNodes[5].firstChild.classList.contains('fa-caret-down')
          )
          .sort((a, b) => {
            return (
              parseFloat(
                b.childNodes[5].innerHTML
                  .match(/\d+|\,+/g)
                  .join()
                  .replace(/\,+/g, '.')
              ) -
              parseFloat(
                a.childNodes[5].innerHTML
                  .match(/\d+|\,+/g)
                  .join()
                  .replace(/\,+/g, '.')
              )
            );
          }),
        ...rows
          .filter((row) =>
            row.childNodes[5].firstChild.classList.contains('fa-caret-up')
          )
          .sort((a, b) => {
            return (
              parseFloat(
                a.childNodes[5].innerHTML
                  .match(/\d+|\,+/g)
                  .join()
                  .replace(/\,+/g, '.')
              ) -
              parseFloat(
                b.childNodes[5].innerHTML
                  .match(/\d+|\,+/g)
                  .join()
                  .replace(/\,+/g, '.')
              )
            );
          }),
      ];

      for (let i = 0; i < arrLength; i++) {
        let row = this.tBody.insertRow(i);
        row.innerHTML = rowArr[i].innerHTML;

        // Redraw canvas
        const chart = rowArr[i].children[7].firstChild;
        row.children[7].firstChild.getContext('2d').drawImage(chart, 0, 0);
      }
    }
  }

  // Sort rows by volume
  sort_7(vol) {
    let rows = this.tBody.querySelectorAll('tr');
    let arrLength = rows.length;
    let rowArr = [];
    this.tBody.innerHTML = '';

    if (vol.classList.contains('unordered')) {
      vol.className = 'ordered';
      vol.firstChild.classList.add('down');
      rowArr = Array.from(rows).sort((a, b) => {
        return (
          parseFloat(
            b.childNodes[6].innerHTML.match(/\d+/g).join().replace(/,+/g, '')
          ) -
          parseFloat(
            a.childNodes[6].innerHTML.match(/\d+/g).join().replace(/,+/g, '')
          )
        );
      });

      for (let i = 0; i < arrLength; i++) {
        let row = this.tBody.insertRow(i);
        row.innerHTML = rowArr[i].innerHTML;

        // Redraw canvas
        const chart = rowArr[i].children[7].firstChild;
        row.children[7].firstChild.getContext('2d').drawImage(chart, 0, 0);
      }
    } else if (vol.classList.contains('ordered')) {
      vol.className = 'unordered';
      vol.firstChild.classList.remove('down');
      rowArr = Array.from(rows).sort((a, b) => {
        return (
          parseFloat(
            a.childNodes[6].innerHTML.match(/\d+/g).join().replace(/,+/g, '')
          ) -
          parseFloat(
            b.childNodes[6].innerHTML.match(/\d+/g).join().replace(/,+/g, '')
          )
        );
      });

      for (let i = 0; i < arrLength; i++) {
        let row = this.tBody.insertRow(i);
        row.innerHTML = rowArr[i].innerHTML;

        // Redraw canvas
        const chart = rowArr[i].children[7].firstChild;
        row.children[7].firstChild.getContext('2d').drawImage(chart, 0, 0);
      }
    }
  }

  // Add to favorites
  addToFav(coin) {
    let icon = coin.firstChild;

    if (!icon.classList.contains('newFav')) {
      icon.classList.add('newFav');
      icon.classList.remove('favHover');
      coin.setAttribute('data-fav', 'Remove');
    } else {
      icon.classList.remove('newFav');
      icon.classList.add('favHover');
      coin.setAttribute('data-fav', 'Add to favorites');
    }
  }

  // Show favorites
  showFav(icon, coins) {
    // Display coins
    itemTemplate(coins, this.tBody);

    // Remove coins from favorites
    this.tBody.addEventListener('click', (e) => {
      if (icon.classList.contains('active')) {
        let fav = e.target.closest('#fav');
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
  let active = '';
  let html = '';
  let color24h;
  let color7d;

  for (let i = 0; i < coin.length; i++) {
    const percent24h = coin[i].price_change_percentage_24h;
    const percent7d = coin[i].price_change_percentage_7d_in_currency;

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
      `<td><a href="#"><img src="${coin[i].image.replace(
        'large',
        'thumb'
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
          ).toFixed(2)}%`
        : parseFloat(coin[i].price_change_percentage_24h) < 0
        ? `<i class="fas fa-caret-down" style="color:${color24h}"></i> ${parseFloat(
            coin[i].price_change_percentage_24h
          )
            .toFixed(2)
            .replace('-', '')}%`
        : `${parseFloat(coin[i].price_change_percentage_24h).toFixed(2)}%</td>`
    );
    dataArr.push(
      `<td style="color:${color7d}">`,
      parseFloat(coin[i].price_change_percentage_7d_in_currency) > 0
        ? `<i class="fas fa-caret-up" style="color:${color7d}"></i> ${parseFloat(
            coin[i].price_change_percentage_7d_in_currency
          ).toFixed(2)}%`
        : parseFloat(coin[i].price_change_percentage_7d_in_currency) < 0
        ? `<i class="fas fa-caret-down" style="color:${color7d}"></i> ${parseFloat(
            coin[i].price_change_percentage_7d_in_currency
          )
            .toFixed(2)
            .replace('-', '')}%`
        : `${parseFloat(coin[i].price_change_percentage_7d_in_currency).toFixed(
            2
          )}%</td>`
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
      } else {
        active = 'favHover';
      }
    }

    dataArr.push(
      `<td><a href="#" data-fav="Add to favorites" id="fav"><i class="fas fa-star ${active}"></i></a><a href="#" data-port="Add to portfolio" id="portf"><i class="fas fa-plus"></i></a></td></tr>`
    );

    // Join arr
    html += dataArr.join('');

    dataArr = [];
  }
  tBody.innerHTML = html;
}

export const ui = new UI();
