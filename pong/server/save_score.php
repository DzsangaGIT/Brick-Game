<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

$conn = new mysqli("localhost", "root", "", "pong_game");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = trim($_POST["name"]);
    $score = intval($_POST["score"]);

    if (empty($name)) {
        die("Error 69: üres név.");
    }

    echo "Received name: $name, score: $score <br>";


    $stmt = $conn->prepare("INSERT INTO leaderboard (player_name, total_wins, total_score) 
                            VALUES (?, 1, ?) 
                            ON DUPLICATE KEY UPDATE total_wins = total_wins + 1, total_score = total_score + ?");

    if (!$stmt) {
        die("SQL Error: " . $conn->error);
    }

    $stmt->bind_param("sii", $name, $score, $score);


    if ($stmt->execute()) {
        echo "adatok sikeresen mentve!";
    } else {
        die("Error: " . $stmt->error);
    }

    $stmt->close();
}

$conn->close();
?>
