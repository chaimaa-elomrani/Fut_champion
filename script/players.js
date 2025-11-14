// ======================
// Constants
// ======================
const POSITIONS = ['GK', 'CBL', 'CBR', 'LB', 'RB', 'CM', 'CMR', 'CML', 'LW', 'RW', 'ST'];

const STAT_LABELS = {
  GK: {
    stats1: 'DIV', stats2: 'HAN', stats3: 'KIC',
    stats4: 'REF', stats5: 'SPE', stats6: 'POS'
  },
  PLAYER: {
    stats1: 'PAC', stats2: 'SHO', stats3: 'PAS',
    stats4: 'DRI', stats5: 'DEF', stats6: 'PHY'
  }
};

const STAT_FIELDS = {
  GK: ['diving', 'handling', 'kicking', 'reflexes', 'speed', 'positioning'],
  PLAYER: ['pace', 'shooting', 'passing', 'dribbling', 'defending', 'physical']
};

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

  static setPlayers(players) {
    this.set('players', players);
  }

  static getElevenPlayers() {
    return this.get('elevenPlayers') || [];
  }

  static setElevenPlayers(players) {
    this.set('elevenPlayers', players);
  }

  static getSquadPlayers() {
    return this.get('squadPlayers') || [];
  }

  static setSquadPlayers(players) {
    this.set('squadPlayers', players);
  }
}

// ======================
// Validation Manager
// ======================
class ValidationManager {
  static validateRating(value) {
    return /^(0?[1-9]|[1-9][0-9]|100)$/.test(value);
  }

  static validateText(value) {
    return /^[a-z A-Z]+$/.test(value);
  }

  static validateUrl(value) {
    return /^(https?:\/\/)/.test(value);
  }

  static validatePlayerData(data) {
    const errors = [];

    if (!data.position) errors.push('Position is required');
    if (!this.validateText(data.name)) errors.push('Invalid name');
    if (!this.validateUrl(data.photo)) errors.push('Invalid photo URL');
    if (!this.validateText(data.nationality)) errors.push('Invalid nationality');
    if (!this.validateUrl(data.flag)) errors.push('Invalid flag URL');
    if (!this.validateText(data.club)) errors.push('Invalid club name');
    if (!this.validateUrl(data.logo)) errors.push('Invalid logo URL');
    if (!this.validateRating(data.rating)) errors.push('Invalid rating');

    // Validate stats
    const statFields = data.position === 'GK' ? STAT_FIELDS.GK : STAT_FIELDS.PLAYER;
    statFields.forEach(field => {
      if (!this.validateRating(data[field])) {
        errors.push(`Invalid ${field}`);
      }
    });

    return errors;
  }
}

// ======================
// Player Card Renderer
// ======================
class PlayerCardRenderer {
  static getStatsHTML(player) {
    if (player.position === 'GK') {
      return this.renderGKStats(player);
    }
    return this.renderPlayerStats(player);
  }

  static renderGKStats(player) {
    return `
      <div class="h-full w-[50%] flex flex-col items-end text-xs">
        <div class="flex gap-2"><p>DIV</p><p>${player.diving}</p></div>
        <div class="flex gap-2"><p>HAN</p><p>${player.handling}</p></div>
        <div class="flex gap-2"><p>KIC</p><p>${player.kicking}</p></div>
      </div>
      <div class="h-full w-[50%] flex flex-col items-start text-xs">
        <div class="flex gap-2"><p>REF</p><p>${player.reflexes}</p></div>
        <div class="flex gap-2"><p>SPE</p><p>${player.speed}</p></div>
        <div class="flex gap-2"><p>POS</p><p>${player.positioning}</p></div>
      </div>
    `;
  }

  static renderPlayerStats(player) {
    return `
      <div class="h-full w-[50%] flex flex-col items-end text-xs">
        <div class="flex gap-2"><p>PAC</p><p>${player.pace}</p></div>
        <div class="flex gap-2"><p>SHO</p><p>${player.shooting}</p></div>
        <div class="flex gap-2"><p>PAS</p><p>${player.passing}</p></div>
      </div>
      <div class="h-full w-[50%] flex flex-col items-start text-xs">
        <div class="flex gap-2"><p>DRI</p><p>${player.dribbling}</p></div>
        <div class="flex gap-2"><p>DEF</p><p>${player.defending}</p></div>
        <div class="flex gap-2"><p>PHY</p><p>${player.physical}</p></div>
      </div>
    `;
  }

