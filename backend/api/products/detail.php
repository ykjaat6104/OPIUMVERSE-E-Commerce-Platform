<?php
require_once '../config/database.php';

setCORSHeaders();

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    sendResponse(false, 'Method not allowed', null, 405);
}

$product_id = $_GET['id'] ?? null;

if (!$product_id) {
    sendResponse(false, 'Product ID is required', null, 400);
}

try {
    $database = new Database();
    $db = $database->connect();
    
    $query = "SELECT * FROM products WHERE id = :id";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':id', $product_id);
    $stmt->execute();
    
    $product = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$product) {
        sendResponse(false, 'Product not found', null, 404);
    }
    
    sendResponse(true, 'Product retrieved successfully', $product);
    
} catch(Exception $e) {
    sendResponse(false, 'Failed to retrieve product: ' . $e->getMessage(), null, 500);
}
?>
