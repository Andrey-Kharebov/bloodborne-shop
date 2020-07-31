window.addEventListener('DOMContentLoaded', () => {
  // Search input showing

  function searchInput() {
    const searchIcon = document.querySelector('.search-icon'),
      searchInput = document.querySelector('#search'),
      searchClose = document.querySelector('.close-icon');

    searchIcon.addEventListener('click', (event) => {
      searchInput.style.display = 'block';
      searchClose.style.display = 'block';
    });

    searchClose.addEventListener('click', (event) => {
      searchInput.style.display = 'none';
      searchClose.style.display = 'none';
    });
  }

  function showBriefInfoSection(rowSelector) {
    const userRow = document.querySelectorAll(rowSelector);

    userRow.forEach(item => {
      item.addEventListener('click', (event) => {
        event.currentTarget.nextElementSibling.classList.toggle('show');
      });
    });
  }

  searchInput();
  showBriefInfoSection('.user-row');
  showBriefInfoSection('.order-row');
});