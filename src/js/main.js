var map = L.map('map').setView([-22.9532, -43.27315], 13);
//Centraliza todo layer escolhido (municipiosLayer) na tela, ignora o zoom da variável map
//map.fitBounds(municipiosLayer.getBounds());


// Adicionando imagem de satélite
// Adição da camada do Google Maps
var googleLayer = new L.Google();
var googleRoadmapLayer = new L.Google('ROADMAP');
var googleTerrainLayer = new L.Google('TERRAIN');
map.addLayer(googleLayer);

// Adicionando as variáveis aos controles no mapa
var baseMaps = {
  'Google' : googleLayer,
  'Google Roadmap' : googleRoadmapLayer,
  'Google Terrain' : googleTerrainLayer
};
//var overlayMaps = {
//  'Floresta da Tijuca' : geojson,
//  'Pontos turísticos'  : geoJsonLayer_pontos
//};


// Adicionando os Layers no controle de camadas
//L.control.layers(baseMaps, overlayMaps).addTo(map);
L.control.layers(baseMaps).addTo(map);
