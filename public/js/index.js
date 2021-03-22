"use strict";

var kort= require('dawa-kort')
  , dawalautocomplete= require('./dawa-leaflet-autocomplete.js');

var map;

function getMap() {
  return map;
}

var options= {
  contextmenu: true,
  contextmenuWidth: 140,
  contextmenuItems: [
  // {
  //   text: 'Koordinater?',
  //   callback: visKoordinater
  // },
  {
    text: 'Adgangsadresse?',
    callback: kort.nærmesteAdgangsadresse(getMap)
  },
  {
    text: 'Bygning?',
    callback: kort.nærmesteBygning(getMap)
  },
  {
    text: 'Vej?',
    callback: kort.nærmesteVejstykke(getMap)
  },
  {
    text: 'Hvor?',
    callback: kort.hvor(getMap)
  }
  // {
  //   text: 'Kommune?',
  //   callback: visKommune
  // }, '-',{
  //   text: 'Centrer kort her',
  //   callback: centerMap
  // }
  ]
};

var token = 'd902ac31b1c3ff2d3e7f6aa7073c6c67';

function main() { 
  map= kort.viskort('map', token, options);
  dawalautocomplete.search().addTo(map);
  var center= kort.beregnCenter();
  map.setView(center,2);
}

main();
