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

  function showCatalogTabs() {
    let categoryTabs = document.querySelectorAll('.category-tab'),
        categoryTabsParent = document.querySelector('.catalog-tabs'),
        tables = document.querySelectorAll('.catalog-items');

    function hideTables() {
      tables.forEach(item => {
        item.style.display = 'none';
      });

      categoryTabs.forEach(item => {
        item.classList.remove('tab-active');
        item.classList.remove('active');

      });

      
    }

    function showTables(i = 0) {
      tables[i].style.display = 'table';
      categoryTabs[i].classList.add('active');
    }

    categoryTabsParent.addEventListener('click', (event) => {
      const target = event.target;

      if (target && target.classList.contains('category-tab')) {
        categoryTabs.forEach((item, i) => {
          if (target == item) {
            hideTables();
            showTables(i);
          }
        });
      }
    });

    hideTables();
    showTables();
  }


  searchInput();
  showBriefInfoSection('.user-row');
  showBriefInfoSection('.order-row');
  showCatalogTabs();
});