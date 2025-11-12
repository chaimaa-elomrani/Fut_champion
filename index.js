const openAddPlayerModal = (position) => { 
    const modal = document.getElementById('addPlayerModal')
    modal.classList.add('show')

    // reset the form every time we open the model
    const form = modal.querySelector('form');
    form.reset();

    const positionSelect = document.getElementById('positionSelect');
    // empty the select chija
    positionSelect.innerHTML = ``;

    // creat option lighadi ikon == option
    const option  = document.createElement('option');
    option.value = position;
    option.textContent = position;
    option.selected = true;
    positionSelect.append(option);
};
const closeAddPlayerModal = () => document.getElementById('addPlayerModal').classList.remove('show');


const PlayerCard = document.querySelectorAll('.player-card').forEach(card => {
    card.addEventListener("click", () => {
        // get position from the card;
        const position = card.querySelector('.position-label').textContent.trim()
        openAddPlayerModal(position);
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


const addPlayer = () => {
    // ana hna db
}, 

        saveDataToLocalStorage(), 
        loadDataFromLocalStorage(),
        createPlayerFromForm(),
        editPlayer(), 
        deletePlayer(),
        renderPlayers(),
        setFormation(),
        getFormationPositions(), 
        arrangePlayersByFormation(),
        validatePlayerForm(),
        showFormError()