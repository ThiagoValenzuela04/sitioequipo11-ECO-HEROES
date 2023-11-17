const trashCans = document.querySelectorAll('.trash-can');
const trashes = document.querySelectorAll('.trash');

trashes.forEach(trash => {
  trash.addEventListener('mousedown', startDragging);

  // Generar posiciones aleatorias para cada objeto de basura
  const gameAreaRect = document.querySelector('.game-area').getBoundingClientRect();
  const trashRect = trash.getBoundingClientRect();

  const randomLeft = Math.floor(Math.random() * (gameAreaRect.width - trashRect.width));
  const randomTop = Math.floor(Math.random() * (gameAreaRect.height - trashRect.height));

  trash.style.left = `${randomLeft}px`;
  trash.style.top = `${randomTop}px`;
});

function startDragging(event) {
  const trashId = event.target.id;
  const trash = document.getElementById(trashId);

  const offsetX = event.clientX - trash.getBoundingClientRect().left;
  const offsetY = event.clientY - trash.getBoundingClientRect().top;

  trash.style.zIndex = "1"; // Asegurar que el objeto arrastrado esté en la capa superior

  document.addEventListener('mousemove', dragTrash);
  document.addEventListener('mouseup', stopDragging);

  function dragTrash(event) {
    const trashCan = document.getElementById('trash-can');
    const trashCanRect = trashCan.getBoundingClientRect();

    if (
      event.clientX >= trashCanRect.left &&
      event.clientX <= trashCanRect.right &&
      event.clientY >= trashCanRect.top &&
      event.clientY <= trashCanRect.bottom
    ) {
      trash.style.opacity = '0';
      trash.style.pointerEvents = 'none';
    } else {
      const gameAreaRect = document.querySelector('.game-area').getBoundingClientRect();

      trash.style.left = `${event.clientX - gameAreaRect.left - offsetX}px`;
      trash.style.top = `${event.clientY - gameAreaRect.top - offsetY}px`;
    }
  }

  function stopDragging() {
    trash.style.zIndex = "0"; // Restaurar la capa original del objeto
    document.removeEventListener('mousemove', dragTrash);
    document.removeEventListener('mouseup', stopDragging);
  }

  event.preventDefault();
}

