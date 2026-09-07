/* WannabeGM awards — data + popup. Include on any page with #cats (full list) or #teaserRow (featured). */
const AWARDS = [{"cat": "On paper", "items": [{"i": "🐯", "n": "Paper Tiger", "d": "Best team drafted on paper. Looked unstoppable in September. We'll see."}]}, {"cat": "Firsts of the year", "items": [{"i": "🚨", "n": "First Blood", "d": "First goal of the season. Drew first blood.", "feat": true}, {"i": "🍽️", "n": "The Waiter", "d": "First assist. Served it up on a silver platter."}, {"i": "🍲", "n": "No Soup For You", "d": "First shutout. Came to the net, left with nothing. Next!", "feat": true}, {"i": "🍗", "n": "Chicken Dinner", "d": "First goalie win. Winner winner."}, {"i": "✋", "n": "Five-Finger Discount", "d": "First short-handed goal. Scored down a man — straight-up theft."}, {"i": "🥪", "n": "Bare-Knuckle Sandwich", "d": "First fight. Dropped the gloves and fed someone knuckles.", "feat": true}, {"i": "🍸", "n": "Ménage à Trois", "d": "First hat trick. Three in one night. Filthy.", "feat": true}, {"i": "🏒", "n": "The Full Gordie", "d": "First Gordie Howe hat trick: a goal, an assist, and a fight in one game."}, {"i": "🗡️", "n": "First Dagger", "d": "First game-winning goal. Twisted the knife."}, {"i": "🎬", "n": "Roll Credits", "d": "First overtime winner. Ran long, then called it. That's a wrap."}]}, {"cat": "Rarities", "items": [{"i": "🥯", "n": "Double Bagel", "d": "Two of your goalies posted shutouts on the same night. Double zeroes."}, {"i": "💰", "n": "The Heist", "d": "A game-winning short-handed goal. Robbed 'em blind, a man down."}, {"i": "🐗", "n": "The Full Hog", "d": "A goalie goal. Yes, the goalie scored. Absurd."}, {"i": "🤠", "n": "High Noon", "d": "First penalty-shot goal. One-on-one at high noon — and they blinked."}]}, {"cat": "End of season", "items": [{"i": "🐕", "n": "Big Dawg ROOF", "d": "Most total points. Top of the food chain. ROOF.", "feat": true}, {"i": "🧤", "n": "Brick Shithouse", "d": "Most goalie wins. Built like a wall, stood tall all year."}, {"i": "🛡️", "n": "Human Shield", "d": "Most blocked shots. Threw the body in front of everything."}, {"i": "⚡", "n": "Powerplay Merchant", "d": "Most power-play points. Ate on the man advantage."}, {"i": "🩳", "n": "All About the Shorties", "d": "Most short-handed points. Made a living down a man."}, {"i": "🧦", "n": "Slutty Legs", "d": "Worst goals-against average. Everything got through the five-hole. Wear it."}, {"i": "🍎", "n": "Apple Picker", "d": "Most assists. Dishing all season."}, {"i": "🍪", "n": "Cookie Jar Monster", "d": "Most goals. Hand caught in the cookie jar all year.", "feat": true}, {"i": "😤", "n": "Beast Mode", "d": "Most hits. Ran everything that moved."}, {"i": "😈", "n": "Damn Nasty", "d": "Most penalty minutes. Menace to society."}, {"i": "➗", "n": "Math Boy", "d": "Best plus/minus. Did the math, came out ahead."}, {"i": "🧹", "n": "Hemorrhoid Cushion", "d": "Last place. Sat on it all season. Ouch.", "feat": true}, {"i": "🏃", "n": "Leeroy Jenkins", "d": "Most waiver / FA moves. Charged in headfirst and spammed the wire all year. Co-winners welcome — at least you've got chicken."}, {"i": "🐺", "n": "The Wolf of Wannabe Street", "d": "Most trades. Always wheeling and dealing — the more the merrier."}, {"i": "🗣️", "n": "Shoresy", "d": "Most trash talk. Chirped everyone's mom all season. Gotta give 'er."}]}];

function _el(t,c,html){const e=document.createElement(t);if(c)e.className=c;if(html!=null)e.innerHTML=html;return e;}
let _overlay,_lastFocus;
function _buildModal(){
  _overlay=_el('div','overlay');_overlay.setAttribute('role','dialog');_overlay.setAttribute('aria-modal','true');
  _overlay.innerHTML='<div class="modal"><button class="x" aria-label="Close">\u00d7</button><div class="bigico"></div><span class="tag"></span><h4></h4><div class="desc"></div><div class="winner">Season 23 winner: <b>\u2014 TBD \u2014</b></div></div>';
  document.body.appendChild(_overlay);
  _overlay.querySelector('.x').addEventListener('click',_close);
  _overlay.addEventListener('click',e=>{if(e.target===_overlay)_close();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&_overlay.classList.contains('open'))_close();});
}
function _open(a,cat){_lastFocus=document.activeElement;
  _overlay.querySelector('.bigico').textContent=a.i;_overlay.querySelector('.tag').textContent=cat;
  _overlay.querySelector('h4').textContent=a.n;_overlay.querySelector('.desc').textContent=a.d;
  _overlay.classList.add('open');_overlay.querySelector('.x').focus();}
function _close(){_overlay.classList.remove('open');if(_lastFocus)_lastFocus.focus();}
function _renderFull(root){AWARDS.forEach(g=>{const sec=_el('div','cat');sec.appendChild(_el('h3',null,g.cat));
  const grid=_el('div','grid');g.items.forEach(a=>{const b=_el('button','award',
    '<span class="ico">'+a.i+'</span><span class="nm">'+a.n+'</span><span class="sub">Winner TBD</span>');
  b.addEventListener('click',()=>_open(a,g.cat));grid.appendChild(b);});sec.appendChild(grid);root.appendChild(sec);});}
function _renderTeaser(root){AWARDS.forEach(g=>g.items.filter(a=>a.feat).forEach(a=>{
  const c=_el('button','tchip','<span class="ti">'+a.i+'</span>'+a.n);
  c.addEventListener('click',()=>_open(a,g.cat));root.appendChild(c);}));}
document.addEventListener('DOMContentLoaded',()=>{_buildModal();
  const c=document.getElementById('cats');if(c)_renderFull(c);
  const t=document.getElementById('teaserRow');if(t)_renderTeaser(t);});
