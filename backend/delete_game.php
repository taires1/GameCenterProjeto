<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: DELETE');
header('Content-Type: application/json');

include 'db.php'; 

$id = $_GET['id'];

if (!$id) {
    echo json_encode(['error' => 'ID inválido']);
    exit;
}

$sql = "DELETE FROM games WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    echo json_encode(['message' => 'Jogo excluído com sucesso!']);
} else {
    echo json_encode(['error' => 'Erro ao excluir o jogo.']);
}

$stmt->close();
$conn->close();
?>
