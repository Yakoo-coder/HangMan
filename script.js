const word_el = document.getElementById('word');
const popup = document.getElementById('popup-container');
const message_el = document.getElementById('success-message');
const wrongLetters_el = document.getElementById('wrong-letters');
const items = document.querySelectorAll('.item');
const message = document.getElementById('message');
const playAgainBtn = document.getElementById('play-again');

const correctLetters = [];
const wrongLetters = [];
let selectedWord = getRandomWord();

//Word dizisinin içindeki elemanların uzunluğunu getirir.
function getRandomWord() {
  const words = ["javascript", "java", "python", "css", "html"];
  return words[Math.floor(Math.random() * words.length)];
}

//Getirdiğimiz elemanların seçmesini yapıyoruz
function displayWord() {
  word_el.innerHTML = `
        ${selectedWord.split('').map(letter => `
            <div class="letter">
                ${correctLetters.includes(letter) ? letter : ''}
            </div>
        `).join('')}
    `;

  //Replace - Belirtilen karakteri yada karaklerleri başka bir dizge ile değiştirir

  const w = word_el.innerText.replace(/\n/g, '');
  if (w === selectedWord) {
    popup.style.display = 'flex';
    message_el.innerText = 'Tebrikler Kazandiniz';
  }
}

//Hatalı harfleri güncelleme
function updateWrongLetters() {
  wrongLetters_el.innerHTML = `
  ${wrongLetters.length > 0 ? '<h3>Hatalı Harfler</h3>' : ''}
  ${wrongLetters.map(letter => `<span>${letter}</span>`)}
  `;
  items.forEach((item, index) => {
    const errorCount = wrongLetters.length;
    if (index < errorCount) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  })
  if (wrongLetters.length === items.length) {
    popup.style.display = 'flex';
    message_el.innerText = 'Tebrikler kaybettiniz';
  }
}

function displayMessage() {
  message.classList.add('show');
  setTimeout(() => {
    message.classList.remove('show');
  }, 2000);
}

//Tekrar Oyna
playAgainBtn.addEventListener('click', function () {
  correctLetters.splice(0);
  wrongLetters.splice(0);
  selectedWord = getRandomWord();
  displayWord();
  updateWrongLetters();
  popup.style.display = 'none';
})

//Burada key kodlarını alıyoruz.
window.addEventListener('keydown', function (e) {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;
    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        displayWord();
      } else {
        displayMessage();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        updateWrongLetters();
      } else {
        displayMessage();
      }
    }
  }

});
displayWord();