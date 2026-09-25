(function(){
'use strict';
var DATA=(window.MONET||[]).filter(function(r){return !r.hide;}).map(function(r,i){r.i=i;return r;});
var HIST=window.HIST||null,histLoading=false;
function loadHist(cb){if(HIST){cb&&cb();return;}if(histLoading)return;histLoading=true;var s=document.createElement('script');s.src='data/hist.js?v=7';s.onload=function(){HIST=window.HIST||{};cb&&cb();};document.head.appendChild(s);}
function H(r){if(!HIST)return null;var own=HIST[r.k];if(r.same){var o=HIST['w'+r.same];if(o){var m={};for(var x in o)if(x!=='fx'&&x!=='f')m[x]=o[x];if(own&&own.nw)m.nw=own.nw;return m;}}return own;}
var PAGE=120;

var T={
 ru:{eyebrow:'5 декабря 1926 — 5 декабря 2026',cent:'Сто лет памяти',pastLink:'Пастели Моне — 110 работ →',name:'Клод Моне',
  lede:'Сто лет назад, 5 декабря 1926 года, в Живерни умер Клод Моне. Он писал свет — утренний туман над Сеной, стога на закате, пруд с кувшинками в своём саду. Здесь собраны все картины, которые удалось найти в открытых источниках, в порядке каталога Вильденштейна.',
  tlTitle:'Работы по годам',tlHint:'Нажмите на год, чтобы увидеть картины этого года. Повторное нажатие снимает выбор.',
  searchLabel:'Поиск',ph:'Название, место, музей, номер W…',sortW:'По каталогу (W)',sortYear:'По году',sortTitle:'По названию',
  whereAll:'Все собрания',whereMuseum:'Только музеи',wherePrivate:'Частные коллекции',whereLost:'Утрачены или неизвестно где',
  aboutTitle:'О каталоге',srcTitle:'Источники',prev:'Предыдущая',next:'Следующая',
  about1:'Основа — каталог-резоне Даниэля Вильденштейна (1996): номера от W1 до W1983 охватывают все известные картины Моне маслом, в каталоге есть каждый номер. Сведения о местонахождении сведены из Wikidata, английской и французской Википедии (включая список работ Моне в публичных собраниях по странам) и самого каталога, который Институт Вильденштейна–Платтнера открыл на Internet Archive. Изображения хранятся на этом сайте: копии с Викисклада, из открытых коллекций музеев и сканы из каталога-резоне (они помечены). Картины, изображение которых неизвестно, собраны в конце каталога в разделе «Утраченные и неизвестные работы». Работы без номера W взяты из Wikidata и в каталоге Вильденштейна не значатся — их атрибуция может быть спорной.',
  about2:'Моне умер в 1926 году, его картины находятся в общественном достоянии. Точные фоторепродукции картин, как правило, тоже свободны; условия каждого снимка указаны на его странице на Викискладе — ссылка есть в карточке картины.',
  about3:'Около половины картин — в частных собраниях. Владельцы таких работ не публикуются, поэтому для них указаны страна (по данным каталога) и последняя известная продажа на аукционе, если она есть в источниках. Если вы нашли ошибку, её можно исправить в Wikidata — каталог пересобирается из этих данных.',
  fWorks:'картин в каталоге',fImg:'с изображением',fMus:'в музеях',fYears:'лет работы',
  all:'Все',shown:function(n,t){return 'Показано <b>'+n+'</b> из <b>'+t+'</b>';},
  found:function(n){return 'Найдено: <b>'+n+'</b>';},range:function(a,b,t){return 'Картины <b>'+a+'–'+b+'</b> из <b>'+t+'</b>';},prevP:'Назад',nextP:'Вперёд',reset:'Сбросить фильтры',
  more:function(n){return 'Показать ещё '+n;},empty:'Ничего не найдено. Попробуйте другое слово или сбросьте фильтры.',
  noimg:'Нет открытого изображения',qAll:'Любое изображение',qHi:'Высокое качество (8+ Мп)',qImg:'Цветная фотография',qScan:'Только скан из каталога',qNone:'Без изображения',csv1:'Скачать весь каталог таблицей (CSV)',csv2:'Список изображений (CSV)',fColor:'цветных фотографий',fScan:'сканов из каталога',fNone:'без изображения',noW2:'вне каталога W',extantNo:'Картина существует, но её свободной фотографии пока не нашлось.',lostT:'Утраченные и неизвестные работы',lostI:'Эти картины есть в каталоге Вильденштейна, но их изображение неизвестно: одни утрачены или уничтожены, другие известны только по письмам Моне, счетам и архивам торговцев, и ни одной фотографии их не сохранилось.',hHist:'История картины',hProv:'Путь картины: владельцы',hFate:'Судьба картины',hSrc:'По данным каталога-резоне Д. Вильденштейна (1996). Пересказ, не цитата.',noPhotoT:'Изображение неизвестно',year:'Год',dims:'Размер',dimsU:'см',where:'Где хранится',cat:'Каталог',series:'Серия',
  commons:'Изображение на Викискладе',wikidata:'Wikidata',wiki:'Статья в Википедии',noW:'вне каталога W',close:'Закрыть',
  yearSel:function(y){return 'Год: <b>'+y+'</b>';}},
 en:{eyebrow:'5 December 1926 — 5 December 2026',cent:'A hundred years of remembrance',pastLink:'Monet’s pastels — 110 works →',name:'Claude Monet',
  lede:'A hundred years ago, on 5 December 1926, Claude Monet died at Giverny. He painted light: morning mist over the Seine, haystacks at sunset, the water-lily pond in his own garden. This catalogue gathers every painting we could find in open sources, ordered by the Wildenstein catalogue.',
  tlTitle:'Works by year',tlHint:'Click a year to see its paintings. Click again to clear.',
  searchLabel:'Search',ph:'Title, place, museum, W number…',sortW:'By catalogue (W)',sortYear:'By year',sortTitle:'By title',
  whereAll:'All collections',whereMuseum:'Museums only',wherePrivate:'Private collections',whereLost:'Lost or location unknown',
  aboutTitle:'About the catalogue',srcTitle:'Sources',prev:'Previous',next:'Next',
  about1:'The backbone is Daniel Wildenstein’s catalogue raisonné (1996): numbers W1 to W1983 cover every known oil painting by Monet, and every number is listed here. Locations are merged from Wikidata, the English and French Wikipedia (including the French list of Monet works in public collections by country) and the catalogue itself, which the Wildenstein Plattner Institute opened on the Internet Archive. Images are hosted on this site: copies from Wikimedia Commons, museum open-access collections and scans from the catalogue raisonné (marked as such). Paintings with no known image are gathered at the end, under “Lost and unrecorded works”. Works without a W number come from Wikidata and are not in the Wildenstein catalogue, so their attribution may be disputed.',
  about2:'Monet died in 1926 and his paintings are in the public domain. Faithful photographs of them are generally free as well; each image’s terms are on its Wikimedia Commons page, linked from the painting’s card.',
  about3:'About half of the paintings are in private hands. Owners are not public, so these entries show the country (from the catalogue) and the last known auction sale where sources have one. If you spot an error, you can fix it in Wikidata, which this catalogue is rebuilt from.',
  fWorks:'paintings listed',fImg:'with an image',fMus:'in museums',fYears:'years of work',
  all:'All',shown:function(n,t){return 'Showing <b>'+n+'</b> of <b>'+t+'</b>';},
  found:function(n){return 'Found: <b>'+n+'</b>';},range:function(a,b,t){return 'Paintings <b>'+a+'–'+b+'</b> of <b>'+t+'</b>';},prevP:'Previous',nextP:'Next',reset:'Clear filters',
  more:function(n){return 'Show '+n+' more';},empty:'Nothing found. Try another word or clear the filters.',
  noimg:'No open image',qAll:'Any image',qHi:'High resolution (8+ MP)',qImg:'Colour photograph',qScan:'Catalogue scan only',qNone:'No image',csv1:'Download the whole catalogue (CSV)',csv2:'List of images (CSV)',fColor:'colour photographs',fScan:'catalogue scans',fNone:'no image',noW2:'not in W catalogue',extantNo:'The painting survives, but no free photograph of it has been found yet.',lostT:'Lost and unrecorded works',lostI:'These paintings are listed in the Wildenstein catalogue, but no image of them is known: some were lost or destroyed, others are known only from Monet’s letters, account books and dealers’ archives, and no photograph of them survives.',hHist:'About the painting',hProv:'Provenance',hFate:'What happened to it',hSrc:'Based on D. Wildenstein’s catalogue raisonné (1996), summarised in our own words.',noPhotoT:'No image known',year:'Year',dims:'Size',dimsU:'cm',where:'Collection',cat:'Catalogue',series:'Series',
  commons:'Image on Wikimedia Commons',wikidata:'Wikidata',wiki:'Wikipedia article',noW:'not in W catalogue',close:'Close',
  yearSel:function(y){return 'Year: <b>'+y+'</b>';}}
};
var SER=[['waterlilies','Кувшинки','Water Lilies'],['japbridge','Японский мостик','Japanese Bridge'],['haystacks','Стога','Haystacks'],['poplars','Тополя','Poplars'],['rouen','Руанский собор','Rouen Cathedral'],['london','Лондон','London'],['venice','Венеция','Venice'],['manche','Побережье Ла-Манша','Channel coast'],['etretat','Этрета','Étretat'],['trouville','Трувиль и Довиль','Trouville & Deauville'],['belleile','Бель-Иль','Belle-Île'],['creuse','Крёз','Creuse'],['seine_morning','Утро на Сене','Mornings on the Seine'],['norway','Норвегия','Norway'],['garden','Сады и цветы','Gardens & flowers']];
var SERN={};SER.forEach(function(s){SERN[s[0]]=s;});

var st={lang:'ru',q:'',sort:'w',where:'all',cty:'',q2:'all',ser:'',year:null,page:0,list:[]};
try{var sl=localStorage.getItem('monet-lang');if(sl==='en'||sl==='ru')st.lang=sl;}catch(e){}

var $=function(id){return document.getElementById(id);};
function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
function tt(){return T[st.lang];}
function title(r){return st.lang==='ru'?r.ru:r.en;}
function alt(r){var a=[];if(st.lang==='ru'&&r.en&&r.en!==r.ru)a.push(r.en);if(r.fr&&r.fr!==r.en&&r.fr!==r.ru)a.push(r.fr);if(st.lang==='en'&&r.ru&&r.ru!==r.en)a.push(r.ru);return a;}
var STL={ru:{museum:'Музей',private:'Частная коллекция',lost:'Местонахождение утрачено',destroyed:'Уничтожена',unknown:'Местонахождение неизвестно'},en:{museum:'Museum',private:'Private collection',lost:'Whereabouts lost',destroyed:'Destroyed',unknown:'Location unknown'}};
function place(r){var p=st.lang==='ru'?(r.pru||r.pen):r.pen;return p||STL[st.lang][r.st||'unknown'];}
function country(r){return st.lang==='ru'?(r.cru||''):(r.cen||'');}
function isPrivate(r){return r.st!=='museum';}
function sale(r){if(!r.sale)return '';return (st.lang==='ru'?'последняя известная продажа: ':'last known sale: ')+r.sale;}
function vol(r){var n=parseInt(r.w,10);if(!n)return null;return n<=968?['II','c.rclaudemonetvolumeiiwildensteininstitute']:n<=1595?['III','c.rclaudemonetvolumeiiiwildensteininstitute']:['IV','c.rclaudemonetvolumeivwildensteininstitute'];}
var LOC=window.LOCAL||{};var ZOOM_BASE=window.ZOOM_BASE||'https://vasiliad.github.io/monet-zoom/';
function lk(r){if(LOC[r.k])return r.k;if(r.same&&LOC['w'+r.same])return 'w'+r.same;if(r.whole&&LOC['w'+r.whole])return 'w'+r.whole;return r.k;}
function loc(r){return r.noimg?null:LOC[lk(r)];}
function thumb(f,w){return 'https://commons.wikimedia.org/wiki/Special:FilePath/'+encodeURIComponent(f)+'?width='+w;}
function px(r){return r.hi?r.hi.w*r.hi.h:(r.iw?r.iw*r.ih:0);}
function hasImg(r){return !!(loc(r)||r.img||(r.hi&&r.hi.iiif&&r.hi.src!=='aic'));}
function gone(r){return ['lost','destroyed','unknown'].indexOf(r.st)>=0;}
function fateLine(r){var h=H(r);if(h&&h.fx)return h.fx[st.lang==='ru'?0:1];return '';}
function qual(r){if(!r.img&&!r.hi)return 'none';if(r.scan&&!r.hi)return 'scan';var p=px(r);return p>=8e6?'hi':p>=2e6?'mid':'low';}
function bigSrc(r){if(loc(r))return 'img/1600/'+lk(r)+'.webp';if(r.hi&&r.hi.iiif&&(r.hi.src!=='aic'||!r.img))return r.hi.iiif+'/full/'+(r.hi.src==='aic'?'1686,':'1600,')+'/0/default.jpg';if(r.hi&&r.hi.url&&!r.img)return r.hi.url;return r.img?thumb(r.img,1280):'';}
function origUrl(r){if(r.hi)return r.hi.iiif?r.hi.iiif+'/full/max/0/default.jpg':r.hi.url;return r.img?'https://commons.wikimedia.org/wiki/Special:FilePath/'+encodeURIComponent(r.img):'';}
function srcName(r){if(r.hi)return {nga:'National Gallery of Art',aic:'Art Institute of Chicago',cma:'Cleveland Museum of Art'}[r.hi.src];return r.scan?(st.lang==='ru'?'Викисклад, скан из каталога-резоне':'Wikimedia Commons, catalogue scan'):(st.lang==='ru'?'Викисклад':'Wikimedia Commons');}
function nf(n){return n.toLocaleString(st.lang==='ru'?'ru-RU':'en-US');}
function filePage(f){return 'https://commons.wikimedia.org/wiki/File:'+encodeURIComponent(f.replace(/ /g,'_'));}
function wnum(r){var m=/^(\d+)([a-z]?)/.exec(r.w||'');return m?parseInt(m[1],10)*10+(m[2]?m[2].charCodeAt(0)-96:0):1e9;}
DATA.forEach(function(r){r._s=[r.w?'w'+r.w:'',r.en,r.ru,r.fr,r.pen,r.pru,r.cen,r.cru,r.y].join(' ').toLowerCase().replace(/ё/g,'е');r._wn=wnum(r);});

/* facts */
function renderFacts(){
  var img=DATA.filter(hasImg).length,col=DATA.filter(function(r){return hasImg(r)&&!(r.scan&&!r.hi);}).length,scn=img-col;
  var mus=DATA.filter(function(r){return !isPrivate(r);}).length;
  var wn=DATA.filter(function(r){return r.w&&/^\d+$/.test(r.w);}).length;var f=[[DATA.length,tt().fWorks],[col,tt().fColor],[scn,tt().fScan],[DATA.length-img,tt().fNone],[mus,tt().fMus],[DATA.filter(function(r){return r.st==='private';}).length,st.lang==='ru'?'в частных собраниях':'in private hands'],[DATA.filter(function(r){return qual(r)==='hi';}).length,st.lang==='ru'?'в высоком качестве (8+ Мп)':'in high resolution (8+ MP)']];
  $('facts').innerHTML=f.map(function(x){return '<div><dt>'+x[1]+'</dt><dd>'+x[0].toLocaleString(st.lang==='ru'?'ru-RU':'en-US')+'</dd></div>';}).join('');
}

/* timeline */
var YEARS=[];for(var y=1858;y<=1926;y++)YEARS.push(y);
function renderTimeline(){
  var c={};DATA.forEach(function(r){if(r.yr)c[r.yr]=(c[r.yr]||0)+1;});
  var max=Math.max.apply(null,YEARS.map(function(y){return c[y]||0;}));
  $('timeline').innerHTML=YEARS.map(function(y){
    var n=c[y]||0,h=Math.max(2,Math.round(n/max*100));
    var lab=(y%10===0)?'<span class="tick">'+y+'</span>':'';
    return '<button type="button" data-y="'+y+'" aria-pressed="'+(st.year===y)+'" aria-label="'+y+': '+n+'" title="'+y+' — '+n+'"><i style="height:'+h+'%"></i>'+lab+'</button>';
  }).join('');
}
$('timeline').addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;var y=+b.dataset.y;st.year=(st.year===y)?null:y;[].forEach.call(this.children,function(x){x.setAttribute('aria-pressed',String(+x.dataset.y===st.year));});apply(true);});

