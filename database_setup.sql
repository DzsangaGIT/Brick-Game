CREATE DATABASE IF NOT EXISTS pong_game;

USE pong_game;

CREATE TABLE IF NOT EXISTS leaderboard (
    id INT AUTO_INCREMENT PRIMARY KEY,
    player_name VARCHAR(255) NOT NULL UNIQUE,
    total_wins INT DEFAULT 0,
    total_score INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO leaderboard (player_name, total_wins, total_score) VALUES
('Player1', 5, 50),
('Player2', 3, 30)
ON DUPLICATE KEY UPDATE total_wins = total_wins, total_score = total_score;
