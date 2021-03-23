class TableUI {
  constructor() {
    this.homeSection = document.querySelector('#home-a');
    this.table = document.querySelector('#market-table');
    this.tBody = document.querySelector('#mt-body');
  }

  // Get and display markets
  fetchMarkets(markets) {
    let html = '';

    // Check if array
    if (markets.length === undefined) {
      markets = [markets];
    }

    this.table.style.visibility = 'visible';

    // Loop array and display items
    for (let i = 0; i < markets.length; i++) {
      html += `<tr><td><a href="${markets[i].url}"><img src="${
        markets[i].image
      }"><span>${markets[i].name}</span></a></td><td>${parseFloat(
        markets[i].trade_volume_24h_btc.toFixed(0)
      )
        .toLocaleString()
        .replace('.', ',')}</td><td>${markets[i].trust_score}</td><td>${
        markets[i].trust_score_rank
      }</td></tr>`;
    }

    this.tBody.innerHTML = html;
  }

  // Sort by exchange names
  sort(market) {
    let rows = this.tBody.querySelectorAll('tr');
    let arrLength = rows.length;
    let rowArr = [];
    this.tBody.innerHTML = '';

    if (market.classList.contains('unordered')) {
      market.className = 'ordered';

      rowArr = Array.from(rows).sort((a, b) => {
        return a.childNodes[0].firstChild.childNodes[1].innerHTML >
          b.childNodes[0].firstChild.childNodes[1].innerHTML
          ? 1
          : a.childNodes[0].firstChild.childNodes[1].innerHTML <
            b.childNodes[0].firstChild.childNodes[1].innerHTML
          ? -1
          : 0;
      });
      for (let i = 0; i < arrLength; i++) {
        let row = this.tBody.insertRow(i);
        row.innerHTML = rowArr[i].innerHTML;
      }
    } else if (market.classList.contains('ordered')) {
      market.className = 'unordered';
      rowArr = Array.from(rows).sort((a, b) => {
        return b.firstChild.firstChild.childNodes[1].innerHTML.localeCompare(
          a.firstChild.firstChild.childNodes[1].innerHTML
        );
      });

      for (let i = 0; i < arrLength; i++) {
        let row = this.tBody.insertRow(i);
        row.innerHTML = rowArr[i].innerHTML;
      }
    }
  }

  // Sort by volume
  sort_2(vol) {
    let rows = this.tBody.querySelectorAll('tr');
    let arrLength = rows.length;
    let rowArr = [];
    this.tBody.innerHTML = '';

    if (vol.classList.contains('unordered')) {
      vol.className = 'ordered';
      vol.firstChild.classList.add('down');
      rowArr = Array.from(rows).sort((a, b) => {
        return (
          parseFloat(b.childNodes[1].innerHTML.replace(/,+/g, '')) -
          parseFloat(a.childNodes[1].innerHTML.replace(/,+/g, ''))
        );
      });

      for (let i = 0; i < arrLength; i++) {
        let row = this.tBody.insertRow(i);
        row.innerHTML = rowArr[i].innerHTML;
      }
    } else if (vol.classList.contains('ordered')) {
      vol.className = 'unordered';
      vol.firstChild.classList.remove('down');
      rowArr = Array.from(rows).sort((a, b) => {
        return (
          parseFloat(a.childNodes[1].innerHTML.replace(/,+/g, '')) -
          parseFloat(b.childNodes[1].innerHTML.replace(/,+/g, ''))
        );
      });

      for (let i = 0; i < arrLength; i++) {
        let row = this.tBody.insertRow(i);
        row.innerHTML = rowArr[i].innerHTML;
      }
    }
  }

  // Sort by trust score
  sort_3(score) {
    let rows = this.tBody.querySelectorAll('tr');
    let arrLength = rows.length;
    let rowArr = [];
    this.tBody.innerHTML = '';

    if (score.classList.contains('unordered')) {
      score.className = 'ordered';
      score.firstChild.classList.add('down');
      rowArr = Array.from(rows).sort((a, b) => {
        return b.childNodes[2].innerHTML - a.childNodes[2].innerHTML;
      });

      for (let i = 0; i < arrLength; i++) {
        let row = this.tBody.insertRow(i);
        row.innerHTML = rowArr[i].innerHTML;
      }
    } else if (score.classList.contains('ordered')) {
      score.className = 'unordered';
      score.firstChild.classList.remove('down');
      rowArr = Array.from(rows).sort((a, b) => {
        return a.childNodes[2].innerHTML - b.childNodes[2].innerHTML;
      });

      for (let i = 0; i < arrLength; i++) {
        let row = this.tBody.insertRow(i);
        row.innerHTML = rowArr[i].innerHTML;
      }
    }
  }

  // Sort by trust rank
  sort_4(rank) {
    let rows = this.tBody.querySelectorAll('tr');
    let arrLength = rows.length;
    let rowArr = [];
    this.tBody.innerHTML = '';

    if (rank.classList.contains('unordered')) {
      rank.className = 'ordered';
      rank.firstChild.classList.add('down');
      rowArr = Array.from(rows).sort((a, b) => {
        return a.childNodes[3].innerHTML - b.childNodes[3].innerHTML;
      });

      for (let i = 0; i < arrLength; i++) {
        let row = this.tBody.insertRow(i);
        row.innerHTML = rowArr[i].innerHTML;
      }
    } else if (rank.classList.contains('ordered')) {
      rank.className = 'unordered';
      rank.firstChild.classList.remove('down');
      rowArr = Array.from(rows).sort((a, b) => {
        return b.childNodes[3].innerHTML - a.childNodes[3].innerHTML;
      });

      for (let i = 0; i < arrLength; i++) {
        let row = this.tBody.insertRow(i);
        row.innerHTML = rowArr[i].innerHTML;
      }
    }
  }
}

export const table = new TableUI();
