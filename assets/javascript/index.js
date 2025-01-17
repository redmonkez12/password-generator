const slider = document.querySelector('input[type="range"]');

slider.addEventListener('input', (event) => {
  const value = event.target.value;
  event.target.style.setProperty('--value', value);
});
