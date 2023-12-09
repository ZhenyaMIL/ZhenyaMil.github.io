document.addEventListener('DOMContentLoaded', function () {
  const data = {
    "strings_array": [{
        "theme": "comics",
        "font_icon": "fa-solid fa-lightbulb",
        "words": ["cat", "dog"],
        "translate_words": ["кошка", "собака"]
      },
      {
        "theme": "movies",
        "font_icon": "fa-solid fa-child",
        "words": ["bird", "rabbit"],
        "translate_words": ["птица", "кролик"]
      },
      {
        "theme": "games",
        "font_icon": "fa-solid fa-plane",
        "words": ["superhero", "villain"],
        "translate_words": ["супергерой", "злодей"]
      }
    ],
    "usernames_array": [{
        "userId": "user1",
        "premium": "fallse",
        "premium_data_end": "null",
        "themes_display": [{
            "theme": "comics",
            "display": true,
            "progress": [0.3, 0.5, 0.8]
          },
          {
            "theme": "movies",
            "display": false,
            "progress": [0.3, 0.4, 0.4]
          },
          {
            "theme": "games",
            "display": true,
            "progress": [0.1, 0.9, 0.2]
          }
        ]
      },
      {
        "userId": "user-8Wl9Y",
        "premium": "fallse",
        "premium_data_end": "null",
        "themes_display": [{
            "theme": "comics",
            "display": true,
            "progress": [0.2, 0.2, 0.2]
          },
          {
            "theme": "movies",
            "display": true,
            "progress": [0.1, 0.1, 0.1]
          },
          {
            "theme": "games",
            "display": true,
            "progress": [0.9, 0.9, 0.9]
          }
        ]
      }
    ]
  }

  function generateUserId() {
    let result = 'user-';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;

    for (let i = 0; i < 5; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }

  // Функция для проверки наличия пользователя в локальном хранилище
  function checkLocalStorage() {
    const storedUserId = localStorage.getItem('userId');

    if (storedUserId) {
      console.log(`С возвращением: ${storedUserId}`);
    } else {
      const newUserId = generateUserId();
      localStorage.setItem('userId', newUserId);
      console.log(`Ваш уникальный никнейм: ${newUserId}`);
    }
  }

  // Вызов функции при загрузке страницы для проверки наличия пользователя в локальном хранилище
  checkLocalStorage();


  // Получаем userId из локального хранилища (localStorage) или источника данных
  const userId = "user-8Wl9Y"; // Замените это на фактическое получение userId

  // Функция для получения всех тем, которые нужны пользователю по их userId
  function getNeededThemesForUser(userId, data) {
    const user = data.usernames_array.find((user) => user.userId === userId);

    if (!user) {
      console.error("Пользователь не найден");
      return [];
    }

    const userThemes = user.themes_display.filter((theme) => theme.display);
    const allThemes = data.strings_array;

    const neededThemes = userThemes.map((userTheme) => {
      const foundTheme = allThemes.find((theme) => theme.theme === userTheme.theme);
      if (foundTheme) {
        return foundTheme;
      } else {
        console.warn(`Тема ${userTheme.theme} не найдена`);
        return null;
      }
    });

    return neededThemes.filter((theme) => theme !== null);
  }


  // Получаем все темы, которые нужны пользователю по их userId
  const neededThemesForUser = getNeededThemesForUser(userId, data);
  console.log("Темы, которые нужны пользователю:", neededThemesForUser);

  // Находим контейнер, в который будем добавлять круги с названиями тем
  const themesContainer = document.querySelector('.themes-container');

  // Создаем круги для каждой темы и добавляем их в контейнер
  neededThemesForUser.forEach(theme => {
    const themeCircle = document.createElement('div');
    themeCircle.classList.add('theme-circle');

    // Создаем иконку на основе класса font_icon
    const icon = document.createElement('i');
    const class_font_icon = theme.font_icon;

    // Проверка наличия пробелов в строке с классами
    if (class_font_icon.indexOf(' ') !== -1) {
      // Если пробелы есть, разделяем строку на отдельные классы и добавляем их циклом
      let classNames = class_font_icon.split(' ');

      classNames.forEach(function (className) {
        icon.classList.add(className);
      });
    } else {
      // Если пробелов нет, просто добавляем класс к элементу
      icon.classList.add(class_font_icon);
    }

    themeCircle.appendChild(icon);

    const themeName = document.createElement('div');
    themeName.classList.add('theme-name');
    themeName.textContent = theme.theme;

    themeCircle.appendChild(themeName);
    themesContainer.appendChild(themeCircle);
  });

  // Добавляем обработчик при клике на кружек
  let themeCircle = document.querySelectorAll('.theme-circle');

  themeCircle.forEach(circle => {
    circle.addEventListener('click', () => {
      let learningBlock = document.querySelector('.learning-block');
      learningBlock.classList.toggle('hide');
    })
  });



  //////////////////////Конструктор слов
  const word = "current";

  const inputResultText = document.querySelector('#inputField');
  const dataCorrectAnswer = word;

  inputResultText.setAttribute('data-correct-answer', word);


  // Функция для извлечения уникальных букв
  function extractUniqueLetters(str) {
    return Array.from(new Set(str)).join('');
  }

  // Получаем уникальные буквы из слова "current" и подсчитываем количество их появлений
  const uniqueLetters = extractUniqueLetters(word);
  const letterCounts = {};
  for (let letter of word) {
    if (letterCounts[letter]) {
      letterCounts[letter]++;
    } else {
      letterCounts[letter] = 1;
    }
  }

  // Создаем квадратики с буквами, добавляем стили, выводим количество повторений, добавляем data-letter и data-value атрибуты,
  // и добавляем обработчик клика
  const uniqueLettersElement = document.getElementById('uniqueLetters');
  for (let letter of uniqueLetters) {
    const letterBox = document.createElement('div');
    letterBox.classList.add('letter-box');

    const paragraph = document.createElement('p'); // Создаем элемент параграфа
    paragraph.textContent = letter; // Устанавливаем текст внутрь параграфа

    letterBox.appendChild(paragraph);

    const count = document.createElement('div');
    count.classList.add('count');
    count.textContent = letterCounts[letter];
    letterBox.appendChild(count);

    letterBox.setAttribute('data-letter', letter); // Добавляем data-letter атрибут
    letterBox.setAttribute('data-value', letterCounts[letter]); // Добавляем data-value атрибут

    letterBox.addEventListener('click', function () {


      let currentValue = parseInt(this.getAttribute('data-value'));
      if (currentValue > 0) {
        document.getElementById('inputField').value += this.getAttribute('data-letter');
        currentValue--;
        this.setAttribute('data-value', currentValue);
        count.textContent = currentValue; // Обновляем текст в элементе .count
      }

      const ifNoLetter = checkSumOfDataValues();

      if (ifNoLetter) {
        const inputValueLower = inputResultText.value.toLowerCase(); // Приводим значение инпута к нижнему регистру
        const dataCorrectAnswerLower = dataCorrectAnswer.toLowerCase(); // Приводим значение инпута к нижнему регистру

        if (inputValueLower === dataCorrectAnswerLower) {
          inputResultText.classList.add('green-highlight'); // Если значения совпадают, добавляем класс для зеленой подсветки
        } else {
          inputResultText.classList.add('red-highlight'); // Если значения не совпадают, добавляем класс для красной подсветки
        }
      }
    });

    uniqueLettersElement.appendChild(letterBox);
  }

  // Обработчик события клика на кнопку удаления последней буквы
  document.getElementById('removeLetterBtn').addEventListener('click', function () {
    const inputField = document.getElementById('inputField');
    const inputValue = inputField.value;
    if (inputValue.length > 0) {
      const lastLetter = inputValue.charAt(inputValue.length - 1);
      inputField.value = inputValue.slice(0, -1); // Удаление последней буквы из inputField

      const letterBoxes = document.querySelectorAll('.letter-box');
      for (let box of letterBoxes) {
        const dataLetter = box.getAttribute('data-letter');
        const dataValue = parseInt(box.getAttribute('data-value'));
        if (dataLetter === lastLetter) {
          box.setAttribute('data-value', dataValue + 1); // Увеличиваем data-value на 1
          box.querySelector('.count').textContent = dataValue + 1;
          break;
        }
      }
    }
  });

  function checkSumOfDataValues() {
    const letterBoxes = document.getElementById('uniqueLetters').querySelectorAll('.letter-box'); // Получаем все элементы с классом .letter-box внутри блока с ID uniqueLetters
    let sum = 0;

    // Проходимся по каждому элементу .letter-box и суммируем значения их атрибутов data-value
    letterBoxes.forEach(box => {
      const dataValue = parseInt(box.getAttribute('data-value')); // Получаем значение атрибута data-value и преобразуем его в число
      sum += dataValue; // Суммируем значения
    });

    // Возвращаем результат сравнения суммы с условием
    return sum === 0;
  }





  // Находим элемент с классом 'close-btn'
  var closeButton = document.querySelector('.close-btn');

  // Добавляем обработчик события click
  closeButton.addEventListener('click', function () {
    var block = document.querySelector('.learning-block');
    block.classList.add('hide');
  });




});