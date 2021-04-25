class Pages {
  constructor() {}

  // List page left
  pageLeft(leftArrow, rightArrow) {
    let leftPageId = leftArrow.getAttribute('id');
    let rightPageId = rightArrow.getAttribute('id');
    let counter = leftPageId.valueOf();

    // Set ids
    rightArrow.setAttribute('id', rightPageId - 1);
    leftArrow.setAttribute('id', leftPageId - 1);

    if (document.querySelector('#main-table')) {
      return `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=25&page=${counter}&sparkline=false&price_change_percentage=7d`;
    } else if (document.querySelector('#market-table')) {
      return `https://api.coingecko.com/api/v3/exchanges?per_page=50&page=${counter}`;
    }
  }

  // List page right
  pageRight(rightArrow, leftArrow) {
    let leftPageId = leftArrow.getAttribute('id');
    let rightPageId = rightArrow.getAttribute('id');
    let counter = leftPageId.valueOf();
    if (rightPageId == 1) {
      leftArrow.classList.remove('hover');
    }
    // Increase ids if on starting page
    if (leftPageId == 1 && rightPageId == '') {
      counter++;
      rightArrow.setAttribute('id', counter);
    } else {
      // Increase ids for new pages
      counter = parseInt(rightPageId.valueOf()) + 1;
      rightArrow.setAttribute('id', parseInt(rightPageId.valueOf()) + 1);

      leftArrow.setAttribute('id', rightPageId);
    }

    if (document.querySelector('#main-table')) {
      return `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=25&page=${counter}&sparkline=true&price_change_percentage=7d`;
    } else if (document.querySelector('#market-table')) {
      return `https://api.coingecko.com/api/v3/exchanges?per_page=50&page=${counter}`;
    }
  }
}

export const pages = new Pages();
