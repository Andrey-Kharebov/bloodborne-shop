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
    if (tabs.length) { // костыль! переделать
      homeTabs[i].style.display = 'block';
      tabs[i].classList.add('tab-active');
    }
  }


  hideHomeTabs();
  showHomeTabs();

  if (tabs.length) { // костыль! переделать
    switchers.addEventListener('click', (event) => {
      const target = event.target;
  
      if (target && target.classList.contains('tab')) {
        tabs.forEach((item, i) => {
          if (target == item) {
            hideHomeTabs();
            showHomeTabs(i);
            console.log('hello');
          }
        });
      } 
    });
  }
  
  // Product page counter plus/minus

  const counter = document.querySelector('.product-counter');
  if (counter) {
    let value = +document.querySelector('.counter-value').value;
    counter.addEventListener('click', (event) => {
      if (event.target.classList.contains('counter-plus')) {
        value++;
        console.log(value);
      }

      if (event.target.classList.contains('counter-minus')) {
        value--;
        console.log(value);
      }
    });
  }

  // Modal

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
    if (event.currentTarget === container) {
      closeCartModal();
    }
  });


  navCartBox.addEventListener('click', (event) => {
    openCartModal();
  });

  closeModal.addEventListener('click', (e) => {
    closeCartModal();
  });
});