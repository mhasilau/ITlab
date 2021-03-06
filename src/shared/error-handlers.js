export const showErrorNotification = error => {
  const board = document.querySelector('.info-message')
  const message = document.querySelector('.show-info-message')
  const block = () => board.style.display = 'none';
  board.style.display = 'block';
  message.innerText = error.response ? error.response.data.error.message : error.message;
  setTimeout(block, 3000)
}

export const errorNotification = error => {
  const board = document.querySelector('.info-message-user-main')
  const message = document.querySelector('.show-info-message')
  const block = () => board.style.display = 'none';
  board.style.display = 'block';
  message.innerText = error
  setTimeout(block, 3000)
}
