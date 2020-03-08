<?php
try{
  $action = empty($_GET['action']) ? '' : $_GET['action'];
  switch( $action ){
      case 'getConfig':
        $base_url = './data/cliente1/geojson/';
        $string   = file_get_contents('./data/cliente1/config.json');
        $json     = json_decode($string);
        foreach($json->layers as $key => $layer) {
          if(!$layer->fileName || !file_exists($url = $base_url . $layer->fileName)) {
            throw new Exception('Erro ao buscar arquivos...');
          }
          $json->layers[$key]->data = file_get_contents($base_url . $layer->fileName);
        }
        echo json_encode($json);
      break;
      case 'template':
        throw new Exception('mensagem de erro');
      break;
      default:
          throw new Exception('The action or it is empty or do not exists');
  }
}
catch( Exception $e ){
  header('HTTP/1.1 412 Server side validation');
  header('Content-Type: application/json; charset=UTF-8');
  echo json_encode(['m' => $e->getMessage()]);
}