
class DS {
  constructor() {
      this.baseurl = './src/ajax.php';
  }

  getElements() {
      const request = {
          'action': 'getElements'
      };
      return $.getJSON(this.baseurl, request);
  };

  download(element, filter) {
      const request = {
          'action': 'download',
          element,
          filter
      };
      return $.getJSON(this.baseurl, request);
  };

  unlinkFile(url) {
      const request = {
          'action': 'unlinkFile',
          url
      };
      return $.post(this.baseurl, request);
  };
}

const ds = new DS();

const getElements = function() {
  return new Promise((resolve, reject) => {
      ds.getElements().always(function(data){
          if (data.responseJSON) {
              reject({'message': data.responseJSON.message});
          }
          resolve(data);
      });
  });
};

console.log(getElements());



SATELITE = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
  maxZoom: 20,
  subdomains:['mt0','mt1','mt2','mt3'],
  attribution: '<a href="http://www.consigsa.com"> Desenvolvido </b>por Consig</a>'
});

TERRAIN = L.tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',{
  maxZoom: 20,
  subdomains:['mt0','mt1','mt2','mt3'],
  attribution: '<a href="http://www.consigsa.com"> Desenvolvido </b>por Consig</a>'
});

//var map = L.map('map').setView([51.505, -0.09], 13);

//SATELITE.addTo(map);


//////////

var map = L.map('map').setView([-22.9532, -43.27315], 13);
//Centraliza layer na tela, ignora o zoom da variável map
//map.fitBounds(layer.getBounds());


// Adicionando baseLayer default no mapa
map.addLayer(SATELITE);




var fotoIcon = L.icon({

  iconUrl: './src/img/camera-icon-2235488.png',
  iconSize:     [30, 20],
  iconAnchor:   [12, 20],
  popupAnchor:  [-3, -15]
});

// add markers with popup info
function onEachFeature_pontos(feature, layer) {
  // TODO 
}


var geojsonFloresta = L.geoJson(floresta).addTo(map);
var geoJsonPontos = L.geoJson(pontos, {
  // Função de popup com dados do geoJson
  onEachFeature: onEachFeature_pontos,
  // Altera o ícone de um geoJson
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {icon: fotoIcon});
  }
}).bindPopup(function (layer) {
  return layer.feature.properties.nome;
  }).addTo(map);

// Adicionando as variáveis aos controles no mapa
var baseMaps = {
  'Satélite' : SATELITE,
  'Terreno' : TERRAIN,
};
var overlayMaps = {
  'Floresta da Tijuca' : geojsonFloresta,
  'Pontos turísticos'  : geoJsonPontos
};


// Adicionando os Layers no controle de camadas
L.control.layers(baseMaps, overlayMaps).addTo(map);
