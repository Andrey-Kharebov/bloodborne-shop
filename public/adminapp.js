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


  // Admin search on pages

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

  // Admin search on nav


  function adminNavSearch() {
    const input = document.querySelector('#search'),
      searchPanel = document.querySelector('.admin-search-modal');

    if (input) {
      input.addEventListener('input', (event) => {
        searchPanel.style.display = 'block';
        const csrf = event.target.dataset.csrf;
        let val = event.target.value.trim().toLowerCase();

        if (val != '') {
          fetch('/admin/navsearch/' + val, {
              method: 'GET',
              headers: {
                'X-XSRF-TOKEN': csrf
              }
            })
            .then((res) => res.json())
            .then(searchResult => {
              if (searchResult.orders.length) {
                const html = searchResult.orders.map(p => {
                  return `
                  <tr class="search-tr">
                    <td class="column">${p.id}</td>
                    <td class="column">${p.name} ${p.surname}</td>
                    <td class="column">${p.email}</td>
                    <td class="column">${p.phone}</td>
                    <td>
                      <div class="td-element">
                        <button class="status ${p.status}">${p.status}</button>
                      </div>
                      <div class="td-element">
                        <a href="/admin/order/${p.id}" target="_blank"><button class="status passing">Перейти</button></a>
                      </div>
                    </td>
                  </tr>
                  `
                }).join('');
                document.querySelector('.home-panel-table-modal tbody').innerHTML = html;
              }
              if (searchResult.products.length) {
                const html = searchResult.products.map(p => {
                  return `
                  <tr class="search-tr">
                    <td class="column">${p.id}</td>
                    <td class="column">${p.title}</td>
                    <td class="column">${p.quantity = 99}</td>
                    <td class="column">${p.price}</td>
                    <td>
                      <div class="td-element">
                        <a href="/admin/product/${p.id}/edit"><button class="status passing">Изменить</button></a>
                      </div>
                      <div class="td-element">
                        <form action="/admin/product/${p.id}/remove" method="POST">
                          <input type="hidden" name="_csrf" value="${csrf}">
                          <input type="hidden" name="id" value="${p.id}">
                          <button typa="submit" class="status passing">Удалить</button>
                        </form>
                      </div>
                    </td>
                    <input id="imageUrl" type="hidden" name="img" value="/images/2020-07-16T21:42:20.530Z-kirkhammer.png">
                  </tr>
                  `
                }).join('');
                document.querySelector('.home-panel-table-modal tbody').innerHTML += html;
              }
              if (searchResult.users.length) {
                const html = searchResult.users.map(p => {
                  return `
                  <tr class="search-tr">
                    <td class="column">${p.name} ${p.surname}</td>
                    <td class="column">${p.email}</td>
                    <td class="column">${p.phone}</td>
                    <td class="column">${p.town}</td>
                    <td>
                      <div class="td-element">
                        <a href="/admin/profile/${p.id}"><button class="status passing">Перейти</button></a>
                      </div>
                    </td>
                  </tr>
                  `
                }).join('');
                document.querySelector('.home-panel-table-modal tbody').innerHTML += html
              }       
            })
            .then(res => {
              let columns = document.querySelectorAll('.search-tr');
              columns.forEach(item => {
                let tds = item.querySelectorAll('td.column');
                tds.forEach(td => {
                  if (td.textContent.trim().toLowerCase().search(val) == -1) {
                  } else {
                    td.parentElement.classList.toggle('proper');
                  }
                })
                if (item.classList.contains('proper')) {
                } else {
                  item.remove();
                }
              })
            }) 
        } else {
          searchPanel.style.display = 'none';
        }

      })
    } else {
      searchPanel.style.display = 'none';
    }
  }

  adminNavSearch();

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