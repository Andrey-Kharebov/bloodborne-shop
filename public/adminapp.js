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



  // Order info change inputs

  function adminOrderChangeUserInputs() {
    const changeBtn = document.querySelector('#edit'),
      inputSec = document.querySelector('.plate-user-info');

    if (changeBtn) {
      changeBtn.addEventListener('click', (event) => {
        inputSec.classList.toggle('change-active');
        if (inputSec.classList.contains('change-active')) {
          inputSec.classList.remove('change-unactive');
          inputSec.querySelectorAll('input').forEach(i => {
            i.disabled = false;
          });
          if (inputSec.querySelector('select')) {
            inputSec.querySelector('select').disabled = false;
          }
  
          event.target.textContent = 'check';
        } else {
          inputSec.classList.add('change-unactive');
          inputSec.querySelectorAll('input').forEach(i => {
            i.disabled = true;
          });
          if (inputSec.querySelector('select')) {
            inputSec.querySelector('select').disabled = true;
          }
  
          event.target.textContent = 'edit';
        }
      });
    }
  }

  function adminOrderChangeOrderItemInputs() {
    const changeBtn = document.querySelectorAll('#row-edit');
    if (changeBtn) {
      changeBtn.forEach(item => {
        item.addEventListener('click', (event) => {
          let properRow = event.target.parentElement.parentElement.parentElement;
          let postBtn = properRow.querySelector('button');
          properRow.classList.toggle('change-active');
          if (properRow.classList.contains('change-active')) {
            properRow.classList.remove('change-unactive');
            properRow.querySelectorAll('input').forEach(i => {
              i.disabled = false;
            });
            if (properRow.querySelector('select')) {
              properRow.querySelector('select').disabled = false;
            }
            event.target.style.display = 'none';
            postBtn.style.display = 'block';
          } else {
            properRow.classList.add('change-unactive');
            properRow.querySelectorAll('input').forEach(i => {
              i.disabled = true;
            });
            if (properRow.querySelector('select')) {
              properRow.querySelector('select').disabled = true;
            }
  
            event.target.style.display = 'block';
            event.target.textContent = 'edit';
            postBtn.style.display = 'none';
          }
        });
      });
    }
  }










  adminOrderChangeUserInputs();
  adminOrderChangeOrderItemInputs();
  searchInput();
  showBriefInfoSection('.user-row');
  showBriefInfoSection('.order-row');
  showCatalogTabs();
});