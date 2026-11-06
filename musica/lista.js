/* Canciones del juego. Suenan al azar, sin repetir la misma dos veces seguidas.
   Para añadir una: copia el mp3 en esta carpeta (nombre en minúsculas, sin espacios ni acentos)
   y súbelo a GitHub. En la web publicada se detecta sola; esta lista sirve de reserva. */
(function(){
  var CANCIONES=[
    'kart-eso.mp3',
    'kart-eso-2.mp3',
    'barquillos.mp3',
    'la-cancion-del-pirata.mp3',
    'la-felicidad-de-la-vida.mp3'
  ];
  var s=document.currentScript&&document.currentScript.src||'',b=s.slice(0,s.lastIndexOf('/')+1);
  var L=window.MUSICA=CANCIONES.map(function(n){return b+encodeURIComponent(n);});
  /* En GitHub Pages: busca más mp3 en la carpeta y los añade */
  var m=location.hostname.match(/^([^.]+)\.github\.io$/),r=location.pathname.split('/')[1];
  if(!m||!r||!window.fetch)return;
  try{var c=sessionStorage.getItem('musica.extra');if(c){JSON.parse(c).forEach(function(n){var u=b+encodeURIComponent(n);if(L.indexOf(u)<0)L.push(u);});return;}}catch(e){}
  fetch('https://api.github.com/repos/'+m[1]+'/'+r+'/contents/musica').then(function(x){return x.ok?x.json():[];}).then(function(a){
    var n=(a||[]).map(function(f){return f.name;}).filter(function(n){return /\.mp3$/i.test(n);});
    try{sessionStorage.setItem('musica.extra',JSON.stringify(n));}catch(e){}
    n.forEach(function(x){var u=b+encodeURIComponent(x);if(L.indexOf(u)<0)L.push(u);});
  }).catch(function(){});
})();
