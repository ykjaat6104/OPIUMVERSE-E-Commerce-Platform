<?php
// PHP Development Server Configuration
// This file is used when running: php -S localhost:8000

// Set CORS headers for all requests
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

// Handle preflight OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Route API requests to appropriate PHP files
$request_uri = $_SERVER['REQUEST_URI'];
$path = parse_url($request_uri, PHP_URL_PATH);

// Remove leading slash and split path
$path_parts = explode('/', trim($path, '/'));

// Route to backend API files
if ($path_parts[0] === 'backend' && $path_parts[1] === 'api') {
    $api_path = implode('/', array_slice($path_parts, 1));
    $file_path = __DIR__ . '/' . $api_path . '.php';
    
    if (file_exists($file_path)) {
        include $file_path;
    } else {
        http_response_code(404);
        header('Content-Type: application/json');
        echo json_encode(['success' => false, 'message' => 'API endpoint not found']);
    }
} else {
    // For non-API requests, return 404
    http_response_code(404);
    echo "404 - Not Found";
}
?>
