class GlobalData {
  constructor() {
    this.cardData = document.querySelector('#globalStats');
    this.topData = document.getElementById('totalData');
  }

  // Display data
  globalData(data) {
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
      <span>Defi market cap: <span class="span-info">${parseFloat(
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
      <h1>Market Share - Btc</h1>
      <div>
      <span>Btc: <span class="span-info">${parseFloat(
        global.data.market_cap_percentage.btc
      ).toFixed(2)}</span></span>
      <span>Eth: <span class="span-info">${parseFloat(
        global.data.market_cap_percentage.eth
      ).toFixed(2)}</span></span>
      <span>Usdt: <span class="span-info">${parseFloat(
        global.data.market_cap_percentage.usdt
      ).toFixed(2)}</span></span>
      <span>Dot: <span class="span-info">${parseFloat(
        global.data.market_cap_percentage.dot
      ).toFixed(2)}</span></span>
      <span>Ada: <span class="span-info">${parseFloat(
        global.data.market_cap_percentage.ada
      ).toFixed(2)}</span></span>
      <span>Bnb: <span class="span-info">${parseFloat(
        global.data.market_cap_percentage.bnb
      ).toFixed(2)}</span></span>
      <span>Xrp: <span class="span-info">${parseFloat(
        global.data.market_cap_percentage.xrp
      ).toFixed(2)}</span></span>
      <span>Ltc: <span class="span-info">${parseFloat(
        global.data.market_cap_percentage.ltc
      ).toFixed(2)}</span></span>
      <span>Link: <span class="span-info">${parseFloat(
        global.data.market_cap_percentage.link
      ).toFixed(2)}</span></span>
      <span>Uni: <span class="span-info">${parseFloat(
        global.data.market_cap_percentage.uni
      ).toFixed(2)}</span></span>
      </div>
    </div>`;

    this.cardData.innerHTML = html;
    const newData = document.createElement('div');
    newData.innerHTML = icos;
    this.topData.appendChild(newData);
  }
}

export const global = new GlobalData();
