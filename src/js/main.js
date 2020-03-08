(function(){  

  const DS = function() {
    baseurl = './src/ajax.php';

    const getConfig = function() {
        const request = {
            'action': 'getConfig',
        };
        return $.getJSON(baseurl, request);
    };

    const getLayer = function(layer) {
      const request = {
          'action': 'getLayer',
          layer
      };
      return $.getJSON(baseurl, request);
    };

    return {
      getConfig,
      getLayer
    }
}();

  const Manager = function() {
    
    let config = {};
    let overlayMaps = {};
    

    const setConfig = function() {
      return new Promise((resolve, reject) => {
          DS.getConfig().always(function(data){
              if (data.responseJSON) {
                  reject({'message': data.responseJSON.message});
              }
              resolve(data);
          });
      });
    };

    const setOverlayMaps = function() {
      return new Promise((resolve, reject) => {
          DS.getConfig().always(function(data){
              if (data.responseJSON) {
                  reject({'message': data.responseJSON.message});
              }
              resolve(data);
          });
      });
    };

    const init = () => {
      Manager.setConfig().then((data) => {
        Manager.config = data;
        
        // TODO - Buscar os dados e fazer set nas variáveis
      });
    }

    return {
      init,
      setConfig,
      overlayMaps,
      setOverlayMaps
    }

  }();
  
  
  Manager.init();

})();

//# sourceURL=main.js