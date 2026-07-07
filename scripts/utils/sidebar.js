export function renderSidebar() {

  document.querySelector('.sidebar')
  .innerHTML = `
    <button class="close-btn">✖</button>
    <ul>
      <li><a href="/home.html">Home</a></li>
      <li><a href="/squad.html">Squad</a></li>
      <li><a href="#">Manager</a></li>
      <li><a href="#">Store</a></li>
      <li><a href="#">Missions</a></li>
      <li><a href="#">Notifications</a></li>
      <li><a href="#">Profile</a></li>
    </ul>
  `

  const menuBtn = document.querySelector('.menu-btn');
  const closeBtn = document.querySelector('.close-btn');
  const sidebar = document.querySelector('.sidebar');

  menuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('active');
  })

  closeBtn.addEventListener('click', () => {
    sidebar.classList.remove('active');
  })
}
