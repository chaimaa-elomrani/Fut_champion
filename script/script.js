// ======================
// Constants and Configuration
// ======================
const POSITIONS = {
  GK: 'GK',
  CBL: 'CBL',
  CBR: 'CBR',
  LB: 'LB',
  RB: 'RB',
  CM: 'CM',
  CML: 'CML',
  CMR: 'CMR',
  LW: 'LW',
  RW: 'RW',
  ST: 'ST'
};

const GK_STATS = ['diving', 'handling', 'kicking', 'reflexes', 'speed', 'positioning'];
const PLAYER_STATS = ['pace', 'shooting', 'passing', 'dribbling', 'defending', 'physical'];

// ======================
// Storage Manager
// ======================
class StorageManager {
  static get(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  static set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static getPlayers() {
    return this.get('players') || [];
  }

  static getElevenPlayers() {
    return this.get('elevenPlayers') || [];
  }

  static getSquadPlayers() {
    return this.get('squadPlayers') || [];
  }

  static setPlayers(players) {
    this.set('players', players);
  }

  static setElevenPlayers(players) {
    this.set('elevenPlayers', players);
  }

  static setSquadPlayers(players) {
    this.set('squadPlayers', players);
  }
}

// ======================
// Player Card Renderer
// ======================
class PlayerCardRenderer {
  static renderGKStats(player) {
    return `
      <div class="flex flex-col">
        <div class="flex gap-1 leading-none"><p>DIV</p><p>${player.diving}</p></div>
        <div class="flex gap-1"><p>HAN</p><p>${player.handling}</p></div>
        <div class="flex gap-1 leading-none"><p>KIC</p><p>${player.kicking}</p></div>
      </div>
      <div class="flex flex-col">
        <div class="flex gap-1 leading-none"><p>REF</p><p>${player.reflexes}</p></div>
        <div class="flex gap-1"><p>SPE</p><p>${player.speed}</p></div>
        <div class="flex gap-1 leading-none"><p>POS</p><p>${player.positioning}</p></div>
      </div>
    `;
  }

  static renderPlayerStats(player) {
    return `
      <div class="flex flex-col">
        <div class="flex gap-1 leading-none"><p>PAC</p><p>${player.pace}</p></div>
        <div class="flex gap-1"><p>SHO</p><p>${player.shooting}</p></div>
        <div class="flex gap-1 leading-none"><p>PAS</p><p>${player.passing}</p></div>
      </div>
      <div class="flex flex-col">
        <div class="flex gap-1 leading-none"><p>DRI</p><p>${player.dribbling}</p></div>
        <div class="flex gap-1"><p>DEF</p><p>${player.defending}</p></div>
        <div class="flex gap-1 leading-none"><p>PHY</p><p>${player.physical}</p></div>
      </div>
    `;
  }

  static renderCard(player) {
    const isGK = player.position === POSITIONS.GK;
    const stats = isGK ? this.renderGKStats(player) : this.renderPlayerStats(player);

    return `
      <div class="w-full h-full grid grid-cols-2 items-center">
        <div class="mt-8 flex flex-col items-center justify-end w-full">
          <p>${player.rating}</p>
          <p>${player.position}</p>
          <img class="w-2 h-2" src="${player.logo}" alt="">
        </div>
        <div class="relative right-4 top-2">
          <img class="h-12 w-16" src="${player.photo}" alt="">
        </div>
      </div>
      <div class="w-full h-full flex flex-col justify-center mb-2">
        <div class="flex items-center justify-center gap-1 mt-[-10px]">
          <p>${player.name}</p>
          <img class="w-2 h-2" src="${player.flag}" alt="">
        </div>
        <div class="flex w-full justify-evenly text-[6px]">
          ${stats}
        </div>
      </div>
    `;
  }
}

// ======================
// Squad Manager
// ======================
class SquadManager {
  constructor() {
    this.elevenPlayers = StorageManager.getElevenPlayers();
    this.squadPlayers = StorageManager.getSquadPlayers();
    this.isTerrainMode = false;
  }

  displayTerrainPlayers() {
    this.elevenPlayers.forEach(player => {
      const cardElement = document.getElementById(player.position);
      if (cardElement) {
        cardElement.setAttribute('data-id', player.id);
        cardElement.innerHTML = PlayerCardRenderer.renderCard(player);
        cardElement.style.display = 'flex';
      }
    });
  }

  addPlayerToEleven(player) {
    const existingIndex = this.elevenPlayers.findIndex(p => p.position === player.position);
    
    if (existingIndex !== -1) {
      this.elevenPlayers[existingIndex] = player;
    } else {
      this.elevenPlayers.push(player);
    }
    
    StorageManager.setElevenPlayers(this.elevenPlayers);
    this.displayTerrainPlayers();
  }

  deletePlayer(playerId) {
    // Remove from squad
    this.squadPlayers = this.squadPlayers.filter(p => p.id != playerId);
    StorageManager.setSquadPlayers(this.squadPlayers);

    // Remove from eleven
    this.elevenPlayers = this.elevenPlayers.filter(p => p.id != playerId);
    StorageManager.setElevenPlayers(this.elevenPlayers);

    this.displayTerrainPlayers();
  }