/* series chips */
function renderChips(){
  var c={};DATA.forEach(function(r){(r.ser||[]).forEach(function(s){c[s]=(c[s]||0)+1;});});
  var h='<button type="button" class="chip" data-s="" aria-pressed="'+(st.ser==='')+'">'+tt().all+'</button>';
  h+=SER.map(function(s){return '<button type="button" class="chip" data-s="'+s[0]+'" aria-pressed="'+(st.ser===s[0])+'">'+(st.lang==='ru'?s[1]:s[2])+'<small>'+(c[s[0]]||0)+'</small></button>';}).join('');
  $('series').innerHTML=h;
}
$('series').addEventListener('click',function(e){var b=e.target.closest('.chip');if(!b)return;st.ser=b.dataset.s;[].forEach.call(this.children,function(x){x.setAttribute('aria-pressed',String(x.dataset.s===st.ser));});apply(true);});

/* filtering */
function apply(resetPage){
  var q=st.q.trim().toLowerCase().replace(/ё/g,'е'),words=q?q.split(/\s+/):[];
  var L=DATA.filter(function(r){
    if(st.year&&r.yr!==st.year)return false;
    if(st.ser&&(r.ser||[]).indexOf(st.ser)<0)return false;
    if(st.q2&&st.q2!=='all'){var qq=qual(r);if(st.q2==='hi'&&qq!=='hi')return false;if(st.q2==='img'&&(qq==='none'||qq==='scan'))return false;if(st.q2==='scan'&&qq!=='scan')return false;if(st.q2==='none'&&qq!=='none')return false;}
    if(st.where!=='all'){if(st.where==='lost'){if(['lost','destroyed','unknown'].indexOf(r.st)<0)return false;}else if(r.st!==st.where)return false;}
    if(st.cty&&r.cen!==st.cty)return false;
    for(var i=0;i<words.length;i++){var w=words[i].replace(/^w\.?/,'w');if(r._s.indexOf(w)<0)return false;}
    return true;
  });
  var coll=new Intl.Collator(st.lang);
  var exact=/^w\.?\s?(\d+[a-z]?)$/.exec(q.replace(/\s+/g,''));
  if(st.sort==='year')L.sort(function(a,b){return (a.yr||9999)-(b.yr||9999)||a._wn-b._wn;});
  else if(st.sort==='title')L.sort(function(a,b){return coll.compare(title(a),title(b));});
  else L.sort(function(a,b){return a._wn-b._wn||(a.yr||9999)-(b.yr||9999);});
  var sepLost=!(st.where==='lost'||st.q2==='none');
  st.lost=sepLost?L.filter(function(r){return !hasImg(r)&&gone(r);}):[];
  if(sepLost)L=L.filter(function(r){return hasImg(r)||!gone(r);});
  if(exact){var ex=exact[1];L.sort(function(a,b){return (b.w===ex)-(a.w===ex);});}
  st.list=L.concat(st.lost);st.nimg=L.length;if(resetPage)st.page=0;
  renderGrid();
}
function lostCard(r){
  var f=fateLine(r)||(!gone(r)?tt().extantNo:'');var h=H(r);
  var m=[r.y,place(r)].filter(Boolean).map(function(x){return '<span>'+esc(x)+'</span>';}).join('');
  return '<button type="button" class="card lostcard" data-i="'+r.i+'"><span class="cap"><span class="w">'+(r.w?'W'+esc(r.w):esc(tt().noW))+'</span><span class="t">'+esc(title(r))+'</span><span class="m">'+m+'</span>'+(f?'<span class="fx">'+esc(f)+'</span>':'')+'</span></button>';
}
function card(r){
  if(!hasImg(r))return lostCard(r);
  var tsrc=loc(r)?'img/400/'+lk(r)+'.webp':r.img?thumb(r.img,330):(r.hi&&r.hi.iiif&&r.hi.src!=='aic'?r.hi.iiif+'/full/400,/0/default.jpg':'');
  var im=tsrc?'<img loading="lazy" decoding="async" src="'+tsrc+'" alt="'+esc(title(r))+'">'+(qual(r)==='hi'?'<span class="hd">HD</span>':''):
    '<span class="noimg"><svg width="34" height="34" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M3 16l5-5 4 4 3-3 6 6" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>'+tt().noimg+'</span>';
  var m=[r.y,place(r)+(country(r)&&r.st==='museum'?'':(country(r)?' · '+country(r):''))].filter(Boolean).map(function(x){return '<span>'+esc(x)+'</span>';}).join('');
  return '<button type="button" class="card" data-i="'+r.i+'"><span class="frame">'+im+'</span><span class="cap"><span class="w">'+(r.w?'W'+esc(r.w):esc(tt().noW))+'</span><span class="t">'+esc(title(r))+'</span><span class="m">'+m+'</span></span></button>';
}
function pager(pages){
  if(pages<=1)return '';
  var p=st.page,h='<button type="button" data-p="'+(p-1)+'"'+(p<=0?' disabled':'')+'>← '+tt().prevP+'</button><span class="pn">';
  var set={};[0,1,p-2,p-1,p,p+1,p+2,pages-2,pages-1].forEach(function(x){if(x>=0&&x<pages)set[x]=1;});
  var ks=Object.keys(set).map(Number).sort(function(a,b){return a-b;}),last=-1;
  ks.forEach(function(x){if(x-last>1)h+='<span class="gap">…</span>';h+='<button type="button" data-p="'+x+'"'+(x===p?' aria-current="page"':'')+'>'+(x+1)+'</button>';last=x;});
  h+='</span><button type="button" data-p="'+(p+1)+'"'+(p>=pages-1?' disabled':'')+'>'+tt().nextP+' →</button>';
  return h;
}
function goPage(e){var b=e.target.closest('button[data-p]');if(!b||b.disabled)return;st.page=+b.dataset.p;renderGrid();var t=$('status');if(t)window.scrollTo({top:t.getBoundingClientRect().top+window.scrollY-140,behavior:'smooth'});}
function renderGrid(){
  var L=st.list.slice(0,st.nimg),pages=Math.max(1,Math.ceil(L.length/PAGE));
  if(st.page>=pages)st.page=pages-1;if(st.page<0)st.page=0;
  var a=st.page*PAGE,n=Math.min(a+PAGE,L.length);
  var filt=st.q||st.ser||st.year||st.cty||st.where!=='all'||st.q2!=='all';
  var s=L.length?tt().range(a+1,n,L.length):tt().found(0);
  if(st.year)s+=' · '+tt().yearSel(st.year);
  if(filt)s+=' <button type="button" id="reset">'+tt().reset+'</button>';
  $('status').innerHTML=s;
  $('grid').innerHTML=(L.length||st.lost.length)?L.slice(a,n).map(card).join(''):'<p class="empty">'+tt().empty+'</p>';
  var ph=pager(pages);$('pager-top').innerHTML=ph;$('pager-bot').innerHTML=ph;
  var ls=$('lostsec');
  if(st.page>=pages-1&&st.lost.length){ls.hidden=false;$('lost-h').textContent=tt().lostT+' · '+st.lost.length;$('lost-i').textContent=tt().lostI;var draw=function(){$('lostgrid').innerHTML=st.lost.map(lostCard).join('');};draw();loadHist(draw);}else ls.hidden=true;
}
$('status').addEventListener('click',function(e){if(e.target.id!=='reset')return;st.q='';st.ser='';st.year=null;st.where='all';st.cty='';st.q2='all';$('qual').value='all';$('q').value='';$('where').value='all';$('cty').value='';renderChips();renderTimeline();apply(true);});
var qt;$('q').addEventListener('input',function(){clearTimeout(qt);var v=this.value;qt=setTimeout(function(){st.q=v;apply(true);},160);});
$('sort').addEventListener('change',function(){st.sort=this.value;apply(true);});
$('where').addEventListener('change',function(){st.where=this.value;apply(true);});
$('cty').addEventListener('change',function(){st.cty=this.value;apply(true);});
$('qual').addEventListener('change',function(){st.q2=this.value;apply(true);});
function renderCty(){var c={};DATA.forEach(function(r){if(r.cen){c[r.cen]=c[r.cen]||[r.cru,0];c[r.cen][1]++;}});var ks=Object.keys(c).sort(function(a,b){return c[b][1]-c[a][1];});$('cty').innerHTML='<option value="">'+(st.lang==='ru'?'Все страны':'All countries')+'</option>'+ks.map(function(k){return '<option value="'+esc(k)+'"'+(st.cty===k?' selected':'')+'>'+esc(st.lang==='ru'?c[k][0]:k)+' ('+c[k][1]+')</option>';}).join('');}
$('pager-top').addEventListener('click',goPage);$('pager-bot').addEventListener('click',goPage);
$('grid').addEventListener('click',function(e){var b=e.target.closest('.card');if(b)openD(+b.dataset.i);});
$('lostgrid').addEventListener('click',function(e){var b=e.target.closest('.card');if(b)openD(+b.dataset.i);});

