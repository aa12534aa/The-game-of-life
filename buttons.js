document.querySelector('.js-reset')
    .addEventListener('click', () => {
        if (!isRun && !stopedTimer) {
            resetMap();
        }
    })

document.querySelector('.js-button-start')
    .addEventListener('click', () => {
        if (!isRun) {
            startLife();
        let inputElement = document.getElementsByClassName('js-input')[0];
        inputElement.value = '';
        }
    })
document.querySelector('.js-input')
    .addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && !isRun) {
            startLife();
            let inputElement = document.getElementsByClassName('js-input')[0];
            inputElement.value = '';
        }
    })

let displayHTML = '';
for (let i = 0; i < mapSize; i++) {
    displayHTML += '\n<div class="line-of-grid">';
    for (let j = 0; j < mapSize; j++) {
        displayHTML += `
        <div class="field js-${i}-${j}"></div>
        `;
    }
    displayHTML += '\n</div>';
}
document.querySelector('.js-grid').innerHTML = displayHTML;

// Delegacja zdarzeń - nasłuchujemy kliknięć na całej siatce
document.querySelector('.js-grid')
    .addEventListener('click', function (event) {
        const clickedElement = event.target;
        if (clickedElement.classList.contains('field')) {
        // Pobieramy koordynaty pola z jego klas CSS
            const coordinates = clickedElement.className.match(/js-(\d+)-(\d+)/);
            if (coordinates) {
                const i = parseInt(coordinates[1]);
                const j = parseInt(coordinates[2]);
                
                creatingMap([String(i), String(j)]);
            }
        }
    });
console.log(displayHTML);