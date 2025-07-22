<?php
header('Content-Type: application/json');

$file = 'status.txt';

if (file_exists($file)) {
    $status = trim(file_get_contents($file));
    if ($status !== 'active' && $status !== 'inactive') {
        $status = 'inactive';
    }
    echo json_encode(['status' => $status]);
} else {
    echo json_encode(['status' => 'inactive']);
}
?>