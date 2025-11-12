 function openAddPlayerModal() {
            document.getElementById('addPlayerModal').classList.add('show');
        }

        function closeAddPlayerModal() {
            document.getElementById('addPlayerModal').classList.remove('show');
        }

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
              showFormError(),