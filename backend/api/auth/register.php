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

$name = trim($input['name'] ?? '');
$email = trim($input['email'] ?? '');
$phone = trim($input['phone'] ?? '');
$password = $input['password'] ?? '';

// Validation
if (empty($name) || empty($email) || empty($phone) || empty($password)) {
    sendResponse(false, 'All fields are required', null, 400);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    sendResponse(false, 'Invalid email format', null, 400);
}

if (strlen($password) < 6) {
    sendResponse(false, 'Password must be at least 6 characters long', null, 400);
}

try {
    $database = new Database();
    $db = $database->connect();
    
    // Check if email already exists
    $checkQuery = "SELECT id FROM users WHERE email = :email";
    $checkStmt = $db->prepare($checkQuery);
    $checkStmt->bindParam(':email', $email);
    $checkStmt->execute();
    
    if ($checkStmt->fetch()) {
        sendResponse(false, 'Email already exists', null, 409);
    }
    
    // Hash password
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    
    // Insert new user
    $query = "INSERT INTO users (name, email, phone, password, created_at) VALUES (:name, :email, :phone, :password, NOW())";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':phone', $phone);
    $stmt->bindParam(':password', $hashedPassword);
    
    if ($stmt->execute()) {
        sendResponse(true, 'Registration successful');
    } else {
        sendResponse(false, 'Registration failed', null, 500);
    }
    
} catch(Exception $e) {
    sendResponse(false, 'Registration failed: ' . $e->getMessage(), null, 500);
}
?>
