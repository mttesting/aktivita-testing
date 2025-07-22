<?php
$file = 'stav.txt';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = file_get_contents('php://input');
    if ($data === 'Pracuje' || $data === 'Neaktivní') {
        file_put_contents($file, $data);
        echo 'OK';
    } else {
        http_response_code(400);
        echo 'Neplatný stav';
    }
} else {
    if (file_exists($file)) {
        echo file_get_contents($file);
    } else {
        echo 'Pracuje';
    }
}
?>
