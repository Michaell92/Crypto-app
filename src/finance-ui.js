class Finance {
  constructor() {
    this.tbody = document.getElementById('mt-body');
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
    this.tbody.innerHTML = html;
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
}

export const finance = new Finance();
