class GlobalData {
  constructor() {
    this.cardData = document.getElementById('globalStats');
    this.topData = document.getElementById('totalData');
  }

  // Display data
  async globalData(data) {
    const global = data[0];
    const defi = data[1];
    const icos = `<div id="icos">
    <div id="upcoming">Upcoming ICOs: <span class="span-info">${global.data.upcoming_icos}</span></div>
    <div id="ongoing">Ongoing ICOs: <span class="span-info">${global.data.ongoing_icos}</span></div>
    <div id="ended">Ended ICOs: <span class="span-info">${global.data.ended_icos}</span></div>
  </div>`;
    const html = `<div id="defiData">
      <h1>Defi Stats</h1>
      <div id="stats">
      <div>
      <span>Defi market cap: <span id="marketCap" class="span-info">${parseFloat(
        defi.data.defi_market_cap
      )
        .toFixed(0)
        .toLocaleString()
        .replace('.', ',')}</span></span>
      <span>Eth market cap: <span class="span-info">${parseFloat(
        defi.data.eth_market_cap
      )
        .toFixed(0)
        .toLocaleString()
        .replace('.', ',')}</span></span>
      <span>Defi to eth ratio: <span class="span-info">${parseFloat(
        defi.data.defi_to_eth_ratio
      ).toFixed(2)}</span></span>
      </div>
      <div>
      <span>Vol 24h: <span class="span-info">${parseFloat(
        defi.data.trading_volume_24h
      )
        .toFixed(0)
        .toLocaleString()
        .replace('.', ',')}</span></span>
      <span>Defi dominance: <span class="span-info">${parseFloat(
        defi.data.defi_dominance
      ).toFixed(2)}</span></span>
      <span>Top coin: <span class="span-info">${
        defi.data.top_coin_name
      }</span></span>
      <span>Top coin defi dominance: <span class="span-info">${parseFloat(
        defi.data.top_coin_defi_dominance
      ).toFixed(2)}</span></span>
      </div>
      </div>
    </div>
    <div></div>
    <div id="percent">
      <h1>Market Share</h1>
      <div id="chartStats"></div>
    </div>`;

    // Add total data
    const newData = document.createElement('div');
    newData.innerHTML = icos;
    this.topData.appendChild(newData);

    // Add global data
    this.cardData.innerHTML = html;
  }

  // Create chart
  totalChart(global) {
    const coinData = global.data.market_cap_percentage;
    const coins = [];
    const data = [];

    for (const coin in coinData) {
      coins.push(coin);
      data.push(parseFloat(coinData[coin].toFixed(1)));
    }

    coins.push('other');
    data.push(parseFloat((100 - data.reduce((a, b) => a + b)).toFixed(1)));
    console.log(coins, data);
    const chartElement = document.getElementById('chartStats');

    const options = {
      series: data,
      chart: {
        width: '130%',
        type: 'pie',
      },
      labels: coins,
      theme: {
        monochrome: {
          enabled: true,
        },
      },
      plotOptions: {
        pie: {
          dataLabels: {
            offset: -5,
          },
        },
      },
      dataLabels: {
        formatter(val, opts) {
          const name = opts.w.globals.labels[opts.seriesIndex];
          return [name, val.toFixed(1) + '%'];
        },
      },
    };

    const myChart = new ApexCharts(chartElement, options);
    myChart.render();
  }
}

export const global = new GlobalData();