/* detail */
var cur=null,dlg=$('dlg');
function openD(i){
  var r=DATA[i];cur=i;
  $('d-fig').innerHTML=bigSrc(r)?'<button type="button" class="zoomable" id="d-zoom-img" aria-label="'+(st.lang==='ru'?'Приблизить':'Zoom in')+'"><img src="'+bigSrc(r)+'" alt="'+esc(title(r))+'"></button>':'<div class="nophoto"><p class="np-t">'+(gone(r)?tt().noPhotoT:(st.lang==='ru'?'Фотография пока не найдена':'No photograph found yet'))+'</p><p class="np-x" id="d-npx">'+esc(gone(r)?fateLine(r):tt().extantNo)+'</p></div>';
  $('d-w').textContent=r.w?('W'+r.w):tt().noW;
  $('d-title').textContent=title(r);
  var a=alt(r);$('d-alt').textContent=a.join(' · ');$('d-alt').hidden=!a.length;
  var dl=[];
  if(r.y)dl.push([tt().year,r.y]);
  if(r.dim&&!/\?/.test(r.dim))dl.push([tt().dims,r.dim+' '+tt().dimsU]);
  dl.push([tt().where,place(r)]);
  if(country(r))dl.push([st.lang==='ru'?'Страна':'Country',country(r)]);
  if(r.sale)dl.push([st.lang==='ru'?'Продажа':'Sale',(st.lang==='ru'?'последняя известная: ':'last known: ')+r.sale]);
  if(r.note==='same215')dl.push([st.lang==='ru'?'Примечание':'Note',st.lang==='ru'?'По каталогу это та же картина, что W215':'Per the catalogue, the same painting as W215']);
  if(r.same)dl.push([st.lang==='ru'?'Примечание':'Note',st.lang==='ru'?'По каталогу Вильденштейна это та же картина, что W'+r.same+'; изображение и сведения — оттуда':'Per the Wildenstein catalogue this is the same painting as W'+r.same+'; image and details are taken from there']);
  if(r.whole)dl.push([st.lang==='ru'?'Изображение':'Image',st.lang==='ru'?'Показана вся композиция целиком, частью которой является эта панель (см. W'+r.whole+')':'The photo shows the whole composition this panel belongs to (see W'+r.whole+')']);
  if(false&&r.w==='96')dl.push([st.lang==='ru'?'Примечание':'Note',st.lang==='ru'?'Номер есть в каталоге; распознать запись из скана не удалось — см. том II':'The number exists in the catalogue; the scanned entry could not be read — see volume II']);
  if(r.w)dl.push([tt().cat,'Wildenstein '+r.w+(vol(r)?' ('+(st.lang==='ru'?'т. ':'vol. ')+vol(r)[0]+')':'')]);
  if(r.ser&&r.ser.length)dl.push([tt().series,r.ser.map(function(s){return st.lang==='ru'?SERN[s][1]:SERN[s][2];}).join(', ')]);
  if(px(r))dl.push([st.lang==='ru'?'Изображение':'Image',nf(r.hi?r.hi.w:r.iw)+' × '+nf(r.hi?r.hi.h:r.ih)+' px · '+srcName(r)]);
  $('d-dl').innerHTML=dl.map(function(x){return '<dt>'+x[0]+'</dt><dd>'+esc(x[1])+'</dd>';}).join('');
  var L=[];
  if(origUrl(r))L.push('<a href="'+origUrl(r)+'" target="_blank" rel="noopener">'+(st.lang==='ru'?'Оригинал в полном размере':'Full-size original')+'</a>');
  if(r.hi)L.push('<a href="'+r.hi.page+'" target="_blank" rel="noopener">'+(st.lang==='ru'?'Страница в музее':'Museum page')+'</a>');
  if(r.img)L.push('<a href="'+filePage(r.img)+'" target="_blank" rel="noopener">'+tt().commons+'</a>');
  if(r.q)L.push('<a href="https://www.wikidata.org/wiki/'+esc(r.q)+'" target="_blank" rel="noopener">'+tt().wikidata+'</a>');
  if(vol(r))L.push('<a href="https://archive.org/details/'+vol(r)[1]+'" target="_blank" rel="noopener">'+(st.lang==='ru'?'Каталог-резоне, том ':'Catalogue raisonné, vol. ')+vol(r)[0]+'</a>');
  if(r.wp)L.push('<a href="https://en.wikipedia.org/wiki/'+encodeURIComponent(r.wp)+'" target="_blank" rel="noopener">'+tt().wiki+'</a>');
  $('d-links').innerHTML=L.join('');
  renderHist(r);if(!HIST)loadHist(function(){if(cur===r.i){renderHist(r);var x=$('d-npx');if(x)x.textContent=fateLine(r);}});
  var p=st.list.indexOf(r);$('d-prev').disabled=p<=0;$('d-next').disabled=p<0||p>=st.list.length-1;
  if(!dlg.open)dlg.showModal();
  var h=r.w?'w'+r.w:'i'+r.i;if(location.hash!=='#'+h)history.replaceState(null,'','#'+h);
}
function renderHist(r){
  var h=H(r),o='',ru=st.lang==='ru'?0:1;
  if(h){
    if(h.nw)o+='<h3>'+(st.lang==='ru'?'Новое о картине':'Recent news')+'</h3><p>'+esc(h.nw[ru])+' <a href="'+h.nw[2]+'" target="_blank" rel="noopener">'+esc(h.nw[3])+'</a></p>';
    if(h.fx&&hasImg(r))o+='<h3>'+tt().hFate+'</h3><p>'+esc(h.fx[ru])+'</p>';
    if(h.h&&h.h[ru])o+='<h3>'+tt().hHist+'</h3><p>'+esc(h.h[ru])+'</p>';
    if(h.nt)o+='<h3>'+(st.lang==='ru'?'Версия':'A possibility')+'</h3><p>'+esc(h.nt[ru])+'</p>';
    if(h.p&&h.p[ru]&&h.p[ru].length)o+='<h3>'+tt().hProv+'</h3><ol class="prov">'+h.p[ru].map(function(x){return '<li>'+esc(x)+'</li>';}).join('')+'</ol>';
    if(o)o+='<p class="hsrc">'+tt().hSrc+'</p>';
  }
  $('d-hist').innerHTML=o;$('d-hist').hidden=!o;
}
function step(d){var p=st.list.indexOf(DATA[cur]);var n=st.list[p+d];if(n)openD(n.i);}
$('d-prev').addEventListener('click',function(){step(-1);});
$('d-next').addEventListener('click',function(){step(1);});
$('d-close').addEventListener('click',function(){dlg.close();});
dlg.addEventListener('click',function(e){if(e.target===dlg)dlg.close();});
dlg.addEventListener('close',function(){history.replaceState(null,'',location.pathname+location.search);});
dlg.addEventListener('keydown',function(e){if(e.key==='ArrowLeft')step(-1);if(e.key==='ArrowRight')step(1);});

