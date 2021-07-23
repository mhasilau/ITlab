export const showErrorNotification = error => {
  const board = document.querySelector('.info-message')
  const message = document.querySelector('.show-info-message')
  message.innerText = error.response.data.error.message;
  board.style.display = 'block';
  const block = () => board.style.display = 'none';
  setTimeout(block, 3000)
}
