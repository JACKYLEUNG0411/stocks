(() => {
  const names = {
    QQQ:['納斯達克100 ETF','Nasdaq 100 ETF'], NVDA:['輝達','NVIDIA'], MSFT:['微軟','Microsoft'], AVGO:['博通','Broadcom'], AMD:['超微半導體','Advanced Micro Devices'], TSM:['台積電','Taiwan Semiconductor'], MU:['美光科技','Micron Technology'], ASML:['艾司摩爾','ASML Holding'], AMAT:['應用材料','Applied Materials'], LRCX:['科林研發','Lam Research'], KLAC:['科磊','KLA Corporation'], VRT:['維諦','Vertiv Holdings'], ANET:['Arista 網路','Arista Networks'], CEG:['星座能源','Constellation Energy'], SMH:['半導體 ETF','VanEck Semiconductor ETF'], COPX:['銅礦商 ETF','Global X Copper Miners ETF'], FCX:['自由港麥克莫蘭','Freeport-McMoRan'], 'HG=F':['銅期貨','Copper Futures'], REMX:['稀土與戰略金屬 ETF','VanEck Rare Earth/Strategic Metals ETF'], PICK:['全球金屬與採礦 ETF','iShares MSCI Global Metals & Mining ETF'], LIT:['鋰電池 ETF','Global X Lithium & Battery Tech ETF'], GLD:['黃金 ETF','SPDR Gold Shares'], SLV:['白銀 ETF','iShares Silver Trust']
  };
  const apply = () => document.querySelectorAll('.asset-name').forEach(item => {
    const ticker = item.querySelector('b')?.textContent.trim();
    const value = names[ticker];
    if (!value || item.querySelector('.bilingual-name')) return;
    const old = item.querySelector('small');
    if (old) old.remove();
    item.insertAdjacentHTML('beforeend', `<small class="bilingual-name"><span>${value[0]}</span><em>${value[1]}</em></small>`);
  });
  new MutationObserver(apply).observe(document.querySelector('#assetRows') || document.body, {childList:true,subtree:true});
  apply();
})();
