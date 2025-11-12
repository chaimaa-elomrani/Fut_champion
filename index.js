const openAddPlayerModal = () => document.getElementById('addPlayerModal').classList.add('show');
const closeAddPlayerModal = () => document.getElementById('addPlayerModal').classList.remove('show');


const PlayerCard = document.querySelectorAll('.player-card').forEach(card => {
    card.addEventListener("click", () => {
        // get position from the card;
        const position = card.querySelector('.position-label').textContent.trim()

        // open player card
        openAddPlayerModal();

        const positionSelect = document.getElementById('positionSelect');
        // empty the select chija
        positionSelect.innerHTML = ``;

        // creat option lighadi ikon == option
        const option  = document.createElement('option');
        option.value = position;
        option.textContent = position;
        option.selected = true;
        positionSelect.append(option);
    })
});



function addPlayer(event) {
    event.preventDefault();
    alert('Player added successfully!');
    closeAddPlayerModal();
    event.target.reset();
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('addPlayerModal');
    if (event.target === modal) {
        modal.classList.remove('show');
    }
}

const positionLabels = document.querySelectorAll('.pitch .position-label');

positionLabels.forEach(e => {
    console.log(e.textContent);
})



        saveDataToLocalStorage(), 
        loadDataFromLocalStorage(),
        createPlayerFromForm(),
        addPlayer(), 
        editPlayer(), 
        deletePlayer(),
        renderPlayers(),
        setFormation(),
        getFormationPositions(), 
        arrangePlayersByFormation(),
        validatePlayerForm(),
        showFormError()