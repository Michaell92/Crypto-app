import { formatNumber, formatShortDate, formatPercent } from './formatters';
class Finance {
  constructor() {
    this.tBody = document.getElementById('mt-body');
    this.table = document.getElementById('finance-table');
  }
  async finData(data) {
    this.table.style.visibility = 'visible';
    let html = '';

    // Create and append data
    for (let i = 0; i < data.length; i++) {
      // Append data
      html += `<tr><td><a href="${data[i].url}">
      <img src="${data[i].image}"><span class="name">${
        data[i].name
      }</span></a></td>
      <td><span class="interest">${formatNumber(
        data[i].open_interest_btc,
        0
      )}</span></td>
      <td>
      <span class="futures">${data[i].number_of_futures_pairs}</span>
      </td>
      <td><span class="perpetual">${data[i].number_of_perpetual_pairs}</span>
      </td>
      <td><span class="volume">${formatNumber(
        data[i].trade_volume_24h_btc,
        0
      )}</span></td>
      </tr>`;
    }

    this.tBody.innerHTML = html;
  }

  // Sort by name
  sort_1(target) {
    const rows = Array.from(
      document.querySelector('#mt-body').querySelectorAll('tr')
    );

    this.tBody.innerHTML = '';
    if (target.className == 'unordered') {
      target.className = 'ordered';
      const reversed = rows.sort((a, b) => {
        const one = a.querySelector('.name').innerText.toUpperCase();
        const two = b.querySelector('.name').innerText.toUpperCase();

        return one.localeCompare(two);
      });

      for (let i = 0; i < rows.length; i++) {
        const row = this.tBody.insertRow(i);
        row.innerHTML = reversed[i].innerHTML;
      }
    } else {
      target.className = 'unordered';

      const reversed = rows.sort((a, b) => {
        const one = a.querySelector('.name').innerText.toUpperCase();
        const two = b.querySelector('.name').innerText.toUpperCase();

        return two.localeCompare(one);
      });

      for (let i = 0; i < rows.length; i++) {
        const row = this.tBody.insertRow(i);
        row.innerHTML = reversed[i].innerHTML;
      }
    }
  }

  // Sort by numbers
  sort_2(target, type) {
    const rows = Array.from(
      document.querySelector('#mt-body').querySelectorAll('tr')
    );
    this.tBody.innerHTML = '';
    if (target.className == 'unordered') {
      target.className = 'ordered';
      target.firstChild.className = 'fas fa-caret-up';
      const reversed = rows.sort((a, b) => {
        const one = parseFloat(
          a.querySelector(`.${type}`).innerText.replace(',', '')
        );
        const two = parseFloat(
          b.querySelector(`.${type}`).innerText.replace(',', '')
        );

        return one - two;
      });

      for (let i = 0; i < rows.length; i++) {
        const row = this.tBody.insertRow(i);
        row.innerHTML = reversed[i].innerHTML;
      }
    } else {
      target.className = 'unordered';
      target.firstChild.className = 'fas fa-caret-down';
      const reversed = rows.sort((a, b) => {
        const one = parseFloat(
          a.querySelector(`.${type}`).innerText.replace(',', '')
        );
        const two = parseFloat(
          b.querySelector(`.${type}`).innerText.replace(',', '')
        );

        return two - one;
      });

      for (let i = 0; i < rows.length; i++) {
        const row = this.tBody.insertRow(i);
        row.innerHTML = reversed[i].innerHTML;
      }
    }
  }
}

export const finance = new Finance();
