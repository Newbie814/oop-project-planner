console.log('Setting up analytics');

const int = setInterval(() => {
  console.log('Setting up analytics');
}, 2000);

const stopBtn = document.getElementById('stop-analytics-btn');

stopBtn.addEventListener('click', () => {
  clearInterval(int);
});
