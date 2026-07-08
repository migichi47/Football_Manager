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
    // 'Bernd Leno, Dean Henderson',
    // 'Defenders',
    // 'Ryan Giles, Leif Davis, Gabriel Gudmundsson, Milos Kerkez, Michael Keane',
    // 'Midfielders',
    // `Martin Zubimendi, Manuel Ugarte, Luke O'Nien, Xavi Simons, Frank Onyeka`,
    // 'Forwards',
    // 'Omar Marmoush, Morgan Rogers, Luis Sinisterra, Gustavo Nunes, Savinho',
  ];

  players.forEach((category) => {

    category.players.forEach((player) => 
      setTimeout(() => {
        document.querySelector('.js-squad').innerHTML = `
        <div>
          <div class="player">
            <img src="${player.image}" alt="" />
            <div class="player_details">
              <div class="name">${player.name}</div>
              <div class="xp">${player.rating}</div>
            </div>
          </div>
        </div>`
        }, 1000 * player.id)
      )

    setTimeout(() => {
      
    }, 2000);
  })
}