/* zoom */
var osd=null;
function openZoom(r){
  if(!window.OpenSeadragon){window.open(origUrl(r),'_blank','noopener');return;}
  var z=$('zoom');if(!z.open)z.showModal();
  var ts;
  if(loc(r)&&loc(r)[2])ts={type:'image',url:ZOOM_BASE+lk(r)+'.webp'};
  else if(r.hi&&r.hi.iiif&&(r.hi.src!=='aic'||!r.img))ts=r.hi.iiif+'/info.json';
  else if(r.hi&&r.hi.url)ts={type:'image',url:r.hi.url};
  else ts={type:'image',url:thumb(r.img,Math.min(r.iw||2560,3840))};
  if(osd){osd.destroy();osd=null;}
  osd=OpenSeadragon({element:$('zoom-view'),tileSources:ts,prefixUrl:'vendor/openseadragon/images/',showNavigator:true,navigatorPosition:'BOTTOM_RIGHT',maxZoomPixelRatio:2,visibilityRatio:1,crossOriginPolicy:false,gestureSettingsMouse:{clickToZoom:true}});
  $('zoom-title').textContent=title(r)+(r.w?' · W'+r.w:'');
  $('zoom-close').focus();
}
function closeZoom(){if($('zoom').open)$('zoom').close();}
$('zoom').addEventListener('close',function(){if(osd){osd.destroy();osd=null;}});
$('zoom-close').addEventListener('click',closeZoom);

