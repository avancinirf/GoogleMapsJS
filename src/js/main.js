(function(){

    const $popupImg = $('.popup-img');


    // $('#map').on('click', '.popup-img', showImage);
    //
    //
    // function showImage() {
    //     // Abrir um modal ou slideshow com a url abaixo.
    //     $(this).attr('src');
    // }


    function mostraDados(e) {
        var layer = e.target;
        // mostraTexto(layer.feature.properties.setor, layer.feature.properties.nome);
        mostraTexto('Nome', 'Ricardo');
    }

    function onEachFeature(feature, layer) {
        function onEachFeature(feature, layer) {
            layer.on({
                mouseover: highlightFeature,
                mouseout: resetHighlight,
                click: mostraDados
            });
        }
    }

    var fotoIcon = L.icon({
        iconUrl: '../src/img/camera.svg',
        iconSize:     [30, 20],
        iconAnchor:   [12, 20],
        popupAnchor:  [-3, -15]
    });



    // Base Maps
    var googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
        maxZoom: 20,
        subdomains:['mt0','mt1','mt2','mt3'],
    });

    var googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
        maxZoom: 20,
        subdomains:['mt0','mt1','mt2','mt3']
    });

    var googleTerrain = L.tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',{
        maxZoom: 20,
        subdomains:['mt0','mt1','mt2','mt3']
    });

    var baseMaps = {
        'Google' : googleSat,
        'Sttreet View' : googleStreets,
        'Terreno' : googleTerrain
    };


    // // Overlay Maps
    // var dataPontos = L.geoJson(pontos, {
    //     // Altera o ícone de um geoJson
    //     pointToLayer: function (feature, latlng) {
    //         return L.marker(latlng, {icon: fotoIcon});
    //     },
    //     onEachFeature: onEachFeature
    // }).bindPopup(function (layer) {
    //     return "<p style='font-size:16px; font-family: cursive;'><b>Nome: </b>"+layer.feature.properties.Field2+"</p>";
    // });

    // var dataFotos = L.geoJson(fotos, {
    //     // Altera o ícone de um geoJson
    //     pointToLayer: function (feature, latlng) {
    //         return L.marker(latlng, {icon: fotoIcon});
    //     },
    //     onEachFeature: onEachFeature
    // }).bindPopup(function (layer) {
    //     return "<p style='font-size:16px; font-family: cursive;'><b>Nome: </b>"+layer.feature.properties.Field2+"</p>";
    // });

    // Overlay Maps
    /*
    var dataPontos = L.geoJson(pontos, {
        // Altera o ícone de um geoJson
        pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {icon: fotoIcon});
        }
    }).bindPopup(function (layer) {
        return "<p style='font-size:16px; font-family: cursive;'><b>Nome: </b>"+layer.feature.properties.Field2+"</p>";
    });
    */

    // This will be run when L.geoJSON creates the point layer from the GeoJSON data.
    function createCircleMarker( feature, latlng ){
        // Change the values of these options to change the symbol's appearance
        let options = {
            radius: 4,
            fillColor: "#f1990f",
            color: "black",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.6
        };
        return L.circleMarker( latlng, options );
    }

    var dataFotos = L.geoJson(fotos, {
        // Altera o ícone de um geoJson
        pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {icon: fotoIcon});
        },
        onEachFeature: onEachFeature
    }).bindPopup(function (layer) {
        const info = layer.feature.properties;
        return `
            <label class='popup-label'><b>Nome: </b> ${info.Field2}</label>
            <a><img src='src/data/victor3/fotos/${info.url}' class='popup-img mx-auto d-block'
            data-toggle='modal' data-target='#modal-full-img'></a>
        `;
    }, {'className' : 'customPopup'});

    var dataPontos = L.geoJSON( pontos, { pointToLayer: createCircleMarker });
    var dataCurvaNivel = L.geoJson(curvaNivel);
    var dataDrenagem = L.geoJson(drenagem, {
        style: function (feature) {
            return {
                weight: 3,
                dashArray: '5, 5'
            }
        },
    });
    var dataEstradas = L.geoJson(estradas, {
        style: function (feature) {
            return {
                color: "white",
                weight: 1.5
            }
        },
    });
    var dataPerimetro = L.geoJson(perimetro, {
        style: function (feature) {
            return {
                fillColor: "red",
                color: "red",
                weight: 2,
                opacity: 1,
                fillOpacity: 0.1
            }
        }
    });
    var overlayMaps = {
        'Fotos': dataFotos,
        'Pontos' : dataPontos,
        'Curva de nível' : dataCurvaNivel,
        'Drenagem' : dataDrenagem,
        'Perimetro' : dataPerimetro,
        'Estradas' : dataEstradas
    };


    // Map settings
    // var map = L.map('map').setView([-21.933702, -43.158822], 16);
    var map = L.map('map');
    map.fitBounds(dataPerimetro.getBounds()); // Define a posição e zoom pelo perimetro

    dataFotos.addTo(map);
    dataDrenagem.addTo(map);
    dataPerimetro.addTo(map);
    dataPontos.addTo(map);
    dataEstradas.addTo(map);
    map.addLayer(googleSat); // Add google satelite as default

    L.control.layers(baseMaps, overlayMaps).addTo(map);

})();

//# sourceURL=main.js