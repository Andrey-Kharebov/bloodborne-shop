window.addEventListener('DOMContentLoaded', () => {
  // Home tabs

  const tabs = document.querySelectorAll('.tab'),
    homeTabs = document.querySelectorAll('.home-tab'),
    switchers = document.querySelector('.switchers');

  function hideHomeTabs() {
    homeTabs.forEach(item => {
      item.style.display = 'none';
    });

    tabs.forEach(item => {
      item.classList.remove('tab-active');
    });
  }

  function showHomeTabs(i = 0) {
    if (tabs.length) { 
      homeTabs[i].style.display = 'block';
      tabs[i].classList.add('tab-active');
    }
  }


  hideHomeTabs();
  showHomeTabs();

  if (tabs.length) { 
    switchers.addEventListener('click', (event) => {
      const target = event.target;

      if (target && target.classList.contains('tab')) {
        tabs.forEach((item, i) => {
          if (target == item) {
            hideHomeTabs();
            showHomeTabs(i);
          }
        });
      }
    });
  }

  // Product size choosing

  function productSizeChoosing(sizeListSelector, activeSelector) {
    let sizeList = document.querySelectorAll(sizeListSelector);

    function removeAllSizeActive(itemList) {
      itemList.querySelectorAll('li').forEach(item => {
        let button = item.querySelector('button');
        button.classList.remove(activeSelector);
      });
    }

    sizeList.forEach(item => {
      item.addEventListener('click', (event) => {
        let LSkey = event.currentTarget.dataset.size;
        itemList = event.currentTarget;
        removeAllSizeActive(itemList);
        event.target.classList.add(activeSelector);
        if (LSkey) {
          let cartData = getCartData();
          for (let key in cartData) {
            if (LSkey === key) {
              console.log(cartData[key]);
              console.log(event.target.textContent);
              cartData[key][2] = event.target.textContent;
              setCartData(cartData);
            }
          }
        }
      });
    });
  }

  // Product page counter plus/minus

  let valueSection = document.querySelector('.counter-value');

  function productCounter(counterSelector, valueSelector, plusSelector, minusSelector) {
    const counter = document.querySelectorAll(counterSelector);

    if (counter) {
      counter.forEach(item => {
        let valueSection = item.querySelector(valueSelector);
        item.addEventListener('click', (event) => {
          if (event.target.classList.contains(plusSelector)) {
            if (valueSection.value == 10) {
              valueSection.value = 10;
            } else {
              valueSection.value++;
            }
          }

          if (event.target.classList.contains(minusSelector)) {
            if (valueSection.value == 1) {
              valueSection.value = 1;
            } else {
              valueSection.value--;
            }
          }

          let LSkey = event.currentTarget.dataset.quantity;
          if (LSkey) {
            let cartData = getCartData();
            for (let key in cartData) {
              if (LSkey === key) {
                cartData[key][3] = valueSection.value;
                cartData[key][4] = +cartData[key][5] * valueSection.value;
                setCartData(cartData);
                document.querySelector(`[data-price="${key}"] p`).textContent = `${cartData[key][4]} отг. к.`;
                showPrices();
              }
            }
          }
        });
      });
    }
  }

  // ModalCart

  const checkbox = document.querySelector('#check'),
    navCartBox = document.querySelector('.cart'),
    cartModal = document.querySelector('.cart-modal'),
    closeModal = document.querySelector('.continue'),
    container = document.querySelector('.container'),
    body = document.querySelector('body');

  function openCartModal() {
    checkbox.click();
    container.style.opacity = '0.7';
    cartModal.style.transform = "translateX(-380px)";
    body.style.overflowY = 'hidden';
  }

  function closeCartModal() {
    checkbox.click();
    container.style.opacity = '1';
    cartModal.style.transform = "translateX(380px)";
    body.style.overflowY = 'scroll';
  }

  container.addEventListener('click', (event) => {
    // if (event.currentTarget == container) {
    //   closeCartModal();
    // }
  });

  navCartBox.addEventListener('click', (event) => {
    openCartModal();
  });

  closeModal.addEventListener('click', () => {
    closeCartModal();
  });


  // LocalStorage create/update Cart

  const addToCartBtn = document.querySelector('.add-to-cart'),
    productPage = document.querySelector('.product-page');


  function setCartData(cartItem) {
    localStorage.setItem('cart', JSON.stringify(cartItem));
  }

  function getCartData() {
    return JSON.parse(localStorage.getItem('cart'));
  }

  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', () => {
      let cartData = getCartData() || {},
        itemId = addToCartBtn.getAttribute('data-id'),
        itemTitle = productPage.querySelector('h1').textContent,
        itemImage = productPage.querySelector('.product-image img').getAttribute('src'),
        itemSize = productPage.querySelector('.product-size-active').textContent,
        itemQuantity = +productPage.querySelector('.counter-value').value,
        itemPriceForOne = productPage.querySelector('.product-price').textContent.trim(),
        itemPrice = productPage.querySelector('.product-price').textContent.trim(),
        itemTotalPrice = itemPrice * itemQuantity;
      let itemDubId;
        
      if (cartData.hasOwnProperty(itemId)) {
        if (cartData[itemId][2] == itemSize) {
          cartData[itemId][3] += itemQuantity;
          cartData[itemId][4] += itemTotalPrice;
        } else {
          itemDubId = itemId + itemSize;
          if (cartData[itemDubId]) {
            if (cartData[itemDubId][2] == itemSize) {
              cartData[itemDubId][3] += itemQuantity;
              cartData[itemDubId][4] += itemTotalPrice;
            }
          } else {
            cartData[itemDubId] = [itemTitle, itemImage, itemSize, itemQuantity, itemTotalPrice, itemPriceForOne];
          }
        }
      } else {
        cartData[itemId] = [itemTitle, itemImage, itemSize, itemQuantity, itemTotalPrice, itemPriceForOne];
      }

      setCartData(cartData);
      showInModalCart(itemDubId);
      valueSection.value = 1;
      openCartModal();
      deleteInModalCart();
      properSize();
      showPrices();
      productCounter('.modal-cart-product-quantity-info', '.number', 'plus', 'minus');
      productSizeChoosing('.modal-cart-product-size ul', 'modal-size-active');
    });
  }

  // LocalStorage show modalCart

  let modalPurchasesList = document.querySelector('.purchases-list');


  function showInModalCart(itemId) {
    if (getCartData()) {
      const LSCart = getCartData();
      if (itemId) {
        const modalCartItem = document.getElementById(`${itemId}`);
        if (modalCartItem === null) {
          for (let key in LSCart) {
            if (key === itemId) {
              modalPurchasesList.innerHTML += `
              <div class="modal-cart-product-section" id="${key}">
                <div class="modal-cart-product-image">
                  <img src="${LSCart[key][1]}" alt="${LSCart[key][0]}">
                  <span class="modal-cart-product-remove" data-removeBtn="${key}"><i class="far fa-times-circle"></i></span>
                </div>
                <div class="modal-cart-product-info">
                  <div class="modal-cart-product-title">
                    <p>${LSCart[key][0]}</p>
                  </div>
                  <div class="modal-cart-product-size">
                    <p>Размер:</p>
                    <ul data-size="${key}">
                      <li><button class="modal-product-size-btn">XS</button></li>
                      <li><button class="modal-product-size-btn">S</button></li>
                      <li><button class="modal-product-size-btn">M</button></li>
                      <li><button class="modal-product-size-btn">L</button></li>
                      <li><button class="modal-product-size-btn">XL</button></li>
                      <li><button class="modal-product-size-btn">2XL</button></li>
                      <li><button class="modal-product-size-btn">3XL</button></li>                      
                    </ul>
                  </div>
                  <div class="modal-cart-product-quantity">
                    <p>Количество:</p>
                    <div class="modal-cart-product-quantity-info" data-quantity="${key}">
                      <input disabled class="number" type="number" value="${LSCart[key][3]}"></input>
                      <button class="plus">+</button>
                      <button class="minus">-</button>
                    </div>
                  </div>
                  <div class="modal-cart-product-price" data-price="${key}">
                    <p class="price">${LSCart[key][4]} отг. к.</p>
                  </div>
                </div>
              </div> 
            `;
            }
          }
        } else {
          let modalCartProductSections = document.querySelectorAll('.modal-cart-product-section');
          modalCartProductSections.forEach(item => {
            if (+item.getAttribute('id') == itemId) {
              item.innerHTML = `
                <div class="modal-cart-product-image">
                  <img src="${LSCart[itemId][1]}" alt="${LSCart[itemId][0]}">
                  <span class="modal-cart-product-remove" data-removeBtn="${itemId}"><i class="far fa-times-circle"></i></span>
                </div>
                <div class="modal-cart-product-info">
                  <div class="modal-cart-product-title">
                    <p>${LSCart[itemId][0]}</p>
                  </div>
                  <div class="modal-cart-product-size">
                    <p>Размер:</p>
                    <ul data-size="${itemId}">
                      <li><button class="modal-product-size-btn">XS</button></li>
                      <li><button class="modal-product-size-btn">S</button></li>
                      <li><button class="modal-product-size-btn">M</button></li>
                      <li><button class="modal-product-size-btn">L</button></li>
                      <li><button class="modal-product-size-btn">XL</button></li>
                      <li><button class="modal-product-size-btn">2XL</button></li>
                      <li><button class="modal-product-size-btn">3XL</button></li>                      
                    </ul>
                  </div>
                  <div class="modal-cart-product-quantity">
                    <p>Количество:</p>
                    <div class="modal-cart-product-quantity-info" data-quantity="${itemId}">
                      <input disabled class="number" type="number" value="${LSCart[itemId][3]}"></input>
                      <button class="plus">+</button>
                      <button class="minus">-</button>
                    </div>
                  </div>
                  <div class="modal-cart-product-price" data-price="${itemId}">
                    <p class="price">${LSCart[itemId][4]} отг. к.</p>
                  </div>
                </div>
              `;
            }
          });
        }
      } else {
        for (let key in LSCart) {
          modalPurchasesList.innerHTML += `
            <div class="modal-cart-product-section" id="${key}">
              <div class="modal-cart-product-image">
                <img src="${LSCart[key][1]}" alt="${LSCart[key][0]}">
                <span class="modal-cart-product-remove" data-removeBtn="${key}"><i class="far fa-times-circle"></i></span>
              </div>
              <div class="modal-cart-product-info">
                <div class="modal-cart-product-title">
                  <p>${LSCart[key][0]}</p>
                </div>
                <div class="modal-cart-product-size">
                  <p>Размер:</p>
                  <ul data-size="${key}">
                    <li><button class="modal-product-size-btn">XS</button></li>
                    <li><button class="modal-product-size-btn">S</button></li>
                    <li><button class="modal-product-size-btn">M</button></li>
                    <li><button class="modal-product-size-btn">L</button></li>
                    <li><button class="modal-product-size-btn">XL</button></li>
                    <li><button class="modal-product-size-btn">2XL</button></li>
                    <li><button class="modal-product-size-btn">3XL</button></li>                      
                  </ul>
                </div>
                <div class="modal-cart-product-quantity">
                  <p>Количество:</p>
                  <div class="modal-cart-product-quantity-info" data-quantity="${key}">
                    <input disabled class="number" type="number" value="${LSCart[key][3]}"></input>
                    <button class="plus">+</button>
                    <button class="minus">-</button>
                  </div>
                </div>
                <div class="modal-cart-product-price" data-price="${key}">
                  <p class="price">${LSCart[key][4]} отг. к.</p>
                </div>
              </div>
            </div> 
          `;
        }
      }
    }
  }

  function deleteInModalCart() {
    const delModalProductBtns = document.querySelectorAll('.modal-cart-product-remove');
    delModalProductBtns.forEach(item => {
      item.addEventListener('click', (event) => {
        let LSkey = event.currentTarget.dataset.removebtn;
        let cartData = getCartData();
        for (let key in cartData) {
          if (LSkey === key) {
            delete cartData[key];
            setCartData(cartData);
            modalPurchasesList.innerHTML = '';
          }
        }
        showInModalCart();
        deleteInModalCart();
        properSize();
        showPrices();
        productCounter('.modal-cart-product-quantity-info', '.number', 'plus', 'minus');
        productSizeChoosing('.modal-cart-product-size ul', 'modal-size-active');
      });
    });
  }

  function properSize() {
    let modalCartProductSections = document.querySelectorAll('.modal-cart-product-section');
    modalCartProductSections.forEach(section => {
      let cartData = getCartData();
      for (let key in cartData) {
        if (section.getAttribute('id') === key) {
          let modalCartProductSizes = section.querySelectorAll('.modal-cart-product-section ul li .modal-product-size-btn');
          modalCartProductSizes.forEach(item => {
            if (cartData[key][2] === item.textContent) {
              item.classList.add('modal-size-active');
            }
          });
        }
      }
    });
  }

  function showPrices() {
    const totalPrice = document.querySelector('.total-price'),
      deliveryPrice = document.querySelector('.delivery-price'),
      totalModalCost = document.querySelector('.total-modal-cost'),
      modalCartProductPrices = document.querySelectorAll('.modal-cart-product-price p'),
      totalHeaderCost = document.querySelector('.total-cost');

    let counter = 0;
    modalCartProductPrices.forEach(item => {
      counter += parseInt(item.textContent);
    });

    let deliveryCounter = ((5 / 100) * counter);
    let totalCostCounter = counter + deliveryCounter;
    totalPrice.textContent = `${counter}  отг. к.`;
    deliveryPrice.textContent = `${deliveryCounter} отг. к.`;
    totalModalCost.textContent = `${totalCostCounter} отг. к.`;
    totalHeaderCost.textContent = `${totalCostCounter}`;
  }


  showInModalCart();
  deleteInModalCart();
  properSize();
  showPrices();
  productCounter('.product-counter', '.counter-value', 'counter-plus', 'counter-minus');
  productCounter('.modal-cart-product-quantity-info', '.number', 'plus', 'minus');
  productSizeChoosing('.product-size ul', 'product-size-active');
  productSizeChoosing('.modal-cart-product-size ul', 'modal-size-active');
});