$('d-fig').addEventListener('click',function(e){if(e.target.closest('#d-zoom-img')&&cur!=null)openZoom(DATA[cur]);});

/* language */
function setLang(l){
  st.lang=l;document.documentElement.lang=l;
  try{localStorage.setItem('monet-lang',l);}catch(e){}
  [].forEach.call(document.querySelectorAll('[data-i18n]'),function(el){var k=el.getAttribute('data-i18n');if(typeof T[l][k]==='string')el.textContent=T[l][k];});
  var qo=$('qual').options;qo[0].text=tt().qAll;qo[1].text=tt().qHi;qo[2].text=tt().qImg;qo[3].text=tt().qScan;qo[4].text=tt().qNone;
  $('csv').textContent=tt().csv1;$('csv2').textContent=tt().csv2;
  $('q').placeholder=tt().ph;$('d-close').setAttribute('aria-label',tt().close);
  document.title=l==='ru'?'Клод Моне. Каталог картин':'Claude Monet. Catalogue of Paintings';
  $('lang-ru').setAttribute('aria-pressed',String(l==='ru'));$('lang-en').setAttribute('aria-pressed',String(l==='en'));
  $('upd').textContent=(l==='ru'?'Данные собраны: ':'Data collected: ')+'25.09.2026';
  renderFacts();renderChips();renderTimeline();renderCty();apply(false);
  if(dlg.open&&cur!=null)openD(cur);
}
$('lang-ru').addEventListener('click',function(){setLang('ru');});
$('lang-en').addEventListener('click',function(){setLang('en');});

setLang(st.lang);
/* deep link */
var h=location.hash.slice(1);
function openHash(){var h=location.hash.slice(1);if(!h)return;var r=null;if(h[0]==='w')r=DATA.filter(function(x){return 'w'+x.w===h;})[0];else if(h[0]==='i')r=DATA[+h.slice(1)];if(r&&cur!==r.i)openD(r.i);}
window.addEventListener('hashchange',openHash);
if(h){var r=null;if(h[0]==='w')r=DATA.filter(function(x){return 'w'+x.w===h;})[0];else if(h[0]==='i')r=DATA[+h.slice(1)];if(r)openD(r.i);}
})();
