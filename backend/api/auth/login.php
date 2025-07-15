<?php
require_once '../config/database.php';

setCORSHeaders();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse(false, 'Method not allowed', null, 405);
}

$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    sendResponse(false, 'Invalid JSON data', null, 400);
}

$email = trim($input['email'] ?? '');
$password = $input['password'] ?? '';

if (empty($email) || empty($password)) {
    sendResponse(false, 'Email and password are required', null, 400);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    sendResponse(false, 'Invalid email format', null, 400);
}

try {
    $database = new Database();
    $db = $database->connect();
    
    $query = "SELECT id, name, email, password, phone, created_at FROM users WHERE email = :email";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':email', $email);
    $stmt->execute();
    
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$user) {
        sendResponse(false, 'Invalid email or password', null, 401);
    }
    
    if (!password_verify($password, $user['password'])) {
        sendResponse(false, 'Invalid email or password', null, 401);
    }
    
    // Generate JWT token
    $token = generateJWT($user['id'], $user['email']);
    
    // Remove password from user data
    unset($user['password']);
    
    sendResponse(true, 'Login successful', [
        'token' => $token,
        'user' => $user
    ]);
    
} catch(Exception $e) {
    sendResponse(false, 'Login failed: ' . $e->getMessage(), null, 500);
}
?>
