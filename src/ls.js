function addToStorage(coin, active, ls) {
  // Get name of the coin
  let id = coin.closest('tr').id;

  // Get ls arr
  const coins = localStorage.getItem(ls);
  let getArr = [];

  // Get coin arr from storage, else new
  if (coins) {
    getArr = JSON.parse(localStorage.getItem(ls));

    // Add new coin to arr
    if (getArr.indexOf(id) < 0) {
      getArr.push(id);
    } else {
      getArr.splice(getArr.indexOf(id), 1);
    }

    // Set new arr
    localStorage.setItem(ls, JSON.stringify(getArr));
  } else {
    if (!coin.classList.contains(active)) {
      getArr.push(id);
      localStorage.setItem(ls, JSON.stringify(getArr));
    }
  }
}

export default addToStorage;
