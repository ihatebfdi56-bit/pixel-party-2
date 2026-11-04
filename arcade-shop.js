const shopItems=[
  {id:'doublePoints',name:'Double Points',cost:80,tag:'All games',art:'coin',description:'Doubles the points from your next completed game.'},
  {id:'sprintTime',name:'Time Token',cost:60,tag:'Number Sprint',art:'clock',description:'Adds 30 seconds to your next Number Sprint run.'},
  {id:'finishBonus',name:'Finish Bonus',cost:100,tag:'All games',art:'star',description:'Adds 50 bonus points to your next completed game.'}
];
const pointsKey='ppPoints',purchaseKey='ppShopPurchases';
function points(){return +(localStorage.getItem(pointsKey)||0)}
function purchases(){try{return JSON.parse(localStorage.getItem(purchaseKey)||'{}')}catch{return {}}}
function savePurchases(v){localStorage.setItem(purchaseKey,JSON.stringify(v))}
function setPoints(v){localStorage.setItem(pointsKey,Math.max(0,Math.floor(v)));document.querySelectorAll('#shop-points,#shop-points-large').forEach(el=>el.textContent=points())}
function renderShop(){const balance=points(),owned=purchases(),grid=document.querySelector('#arcade-shop-grid');setPoints(balance);grid.innerHTML=shopItems.map(item=>{const count=owned[item.id]||0;const affordable=balance>=item.cost;return `<article class="arcade-shop-card"><div class="shop-item-art item-${item.art}"></div><span class="tag">${item.tag}</span><h2>${item.name}</h2><p>${item.description}</p><div class="shop-item-foot"><span class="item-owned">Owned: ${count}</span><button class="shop-buy" data-buy="${item.id}" ${affordable?'':'disabled'}>${affordable?`Buy · ${item.cost}`:`Need ${item.cost-balance} more`}</button></div></article>`}).join('');grid.querySelectorAll('[data-buy]').forEach(button=>button.onclick=()=>buy(button.dataset.buy))}
function buy(id){const item=shopItems.find(x=>x.id===id);if(!item||points()<item.cost)return;setPoints(points()-item.cost);const owned=purchases();owned[id]=(owned[id]||0)+1;savePurchases(owned);document.querySelector('#shop-message').textContent=`${item.name} saved for your next run.`;renderShop()}
renderShop();
