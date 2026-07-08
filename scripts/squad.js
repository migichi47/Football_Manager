import { renderSidebar } from "./utils/sidebar.js";
import { players } from "../data/players.js";

document.addEventListener('DOMContentLoaded', () => {
  renderSidebar();
});



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

        let position;
        let playerCategory;

        switch (player.position) {
          case 1:
            position = 'GK';
            playerCategory = 'Goalkeepers'; break;
          case 2:
            position = 'RB';
            playerCategory = 'Defenders'; break;
          case 3: 
            position = 'CB';
            playerCategory = 'Defenders'; break;
          case 5:
            position = 'LB';
            playerCategory = 'Defenders'; break;
          case 6:
            position = 'DM';
            playerCategory = 'Midfielders'; break;
          case 7: position = 'LW';
            playerCategory = 'Forwards'; break;
          case 8:position = 'AM';
            playerCategory = 'Midfielders'; break;
          case 9: position = 'CF';
            playerCategory = 'Forwards'; break;
          case 10: position = 'CM';
            playerCategory = 'Midfielders'; break;
          case 11: position = 'RW';
            playerCategory = 'Forwards'; break;
        };

        switch (player.position) {
          case 1: ; break;
          case 2 || 3 || 5: ; break;
          case 6 || 8 || 10: playerCategory = 'Midfielders'; break;
          case 7 || 9 || 11: playerCategory = 'Forwards'; break;
        };

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

          document.querySelector('.js-category').innerHTML = playerCategory;
        }, delay);

      delay += 1500;
    });
  });

  setTimeout(() => {
    messageDisplay.classList.remove('messages');
    document.querySelector('.js-category').classList.remove('category');
    document.querySelector('.js-squad').innerHTML = '';

  }, delay);
};
