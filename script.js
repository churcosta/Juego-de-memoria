// Definimos las imágenes para el juego con las rutas locales de tus imágenes
const images = [
    './Registro/Cuadro1.jpg', './Registro/Cuadro2.jpg', './Registro/Cuadro3.jpg', './Registro/Cuadro4.jpg', './Registro/Cuadro5.jpg', './Registro/Cuadro6.jpg', './Registro/Cuadro7.jpg', './Registro/Cuadro8.jpg',
    './Registro/Cuadro1.jpg', './Registro/Cuadro2.jpg', './Registro/Cuadro3.jpg', './Registro/Cuadro4.jpg', './Registro/Cuadro5.jpg', './Registro/Cuadro6.jpg', './Registro/Cuadro7.jpg', './Registro/Cuadro8.jpg'
  ];

  
  // Barajamos las imágenes
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  // Crear las tarjetas
  function createBoard() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = ''; // Reinicia el tablero antes de crear uno nuevo
    shuffle(images);
  
    images.forEach(image => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.dataset.image = image;
  
      const img = document.createElement('img');
      img.src = image; // Aquí usamos la ruta de la imagen
      img.alt = image;

      card.appendChild(img);
      gameBoard.appendChild(card);
  
      card.addEventListener('click', flipCard);
    });
  }
  
  // Maneja el flip de las cartas
  let flippedCards = [];
  let matchedPairs = 0;
  let remainingPairs = 8;
  
  function flipCard() {
    if (flippedCards.length === 2 || this.classList.contains('flipped') || this.classList.contains('matched')) return;
  
    this.classList.add('flipped');
    flippedCards.push(this);
  
    // Verificar si las cartas coinciden
    if (flippedCards.length === 2) {
      const [card1, card2] = flippedCards;
  
      if (card1.dataset.image === card2.dataset.image) {
        // Coincidencia
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedPairs++;
        remainingPairs--;
  
        // Actualizar contador de parejas
        document.getElementById('matched-pairs').textContent = matchedPairs;
        document.getElementById('remaining-pairs').textContent = remainingPairs;
      } else {
        // No coinciden
        setTimeout(() => {
          card1.classList.remove('flipped');
          card2.classList.remove('flipped');
        }, 1000);
      }
  
      flippedCards = [];
    }
  }
  
// Reiniciar el juego al hacer clic en el botón "INICIAR JUEGO"
document.getElementById('iniciar').addEventListener('click', () => {
  matchedPairs = 0;
  remainingPairs = 8;
  flippedCards = [];

  // Reiniciar los contadores
  document.getElementById('matched-pairs').textContent = matchedPairs;
  document.getElementById('remaining-pairs').textContent = remainingPairs;

  // Crear un nuevo tablero
  createBoard();
});

// Cargar el tablero al iniciar la página
window.onload = createBoard;