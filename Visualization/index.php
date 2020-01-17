<!DOCTYPE html>
<html>

<head>
  <title>Store Profits - API - Sytze Westerdijk</title>
  <!-- Grab the Chart library used -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.min.js"></script>
  <link rel="stylesheet" type="text/css" href="style.css">
</head>

<body>
  <div class="wrapper">
    <h1>Profits per Store</h1>
    <h2>Amount of profit made selling sport products organised by storeID</h2>
    <?php

    // Validate the result from the $json to the schema.json saved locally to check if the data is correct, otherwise return the appropiate error.

    require_once 'vendor/autoload.php';

    use JsonSchema\Validator;
    use JsonSchema\Constraints\Constraint;

    $json = file_get_contents('http://localhost:3000/sales_fact/json');
    $config = json_decode($json);
    $validator = new Validator;
    $validator->validate(
      $config,
      (object) ['$ref' => 'file://' . realpath('schema.json')],
      Constraint::CHECK_MODE_APPLY_DEFAULTS
    );

    if ($validator->isValid()) {
      echo "JSON validates OK\n";
    } else {
      echo "JSON validation errors:\n";
      foreach ($validator->getErrors() as $error) {
        print_r($error);
      }
    }
    ?>
    <h3>Using JSON :</h3>
    <canvas id="myChart" width="1600" height="900"></canvas>
    </br>

    <?php
    
    // Validate the result from the $xml to the schema.xml saved locally to check if the data is correct, otherwise return the appropiate error based on global errors.

    function libxml_display_error($error)
    {
      $return = "<br/>\n";
      switch ($error->level) {
        case LIBXML_ERR_WARNING:
          $return .= "<b>Warning $error->code</b>: ";
          break;
        case LIBXML_ERR_ERROR:
          $return .= "<b>Error $error->code</b>: ";
          break;
        case LIBXML_ERR_FATAL:
          $return .= "<b>Fatal Error $error->code</b>: ";
          break;
      }
      $return .= trim($error->message);
      if ($error->file) {
        $return .=    " in <b>$error->file</b>";
      }
      $return .= " on line <b>$error->line</b>\n";

      return $return;
    }

    function libxml_display_errors()
    {
      $errors = libxml_get_errors();
      foreach ($errors as $error) {
        print libxml_display_error($error);
      }
      libxml_clear_errors();
    }

    // Enable user error handling
    libxml_use_internal_errors(true);

    $xml = new DOMDocument();
    $xml->load('http://localhost:3000/sales_fact/xml');

    if (!$xml->schemaValidate('schema.xsd')) {
      print '<b>DOMDocument::schemaValidate() Generated Errors!</b>';
      libxml_display_errors();
    } else {
      print 'XML validates OK'; 
    }

    ?>
    <h3>Using XML :</h3>
    <canvas id="myChart2" width="1600" height="900"></canvas>
  </div>
  <script src="consumer.js"></script>
</body>

</html>