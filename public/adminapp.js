console.log('admin');

// Select 

document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('select');
  var instances = M.FormSelect.init(elems);
});

console.log(document.querySelector('select').value);