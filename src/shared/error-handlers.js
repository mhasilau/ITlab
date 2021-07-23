export const showErrorNotification = error => {
  const board = document.querySelector('.info-message')
  const message = document.querySelector('.show-info-message')
  const block = () => board.style.display = 'none';
  board.style.display = 'block';
  message.innerText = error.response.data.error.message;
  setTimeout(block, 3000)
}
