document.querySelectorAll('.custom-select').forEach(select => {
  const trigger = select.querySelector('.custom-select__trigger');
  const options = select.querySelectorAll('.custom-option');
  const placeholder = select.querySelector('.custom-select__placeholder');
  const input = document.querySelector('#serviceInput');

  trigger.addEventListener('click', () => {
    select.classList.toggle('open');
  });

  options.forEach(option => {
    option.addEventListener('click', () => {
      placeholder.textContent = option.textContent;
      input.value = option.dataset.value;
      select.classList.remove('open');
      placeholder.style.color = '#000';
    });
  });
});

window.addEventListener('click', e => {
  document.querySelectorAll('.custom-select').forEach(select => {
    if (!select.contains(e.target)) {
      select.classList.remove('open');
    }
  });
});
