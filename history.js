
window.KenteiHistory=(()=>{
  const $=id=>document.getElementById(id);
  function render(){
    const state=KenteiWord.getState();
    if(!state)return;

    const today=new Date().toISOString().slice(0,10);
    const todayData=state.daily[today]||{total:0,correct:0};
    const answered=Object.values(state.perQuestion||{}).filter(x=>x&&x.total>0).length;

    $('todayHistoryCard').innerHTML=`
      <div class="section-label">今日の学習</div>
      <h2>${todayData.total}問</h2>
      <p class="muted-text">正解 ${todayData.correct}問・正答率 ${KenteiWord.pct(todayData.correct,todayData.total)}</p>
    `;

    $('historySummaryGrid').innerHTML=[
      ['総解答数',state.total],
      ['総正解数',state.correct],
      ['全体正答率',KenteiWord.pct(state.correct,state.total)],
      ['回答済み問題',answered+'問'],
      ['間違い問題',state.wrongIds.length+'問'],
      ['お気に入り',state.favorites.length+'問']
    ].map(([label,value])=>`<div class="history-stat"><b>${value}</b><span>${label}</span></div>`).join('');

    const days=Object.entries(state.daily||{}).sort((a,b)=>b[0].localeCompare(a[0]));
    $('dailyHistoryList').innerHTML=days.length?days.map(([date,d])=>`
      <div class="daily-history-item">
        <div class="daily-history-top"><span>${formatDate(date)}</span><span>${d.total}問</span></div>
        <div class="daily-history-meta">正解 ${d.correct}問・正答率 ${KenteiWord.pct(d.correct,d.total)}</div>
      </div>
    `).join(''):'<div class="empty-card">まだ学習履歴がありません。</div>';
  }

  function formatDate(date){
    const d=new Date(date+'T00:00:00');
    return `${d.getFullYear()}年${d.getMonth()+1}月${d.getDate()}日`;
  }

  function init(){
    document.addEventListener('kentei:route',e=>{if(e.detail==='history')render()});
  }
  return{init,render};
})();