  getPlayerById(playerId) {
    return this.squadPlayers.find(p => p.id == playerId);
  }
}

// ======================
// Modal Manager
// ======================
class ModalManager {
  constructor() {
    this.modal = document.getElementById('addToSquadModal');
    this.playersArea = document.getElementById('playersArea');
    this.positionSelect = document.getElementById('positions');
    this.searchInput = document.getElementById('searchPlayer');
    this.allPlayers = StorageManager.getPlayers();
    this.squadPlayers = StorageManager.getSquadPlayers();
    this.filteredPlayers = [];
    this.currentPosition = null;
  }

  show(position = null) {
    this.modal.style.display = 'flex';
    this.currentPosition = position;
    squadManager.isTerrainMode = !!position;

    if (position) {
      this.positionSelect.style.display = 'none';
      this.searchInput.style.display = 'none';
      this.filteredPlayers = this.squadPlayers.filter(p => p.position === position);
    } else {
      this.positionSelect.style.display = 'block';
      this.searchInput.style.display = 'block';
      this.filteredPlayers = this.getAvailablePlayers();
      this.setupEventListeners();
    }

    this.renderPlayers();
  }

  hide() {
    this.modal.style.display = 'none';
  }

  getAvailablePlayers() {
    const squadIds = this.squadPlayers.map(p => p.id);
    return this.allPlayers.filter(p => !squadIds.includes(p.id));
  }

  renderPlayers() {
    if (this.filteredPlayers.length === 0) {
      this.playersArea.innerHTML = '<p class="text-[#ff0000]">NO PLAYER WITH THIS POSITION OR NAME</p>';
      return;
    }

    this.playersArea.innerHTML = this.filteredPlayers.map(player => `
      <div onclick="handlePlayerSelection(${player.id})" class="w-2/5 bg-[#161A1D] h-2/5 flex gap-4 rounded-md cursor-pointer">
        <div class="h-full w-[40%] flex justify-center">
          <img class="h-16 w-16" src="${player.photo}" alt="">
        </div>
        <div class="h-4/5 w-[60%] flex flex-col justify-evenly">
          <p>${player.name}</p>
          <p>${player.rating}</p>
          <p>${player.position}</p>
        </div>
      </div>
    `).join('');
  }

  setupEventListeners() {
    this.positionSelect.addEventListener('change', () => {
      const position = this.positionSelect.value;
      this.filteredPlayers = position 
        ? this.getAvailablePlayers().filter(p => p.position === position)
        : this.getAvailablePlayers();
      this.renderPlayers();
    });

    this.searchInput.addEventListener('keyup', () => {
      const searchTerm = this.searchInput.value.trim().toUpperCase();
      this.filteredPlayers = this.getAvailablePlayers().filter(p => 
        p.name.toUpperCase().includes(searchTerm)
      );
      this.renderPlayers();
    });
  }
}

// ======================
// Reserve List Manager
// ======================
class ReserveListManager {
  constructor() {
    this.modal = document.getElementById('modal');
    this.playersList = document.getElementById('players-list');
    this.modalTitle = document.getElementById('modal-title');
  }

  show() {
    this.modal.style.display = 'block';
    this.modalTitle.innerText = 'All Players';
    this.render(StorageManager.getSquadPlayers());
  }

  hide() {
    this.modal.style.display = 'none';
  }

  render(players) {
    this.playersList.innerHTML = players.map(player => `
      <div class="w-[40%] bg-[#161A1D] h-[90px] flex gap-4 rounded-md">
        <div class="h-full w-[40%] flex justify-center">
          <img class="h-16 w-16" src="${player.photo}" alt="">
        </div>
        <div class="h-4/5 w-[60%] flex flex-col justify-evenly">
          <p>${player.name}</p>
          <p>${player.rating}</p>
          <p>${player.position}</p>
        </div>
        <div class="m-4 cursor-pointer" onclick="handlePlayerDeletion(${player.id})">
          <i class="fa-solid fa-trash" style="color: #bc2f2f;"></i>
        </div>
      </div>
    `).join('');
  }
}

// ======================
// Ehandling  the players section
// ======================
function handlePlayerSelection(playerId) {
  const squadPlayers = StorageManager.getSquadPlayers();
  const allPlayers = StorageManager.getPlayers();
  
  if (squadManager.isTerrainMode) {
    const player = squadPlayers.find(p => p.id == playerId);
    if (player) {
      squadManager.addPlayerToEleven(player);
      modalManager.hide();
    }
  } else {
    const player = allPlayers.find(p => p.id == playerId);
    if (player) {
      squadPlayers.push(player);
      StorageManager.setSquadPlayers(squadPlayers);
      modalManager.squadPlayers = squadPlayers;
      modalManager.filteredPlayers = modalManager.getAvailablePlayers();
      modalManager.renderPlayers();
    }
  }
}

function handlePlayerDeletion(playerId) {
  if (confirm('Are you sure you want to delete this player?')) {
    squadManager.deletePlayer(playerId);
    reserveListManager.render(StorageManager.getSquadPlayers());
  }
}

function showAddToSquadModal(position = null) {
  modalManager.show(position);
}

function showAllPlayersListl() {
  reserveListManager.show();
}

// ======================
// Card Click Handlers
// ======================
function setupCardClickHandlers() {
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const position = card.getAttribute('id');
      if (position && POSITIONS[position]) {
        showAddToSquadModal(position);
      }
    });
  });
}

// ======================
// Initialize Application
// ======================
const squadManager = new SquadManager();
const modalManager = new ModalManager();
const reserveListManager = new ReserveListManager();

// Display initial squad
squadManager.displayTerrainPlayers();
setupCardClickHandlers();