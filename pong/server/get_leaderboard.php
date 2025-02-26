<?php 
$conn = new mysqli("localhost", "root", "", "pong_game"); 
$result = $conn->query("SELECT * FROM leaderboard ORDER BY total_wins DESC, total_score DESC LIMIT 100"); 
$leaderboard = []; 

while ($row = $result->fetch_assoc()) { $leaderboard[] = $row; 
} 
echo json_encode($leaderboard); 
?>