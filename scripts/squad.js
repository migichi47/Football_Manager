import { renderSidebar } from "./utils/sidebar.js";
import { players } from "../data/players.js";

document.addEventListener('DOMContentLoaded', () => {
  renderSidebar();
});



let isNewUser = localStorage.getItem('userState') || 'true';

if (isNewUser === 'true') {
  renderStartingTeam();
  localStorage.setItem('userState', 'true');
}

// localStorage.removeItem('userState');


// function to render new gamers
function renderStartingTeam() {
  const messages = [
    // 'You have been given a starting squad of 16 EPL players',
    // 'Goalkeepers',
    // 'Defenders',
    // 'Midfielders',
    // 'Forwards',
  ];

  players.forEach((category) => {

    category.players.forEach((player) => 
      setTimeout(() => {
        
        const nameClass = player.name.length > 8
        ? 'name-big' : '';

        document.querySelector('.js-squad').innerHTML = 
          `
            <div class="player">
              <img src="${player.image}" alt="" />
              <div class="player_details">
                <div class="name ${nameClass}">${player.name}</div>
                <div class="xp">${player.rating}</div>
              </div>
            </div>
          `;
      }, 1000 * player.id) 
    )
  })
}
