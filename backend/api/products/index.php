<?php
require_once '../config/database.php';

setCORSHeaders();

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    sendResponse(false, 'Method not allowed', null, 405);
}

try {
    $database = new Database();
    $db = $database->connect();
    
    // Get query parameters
    $category = $_GET['category'] ?? '';
    $search = $_GET['search'] ?? '';
    $min_price = $_GET['min_price'] ?? 0;
    $max_price = $_GET['max_price'] ?? 10000;
    $sort_by = $_GET['sort_by'] ?? 'name';
    $limit = $_GET['limit'] ?? 50;
    $offset = $_GET['offset'] ?? 0;
    
    // Build query
    $query = "SELECT * FROM products WHERE 1=1";
    $params = [];
    
    if (!empty($category)) {
        $query .= " AND category = :category";
        $params[':category'] = $category;
    }
    
    if (!empty($search)) {
        $query .= " AND (name LIKE :search OR description LIKE :search)";
        $params[':search'] = '%' . $search . '%';
    }
    
    $query .= " AND price BETWEEN :min_price AND :max_price";
    $params[':min_price'] = $min_price;
    $params[':max_price'] = $max_price;
    
    // Add sorting
    switch ($sort_by) {
        case 'price_low':
            $query .= " ORDER BY price ASC";
            break;
        case 'price_high':
            $query .= " ORDER BY price DESC";
            break;
        case 'rating':
            $query .= " ORDER BY rating DESC";
            break;
        case 'newest':
            $query .= " ORDER BY created_at DESC";
            break;
        default:
            $query .= " ORDER BY name ASC";
    }
    
    $query .= " LIMIT :limit OFFSET :offset";
    
    $stmt = $db->prepare($query);
    
    // Bind parameters
    foreach ($params as $key => $value) {
        $stmt->bindValue($key, $value);
    }
    $stmt->bindValue(':limit', (int)$limit, PDO::PARAM_INT);
    $stmt->bindValue(':offset', (int)$offset, PDO::PARAM_INT);
    
    $stmt->execute();
    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Get total count for pagination
    $countQuery = "SELECT COUNT(*) as total FROM products WHERE 1=1";
    if (!empty($category)) {
        $countQuery .= " AND category = :category";
    }
    if (!empty($search)) {
        $countQuery .= " AND (name LIKE :search OR description LIKE :search)";
    }
    $countQuery .= " AND price BETWEEN :min_price AND :max_price";
    
    $countStmt = $db->prepare($countQuery);
    foreach ($params as $key => $value) {
        if ($key !== ':limit' && $key !== ':offset') {
            $countStmt->bindValue($key, $value);
        }
    }
    $countStmt->bindValue(':min_price', $min_price);
    $countStmt->bindValue(':max_price', $max_price);
    $countStmt->execute();
    $total = $countStmt->fetch(PDO::FETCH_ASSOC)['total'];
    
    sendResponse(true, 'Products retrieved successfully', [
        'products' => $products,
        'total' => $total,
        'limit' => $limit,
        'offset' => $offset
    ]);
    
} catch(Exception $e) {
    sendResponse(false, 'Failed to retrieve products: ' . $e->getMessage(), null, 500);
}
?>