  static render(player) {
    return `
      <div class="w-full flex h-[55%]">
        <div class="w-[60%] h-full flex justify-end items-end">
          <div class="flex flex-col items-center justify-center mr-1">
            <p>${player.rating}</p>
            <p>${player.position}</p>
            <img class="h-6" src="${player.logo}" alt="">
          </div>
        </div>
        <div class="h-full w-full flex justify-center items-end">
          <div>
            <img class="h-24 w-16 relative right-4" src="${player.photo}" alt="">
          </div>
        </div>
      </div>
      <div class="w-full h-[45%] flex flex-col">
        <div class="w-full h-[30%] flex justify-center gap-2 items-center">
          <p>${player.name}</p>
          <img class="h-4" src="${player.flag}" alt="">
        </div>
        <div class="w-full h-full flex gap-8">
          ${this.getStatsHTML(player)}
        </div>
      </div>
    `;
  }
}

// ======================
// Player List Manager
// ======================
class PlayerListManager {
  constructor() {
    this.container = document.getElementById('players-container');
    this.filterSelect = document.getElementById('positions');
    this.players = StorageManager.getPlayers();
    this.setupEventListeners();
  }

  setupEventListeners() {
    this.filterSelect.addEventListener('change', () => {
      this.filterPlayers(this.filterSelect.value);
    });
  }

  render(players) {
    this.container.innerHTML = '';
    
    players.forEach(player => {
      const card = document.createElement('div');
      card.className = 'card flex flex-col justify-between items-center text-md cursor-pointer';
      card.innerHTML = PlayerCardRenderer.render(player);
      card.setAttribute('data-id', player.id);
      card.addEventListener('click', () => playerFormManager.show(player.id));
      this.container.appendChild(card);
    });
  }

  filterPlayers(position) {
    if (!position) {
      this.render(this.players);
    } else {
      const filtered = this.players.filter(p => p.position === position);
      this.render(filtered);
    }
  }

  refreshPlayers() {
    this.players = StorageManager.getPlayers();
    this.render(this.players);
  }
}

// ======================
// Form Card Preview Manager
// ======================
class FormCardPreview {
  constructor() {
    this.elements = {
      rate: document.getElementById('playerRateCard'),
      position: document.getElementById('playerPositionCard'),
      logo: document.getElementById('playerLogoCard'),
      image: document.getElementById('playerImageCard'),
      name: document.getElementById('playerNameCard'),
      flag: document.getElementById('playerFlagCard'),
      stats: Array.from({length: 6}, (_, i) => ({
        label: document.getElementById(`stats${i + 1}`),
        value: document.getElementById(`stats${i + 1}Area`)
      }))
    };
  }

  reset() {
    this.elements.position.innerText = 'POS';
    this.elements.rate.innerText = 'RT';
    this.elements.name.innerText = 'Player Name';
    this.elements.logo.setAttribute('src', '../img/unknown.png');
    this.elements.image.setAttribute('src', '../img/none.png');
    this.elements.image.className = 'w-full relative right-4';
    this.elements.flag.setAttribute('src', '../img/image.png');
    
    this.elements.stats.forEach(stat => {
      stat.label.innerText = 'STS';
      stat.value.innerText = 'XX';
    });
  }

  updatePosition(position) {
    this.elements.position.innerText = position;
    const labels = position === 'GK' ? STAT_LABELS.GK : STAT_LABELS.PLAYER;
    
    Object.keys(labels).forEach((key, index) => {
      this.elements.stats[index].label.innerText = labels[key];
    });
  }

  updateImage(url) {
    if (url) {
      this.elements.image.setAttribute('src', url);
      this.elements.image.className = 'w-24 relative right-4';
    } else {
      this.elements.image.setAttribute('src', '../img/none.png');
      this.elements.image.className = 'w-full relative right-4';
    }
  }

  updateField(field, value) {
    if (this.elements[field]) {
      if (field === 'logo' || field === 'flag') {
        this.elements[field].setAttribute('src', value || '../img/image.png');
      } else {
        this.elements[field].innerText = value || (field === 'rate' ? 'RT' : 'Player Name');
      }
    }
  }

  updateStat(index, value) {
    this.elements.stats[index - 1].value.innerText = value || 'XX';
  }
}

// ======================
// Stats Form Manager
// ======================
class StatsFormManager {
  constructor() {
    this.container = document.getElementById('stats-container');
    this.inputs = {};
  }

