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
                cartData[key][3] = +valueSection.value;
                cartData[key][4] = +cartData[key][5] * valueSection.value;
                setCartData(cartData);
                document.querySelector(`[data-price="${key}"] p`).textContent = `${cartData[key][4]} отг. к.`;
                showPrices('.total-price', '.delivery-price', '.total-modal-cost', '.modal-cart-product-price p', '.total-cost');
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
        productPage = document.querySelector('.product-page'),
        makeAnOrderSection = document.querySelector('.make-an-order');
  let cartId;

  if (localStorage.length >= 1) {
    cartId = Object.keys(localStorage);
    makeAnOrderSection.innerHTML += `
      <form action="/order/${cartId}/step1" method="POST">
        <input type="hidden" name="id" value="${cartId}">
        <button type="submit" class="make-an-order-btn">Оформить заказ</button>
      </form>
    `;
  } else {
    cartId = Number(new Date());
    makeAnOrderSection.innerHTML += `
    <form action="/order/${cartId}/step1" method="POST">
      <input type="hidden" name="id" value="${cartId}">
      <button type="submit" class="make-an-order-btn">Оформить заказ</button>
    </form>
    `;
  } 

  function setCartData(cartItem) {
    localStorage.setItem(`${cartId}`, JSON.stringify(cartItem));
  }

  function getCartData() {
    return JSON.parse(localStorage.getItem(`${cartId}`));
  }

  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', () => {
      let cartData = getCartData() || {},
        itemId = addToCartBtn.getAttribute('data-id'),
        itemTitle = productPage.querySelector('h1').textContent,
        itemImage = productPage.querySelector('.product-image img').getAttribute('src'),
        itemSize = productPage.querySelector('.product-size-active').textContent,
        itemQuantity = +productPage.querySelector('.counter-value').value,
        itemPriceForOne = +productPage.querySelector('.product-price').textContent.trim(),
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
      clearModalCart();
      showInModalCart();
      valueSection.value = 1;
      openCartModal();
      deleteInModalCart();
      properSize();
      showPrices('.total-price', '.delivery-price', '.total-modal-cost', '.modal-cart-product-price p', '.total-cost');
      productCounter('.modal-cart-product-quantity-info', '.number', 'plus', 'minus');
      productSizeChoosing('.modal-cart-product-size ul', 'modal-size-active');
    });
  }

  // LocalStorage show modalCart

  let modalPurchasesList = document.querySelector('.purchases-list');

  function showInModalCart() {
    if (getCartData()) {
      let LSCart = getCartData();
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
  
  function clearModalCart() {
    modalPurchasesList.innerHTML = '';
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
        showPrices('.total-price', '.delivery-price', '.total-modal-cost', '.modal-cart-product-price p', '.total-cost');
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

  function showPrices(totalPriceSelector, deliveryPriceSelector, totalCostSelector, cartProductPricesSelector, totalHeaderCostSelector) {
    const totalPrice = document.querySelector(totalPriceSelector),
      deliveryPrice = document.querySelector(deliveryPriceSelector),
      totalCost = document.querySelector(totalCostSelector),
      cartProductPrices = document.querySelectorAll(cartProductPricesSelector),
      totalHeaderCost = document.querySelector(totalHeaderCostSelector);

    let counter = 0;
    cartProductPrices.forEach(item => {
      counter += parseInt(item.textContent);
    });

    let deliveryCounter = ((5 / 100) * counter);
    let totalCostCounter = counter + deliveryCounter;
    totalPrice.textContent = `${counter}  отг. к.`;
    deliveryPrice.textContent = `${deliveryCounter} отг. к.`;
    totalCost.textContent = `${totalCostCounter} отг. к.`;
    totalHeaderCost.textContent = `${totalCostCounter}`;

    if (document.querySelector('.hidden-inputs')) {
      document.querySelector('#total-price').value = `${counter}`;
      document.querySelector('#delivery-price').value = `${deliveryCounter}`;
      document.querySelector('#total-cost').value = `${totalCostCounter}`;
    }   
  }


  // LS making an order page

  let orderProductsList = document.querySelector('.order-products-list'),
      orderNumber = document.querySelector('.p-details'),
      step2btn = document.querySelector('.continue-section button');

  function showInOrderDetails() {
    if (getCartData()) {
      let LSCart = getCartData();
      orderNumber.innerHTML = `Номер заказа: ${localStorage.key(0)}`;
      for (let key in LSCart) {
        orderProductsList.innerHTML += `
        <div class="order-product-item id="${key}">
          <input type="hidden" name="products" value="${key},${LSCart[key]}">
          <h3>${LSCart[key][0]}</h3>
          <p>Размер: <span>${LSCart[key][2]}</span></p>
          <p>Количество: <span>${LSCart[key][3]}</span></p>
          <div class="order-product-price">
            <p class="p-price">${LSCart[key][4]} отг. к.</p>
          </div>
          <hr>
        </div>
        `;
      }
    }
  } 

  if (step2btn) {
    step2btn.addEventListener('click', (event) => {
      localStorage.clear();
    });
  }


  showInModalCart();
  deleteInModalCart();
  properSize();
  showPrices('.total-price', '.delivery-price', '.total-modal-cost', '.modal-cart-product-price p', '.total-cost');
  productCounter('.product-counter', '.counter-value', 'counter-plus', 'counter-minus');
  productCounter('.modal-cart-product-quantity-info', '.number', 'plus', 'minus');
  productSizeChoosing('.product-size ul', 'product-size-active');
  productSizeChoosing('.modal-cart-product-size ul', 'modal-size-active');
  if (orderProductsList) {
    showInOrderDetails();
    showPrices('.order-total-price', '.order-delivery-price', '.order-total-cost', '.order-product-price p', '.total-cost');
  }
});