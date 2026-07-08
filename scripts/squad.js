import { renderSidebar } from "./utils/sidebar.js";
import { players } from "../data/players.js";

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

  return category.players
    .slice().sort((a, b) => {
      if (b.rating !== a.rating) {
        return b.rating - a.rating
      }
    })
    .slice(0, count).sort((a,b) => {
      return b.position - a.position;
    })
}

let isNewUser = localStorage.getItem('userState') || 'true';

if (isNewUser === 'true') {
  renderStartingTeam();
  localStorage.setItem('userState', 'false');
}

// localStorage.removeItem('userState');


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

  }, delay);
};



// generating squad HTML

function renderPlayers(categoryName, count, containerSelector) {
  const selectedPlayers = getTopPlayers(categoryName, count);
  const container = document.querySelector(containerSelector);

  if (!container || selectedPlayers.length === 0) return;

  let html = '';

  selectedPlayers.forEach(player => {
    const { position } = getPosition(player.position);

    html += `
      <div class="player">
        <img src="${player.image}" alt="" />
        <div class="player-details">
          <div class="name">${player.name}</div>
          <div class="player-info">
            <div class="position">${position}</div>
            <div class="rating">${player.rating}</div>
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

renderPlayers('goalkeepers', 1, '.js-goalkeeper-row');
renderPlayers('defenders', 4, '.js-defenders-row');
renderPlayers('midfielders', 3, '.js-midfielders-row');
renderPlayers('forwards', 3, '.js-forwards-row');