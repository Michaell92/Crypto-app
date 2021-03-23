class FilterList {
  constructor() {
    this.homeSection = document.querySelector('#home-a');
    this.table = document.querySelector('#main-table');
    this.mTable = document.querySelector('#market-table');
    this.tBody = document.querySelector('#mt-body');
  }

  filterList(target, num) {
    // Check if there is input value
    if (target.value == (null || undefined)) return;
    const rowArr = Array.from(this.tBody.querySelectorAll('tr'));

    // Check for searched value and display only those who match
    for (let i = 0; i < rowArr.length; i++) {
      if (
        rowArr[i].childNodes[num].firstChild.childNodes[1].innerHTML
          .toUpperCase()
          .match(target.value.toUpperCase()) != null
      ) {
        rowArr[i].style.display = '';
      } else {
        rowArr[i].style.display = 'none';
      }
    }
  }
}

export const filter = new FilterList();
