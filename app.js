const seedAssets = [
  { ticker: "QQQ", name: "Nasdaq 100 ETF", category: "etf", price: "601.42", change: "+0.86%", tone: "blue", signal: "bullish", label: "強勢", points: "2,20 12,18 22,21 32,10 42,14 52,4 64,8 72,2" },
  { ticker: "NVDA", name: "NVIDIA Corp.", category: "core", price: "184.05", change: "+2.41%", tone: "green", signal: "bullish", label: "強勢", points: "2,22 12,20 22,22 32,13 42,15 52,8 64,10 72,3" },
  { ticker: "TSM", name: "Taiwan Semi", category: "core", price: "298.76", change: "+1.17%", tone: "purple", signal: "bullish", label: "強勢", points: "2,18 12,21 22,17 32,19 42,11 52,13 64,7 72,8" },
  { ticker: "MU", name: "Micron Technology", category: "core", price: "165.22", change: "-0.38%", tone: "orange", signal: "watch", label: "觀察", points: "2,5 12,8 22,4 32,14 42,11 52,18 64,14 72,22" },
  { ticker: "VRT", name: "Vertiv Holdings", category: "infra", price: "172.84", change: "+3.08%", tone: "blue", signal: "bullish", label: "強勢", points: "2,22 12,16 22,18 32,12 42,14 52,5 64,8 72,2" },
  { ticker: "COPX", name: "Copper Miners ETF", category: "materials", price: "52.91", change: "+1.92%", tone: "orange", signal: "bullish", label: "強勢", points: "2,20 12,16 22,19 32,11 42,13 52,7 64,9 72,3" },
  { ticker: "LIT", name: "Lithium & Battery", category: "materials", price: "64.30", change: "-1.12%", tone: "purple", signal: "watch", label: "觀察", points: "2,4 12,9 22,7 32,15 42,12 52,18 64,16 72,23" },
  { ticker: "ANET", name: "Arista Networks", category: "infra", price: "144.19", change: "+0.72%", tone: "green", signal: "neutral", label: "中性", points: "2,17 12,14 22,18 32,13 42,15 52,9 64,12 72,8" }
];
const extraAssets = [
  { ticker: "ASML", name: "ASML Holding", category: "core", price: "912.80", change: "+0.41%", tone: "purple", signal: "bullish", label: "強勢" },
  { ticker: "CEG", name: "Constellation Energy", category: "infra", price: "386.44", change: "+1.31%", tone: "green", signal: "bullish", label: "強勢" },
  { ticker: "FCX", name: "Freeport-McMoRan", category: "materials", price: "48.02", change: "+0.64%", tone: "orange", signal: "neutral", label: "中性" },
  { ticker: "SMH", name: "Semiconductor ETF", category: "etf", price: "331.18", change: "+1.05%", tone: "blue", signal: "bullish", label: "強勢" }
];
let assets = JSON.parse(localStorage.getItem("signal-atlas-assets") || "null") || [...seedAssets, ...extraAssets];
const labels = { core: "核心資產", infra: "AI 基礎建設", materials: "原料與材料", etf: "ETF" };
const rows = document.querySelector("#assetRows");

function sparkline(asset, index) {
  const points = asset.points || `2,${20 - index % 5} 12,${16 - index % 4} 22,${18 - index % 3} 32,${10 + index % 5} 42,${12 - index % 4} 52,${5 + index % 6} 64,${8 + index % 4} 72,${3 + index % 3}`;
  return `<svg class="spark" viewBox="0 0 74 26" preserveAspectRatio="none"><polyline class="${asset.change.startsWith("-") ? "negative" : "positive"}" points="${points}"/></svg>`;
}
function render(filter = "all") {
  const visible = assets.filter(asset => filter === "all" || asset.category === filter);
  rows.innerHTML = visible.map((asset, index) => `<div class="asset-row">
    <div class="asset-name"><span class="ticker-logo logo-${asset.tone}">${asset.ticker.slice(0, 2)}</span><div><b>${asset.ticker}</b><small>${asset.name}</small></div></div>
    <span class="price">${asset.price === "—" ? "—" : `USD $${asset.price}`}</span><span class="change ${asset.change.startsWith("-") ? "down" : "up"}">${asset.change}</span>
    ${sparkline(asset, index)}<span class="signal ${asset.signal}">${asset.label}</span>
  </div>`).join("");
  document.querySelector("#watchCount").textContent = assets.length;
  document.querySelector("#assetMetric").textContent = assets.length;
  document.querySelector("#listCount").textContent = `${assets.length} 個標的`;
}
document.querySelectorAll(".filter").forEach(button => button.addEventListener("click", () => {
  document.querySelectorAll(".filter").forEach(item => item.classList.remove("active"));
  button.classList.add("active");
  render(button.dataset.filter);
}));
const dialog = document.querySelector("#assetDialog");
document.querySelector("#addAssetBtn").addEventListener("click", () => { dialog.showModal(); document.querySelector("#tickerInput").focus(); });
document.querySelector("#assetForm").addEventListener("submit", event => {
  event.preventDefault();
  const ticker = document.querySelector("#tickerInput").value.trim().toUpperCase();
  const category = document.querySelector("#categoryInput").value;
  if (!ticker) return;
  if (assets.some(item => item.ticker === ticker)) { alert("這個標的已經在你的雷達中。"); return; }
  assets.unshift({ ticker, name: "自訂追蹤標的", category, price: "—", change: "待更新", tone: "blue", signal: "neutral", label: "新加入" });
  localStorage.setItem("signal-atlas-assets", JSON.stringify(assets));
  render(document.querySelector(".filter.active").dataset.filter);
  document.querySelector("#assetForm").reset();
  dialog.close();
});
document.querySelector("#manageBtn").addEventListener("click", () => document.querySelector("#addAssetBtn").click());
render();
