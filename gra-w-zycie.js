// deklaracja danych
const mapSize = 52;

let grid = [];
for (let i = 0; i < mapSize; i++) {
    let temp = [];
    for (let j = 0; j < mapSize; j++) {
        temp.push(0);
    }
    grid.push(temp);
}

let isRun = false;
let stopedTimer = true;
//


// kolorowanie planszy
function addColors() {
    for (let row = 0; row < mapSize; row++) {
        for (let col = 0; col < mapSize; col++) {
            let element = document.querySelector(`.js-${row}-${col}`);
            if (grid[row][col] === 0) {
                element.classList.remove('field-color');
            } else {
                element.classList.add('field-color');
            }
        }
    }
}
//


// tworzenie mapy, rozpoczynanie gry i resetowanie
function creatingMap(field) {
    console.log(field);
    if (!isRun) {
        grid[Number(field[0])][Number(field[1])]
        = Math.abs(grid[Number(field[0])][Number(field[1])] - 1);
    }
    addColors();
}

function startLife() {
    const inputElement = document.querySelector('.js-input');
    let lifeTime = Number(inputElement.value);
    const constlifetime = lifeTime;
    isRun = true;
    stopedTimer = false;
    let intervalId;
    intervalId = setInterval(() => {
        lifeTime = gameLogic(lifeTime ,constlifetime);
        if (lifeTime === 0) {
            isRun = false;
            clearInterval(intervalId);
        }
    }, 200);
}

function resetMap() {
    document.querySelector('.js-title')
        .innerHTML = 'Create your map';

    grid = [];
    for (let i = 0; i < mapSize; i++) {
        let temp = [];
        for (let j = 0; j < mapSize; j++) {
            temp.push(0);
        }
        grid.push(temp);
    }

    isRun = false;
    stopedTimer = true;
    lifeTime = 0;
    addColors();
}
//


// game logic
function gameLogic(lifeTime, constlifetime) {
    if (isRun && !stopedTimer) {
        let newGrid = JSON.parse(JSON.stringify(grid));
        for (let row = 0; row < mapSize; row++) {
            for (let col = 0; col < mapSize; col++) {
                if (grid[row][col] === 1) {
                    if (lookAround(newGrid, row, col) < 2 || lookAround(newGrid, row, col) > 3 ) {
                        grid[row][col] = 0;
                    }
                } else if (lookAround(newGrid, row, col) === 3) {
                    grid[row][col] = 1;
                }
            }
        }
        addColors();
        document.querySelector('.js-title')
            .innerHTML = `
            Life time ${constlifetime - lifeTime + 1}
            <button class='stop-button js-stop'>Stop</button>
            `;
        document.querySelector('.js-stop')
            .addEventListener('click', () => {
                if (!stopedTimer && isRun) {
                    stopedTimer = true;
                    document.querySelector('.js-stop')
                        .innerHTML = `Continue`;
                } else {
                    stopedTimer = false;
                    document.querySelector('.js-stop')
                        .innerHTML = `Stop`;
                }
            });

        lifeTime--;
    }
    return lifeTime;
}

function lookAround(newGrid, row, col) {
    let lifeAround = 0;
    let cord = [[-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1]];

    for (let i = 0; i < 8; i++) {
        if (newGrid[(row + cord[i][0] + mapSize) % mapSize][(col + cord[i][1] + mapSize) % mapSize] === 1) {
            lifeAround++;
        }
    }
    return lifeAround;
}
//