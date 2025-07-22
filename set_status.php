<?php
header('Content-Type: application/json');

$password = 'frcontrol24';

if ($_POST['password'] !== $password) {
    echo json_encode(['success' => false, 'error' => 'Invalid password']);
    exit;
}

$file = 'status.txt';
$current = 'inactive';
if (file_exists($file)) {
    $current = trim(file_get_contents($file));
}

$new = $current === 'active' ? 'inactive' : 'active';
file_put_contents($file, $new);

echo json_encode(['success' => true, 'status' => $new]);
?>