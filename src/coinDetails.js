import { formatNumber, formatShortDate, formatPercent } from './formatters';

function addCoin(data) {
  const home = document.getElementById('home');
  const one = data[0][0];
  const two = data[1];
  const name = one.name;
  const symbol = one.symbol;
  const price = `$${formatNumber(one.current_price)}`;
  const mCap = `$${formatNumber(one.market_cap, 0)}`;
  const mCapPercent = formatPercent(one.market_cap_change_percentage_24h);
  const cSupply = one.circulating_supply
    ? formatNumber(one.circulating_supply, 0)
    : '';
  const maxSupply = one.max_supply ? formatNumber(one.max_supply, 0) : '∞';
  const volume = formatNumber(one.total_volume, 0);
  const ath = `$${formatNumber(one.ath)}`;
  const athDate = formatShortDate(one.ath_date);
  const atl = `$${formatNumber(one.atl)}`;
  const atlDate = formatShortDate(one.atl_date);
  const athPercent = formatPercent(one.ath_change_percentage);
  const atlPercent = formatPercent(one.atl_change_percentage);
  const high_24h = formatNumber(one.high_24h);
  const low_24h = formatNumber(one.low_24h);
  const priceChange1h = formatPercent(
    one.price_change_percentage_1h_in_currency
  );
  const priceChange24h = formatPercent(one.price_change_percentage_24h);
  const priceChange7d = formatPercent(
    one.price_change_percentage_7d_in_currency
  );
  const priceChange30d = formatPercent(
    one.price_change_percentage_30d_in_currency
  );
  const priceChange1y = formatPercent(
    one.price_change_percentage_1y_in_currency
  );
  const rank = two.market_cap_rank;
  const communityScore = formatNumber(two.community_score);
  const desc = two.description.en;
  const forks = formatNumber(two.developer_data.forks, 0);
  const stars = formatNumber(two.developer_data.stars, 0);
  const genesis = formatShortDate(two.genesis_date);
  const hash = two.hashing_algorithm;
  const image = two.image.small;
  const liquidity = two.liquidity_score;
  const alexaRank = two.public_interest_stats.alexa_rank;

  const template = `<div id='coin-container'>
    <div id="title-container">
     <div id="coin-title">
        <img src="${image}" alt="${image}">
          <span>${name}</span>
          <span>${symbol}</span>
          <span>${price}</span>
     </div>
     <span id="market-cap" class="num"><span class='label'>Market Cap: </span>${mCap} ${mCapPercent}</span>
    </div>

     <div id="coin-details">
         <div id="market-data">
          <div id="market-info">
          <span class="lead">Market Data:</span>
          <span class="num"><span class='label'>Market Cap Rank: </span>${rank}</span>
          <span class="num"><span class='label'>Circulating supply: </span>${cSupply}</span>
          <span class="num"><span class='label'>Volume(BTC): </span>${volume}</span>
          <span class="num"><span class='label'>24h High: </span>${high_24h}</span>
          <span class="num"><span class='label'>24h Low: </span>${low_24h}</span>
          <span class="num"><span class='label'>Max supply: </span>${maxSupply}</span>
          <span class="num"><span class='label'>Liquidity: </span>${liquidity}</span>
          
          </div>

          <div id="price-change">
          <span class="lead">Price Change %:</span>
           <div id="price-change-period">
            <span class="num"><span class='label'>1h: </span >${priceChange1h}</span>
            <span class="num"><span class='label'>24h: </span>${priceChange24h}</span>
            <span class="num"><span class='label'>7d: </span>${priceChange7d}</span>
            <span class="num"><span class='label'>30d: </span>${priceChange30d}</span>
            <span class="num"><span class='label'>1y: </span>${priceChange1y}</span>
           </div>
           <div id="price-change-all-time">
            <span class="num high"><span class='label'>All Time High: </span>${ath} <span id="ath-percent">${athPercent}</span><span id="ath-date">${athDate}</span></span>
            <span class="num low"><span class='label'>All Time Low: </span>${atl} <span id="ath-percent">${atlPercent}</span><span id="ath-date">${atlDate}</span></span>
            
           </div>
          </div>
         </div>

         <div id="desc">
          <span id="description">
          <span class="lead">About:</span>
          <span>
          ${desc}
          </span>
          </span>
          <div id="dev-info">
            <span class="lead">Community and Developer Data:</span>
            <span class="num"><span class='label'>Created: </span>${genesis}</span>
            <span class="num"><span class='label'>Hash Algorithm: </span>${hash}</span>
            <span class="num"><span class='label'>Forks: </span>${forks}</span>
            <span class="num"><span class='label'>Stars: </span>${stars}</span>
            <span class="num"><span class='label'>Community Score: </span>${communityScore}</span>
            <span class="num"><span class='label'>Alexa Rank: </span>${alexaRank}</span>
          </div>
         </div>
     </div>
     

    </div>`;

  home.outerHTML = template;
}

export default addCoin;
