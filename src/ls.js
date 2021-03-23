class LS {
  constructor() {}

  addToStorage(coin) {
    let row = coin.closest('tr');
    // Get name of the coin
    let name = row.id;
    let getArr = [];

    // Get coin arr from storage, else new
    if (localStorage.coins) {
      getArr = JSON.parse(localStorage.getItem('coins'));

      // Add new coin to arr
      if (getArr.indexOf(name) < 0) {
        getArr.push(name);
      } else {
        getArr.splice(getArr.indexOf(name), 1);
      }

      // Set new arr
      localStorage.coins = JSON.stringify(getArr);
    } else {
      getArr.push(name);
      localStorage.coins = JSON.stringify(getArr);
    }
  }
}

export const ls = new LS();
