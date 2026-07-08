import { renderSidebar } from "./utils/sidebar.js";
import { players } from "../data/players.js";

let substitutes = [];

document.addEventListener('DOMContentLoaded', () => {
  renderSidebar();
});

function getPosition(position) {
  let playerPosition;
  let playerCategory;

      switch (position) {
        case 1:
          playerPosition = 'GK';
          playerCategory = 'Goalkeepers'; break;
        case 2:
          playerPosition = 'LB';
          playerCategory = 'Defenders'; break;
        case 3: 
          playerPosition = 'CB';
          playerCategory = 'Defenders'; break;
        case 5:
          playerPosition = 'RB';
          playerCategory = 'Defenders'; break;
        case 6:
          playerPosition = 'DM';
          playerCategory = 'Midfielders'; break;
        case 7: playerPosition = 'LW';
          playerCategory = 'Forwards'; break;
        case 8:playerPosition = 'AM';
          playerCategory = 'Midfielders'; break;
        case 9: playerPosition = 'CF';
          playerCategory = 'Forwards'; break;
        case 10: playerPosition = 'CM';
          playerCategory = 'Midfielders'; break;
        case 11: playerPosition = 'RW';
          playerCategory = 'Forwards'; break;
      };

  return {
    position: playerPosition,
    category: playerCategory,
  }
}

// function to select best players
function getTopPlayers(categoryName, count) {
  const category = players.find(cat => cat.category === categoryName);

  if (!category) return [];

  const sorted =  category.players
    .slice().sort((a, b) => {
      if (b.rating !== a.rating) {
        return b.rating - a.rating
      }
    });

    return {
        selected: sorted.slice(0, count).sort((a,b) => b.position - a.position),
        remaining: sorted.slice(count),
    }
}

let isNewUser = localStorage.getItem('userState') || 'true';

if (isNewUser === 'true') {
  renderStartingTeam();
  localStorage.setItem('userState', 'false');
} else {
  renderSquad();
}

localStorage.removeItem('userState');


// function to render new gamers
function renderStartingTeam() {
  const messages = [
    'You have been given a starting squad of 16 EPL players',
    'Goalkeepers',
    'Defenders',
    'Midfielders',
    'Forwards',
  ];

  let messageDisplay = document.querySelector('.js-messages');

  messageDisplay.classList.add('messages');
  messageDisplay.innerHTML = 'You have been given a team of 16 players to start with';
  let delay = 3000;

  setTimeout(() => {
    messageDisplay.innerHTML = '';
  }, delay);

  players.forEach((category) => {
    category.players.forEach((player) => {

      setTimeout(() => {

        // adding style class so that it only displays when timeout is running
        document.querySelector('.js-category').classList.add('category');

        // making the welcome popup to act as a cover when timeout starts
        messageDisplay.classList.add('messages-cover');
        
        // adjusting name font when length is big
        const nameClass = player.name.length > 8
        ? 'name-big' : '';

        const { position, category } = getPosition(player.position)

        document.querySelector('.js-first-squad').innerHTML = 
          `
            <div class="player">
              <img src="${player.image}" alt="" />
              <div class="player-details">
                <div class="name ${nameClass}">${player.name}</div>
                <div class = "player-info">
                  <div class= "position">${position}</div>
                  <div class="rating">${player.rating}</div>
                </div>
              </div>
            </div>
          `;  

          document.querySelector('.js-category').innerHTML = category;
        }, delay);

      delay += 1500;
    });
  });

  setTimeout(() => {
    messageDisplay.classList.remove('messages');
    document.querySelector('.js-category').classList.remove('category');
    document.querySelector('.js-first-squad').innerHTML = '';
    renderSquad();
  }, delay);
};



// generating squad HTML


function renderPlayers(categoryName, count, containerSelector) {
  const selectedPlayers = getTopPlayers(categoryName, count).selected;

  substitutes.push(getTopPlayers(categoryName,count).remaining);

  const container = document.querySelector(containerSelector);
  if (!container || selectedPlayers.length === 0) return;

  let html = '';
  selectedPlayers.forEach(player => {
    const { position } = getPosition(player.position);
    
    let addedClass = 'player-normal';
    if(player.rating >= 75 && player.rating < 80 ) {
        addedClass = 'player-rare';
    } else if(player.rating >= 80 && player.rating < 85 ) {
        addedClass = 'player-elite';
    } else if(player.rating >= 85 && player.rating < 90 ) {
        addedClass = 'player-legendary';
    } else if(player.rating >= 90) {
        addedClass = 'player-superstar';
    } 

    html += `
      <div class="player ${addedClass}">
        <img src="${player.image}" alt="" />
        <div class="player-details">
          <div class="name">${player.name}</div>
          <div class="player-info">
            <div class="position ${addedClass}">${position}</div>
            <div class="rating ${addedClass}">${player.rating}</div>
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

function renderSquad() {
  renderPlayers('goalkeepers', 1, '.js-goalkeeper-row');
  renderPlayers('defenders', 4, '.js-defenders-row');
  renderPlayers('midfielders', 3, '.js-midfielders-row');
  renderPlayers('forwards', 3, '.js-forwards-row');

  document.querySelector('.js-manager-section').innerHTML = `
    <!-- manager -->
    <div class="manager">
      <img src="data/images/manager_icon.png" alt="" />
      <div class="manager_details">
        <div class="name">Manager</div>
        <div class="xp">0 xp</div>
      </div>
    </div>

    <!-- formation details -->
    <div class="formation-details">
      <div class="team-name">Guler FC</div>
      <div class="formation">4-3-3</div>
      <div class="playstyle">Long ball counter</div>
    </div>
  `;

  document.querySelector('.js-button-container').innerHTML = `
    <button class="js-substitutes-btn substitutes-btn">Substitutes</button>
    <button class="formation-btn">Change Formation</button>
    <button class="auto-pick-btn">Auto Pick</button>
  `;

  document.querySelector('.js-squad').classList.add('squad');

  document.querySelector('hr').classList.add('hr-visible');
}

// substitutes

document.querySelector('.js-substitutes-btn').addEventListener('click', () => {
  document.querySelector('.substitutes-section').classList.toggle('active');
});

document.querySelector('.js-substitutes-close-btn').addEventListener('click', () => {
  document.querySelector('.substitutes-section').classList.toggle('active');
});

// rendering the remaining players as substitutes

substitutes.forEach((category) => {
  category.forEach((substitute) => {
    let addedClass = 'player-normal';
    if(substitute.rating >= 75 && substitute.rating < 80 ) {
        addedClass = 'player-rare';
    } else if(substitute.rating >= 80 && substitute.rating < 85 ) {
        addedClass = 'player-elite';
    } else if(substitute.rating >= 85 && substitute.rating < 90 ) {
        addedClass = 'player-legendary';
    } else if(substitute.rating >= 90) {
        addedClass = 'player-superstar';
    } 

    document.querySelector('.js-substitutes').innerHTML += `
      <div class="player ${addedClass}">
        <img src="${substitute.image}" alt="" />
        <div class="player-details">
          <div class="name">${substitute.name}</div>
          <div class="player-info">
            <div class="position ${addedClass}">${getPosition(substitute.position).position}</div>
            <div class="rating ${addedClass}">${substitute.rating}</div>
          </div>
        </div>
      </div>
    `;
  });
});

