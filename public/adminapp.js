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
      tables = document.querySelectorAll('.home-panel-table');


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


  // Admin order change inputs

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
          if (inputSec.querySelector('textarea')) {
            inputSec.querySelector('textarea').disabled = false;
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
          if (inputSec.querySelector('textarea')) {
            inputSec.querySelector('textarea').disabled = true;
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

  // Admin order change status

  function adminOrderChangeOrderStatus() {
    let changeStatusBtn = document.querySelector('.changeStatusBtn'),
      saveStatusBtn = document.querySelector('.saveStatusBtn'),
      statusSelect = document.querySelector('.admin-order-status-flex-item.select');

    changeStatusBtn.addEventListener('click', (event) => {
      console.log('boom');
      statusSelect.classList.toggle('select-active');
      if (statusSelect.classList.contains('select-active')) {
        statusSelect.style.display = 'block';
        saveStatusBtn.style.display = 'block';
        changeStatusBtn.textContent = 'Отмена';
      } else {
        statusSelect.style.display = 'none';
        saveStatusBtn.style.display = 'none';
        changeStatusBtn.textContent = 'Изменить';
      }
    });
  }

  // Admin user info in second plate 

  function userCardInfo() {
    let userRowSection = document.querySelectorAll('.user-row'),
      plateName = document.querySelector('.plate-user-name span'),
      plateCompletedOrders = document.querySelector('.plate-completed span'),
      plateRejectedOrders = document.querySelector('.plate-rejected span'),
      plateProcessingOrders = document.querySelector('.plate-processing span');

    userRowSection.forEach((item) => {
      item.addEventListener('click', (event) => {
        console.log(event.currentTarget);
        plateName.textContent = event.currentTarget.nextElementSibling.querySelector('.user-brief-info-contacts #name span').textContent;
        plateCompletedOrders.textContent = event.currentTarget.nextElementSibling.querySelector('#completed span').textContent
        plateRejectedOrders.textContent = event.currentTarget.nextElementSibling.querySelector('#rejected span').textContent
        plateProcessingOrders.textContent = event.currentTarget.nextElementSibling.querySelector('#processing span').textContent
      });
    });

  }

  // Admin catalog info in second plate

  function catalogCardInfo() {
    let productRowSection = document.querySelectorAll('.item-row'),
      plateName = document.querySelector('.plate-catalog-name span'),
      plateImg = document.querySelector('.plate-catalog-item-img'),
      platePrice = document.querySelector('.plate-price'),
      plateQuantity = document.querySelector('.plate-quantity');

    productRowSection.forEach((item) => {
      item.addEventListener('click', (event) => {
        plateName.textContent = event.currentTarget.querySelector('.productTitle').textContent;
        plateImg.innerHTML = `
          <img src='${event.currentTarget.querySelector('#imageUrl').value}' alt='${event.currentTarget.querySelector('.productTitle').textContent}'>
        `;
        platePrice.textContent = event.currentTarget.querySelector('.productPrice').textContent;
        plateQuantity.textContent = event.currentTarget.querySelector('.productQuantity').textContent;
      });
    });
  }


  // Show notifcations circle 

  function showNotification(notifcationSelector) {
    const notifcationCircle = document.querySelector(notifcationSelector);

    if (notifcationCircle.querySelector('p').textContent > 0) {
      notifcationCircle.style.display = 'block';
    }
  }


  // Admin catalog search by id

  function searchBy(searchInputBlockSelector, searchBySelector, homePanelSelector) {
    const inputBy = document.querySelector(searchInputBlockSelector),
      homePanelCatalog = document.querySelector(homePanelSelector),
      searchPanelCatalog = document.querySelector('.search-home-panel');
    
    if (inputBy) {
      inputBy.addEventListener('input', (event) => {
        searchPanelCatalog.style.display = 'block';
        homePanelCatalog.style.display = 'none';
        searchPanelCatalog.querySelector('tbody').innerHTML = '';
        let val = event.target.value.trim().toLowerCase();
        let ids = document.querySelectorAll(searchBySelector);

        if (val != '') {
          ids.forEach(item => {
            if (item.textContent.trim().toLowerCase().search(val) == -1) {
              item.parentElement.style.display = 'none';
            } else {
              item.parentElement.style.display = 'table-row';
              let itemClone = item.parentElement.cloneNode(true);
              searchPanelCatalog.querySelector('tbody').appendChild(itemClone);
            }
          })
        } else {
          searchPanelCatalog.style.display = 'none';
          searchPanelCatalog.querySelector('tbody').innerHTML = '';
          ids.forEach(item => {
            item.parentElement.style.display = 'table-row';
          })
          homePanelCatalog.style.display = 'block';
        }
      })
    }
  }


  searchBy('.search-by-user-name', '.userName', '.home-panel');
  searchBy('.search-by-user-email', '.userEmail', '.home-panel');
  searchBy('.search-by-user-phone', '.userPhone', '.home-panel');


  searchBy('.search-by-order-number', '.orderId', '.home-panel');
  searchBy('.search-by-order-email', '.orderEmail', '.home-panel');
  searchBy('.search-by-order-phone', '.orderPhone', '.home-panel');

  searchBy('#search-by-product-id', '.productId', '.home-panel');
  searchBy('#search-by-product-title', '.productTitle', '.home-panel');
  showNotification('.bell-notification');
  userCardInfo();
  catalogCardInfo()
  if (document.querySelector('.changeStatusBtn')) {
    adminOrderChangeOrderStatus();
  }
  adminOrderChangeUserInputs();
  adminOrderChangeOrderItemInputs();
  searchInput();
  showBriefInfoSection('.user-row');
  showBriefInfoSection('.order-row');
  if (document.querySelector('.catalog-tabs')) {
    showCatalogTabs();
  }
});