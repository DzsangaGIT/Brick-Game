const canvas = document.getElementById("gameCanvas"); 
const ctx = canvas.getContext("2d"); 

canvas.width = 1800; 
canvas.height = 800; 

 
const paddle1Img = new Image(); 
paddle1Img.src = "images/brick.jpg"; 
const paddle2Img = new Image(); 
paddle2Img.src = "images/brick.jpg"; 
const paddleWidth = 20, paddleHeight = 80, paddleSpeed = 6; 
let leftPaddle = { x: 10, y: canvas.height / 2 - 40, dy: 0 }; 
let rightPaddle = { x: canvas.width - 30, y: canvas.height / 2 - 40, dy: 0 }; 
let ball = { x: canvas.width / 2, y: canvas.height / 2, vx: 6, vy: 6, size: 10 }; 
let scoreLeft = 0, scoreRight = 0; 
const winningScore = 10; 
let winner = null;

document.addEventListener("keydown", (e) => { if (e.key === "w") leftPaddle.dy = -paddleSpeed;
    
    if (e.key === "s") leftPaddle.dy = paddleSpeed; 
    if (e.key === "ArrowUp") rightPaddle.dy = -paddleSpeed; 
    if (e.key === "ArrowDown") rightPaddle.dy = paddleSpeed; 
}); 
document.addEventListener("keyup", (e) => { 
    if (e.key === "w" || e.key === "s") leftPaddle.dy = 0; 
    if (e.key === "ArrowUp" || e.key === "ArrowDown") rightPaddle.dy = 0; 
});

function update() { 
    leftPaddle.y += leftPaddle.dy; 
    rightPaddle.y += rightPaddle.dy; 
    leftPaddle.y = Math.max(0, Math.min(canvas.height - paddleHeight, leftPaddle.y)); 
    rightPaddle.y = Math.max(0, Math.min(canvas.height - paddleHeight, rightPaddle.y)); 
    ball.x += ball.vx; ball.y += ball.vy; ű
    if (ball.y <= 0 || ball.y >= canvas.height - ball.size) 
    { 
        ball.vy *= -1; 
    } 
    if ((ball.x <= leftPaddle.x + paddleWidth && ball.y > leftPaddle.y && ball.y < leftPaddle.y + paddleHeight) || (ball.x >= rightPaddle.x - ball.size && ball.y > rightPaddle.y && ball.y < rightPaddle.y + paddleHeight)) 
    { 
        ball.vx *= -1; 
    } 
    if (ball.x <= 0) { 
        scoreRight++; resetBall(); ű
    } else if (ball.x >= canvas.width) { 
        scoreLeft++; resetBall(); 
    } 
    if (scoreLeft === winningScore) { 
        winner = "Player 1"; openWinnerModal(); 
    } 
    else if (scoreRight === winningScore) { 
        winner = "Player 2"; openWinnerModal(); 
    } 
    draw(); 
} 

function resetBall() { 
    ball.x = canvas.width / 2; 
    ball.y = canvas.height / 2; 
    ball.vx *= -1; } 
    
function draw() { 
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    ctx.drawImage(paddle1Img, leftPaddle.x, leftPaddle.y, paddleWidth, paddleHeight); 
    ctx.drawImage(paddle2Img, rightPaddle.x, rightPaddle.y, paddleWidth, paddleHeight); 
    ctx.beginPath(); ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2); 
    ctx.fillStyle = "white"; 
    ctx.fill(); 
    ctx.font = "20px Arial"; 
    ctx.fillStyle = "white"; 
    ctx.fillText(`Player 1: ${scoreLeft}`, 50, 30); 
    ctx.fillText(`Player 2: ${scoreRight}`, canvas.width - 150, 30); 
} 
        
function openWinnerModal() { 
    document.getElementById("winnerModal").style.display = "flex";
} 
        
function submitWinner() { 
    let name = document.getElementById("winnerName").value; 
    if (name) { fetch("server/save_score.php", { 
        method: "POST", headers: { 
            "Content-Type": "application/x-www-form-urlencoded" }, 
            body: `name=${encodeURIComponent(name)}&score=${winningScore}` 
        }).then(() => location.reload()); 
    } 
} 
        
setInterval(update, 1000 / 60);
