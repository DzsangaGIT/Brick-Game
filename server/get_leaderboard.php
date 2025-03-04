<?php 

// CREATE DATABASE pong_game; 

// USE pong_game; 

// CREATE TABLE leaderboard (
//     id INT AUTO_INCREMENT PRIMARY KEY, 
//     player_name VARCHAR(255) NOT NULL, 
//     score INT NOT NULL 
// );

$conn = new mysqli("localhost", "root", "", "pong_game"); 
$result = $conn->query("SELECT * FROM leaderboard ORDER BY total_wins DESC, total_score DESC LIMIT 100"); 
$leaderboard = []; 

while ($row = $result->fetch_assoc()) { $leaderboard[] = $row; 
} 
echo json_encode($leaderboard); 
?>