  renderInputs(position) {
    const isGK = position === 'GK';
    const labels = isGK ? STAT_LABELS.GK : STAT_LABELS.PLAYER;
    
    this.container.innerHTML = `
      <div class="w-full flex flex-col items-end gap-2">
        ${this.renderStatGroup([labels.stats1, labels.stats2, labels.stats3], [1, 2, 3])}
      </div>
      <div class="w-full flex flex-col gap-2">
        ${this.renderStatGroup([labels.stats4, labels.stats5, labels.stats6], [4, 5, 6])}
      </div>
    `;

    this.setupInputListeners();
  }

  renderStatGroup(labels, indices) {
    return labels.map((label, i) => `
      <div class="flex gap-2">
        <label for="stats${indices[i]}Input">${label}</label>
        <input id="stats${indices[i]}Input" class="w-12 text-center rounded-md" type="text">
      </div>
    `).join('');
  }

  setupInputListeners() {
    for (let i = 1; i <= 6; i++) {
      const input = document.getElementById(`stats${i}Input`);
      if (input) {
        this.inputs[`stats${i}`] = input;
        input.addEventListener('keyup', () => {
          let value = parseInt(input.value);
          if (value > 100) value = 100;
          if (value < 0) value = 0;
          if (!isNaN(value)) input.value = value;
          
          formCardPreview.updateStat(i, input.value);
        });
      }
    }
  }

  getValues(position) {
    const values = {};
    const fields = position === 'GK' ? STAT_FIELDS.GK : STAT_FIELDS.PLAYER;
    
    fields.forEach((field, index) => {
      values[field] = this.inputs[`stats${index + 1}`].value;
    });
    
    return values;
  }

  setValues(player) {
    const fields = player.position === 'GK' ? STAT_FIELDS.GK : STAT_FIELDS.PLAYER;
    
    fields.forEach((field, index) => {
      const input = this.inputs[`stats${index + 1}`];
      if (input) {
        input.value = player[field];
        formCardPreview.updateStat(index + 1, player[field]);
      }
    });
  }

  reset() {
    this.container.innerHTML = '<p class="text-[#ff0000]">Choose a Position</p>';
    this.inputs = {};
  }
}

// ======================
// Player Form Manager
// ======================
class PlayerFormManager {
  constructor() {
    this.modal = document.getElementById('modal');
    this.form = document.getElementById('addPlayerForm');
    this.modalTitle = document.getElementById('modal-title');
    this.deleteBtn = document.getElementById('delete-btn');
    this.submitBtn = document.getElementById('form-btn');
    this.alertBox = document.getElementById('alter');
    
    this.editMode = false;
    this.currentPlayerId = null;
    
    this.inputs = {
      position: document.getElementById('positionList'),
      name: document.getElementById('nameInput'),
      photo: document.getElementById('photoInput'),
      nationality: document.getElementById('nationalityInput'),
      flag: document.getElementById('flagInput'),
      club: document.getElementById('clubInput'),
      logo: document.getElementById('logoInput'),
      rating: document.getElementById('rateInput')
    };
    
    this.setupEventListeners();
  }

