// export const awaiting = () => {
//   const loader = document.querySelector('.cssload-loading');
//   loader.style.display = 'block';
// }

// export const stopAwaiting = () => {
//   const loader = document.querySelector('.cssload-loading');
//   loader.style.display = 'none';
// }

export const awaiting = () => {
  const body = document.getElementsByTagName('body')[0];
  const cssload_loading = document.createElement('div');
  const cssload_finger_item = document.createElement('div');
  const cssload_finger_1 = document.createElement('div');
  const cssload_finger_2 = document.createElement('div');
  const cssload_finger_3 = document.createElement('div');
  const cssload_finger_4 = document.createElement('div');
  const cssload_last_finger = document.createElement('div');
  const cssload_last_finger_item = document.createElement('div');
  const span = document.createElement('span');
  const i = document.createElement('i');

  cssload_loading.className = 'cssload-loading';
  cssload_finger_1.classList.add('cssload-finger', 'cssload-finger-1');
  cssload_finger_2.classList.add('cssload-finger', 'cssload-finger-2');
  cssload_finger_3.classList.add('cssload-finger', 'cssload-finger-3');
  cssload_finger_4.classList.add('cssload-finger', 'cssload-finger-4');
  cssload_finger_item.className = 'cssload-finger-item';
  cssload_last_finger.className = 'cssload-last-finger';
  cssload_last_finger_item.className = 'cssload-last-finger-item';

  cssload_finger_1.append(cssload_finger_item, span, i);
  cssload_finger_2.append(cssload_finger_item, span, i);
  cssload_finger_3.append(cssload_finger_item, span, i);
  cssload_finger_4.append(cssload_finger_item, span, i);
  cssload_last_finger.append(cssload_last_finger_item, i)
  cssload_loading.append(cssload_finger_1, cssload_finger_2, cssload_finger_3, cssload_finger_4, cssload_last_finger)
  body.append(cssload_loading);

  console.log(cssload_loading);
}

export const stopAwaiting = () => {
  const cssload_loading = document.querySelector('.cssload-loading');
  cssload_loading.remove();
}
