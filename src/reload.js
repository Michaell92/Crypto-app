function reload(id) {
  if (document.getElementById('reload')) return;

  // Create message
  const message = document.createElement('div');
  const image = document.createElement('img');

  message.id = 'reload';
  message
    .appendChild(document.createElement('h1'))
    .appendChild(document.createTextNode("Couldn't connect."));

  message
    .appendChild(document.createElement('a'))
    .appendChild(image)
    .setAttribute('src', '../img/reload.png');
  message.childNodes[1].setAttribute('href', '#');
  message.childNodes[1].setAttribute('data-message', 'Try Again');
  message.childNodes[1].setAttribute('class', 'back');

  document.getElementById(id).appendChild(message);

  image.addEventListener('click', (e) => {
    e.preventDefault();
    location.reload();
  });
}

export default reload;
