  //References
  let timeLeft = document.querySelector(".time-left");
  let quizContainer = document.getElementById("container");
  let nextBtn = document.getElementById("next-button");
  let countOfQuestion = document.querySelector(".number-of-question");
  let displayContainer = document.getElementById("display-container");
  let scoreContainer = document.querySelector(".score-container");
  let finish = document.getElementById("finish");
  let userScore = document.getElementById("user-score");
  let startScreen = document.querySelector(".start-screen");
  let questionCount;
  let scoreCount = 0;
  let count = 11;
  let countdown;
  let themes = document.querySelectorAll('.theme-block');
  let quizData;
  let dataOfCurrentTheme;

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i); // Get the key at index i
    const value = localStorage.getItem(key); // Get the value associated with the key
    
    if(key.includes("theme-")){
      let id = key.split("theme-")[1];
      let theme = document.querySelectorAll(`.theme-block`)[`${id}`];

      theme.classList.add('approved');
    }
  }


  themes.forEach(theme => {
    theme.addEventListener('click', () => {
      dataOfCurrentTheme = +theme.getAttribute("id");
      quizData = data[dataOfCurrentTheme];
      displayContainer.classList.remove("hide");
      initial();
    })
  });


  function approvedKnowledge(themeId) {
    let theme = document.querySelectorAll(`.theme-block`)[`${themeId}`];
    theme.classList.add('approved');

    localStorage.setItem(`theme-${themeId}`, "approved")
  }

  //Questions and Options array


  //Restart Quiz
  finish.addEventListener("click", () => {
    scoreContainer.classList.add("hide");
  });

  //Next Button
  nextBtn.addEventListener(
    "click",
    (displayNext = () => {
      //increment questionCount
      questionCount += 1;
      //if last question
      if (questionCount == quizData.length) {
        //hide question container and display score
        displayContainer.classList.add("hide");
        scoreContainer.classList.remove("hide");
        //user score
        userScore.innerHTML =
          "Правильні відповіді: " + scoreCount + " з " + scoreCount;
        if(scoreCount/scoreCount > 0,8) {
          approvedKnowledge(dataOfCurrentTheme);
        }
      } else {
        //display questionCount
        countOfQuestion.innerHTML =
          questionCount + 1 + " з " + quizData.length;
        //display quiz
        quizDisplay(questionCount);
        count = 11;
        clearInterval(countdown);
        timerDisplay();
      }
    })
  );

  //Timer
  const timerDisplay = () => {
    countdown = setInterval(() => {
      count--;
      timeLeft.innerHTML = `${count} cек`;
      if (count == 0) {
        clearInterval(countdown);
        displayNext();
      }
    }, 1000);
  };

  //Display quiz
  const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");
    //Hide other cards
    quizCards.forEach((card) => {
      card.classList.add("hide");
    });
    //display current question card
    quizCards[questionCount].classList.remove("hide");
  };

  //Quiz Creation
  function quizCreator() {
    //randomly sort questions
    quizData.sort(() => Math.random() - 0.5);
    //generate quiz
    for (let i of quizData) {
      //randomly sort options
      i.options.sort(() => Math.random() - 0.5);
      //quiz card creation
      let div = document.createElement("div");
      div.classList.add("container-mid", "hide");
      //question number
      countOfQuestion.innerHTML = 1 + " з " + quizData.length;
      //question
      let question_DIV = document.createElement("p");
      question_DIV.classList.add("question");
      question_DIV.innerHTML = i.question;
      div.appendChild(question_DIV);
      //options
      div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
      quizContainer.appendChild(div);
    }
  }

  //Checker Function to check if option is correct or not
  function checker(userOption) {
    let userSolution = userOption.innerText;
    let question =
      document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");

    //if user clicked answer == correct option stored in object
    if (userSolution === quizData[questionCount].correct) {
      userOption.classList.add("correct");
      scoreCount++;
    } else {
      userOption.classList.add("incorrect");
      //For marking the correct option
      options.forEach((element) => {
        if (element.innerText == quizData[questionCount].correct) {
          element.classList.add("correct");
        }
      });
    }

    //clear interval(stop timer)
    clearInterval(countdown);
    //disable all options
    options.forEach((element) => {
      element.disabled = true;
    });
  }

  //initial setup
  function initial() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    count = 11;
    clearInterval(countdown);
    timerDisplay();
    quizCreator();
    quizDisplay(questionCount);
  }

  //hide quiz and display start screen
  window.onload = () => {
  displayContainer.classList.add("hide");
  };