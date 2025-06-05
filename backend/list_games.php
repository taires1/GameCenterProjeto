<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$host = 'localhost';
$user = 'root';
$pass = '';
$db = 'gamecenter';

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die(json_encode(['error' => 'Database connection failed']));
}


$sql = "SELECT * FROM games ORDER BY id ASC";
$result = $conn->query($sql);

$games = [];

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $row['imageUrl'] = $row['image_url']; 
        unset($row['image_url']); 
        $games[] = $row;
    }
}

echo json_encode($games);

$conn->close();
?>
