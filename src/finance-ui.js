class Finance {
  constructor() {
    this.tBody = document.getElementById('mt-body');
    this.table = document.getElementById('finance-table');
  }
  async finData(data) {
    this.table.style.visibility = 'visible';
    let html = '';
    let check;
    const products = data[1];
    const select = document.createElement('select');
    // Create and append data
    for (let i = 0; i < data[0].length; i++) {
      let options = '';
      let supply = [];

      // Find all products for certain platform
      for (let e = 0; e < products.length; e++) {
        if (data[0][i].name === products[e].platform) {
          options += `<option>${products[e].identifier}</option>`;
          supply.push(products[e].supply_rate_percentage);
        }
      }
      select.innerHTML = options;
      select.className = 'select';
      // Check if platform is centralized
      data[0][i].centralized === true
        ? (check = 'class="fas fa-check" style="color:green"')
        : (check = 'class="fas fa-times" style="color:red"');

      // Append data
      html += `<tr><td><a href="${data[0][i].website_url}">${
        data[0][i].name
      }</a></td><td><i ${check}></i></td>
      <td>
      ${options[0] ? select.outerHTML : ''}
      </td>
      <td class="supplyRate">${
        options[0] ? parseFloat(supply[0]).toFixed(2) : ''
      }</td>
      </tr>`;
    }
    this.tBody.innerHTML = html;
  }

  // Change supply rate
  changeRate(data, select) {
    const supply = select.closest('tr').lastElementChild;
    for (let i = 0; i < data.length; i++) {
      if (data[i].identifier === select.value) {
        supply.innerHTML = parseFloat(data[i].supply_rate_percentage).toFixed(
          2
        );
      }
    }
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
        return a.firstElementChild.firstElementChild.innerHTML.toUpperCase() >
          b.firstElementChild.firstElementChild.innerHTML.toUpperCase()
          ? 1
          : a.firstElementChild.firstElementChild.innerHTML.toUpperCase() <
            b.firstElementChild.firstElementChild.innerHTML.toUpperCase()
          ? -1
          : 0;
      });

      for (let i = 0; i < rows.length; i++) {
        const row = this.tBody.insertRow(i);
        row.innerHTML = reversed[i].innerHTML;
      }
    } else {
      target.className = 'unordered';

      const reversed = rows.sort((a, b) => {
        return a.firstElementChild.firstElementChild.innerHTML.toUpperCase() <
          b.firstElementChild.firstElementChild.innerHTML.toUpperCase()
          ? 1
          : a.firstElementChild.firstElementChild.innerHTML.toUpperCase() >
            b.firstElementChild.firstElementChild.innerHTML.toUpperCase()
          ? -1
          : 0;
      });

      for (let i = 0; i < rows.length; i++) {
        const row = this.tBody.insertRow(i);
        row.innerHTML = reversed[i].innerHTML;
      }
    }
  }

  // Sort by category
  sort_2(target) {
    const rows = Array.from(
      document.querySelector('#mt-body').querySelectorAll('tr')
    );
    this.tBody.innerHTML = '';

    if (target.className == 'unordered') {
      target.className = 'ordered';
      target.firstChild.className = 'fas fa-caret-down';
      const newArr = [
        ...rows.filter((row) =>
          row.children[1].firstChild.classList.contains('fa-check') ? 1 : 0
        ),
        ...rows.filter((row) =>
          row.children[1].firstChild.classList.contains('fa-check') ? 0 : 1
        ),
      ];
      for (let i = 0; i < rows.length; i++) {
        const row = this.tBody.insertRow(i);
        row.innerHTML = newArr[i].innerHTML;
      }
    } else {
      target.className = 'unordered';
      target.firstChild.className = 'fas fa-caret-up';
      const newArr = [
        ...rows.filter((row) =>
          row.children[1].firstChild.classList.contains('fa-check') ? 0 : 1
        ),
        ...rows.filter((row) =>
          row.children[1].firstChild.classList.contains('fa-check') ? 1 : 0
        ),
      ];

      for (let i = 0; i < rows.length; i++) {
        const row = this.tBody.insertRow(i);
        row.innerHTML = newArr[i].innerHTML;
      }
    }
  }

  // Sort by supply rate
  sort_3(target) {
    const rows = Array.from(
      document.querySelector('#mt-body').querySelectorAll('tr')
    );
    this.tBody.innerHTML = '';
    if (target.className == 'unordered') {
      target.className = 'ordered';
      target.firstChild.className = 'fas fa-caret-down';
      const reversed = rows.sort((a, b) => {
        let aa = a.children[3].innerHTML;
        let bb = b.children[3].innerHTML;
        return (
          parseFloat(bb === '' ? '-1' : bb) - parseFloat(aa === '' ? '-1' : aa)
        );
      });

      for (let i = 0; i < rows.length; i++) {
        const row = this.tBody.insertRow(i);
        row.innerHTML = reversed[i].innerHTML;
      }
    } else {
      target.className = 'unordered';
      target.firstChild.className = 'fas fa-caret-up';
      const reversed = rows.sort((a, b) => {
        let aa = a.children[3].innerHTML;
        let bb = b.children[3].innerHTML;
        return (
          parseFloat(aa === '' ? '-1' : aa) - parseFloat(bb === '' ? '-1' : bb)
        );
      });

      for (let i = 0; i < rows.length; i++) {
        const row = this.tBody.insertRow(i);
        row.innerHTML = reversed[i].innerHTML;
      }
    }
  }
}

export const finance = new Finance();
