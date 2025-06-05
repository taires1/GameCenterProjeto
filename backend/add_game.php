<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");


if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

$host = 'localhost';
$user = 'root';
$pass = '';
$db = 'gamecenter';

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(['error' => 'Erro na conexão com o banco']);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

file_put_contents('debug_post.txt', print_r($data, true));

if (
    !isset($data['name']) || trim($data['name']) === '' ||
    !isset($data['genre']) || trim($data['genre']) === '' ||
    !isset($data['platform']) || trim($data['platform']) === '' ||
    !isset($data['developer']) || trim($data['developer']) === '' ||
    !isset($data['imageUrl']) || trim($data['imageUrl']) === ''
) {
    http_response_code(400);
    echo json_encode(['error' => 'Dados inválidos']);
    exit;
}

$name = $conn->real_escape_string($data['name']);
$genre = $conn->real_escape_string($data['genre']);
$platform = $conn->real_escape_string($data['platform']);
$developer = $conn->real_escape_string($data['developer']);
$imageUrl = $conn->real_escape_string($data['imageUrl']);

$sql = "INSERT INTO games (name, genre, platform, developer, image_url) VALUES ('$name', '$genre', '$platform', '$developer', '$imageUrl')";

if ($conn->query($sql) === TRUE) {
    http_response_code(201);
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Falha ao inserir no banco']);
}

$conn->close();
?>
