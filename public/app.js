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
      homeTabs[i].style.display = 'table-row';
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
              // console.log(cartData[key]);
              // console.log(event.target.textContent);
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
              if (plusSelector == 'plus') {
                showFlashMessage('Данные товара в корзине успешно обновлены.');
              }
            }
          }

          if (event.target.classList.contains(minusSelector)) {
            if (valueSection.value == 1) {
              valueSection.value = 1;
              showFlashMessage('Ожидаемое количество является недопустимым.');
            } else {
              valueSection.value--;
              if (minusSelector == 'minus') {
                showFlashMessage('Данные товара в корзине успешно обновлены.');
              }
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
    continueCartModal = document.querySelector('.continue'),
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
    let addToCartBtn = document.querySelector('.add-to-cart');
    if (checkbox.checked && event.currentTarget == container && event.target != addToCartBtn) {
      closeCartModal();
    }
  });

  navCartBox.addEventListener('click', (event) => {
    openCartModal();
  });

  continueCartModal.addEventListener('click', () => {
    closeCartModal();
  });

  // Modal Categories
  const burgerBtn = document.querySelector('.burger'),
        categoriesModal = document.querySelector('.categories-modal'),
        closeCategoriesModalBtn = document.querySelector('.categories-close p');

  function openCategoriesModal() {
    checkbox.click();
    container.style.opacity = '0.7';
    categoriesModal.style.transform = "translateX(-380px)";
    body.style.overflowY = 'hidden';
  }

  function closeCategoriesModal() {
    checkbox.click();
    container.style.opacity = '1';
    categoriesModal.style.transform = "translateX(380px)";
    body.style.overflowY = 'scroll';
  }

  burgerBtn.addEventListener('click', (event) => {
    openCategoriesModal();
  })

  closeCategoriesModalBtn.addEventListener('click', () => {
    closeCategoriesModal();
  });

  // Modals
  // Login modal

  const loginBtn = document.querySelector('.login .noauth'),
    modalBg = document.querySelector('.modal-bg'),
    loginModal = document.querySelector('.login-modal'),
    forgotModal = document.querySelector('.forgot-modal'),
    checkStatusModal = document.querySelector('.status-check-modal'),
    checkStatusOrder = document.querySelector('.status-check-order'),
    registrationModal = document.querySelector('.registration-modal'),
    recommendedModal = document.querySelector('.recommended-modal'),
    closeModalBtns = document.querySelectorAll('.close-modal-btn'),
    forgotModalBtn = document.querySelector('.forgot'),
    cancelingModalBtn = document.querySelector('.canceling'),
    checkStatusModalBtns = document.querySelectorAll('.check-status-btn'),
    fastRegistrationModalBtn = document.querySelector('.fast-registration'),
    registrationLoginBtn = document.querySelector('.registration-login'),
    loginBtnSubmit = document.querySelector('.login-btn button');

  function openModal(modalSelector) {
    checkbox.click();
    container.style.opacity = '0.7';
    modalBg.style.display = 'block';
    modalSelector.style.display = 'block';
  }

  function closeModal(modalSelector) {
    checkbox.click();
    container.style.opacity = '1';
    modalBg.style.display = 'none';
    modalSelector.style.display = 'none';
  }

  if (loginBtn) {
    loginBtn.addEventListener('click', (event) => {
      openModal(loginModal);
    });
  }

  loginBtnSubmit.addEventListener('click', (event) => {
    if (localStorage.length) {
      localStorage.clear();
    }

  });


  forgotModalBtn.addEventListener('click', (event) => {
    closeModal(loginModal);
    openModal(forgotModal);
  });

  fastRegistrationModalBtn.addEventListener('click', (event) => {
    closeModal(loginModal);
    openModal(registrationModal);
  });

  registrationLoginBtn.addEventListener('click', (event) => {
    closeModal(registrationModal);
    openModal(loginModal);
  });

  modalBg.addEventListener('click', (event) => {
    if (event.currentTarget == event.target) {
      closeModal(loginModal);
      closeModal(forgotModal);
      closeModal(registrationModal);
      closeModal(checkStatusModal);
      closeModal(checkStatusOrder);
      closeModal(recommendedModal);
    }
  });

  cancelingModalBtn.addEventListener('click', (event) => {
    closeModal(forgotModal);
  });

  closeModalBtns.forEach(btn => {
    btn.addEventListener('click', (event) => {
      if (event.currentTarget.dataset.modal === 'login') {
        closeModal(loginModal);
      } else if (event.currentTarget.dataset.modal === 'forgot') {
        closeModal(forgotModal);
      } else if (event.currentTarget.dataset.modal === 'registration') {
        closeModal(registrationModal);
      } else if (event.currentTarget.dataset.modal === 'check-status') {
        closeModal(checkStatusModal);
        closeModal(checkStatusOrder);
      } else if (event.currentTarget.dataset.modal === 'recommended') {
        closeModal(recommendedModal);
      }
    });
  });

  checkStatusModalBtns.forEach(item => {
    item.addEventListener('click', (event) => {
      closeCategoriesModal();
      openModal(checkStatusModal);
    })
  })





  // LocalStorage create/update Cart

  const user = document.querySelector('#user'),
    addToCartBtn = document.querySelector('.add-to-cart'),
    productPage = document.querySelector('.product-page'),
    makeAnOrderSection = document.querySelector('.make-an-order'),
    csrf = document.querySelector('#csrf').value;
  let cartId;

  if (localStorage.length >= 1) {
    cartId = Object.keys(localStorage);
    makeAnOrderSection.innerHTML = `
      <form action="/order/${cartId}/step1" method="POST">
        <input type="hidden" name="_csrf" value="${csrf}">
        <input type="hidden" name="id" value="${cartId}">
        <button type="submit" class="make-an-order-btn">Оформить заказ</button>
      </form>
    `;
  } else if (user && +user.value != 0 && localStorage.length >= 1) {
    cartId = +user.value;
    makeAnOrderSection.innerHTML = `
    <form action="/order/${cartId}/step1" method="POST">
      <input type="hidden" name="_csrf" value="${csrf}">
      <input type="hidden" name="id" value="${cartId}">
      <button type="button" class="make-an-order-btn empty">Оформить заказ</button>
    </form>
    `;
  } else if (user && +user.value != 0) {
    cartId = +user.value;
    makeAnOrderSection.innerHTML = `
      <input type="hidden" name="_csrf" value="${csrf}">
      <input type="hidden" name="id" value="${cartId}">
      <button type="button" class="make-an-order-btn empty">Оформить заказ</button>
    `;
    document.querySelector('.make-an-order-btn.empty').addEventListener('click', () => {
      showFlashMessage('Вы не можете перейти к оформлению заказа, т.к. корзина пуста.');
    });
  } else {
    cartId = Number(new Date());
    makeAnOrderSection.innerHTML = `
      <input type="hidden" name="_csrf" value="${csrf}">
      <input type="hidden" name="id" value="${cartId}">
      <button type="button" class="make-an-order-btn empty">Оформить заказ</button>
    `;
    document.querySelector('.make-an-order-btn.empty').addEventListener('click', () => {
      showFlashMessage('Вы не можете перейти к оформлению заказа, т.к. корзина пуста.');
    });
  }

  function setCartData(cartItem) {
    localStorage.setItem(`${cartId}`, JSON.stringify(cartItem));
  }

  function getCartData() {
    return JSON.parse(localStorage.getItem(`${cartId}`));
  }

  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', () => {
      try {
        let cartData = getCartData() || {},
          itemId = addToCartBtn.getAttribute('data-id'),
          itemTitle = productPage.querySelector('h1').textContent,
          itemImage = productPage.querySelector('.product-slide img').getAttribute('src'),
          itemSize = productPage.querySelector('.product-size-active').textContent,
          itemQuantity = +productPage.querySelector('.counter-value').value,
          itemPriceForOne = +productPage.querySelector('#hidden-price').value,
          itemPrice = +productPage.querySelector('#hidden-price').value,
          itemTotalPrice = itemPrice * itemQuantity;
        let itemDubId;

        if (cartData.hasOwnProperty(itemId)) {
          if (cartData[itemId][2] == itemSize) {
            cartData[itemId][3] += itemQuantity;
            cartData[itemId][4] += itemTotalPrice;
            showFlashMessage('Товар успешно добавлен в корзину.');
          } else {
            itemDubId = itemId + itemSize;
            showFlashMessage('Товар успешно добавлен в корзину.');
            if (cartData[itemDubId]) {
              if (cartData[itemDubId][2] == itemSize) {
                cartData[itemDubId][3] += itemQuantity;
                cartData[itemDubId][4] += itemTotalPrice;
                showFlashMessage('Данные у товара в корзине успешно обновлены.');
              }
            } else {
              cartData[itemDubId] = [itemTitle, itemImage, itemSize, itemQuantity, itemTotalPrice, itemPriceForOne];
            }
          }
        } else {
          cartData[itemId] = [itemTitle, itemImage, itemSize, itemQuantity, itemTotalPrice, itemPriceForOne];
          showFlashMessage('Товар успешно добавлен в корзину.');
        }

        setCartData(cartData);
        clearModalCart();
        showInModalCart();
        valueSection.value = 1;
        deleteInModalCart();
        properSize();
        showPrices('.total-price', '.delivery-price', '.total-modal-cost', '.modal-cart-product-price p', '.total-cost');
        productCounter('.modal-cart-product-quantity-info', '.number', 'plus', 'minus');
        productSizeChoosing('.modal-cart-product-size ul', 'modal-size-active');
        if (!checkbox.checked) {
          openCartModal();
        }
      } catch (e) {
        console.log(e);
        showFlashMessage('Для добавления товара в корзину необходимо выбрать размер.');
      }
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
      if (localStorage.length >= 1) {
        cartId = Object.keys(localStorage);
        makeAnOrderSection.innerHTML = `
          <form action="/order/${cartId}/step1" method="POST">
            <input type="hidden" name="_csrf" value="${csrf}">
            <input type="hidden" name="id" value="${cartId}">
            <button type="submit" class="make-an-order-btn">Оформить заказ</button>
          </form>
        `;
      } else if (user && +user.value != 0 && localStorage.length >= 1) {
        cartId = +user.value;
        makeAnOrderSection.innerHTML = `
        <form action="/order/${cartId}/step1" method="POST">
          <input type="hidden" name="_csrf" value="${csrf}">
          <input type="hidden" name="id" value="${cartId}">
          <button type="button" class="make-an-order-btn empty">Оформить заказ</button>
        </form>
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
        showFlashMessage('Вы успешно удалили товар из корзины.');
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

    // очистка LS
    if (counter == 0) {
      const makeAnOrderSection = document.querySelector('.make-an-order');
      localStorage.clear();
      makeAnOrderSection.innerHTML = `
      <input type="hidden" name="_csrf" value="${csrf}">
      <input type="hidden" name="id" value="${cartId}">
      <button type="button" class="make-an-order-btn empty">Оформить заказ</button>
    `;
      document.querySelector('.make-an-order-btn.empty').addEventListener('click', () => {
        showFlashMessage('Вы не можете перейти к оформлению заказа, т.к. корзина пуста.');
      });
    }
  }


  // LS making an order page

  let orderProductsList = document.querySelector('.order-products-list');

  function showInOrderDetails() {
    if (getCartData()) {
      let LSCart = getCartData();
      for (let key in LSCart) {
        orderProductsList.innerHTML += `
        <div class="order-product-item" id="${key}">
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

  // Clear LS after making an order

  if (+document.querySelector('.order-number').textContent > 0) {
    localStorage.clear();
  }

  // Profile changes mode

  const changeBtn = document.querySelectorAll('.profile-list-info-heading p');

  changeBtn.forEach(item => {
    item.addEventListener('click', (event) => {
      item.parentNode.parentNode.classList.toggle('change-active');
      if (item.parentNode.parentNode.classList.contains('change-active')) {
        item.parentNode.parentNode.classList.remove('change-unactive');
        item.parentNode.parentNode.querySelectorAll('input').forEach(i => {
          i.disabled = false;
        });
        event.target.textContent = 'Отменить';
      } else {
        item.parentNode.parentNode.classList.add('change-unactive');
        item.parentNode.parentNode.querySelectorAll('input').forEach(i => {
          i.disabled = true;
        });
        event.target.textContent = 'Изменить';
      }
    });
  });

  // Flash messages functionality


  function showFlashMessage(messageText) {
    let flashProgressBar = document.querySelector('.flash-progress-bar'),
      flashMessage = document.querySelector('.flash-message'),
      flashMessageText = document.querySelector('.flash-message p'),
      flashMessageCloseBtn = document.querySelector('.close-flash-btn');

    flashMessageCloseBtn.addEventListener('click', () => {
      flashMessage.style.display = 'none';
    });

    flashMessage.style.display = 'block';
    flashMessageText.textContent = messageText;

    flashProgressBar.addEventListener('animationend', () => {
      flashMessage.style.display = 'none';
    })
  }

  // Check status modal functionality


  function checkOrderStatus() {
    const findOrderBtn = document.querySelector('#bl');

    findOrderBtn.addEventListener('click', () => {
      let checkStatusInput = +document.querySelector('.order-number input').value,
        checkStatusOrder = document.querySelector('.status-check-order');

      if (isNaN(checkStatusInput)) {
        showFlashMessage('Поле id имеет ошибочный формат.');
      } else {
        fetch('/order/check/' + checkStatusInput, {
            method: 'GET'
          })
          .then((res) => res.json())
          .then(order => {
            if (order === null) {
              showFlashMessage('Выбранное значение для id некорректно.');
            } else {
              let orderItems = '';
              order.orderItems.forEach(item => {
                orderItems += `<li>${item.title} (<strong>${item.size}</strong> x <strong>${item.quantity}</strong>)</li>`
              })
              checkStatusOrder.style.display = 'block';
              checkStatusOrder.innerHTML = `
                <div class="order-card">
                <div class="card-content">
                  <span class="card-title">
                    Заказ: ${order.id}
                  </span>
                  <p>
                    Статус заказа: ${order.status}
                  </p>
          
          
                  <p class="date">${order.createdAt}</p>
                  <p><em>${order.name} ${order.surname}</em> <small>(${order.email})</small></p>
          
                  <ol>
                    ${orderItems}
                  </ol>
          
                  <hr>
          
                  <p>Общая стоимость: <span class="price">${order.totalPrice} отг. к.</span></p>
                  <p>Стоимость доставки: <span class="price">${order.deliveryPrice} отг. к.</span></p>
                  <p>Итого: <span class="price">${order.totalCost} отг. к.</span></p>
          
                </div>
              </div>
              `
            }
          })
      }
    })
  }


  // clear LS after exit from account 

  function cleasrLSafeterExit() {
    let exitBtn = document.querySelector('.profile-list-menu-exit button');

    exitBtn.addEventListener('click', () => {
      localStorage.clear();
    });
  }


  // fetch login

  function login() {
    const loginBtn = document.querySelector('.login-btn button'),
      form = document.querySelector('.login-form');

    loginBtn.addEventListener('click', (event) => {
      event.preventDefault();

      const formData = new FormData(form);
      const body = JSON.stringify(Object.fromEntries(formData.entries()));

      fetch('https://hidden-taiga-36867.herokuapp.com/auth/login/', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            'X-XSRF-TOKEN': csrf
          },
          body: body
        })
        .then((res) => res.json())
        .then((answer) => {
          if (answer === 'logged in') {
            closeModal(loginModal);
            showFlashMessage('Добро пожаловать в Ярнам. Удачной охоты!');
            setTimeout(() => {
              window.location = 'https://hidden-taiga-36867.herokuapp.com/profile';
            }, 1000);
          } else if (answer === 'wrong email') {
            showFlashMessage('Пользователь с данным Email не найден.');
          } else if (answer === 'wrong password') {
            showFlashMessage('Email адрес и пароль не совпадают.');
          }
        })
    })
  }

  // Pormotional button 

  let promotionalBtn = document.querySelector('.promotional button');

  if (promotionalBtn) {
    promotionalBtn.addEventListener('click', (e) => {
      showFlashMessage('Запрашиваемого промокода не существует или он закончился.');
    })
  }


  // FAQ script 

  function faq() {
    const faqHeaders = document.querySelectorAll('.faq-item-header');

    faqHeaders.forEach(item => {
      item.addEventListener('click', (event) => {
        item.nextElementSibling.classList.toggle('show');
      })
    })
  }

  // Prices spacing 

  function priceSpacing(pricesSelecor) {
    const prices = document.querySelectorAll(pricesSelecor);

    prices.forEach(item => {
      item.textContent = item.textContent.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    })
  }

  // Product page slider 

  function productSlider() {
    const productSlider = document.querySelector('.product-slider'),
      productSlides = document.querySelectorAll('.product-slide'),
      productSliderWrapper = document.querySelector('.product-slider-center'),
      productSliderField = document.querySelector('.product-slider-inner'),
      productSliderPrev = document.querySelector('.product-slider-arrow-left'),
      productSliderNext = document.querySelector('.product-slider-arrow-right'),
      productSwitchers = document.querySelectorAll('.product-switcher'),
      sliderWidth = window.getComputedStyle(productSliderWrapper).width;
    let offset = 0;
    let slideIndex = 1;

    let i = 0;
    productSwitchers.forEach(switcher => {
      if (i == 0) {
        switcher.classList.add('active');
        productSlides[i].classList.add('acti');
      }
      switcher.setAttribute('data-slide-to', i + 1);
      i++;
      switcher.addEventListener('click', (event) => {
        const slideTo = event.currentTarget.getAttribute('data-slide-to');
        slideIndex = slideTo;

        offset = +sliderWidth.slice(0, sliderWidth.length - 2) * (slideTo - 1);
        productSliderField.style.transform = `translateX(-${offset}px)`;
        productSwitchers.forEach(dot => dot.classList.remove('active'));
        productSlides.forEach(slide => slide.classList.remove('acti'));
        productSwitchers[slideIndex - 1].classList.add('active');
        productSlides[slideIndex - 1].classList.add('acti');
      })
    })

    productSliderField.style.width = 100 * productSlides.length + '%';


    productSliderWrapper.style.overflow = 'hidden';
    productSlides.forEach(slide => {
      slide.style.width = sliderWidth;
    })

    productSliderNext.addEventListener('click', (event) => {
      if (offset == +sliderWidth.slice(0, sliderWidth.length - 2) * (productSlides.length - 1)) {
        offset = 0;
      } else {
        offset += +sliderWidth.slice(0, sliderWidth.length - 2);
      }

      if (slideIndex == productSlides.length) {
        slideIndex = 1;
      } else {
        slideIndex++;
      }

      productSliderField.style.transform = `translateX(-${offset}px)`;
      productSwitchers.forEach(dot => dot.classList.remove('active'));
      productSlides.forEach(slide => slide.classList.remove('acti'));
      productSwitchers[slideIndex - 1].classList.add('active');
      productSlides[slideIndex - 1].classList.add('acti');
    })

    productSliderPrev.addEventListener('click', (event) => {
      if (offset == 0) {
        offset = +sliderWidth.slice(0, sliderWidth.length - 2) * (productSlides.length - 1);
      } else {
        offset -= +sliderWidth.slice(0, sliderWidth.length - 2);
      }

      if (slideIndex == 1) {
        slideIndex = productSlides.length;
      } else {
        slideIndex--;
      }

      productSliderField.style.transform = `translateX(-${offset}px)`;
      productSwitchers.forEach(dot => dot.classList.remove('active'));
      productSlides.forEach(slide => slide.classList.remove('acti'));
      productSwitchers[slideIndex - 1].classList.add('active');
      productSlides[slideIndex - 1].classList.add('acti');
    })
  }


  // Recommended slider 

  function recommendedSlider() {
    const recSlider = document.querySelector('.recommended-slider'),
      recSlides = document.querySelectorAll('.recommended-slide'),
      recSlide = document.querySelector('.recommended-slide'),
      recSliderWrapper = document.querySelector('.recommended-slider-center'),
      recSliderField = document.querySelector('.recommended-slider-inner'),
      recSliderPrev = document.querySelector('.recommended-slider-arrow-left'),
      recSliderNext = document.querySelector('.recommended-slider-arrow-right'),
      sliderWidth = window.getComputedStyle(recSliderWrapper).width;
    let offset = 0;

    recSliderField.style.width = 100 * recSlides.length + '%';
    recSliderWrapper.style.overflow = 'hidden';

    console.log(+document.querySelector('#hidden-price').value);

    if (recSlides.length > 6) {
      recSliderPrev.addEventListener('click', (event) => {
        if (offset == (recSlide.offsetWidth * (recSlides.length - 6))) {} else {
          offset += recSlide.offsetWidth;
        }
        recSliderField.style.transform = `translateX(-${offset}px)`;
      })
    } else {
      recSliderPrev.style.display = 'none';
      recSliderNext.style.display = 'none';
      recSliderField.style.justifyContent = 'center';
    }


    recSliderNext.addEventListener('click', (event) => {
      if (offset == 0) {} else {
        offset -= recSlide.offsetWidth;
      }

      recSliderField.style.transform = `translateX(-${offset}px)`;
    })
  }

  // Recommended modal

  function recModal() {
    const recSlides = document.querySelectorAll('.recommended-slide'),
      recModal = document.querySelector('.recommended-modal'),
      recModalSection = recModal.querySelector('.recommended-section');

    recSlides.forEach(item => {
      item.addEventListener('click', (event) => {
        let recId = +item.querySelector('.recId').value;
        fetch('/products/recommended/' + recId, {
            method: 'GET'
          })
          .then((res) => res.json())
          .then(product => {
            const response = {};
            response.bucket = 'bloodborne-images';
            response.region = 'eu-central-1';
            recModalSection.innerHTML = `
              <div class="recommened-product-image">
                <img src="https://${response.bucket}.s3.${response.region}.amazonaws.com/${product.imageUrl}" alt="${product.title}">
              </div>
              <div class="product-info">
                <input type="hidden" id="hidden-price" value="${product.price}">
                <div class="product-title">
                  ${product.title}
                </div>
                <div class="product-price">
                  ${product.price}
                </div>
                <hr>
                <div class="product-description">
                  ${product.description}
                </div>
                <div class="product-size">
                  <p>Выберите размер:</p>
                  <ul>
                    <li><button class="product-size-btn">XS</button></li>
                    <li><button class="product-size-btn">S</button></li>
                    <li><button class="product-size-btn">M</button></li>
                    <li><button class="product-size-btn">L</button></li>
                    <li><button class="product-size-btn">XL</button></li>
                    <li><button class="product-size-btn">2XL</button></li>
                    <li><button class="product-size-btn">3XL</button></li>
                  </ul>
                </div>
                <div class="quantity_add">
                  <div class="quantity">
                    <p>Количество:</p>
                    <div class="product-counter">
                      <button class="counter-minus">-</button>
                      <input class="counter-value" type="number" value="1">
                      <button class="counter-plus">+</button>
                    </div>
                  </div>
                  <div class="add">
                    <input type="hidden" name="id" value="${product.id}">
                    <button class="add-to-cart" type="submit" data-id="${product.id}">Добавить в корзину
                      <span>&#8640;</span></button>
                  </div>
                </div>
              </div>
          `
          })
          .then(product => {
            openModal(recModal);
          })
          .then(product => {
            let modalAddToCartBtn = recModal.querySelector('.add-to-cart');
            console.log(modalAddToCartBtn);
            productSizeChoosing('.product-size ul', 'product-size-active');
            productCounter('.product-counter', '.counter-value', 'counter-plus', 'counter-minus');
            modalAddToCartBtn.addEventListener('click', () => {
              try {
                let cartData = getCartData() || {},
                  itemId = modalAddToCartBtn.getAttribute('data-id'),
                  itemTitle = recModal.querySelector('.product-title').textContent,
                  itemImage = recModal.querySelector('.recommened-product-image img').getAttribute('src'),
                  itemSize = recModal.querySelector('.product-size-active').textContent,
                  itemQuantity = +recModal.querySelector('.counter-value').value,
                  itemPriceForOne = +recModal.querySelector('#hidden-price').value,
                  itemPrice = +recModal.querySelector('#hidden-price').value,
                  itemTotalPrice = itemPrice * itemQuantity;
                let itemDubId;

                if (cartData.hasOwnProperty(itemId)) {
                  if (cartData[itemId][2] == itemSize) {
                    cartData[itemId][3] += itemQuantity;
                    cartData[itemId][4] += itemTotalPrice;
                    showFlashMessage('Товар успешно добавлен в корзину.');
                  } else {
                    itemDubId = itemId + itemSize;
                    showFlashMessage('Товар успешно добавлен в корзину.');
                    if (cartData[itemDubId]) {
                      if (cartData[itemDubId][2] == itemSize) {
                        cartData[itemDubId][3] += itemQuantity;
                        cartData[itemDubId][4] += itemTotalPrice;
                        showFlashMessage('Данные у товара в корзине успешно обновлены.');
                      }
                    } else {
                      cartData[itemDubId] = [itemTitle, itemImage, itemSize, itemQuantity, itemTotalPrice, itemPriceForOne];
                    }
                  }
                } else {
                  cartData[itemId] = [itemTitle, itemImage, itemSize, itemQuantity, itemTotalPrice, itemPriceForOne];
                  showFlashMessage('Товар успешно добавлен в корзину.');
                }

                setCartData(cartData);
                clearModalCart();
                showInModalCart();
                valueSection.value = 1;
                deleteInModalCart();
                properSize();
                showPrices('.total-price', '.delivery-price', '.total-modal-cost', '.modal-cart-product-price p', '.total-cost');
                productCounter('.modal-cart-product-quantity-info', '.number', 'plus', 'minus');
                productSizeChoosing('.modal-cart-product-size ul', 'modal-size-active');
                closeModal(recommendedModal);
                // if (!checkbox.checked) {
                  openCartModal();
                // }
              } catch (e) {
                console.log(e);
                showFlashMessage('Для добавления товара в корзину необходимо выбрать размер.');
              }
            });
    
          })
      })
    })
  }

  // Order step2 fetch

  function step2fetch() {
    const step2btn = document.querySelector('.continue-section button'),
          orderDetails = document.querySelector('.order-details'),
          form = document.querySelector('.order-form'),
          navTotalCost = document.querySelector('.total-cost');

    step2btn.addEventListener('click', (event) => {
      event.preventDefault();
      
      const formData = new FormData(form);
      const body = JSON.stringify(Object.fromEntries(formData.entries()));
      console.log(body);

      fetch('https://hidden-taiga-36867.herokuapp.com/order/step2', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          'X-XSRF-TOKEN': csrf
        },
        body: body
      })
      .then((res) => res.json())
      .then((order) => {
        localStorage.clear();
        navTotalCost.textContent = 0;
        orderDetails.innerHTML = `
          <h1>Заказ успешно создан</h1>
          <p class="p-details">Номер заказа: <span class="order-number">${order.id}</span></p>
        
          <div class="order-section">
            <div class="delivery-info">
              <h2>Данные для доставки</h2>
              <div class="delivery-info-list">
                <div class="input-field">
                  <p class="p-input">Имя: <span class="info">${order.name}</span></p>
                </div>
                <div class="input-field">
                  <p class="p-input">Фамилия: <span class="info">${order.surname}</span></p>
                </div>
                <div class="input-field">
                  <p class="p-input">Отчество: <span class="info">${order.patronymic}</span></p>
                </div>
                <div class="input-field">
                  <p class="p-input">Телефон: <span class="info">${order.phone}</span></p>
                </div>
                <div class="input-field">
                  <p class="p-input">Эл. Почта: <span class="info">${order.email}</span></p>
                </div>
                <div class="input-field">
                  <p class="p-input">Страна: <span class="info">${order.country}</span></p>
                </div>
                <div class="input-field">
                  <p class="p-input">Город: <span class="info">${order.town}</span></p>
                </div>
                <div class="input-field">
                  <p class="p-input">Край/Область/Регион: <span class="info">${order.region}</span></p>
                </div>
                <div class="input-field">
                  <p class="p-input">Улица, Дом, Квартира: <span class="info">${order.address}</span></p>
                </div>
                <div class="input-field">
                  <p class="p-input">Почтовый индекс: <span class="info">${order.zipcode}</span></p>
                </div>
                <hr>
                <div class="input-field">
                  <p class="p-input">Общая стоимость: <span class="info">${order.totalPrice} отг. к.</span></p>
                </div>
                <div class="input-field">
                  <p class="p-input">Стоимость доставки: <span class="info">${order.deliveryPrice} отг. к.</span></p>
                </div>
                <div class="input-field">
                  <p class="p-input">Итого: <span class="info">${order.totalCost} отг. к.</span></p>
                </div>
                <div class="continue-section">
                  <a href="/"><button type="submit">На главную <span>&#8640;</span></button></a>
                  <div class="continue-part">
                    <p class="p-part">Этап 2 <span class="span-part">из 2</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `
      })
    })

    // loginBtn.addEventListener('click', (event) => {
    //   event.preventDefault();

    //   const formData = new FormData(form);
    //   const body = JSON.stringify(Object.fromEntries(formData.entries()));

    //   fetch('http://localhost:3000/auth/login/', {
    //       method: 'POST',
    //       headers: {
    //         "Content-Type": "application/json",
    //         'X-XSRF-TOKEN': csrf
    //       },
    //       body: body
    //     })
    //     .then((res) => res.json())
    //     .then((answer) => {
    //       if (answer === 'logged in') {
    //         closeModal(loginModal);
    //         showFlashMessage('Добро пожаловать в Ярнам. Удачной охоты!');
    //         setTimeout(() => {
    //           window.location = 'http://localhost:3000/profile';
    //         }, 1000);
    //       } else if (answer === 'wrong email') {
    //         showFlashMessage('Пользователь с данным Email не найден.');
    //       } else if (answer === 'wrong password') {
    //         showFlashMessage('Email адрес и пароль не совпадают.');
    //       }
    //     })
    // })

  }




  if (document.querySelector('.continue-section button')) {
    step2fetch();
  }


  if (document.querySelector('.product-slider')) {
    productSlider();
    recommendedSlider();
    recModal();
  }
  priceSpacing('.product .product-price')
  priceSpacing('.product-info .product-price')
  priceSpacing('.recommended-slide-price .product-price')
  if (document.querySelector('.faq-section')) {
    faq();
  }
  login();
  checkOrderStatus();
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
  if (document.querySelector('.profile-list-menu-exit button')) {
    cleasrLSafeterExit();
  }
});