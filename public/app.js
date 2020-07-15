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
    homeTabs[i].style.display = 'block';
    tabs[i].classList.add('tab-active');
  }

  hideHomeTabs();
  showHomeTabs();

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
});