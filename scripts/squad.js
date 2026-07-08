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
        
        // adjusting name font when length is big
        const nameClass = player.name.length > 8
        ? 'name-big' : '';

        let position
        switch (player.position) {
          case 1: position = 'GK';
          break;
          case 2: position = 'RB';
          break;
          case 3: position = 'CB';
          break;
          case 5: position = 'LB';
          break;
          case 6: position = 'DM';
          break;
          case 7: position = 'LW';
          break;
          case 8: position = 'AM';
          break;
          case 9: position = 'CF';
          break;
          case 10: position = 'CM';
          break;
          case 11: position = 'RW';
          break;
        }

        document.querySelector('.js-squad').innerHTML = 
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
      }, 1000 * player.id) 
    )
  })
}
