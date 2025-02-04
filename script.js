const canvas001 = document.getElementById("MainCanvas");
const context001 = canvas001.getContext("2d");
const countInput = document.getElementById("count_input");

let playerX = 9, playerY = 4;
let playerAngle = 0; // 視点の向き（ラジアン）
const moveSpeed = 0.2;
let increaseCount = 10;

countInput.value = increaseCount;

var worldArray = [
    [1, 1, 1, 1, 1, 1, 0, 0, 0, 1],
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1]
];

const RectWidth = canvas001.width / worldArray[0].length;
const RectHeight = canvas001.height / worldArray.length;

setInterval(tick, 100);

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
        playerAngle -= Math.PI / 8;
    } else if (event.key === "ArrowRight") {
        playerAngle += Math.PI / 8;
    } else if (event.key === "ArrowUp") {
        let newX = playerX + Math.cos(playerAngle) * moveSpeed;
        let newY = playerY + Math.sin(playerAngle) * moveSpeed;
        if (worldArray[Math.floor(newY)][Math.floor(newX)] === 0) {
            playerX = newX;
            playerY = newY;
        }
    } else if (event.key === "ArrowDown") {
        let newX = playerX - Math.cos(playerAngle) * moveSpeed;
        let newY = playerY - Math.sin(playerAngle) * moveSpeed;
        if (worldArray[Math.floor(newY)][Math.floor(newX)] === 0) {
            playerX = newX;
            playerY = newY;
        }
    }
});

countInput.addEventListener("input", () => {
    increaseCount = parseInt(countInput.value) || 10;
});

function tick() {
    context001.clearRect(0, 0, canvas001.width, canvas001.height);
    
    for (let x = 0; x < canvas001.width; x += increaseCount) {
        let rayAngle = playerAngle + (x / canvas001.width - 0.5) * Math.PI / 3;
        let rayX = playerX, rayY = playerY;
        let rayDX = Math.cos(rayAngle) * 0.1;
        let rayDY = Math.sin(rayAngle) * 0.1;

        let distance = 0;
        while (distance < 20) {
            rayX += rayDX;
            rayY += rayDY;
            distance += 0.1;
            
            let mapX = Math.floor(rayX);
            let mapY = Math.floor(rayY);
            if (mapX >= 0 && mapX < worldArray[0].length && mapY >= 0 && mapY < worldArray.length) {
                if (worldArray[mapY][mapX] === 1) {
                    break;
                }
            } else {
                break;
            }
        }
        
        let wallHeight = (canvas001.height / 2) / distance;
        context001.fillRect(x, (canvas001.height / 2) - wallHeight, increaseCount, wallHeight * 2);
    }
}
