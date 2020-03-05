<?php
try{
  $action = empty($_GET['action']) ? '' : $_GET['action'];
  switch( $action ){
      case 'getElements':
        $responce = [
          'data' => [1567, 3462, 3351]
      ];
      echo json_encode($responce);
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