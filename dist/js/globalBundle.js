(()=>{"use strict";const t=new class{async get(t){const a=await fetch(t);return await a.json()}async post(t,a){const e=await fetch(t,{method:"POST",headers:{"Content-type":"application/json"},body:JSON.stringify(a)});return await e.json()}async update(t,a){const e=await fetch(t,{method:"PUT",body:{"Content-type":"application;/json"},headers:JSON.stringify(a)});return await e.json()}async delete(t){return await fetch(t,{method:"Delete"}),await"Resource Deleted..."}};document.getElementById("burgerMenu").addEventListener("click",(t=>{t.preventDefault(),t.currentTarget.classList.toggle("burgerActive"),document.getElementById("navbar").classList.toggle("menuActive")}));const a=new class{constructor(){this.topNav=document.getElementById("nav-data"),this.total,this.exchanges,document.querySelector("#total")&&document.querySelector("#markets")&&(this.total=document.querySelector("#total").firstElementChild,this.exchanges=document.querySelector("#markets").firstElementChild)}async getMarketData(a){await t.get(a).then((t=>{!function(t,a,e,n){const o=parseFloat(t.data.market_cap_change_percentage_24h_usd).toFixed(2);let s;s=o>0?`<i class="fas fa-caret-up"></i> <b>${o}%</b>`:o<0?`<i class="fas fa-caret-down"></i> <b>${o.replace("-","")}%</b>`:`${o}%`,a.innerHTML=`<li><div><span>Total Market Cap: </span><a href='global.html'>$${parseFloat(t.data.total_market_cap.usd.toFixed(0)).toLocaleString()}</a><span> ${s}</span></div></li>\n  <li>24h Vol: <a href='global.html'>$${parseFloat(t.data.total_volume.usd.toFixed(0)).toLocaleString().replace(".",",")}</a></li>\n  <li>Btc dominance: <b>${parseFloat(t.data.market_cap_percentage.btc).toFixed(2)}%</b></li>`;let i=a.firstChild.firstChild.firstChild.nextElementSibling.nextElementSibling;parseFloat(o)>0?(i.style.color="green",i.querySelector("i").style.color="green"):parseFloat(o)<0?(i.style.color="red",i.querySelector("i").style.color="red"):i.style.color="#333333",e&&n&&(e.innerHTML=`Coins: <span class="span-info">${t.data.active_cryptocurrencies}</span>`,n.innerHTML=`Exchanges: <span class="span-info">${t.data.markets}</span>`)}(t,this.topNav,this.total,this.exchanges)})).catch((t=>{console.log(t),location.reload()})),""!==this.topNav.innerHTML&&void 0!==this.topNav.innerHTML&&null!==this.topNav.innerHTML||location.reload(),setTimeout((function(){const t=document.getElementById("nav-data");""!==t.innerHTML&&void 0!==t.innerHTML&&null!==t.innerHTML||location.reload()}),1e3)}},e=new class{constructor(){this.cardData=document.getElementById("globalStats"),this.topData=document.getElementById("totalData")}async globalData(t){document.getElementById("footer").style.visibility="visible";const a=t[0],e=t[1],n=`<div id="icos">\n    <div id="upcoming">Upcoming ICOs: <span class="span-info">${a.data.upcoming_icos}</span></div>\n    <div id="ongoing">Ongoing ICOs: <span class="span-info">${a.data.ongoing_icos}</span></div>\n    <div id="ended">Ended ICOs: <span class="span-info">${a.data.ended_icos}</span></div>\n  </div>`,o=`<div id="defiData">\n      <h1>Defi Stats</h1>\n      <div id="stats">\n      <div>\n      <span>Defi market cap: <span id="marketCap" class="span-info">${parseFloat(e.data.defi_market_cap).toFixed(0).toLocaleString().replace(".",",")}</span></span>\n      <span>Eth market cap: <span class="span-info">${parseFloat(e.data.eth_market_cap).toFixed(0).toLocaleString().replace(".",",")}</span></span>\n      <span>Defi to eth ratio: <span class="span-info">${parseFloat(e.data.defi_to_eth_ratio).toFixed(2)}</span></span>\n      </div>\n      <div>\n      <span>Vol 24h: <span class="span-info">${parseFloat(e.data.trading_volume_24h).toFixed(0).toLocaleString().replace(".",",")}</span></span>\n      <span>Defi dominance: <span class="span-info">${parseFloat(e.data.defi_dominance).toFixed(2)}</span></span>\n      <span>Top coin: <span class="span-info">${e.data.top_coin_name}</span></span>\n      <span>Top coin defi dominance: <span class="span-info">${parseFloat(e.data.top_coin_defi_dominance).toFixed(2)}</span></span>\n      </div>\n      </div>\n    </div>\n    <div></div>\n    <div id="percent">\n      <h1>Market Share</h1>\n      <div id="chartStats"></div>\n    </div>`,s=document.createElement("div");s.innerHTML=n,this.topData.appendChild(s),this.cardData.innerHTML=o}totalChart(t){const a=t.data.market_cap_percentage,e=[],n=[];for(const t in a)e.push(t),n.push(parseFloat(a[t].toFixed(1)));e.push("other"),n.push(parseFloat((100-n.reduce(((t,a)=>t+a))).toFixed(1)));const o=document.getElementById("chartStats");new ApexCharts(o,{series:n,chart:{width:"130%",type:"pie"},labels:e,theme:{monochrome:{enabled:!0}},legend:{position:"bottom"},plotOptions:{pie:{dataLabels:{offset:-5}}},dataLabels:{formatter:(t,a)=>[a.w.globals.labels[a.seriesIndex],t.toFixed(1)+"%"]}}).render()}},n="https://api.coingecko.com/api/v3/global";document.addEventListener("DOMContentLoaded",async function(a,n){document.getElementById("loader").className="loader";const o=["https://api.coingecko.com/api/v3/global",n],s=[];for(const a of o)await t.get(a).then((t=>{s.push(t)})).catch((t=>{console.log(t),i(a,n)}));await e.globalData(s);const i=document.getElementById("globalStats").innerHTML,l=document.getElementById("marketCap").innerHTML;""!==i&&null!=i&&void 0!==l&&"undefined"!==l&&NaN!==l&&"NaN"!==l&&null!==l||location.reload(),e.totalChart(s[0]),document.getElementById("loader").className=""}(0,"https://api.coingecko.com/api/v3/global/decentralized_finance_defi")),document.addEventListener("DOMContentLoaded",a.getMarketData(n))})();