  setupEventListeners() {
    // Position change
    this.inputs.position.addEventListener('change', () => {
      const position = this.inputs.position.value;
      if (position) {
        formCardPreview.updatePosition(position);
        statsFormManager.renderInputs(position);
      } else {
        statsFormManager.reset();
        formCardPreview.updatePosition('POS');
      }
    });

    // Real-time preview updates
    this.inputs.photo.addEventListener('keyup', () => {
      formCardPreview.updateImage(this.inputs.photo.value);
    });

    this.inputs.name.addEventListener('keyup', () => {
      formCardPreview.updateField('name', this.inputs.name.value);
    });

    this.inputs.flag.addEventListener('keyup', () => {
      formCardPreview.updateField('flag', this.inputs.flag.value);
    });

    this.inputs.logo.addEventListener('keyup', () => {
      formCardPreview.updateField('logo', this.inputs.logo.value);
    });

    this.inputs.rating.addEventListener('keyup', () => {
      let value = parseInt(this.inputs.rating.value);
      if (value > 100) value = 100;
      if (value < 0) value = 0;
      if (!isNaN(value)) this.inputs.rating.value = value;
      
      formCardPreview.updateField('rate', this.inputs.rating.value);
    });

    // Form submission
    this.submitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.handleSubmit();
    });

    // Delete button
    this.deleteBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.handleDelete();
    });
  }

  show(playerId = null) {
    this.modal.style.display = 'flex';
    this.form.reset();
    formCardPreview.reset();
    statsFormManager.reset();
    
    this.editMode = !!playerId;
    this.currentPlayerId = playerId;
    
    if (playerId) {
      this.loadPlayer(playerId);
      this.modalTitle.innerText = 'Edit Player';
      this.submitBtn.innerText = 'Modify Player';
      this.deleteBtn.style.display = 'block';
    } else {
      this.modalTitle.innerText = 'Add New Player';
      this.submitBtn.innerText = 'Add Player';
      this.deleteBtn.style.display = 'none';
    }
  }

  hide() {
    this.modal.style.display = 'none';
  }

  loadPlayer(playerId) {
    const players = StorageManager.getPlayers();
    const player = players.find(p => p.id == playerId);
    
    if (!player) return;

    // Load basic info
    Object.keys(this.inputs).forEach(key => {
      this.inputs[key].value = player[key];
    });

    // Update preview
    formCardPreview.updatePosition(player.position);
    formCardPreview.updateImage(player.photo);
    formCardPreview.updateField('name', player.name);
    formCardPreview.updateField('flag', player.flag);
    formCardPreview.updateField('logo', player.logo);
    formCardPreview.updateField('rate', player.rating);

    // Load stats
    statsFormManager.renderInputs(player.position);
    statsFormManager.setValues(player);
  }

  getFormData() {
    const data = {
      position: this.inputs.position.value,
      name: this.inputs.name.value.trim(),
      photo: this.inputs.photo.value.trim(),
      nationality: this.inputs.nationality.value.trim(),
      flag: this.inputs.flag.value.trim(),
      club: this.inputs.club.value.trim(),
      logo: this.inputs.logo.value.trim(),
      rating: this.inputs.rating.value
    };

    // Add stats
    const stats = statsFormManager.getValues(data.position);
    return { ...data, ...stats };
  }

  showAlert() {
    this.alertBox.style.display = 'block';
    this.alertBox.classList.add('slide-right');
    
    setTimeout(() => {
      this.alertBox.classList.remove('slide-right');
      this.alertBox.style.display = 'none';
    }, 2000);
  }

  handleSubmit() {
    const data = this.getFormData();
    const errors = ValidationManager.validatePlayerData(data);

    if (errors.length > 0) {
      this.showAlert();
      return;
    }

    const players = StorageManager.getPlayers();
    
    if (this.editMode) {
      data.id = this.currentPlayerId;
      const index = players.findIndex(p => p.id == this.currentPlayerId);
      if (index !== -1) {
        players[index] = data;
        
        // Update in squad and eleven
        this.updateInAllLists(data);
      }
    } else {
      data.id = this.getNextId(players);
      players.push(data);
    }

    StorageManager.setPlayers(players);
    playerListManager.refreshPlayers();
    this.hide();
  }

  updateInAllLists(player) {
    // Update in squad players
    const squadPlayers = StorageManager.getSquadPlayers();
    const squadIndex = squadPlayers.findIndex(p => p.id == player.id);
    if (squadIndex !== -1) {
      squadPlayers[squadIndex] = player;
      StorageManager.setSquadPlayers(squadPlayers);
    }

    // Update in eleven players
    const elevenPlayers = StorageManager.getElevenPlayers();
    const elevenIndex = elevenPlayers.findIndex(p => p.id == player.id);
    if (elevenIndex !== -1) {
      elevenPlayers[elevenIndex] = player;
      StorageManager.setElevenPlayers(elevenPlayers);
    }
  }

  handleDelete() {
    if (!confirm('Are you sure you want to delete this player?')) return;

    const players = StorageManager.getPlayers();
    const filtered = players.filter(p => p.id != this.currentPlayerId);
    
    StorageManager.setPlayers(filtered);
    playerListManager.refreshPlayers();
    this.hide();
  }

  getNextId(players) {
    return players.reduce((max, p) => Math.max(max, p.id), 0) + 1;
  }
}

// ======================
// Initialize Data
// ======================
function initializeData() {
  if (!localStorage.getItem('players')) {
    fetch('../script/data.json')
      .then(response => response.json())
      .then(data => {
        StorageManager.setPlayers(data.players);
        playerListManager.refreshPlayers();
      })
      .catch(error => console.error('Error loading player data:', error));
  }
}

// ======================
// Initialize Application
// ======================
const formCardPreview = new FormCardPreview();
const statsFormManager = new StatsFormManager();
const playerFormManager = new PlayerFormManager();
const playerListManager = new PlayerListManager();

// Load initial data
initializeData();
playerListManager.render(StorageManager.getPlayers());

// Global function for opening modal
window.showModal = (playerId = null) => {
  playerFormManager.show(playerId);
};