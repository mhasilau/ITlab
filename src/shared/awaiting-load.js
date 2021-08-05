export const awaiting = () => {
  const loader = document.querySelector('.cssload-loading');
  loader.style.display = 'block';
}

export const stopAwaiting = () => {
  const loader = document.querySelector('.cssload-loading');
  loader.style.display = 'none';
}
