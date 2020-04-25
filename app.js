/**
 * Example store structure
 */
const store = {
  // 5 or more questions are required
  questions: [
    {
      question: 'Who is the mayor of Pelican Town?',
      answers: [
        'Emily',
        'Gus',
        'Lewis',
        'Marnie'
      ],
      correctAnswer: 'Lewis',
      incorrectDesc: 'The mayor of Pelican Town is Lewis.',
      factoid: 'insert random fact about lewis here.'
    },
    {
      question: 'How long is each season?',
      answers: [
        '1 month',
        '2 months',
        '3 months',
        '4 months'
      ],
      correctAnswer: '1 month'
    },
    {
      question: 'Who do you inherit your farm from?',
      answers: [
        'Your dad',
        'Your grandfather',
        'Gus',
        'Elliot'
      ],
      correctAnswer: 'Your grandfather'
    },
    {
      question: 'Who runs the Saloon?',
      answers: [
        'Linus',
        'Emily',
        'Gus',
        'Marnie'
      ],
      correctAnswer: 'Gus'
    },
    {
      question: 'Where do you give items to the Junimos?',
      answers: [
        'The Caves',
        'The Community Center',
        'JojaMart',
        'The Beach'
      ],
      correctAnswer: 'The Community Center'
    }
  ],
  answer: '',
  quizStarted: false,
  questionNumber: 0,
  score: 0
};

/**
 * 
 * Technical requirements:
 * 
 * Your app should include a render() function, that regenerates the view each time the store is updated. 
 * See your course material, consult your instructor, and reference the slides for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 * 
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates
function generateQuizQuestion() {
  // Generate a question in the quiz
  html = `<section class='js-main-screen'>
            <h2 class='js-question-box'>${store.questions[store.questionNumber].question}</h2>
            <form action='' id='js-answer-form' class='js-answer-box'>`;
  html += generateQuizCount();
  let i = 1;
  store.questions[store.questionNumber].answers.forEach(quizAnswer => {
    console.log(quizAnswer);
    html += `<div class='input-container'>
              <input type="radio" name="answer" id='answer${i}' value='${quizAnswer}'>
              <label for='answer${i}'>${quizAnswer}</label>
            </div>`;
    i++;
  })

  html += ` <section class='js-answer-eval'></section>
            <button type ='submit' class='js-answer-button'>Submit</button>
          </form>
          </section>`;

  return html;
};

//use :checked to make radio box checked
//use invalid to make radio box unselectable?
//or disabled?

function generateQuizFeedback() {
    let html = '';
    let incorrectFlag = false;
    let correct = store.questions[store.questionNumber].correctAnswer;
    html += `<section class='js-main-screen'>
              <h2 class='js-question-box'>${store.questions[store.questionNumber].question}</h2>
              <form action='' id='js-answer-form' class='js-answer-box'>`
    html += generateQuizCount();
    let i = 1;
    store.questions[store.questionNumber].answers.forEach(quizAnswer => {
      if (quizAnswer != correct && quizAnswer === store.answer) {
        incorrectFlag = !incorrectFlag;
        html += `<div class='input-container incorrect'>`;
      } else {
        if (quizAnswer === correct) {
          html += `<div class='input-container correct'>`;
          if(correct === store.answer) {
            store.score++;
          }
        } else {
          html += `<div class='input-container'>`;
        }
      }
      html += `<input type="radio" name="answer" id='answer${i} value='${quizAnswer}'>`;
      html += `<label for='answer${i}'>${quizAnswer}</label>`;
      html += `</div>`;
      i++;
    })

    if (incorrectFlag) {
      html += `<section class='js-answer-eval incorrect'>
               Incorrect! ${store.questions[store.questionNumber].incorrectDesc}.  Did you know? ${store.questions[store.questionNumber].factoid}</section>`;
    } else {
      html += `<section class='js-answer-eval correct'></section>`;
    }

    html += `<button type ='submit' class='js-continue-button'>Continue</button>
          </form>
          </section>`;

    store.questionNumber++;
    return html;
}

function generateQuizCount() {
  // return a html string that is the current question, total questions, and total questions right
  return `<h3>Question ${(store.questionNumber + 1)}/${store.questions.length}. ${store.score} correct.</h3>`;
};

function generateTitleScreen() {
  // Generate our initial screen and restart
  return `
    <section class='js-main-screen'>
      <h2 class="inner-box">Placeholder text</h2>
      <button type='button' class='js-start-button'>Start!</button>
    </section>`;
};

function generateEndSceen() {
  // Generate our quiz results
  return `
    <section class='js-main-screen'>
      <div class='js-results-container'>
        <h2 class='js-results-text'>Your results</h2>
        <h3 class='js-results-text'>You got ${store.score} right out of ${store.questions.length}</h2>
        <h3 class='js-results-text'>The percent you got correct was ${Math.floor((store.score / store.questions.length) * 100)}</h2>
      </div>
        <button class='js-end-button'>Play again!</button>
    </section>`
};

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store
function renderQuizScreen() {

  let generateString = '';
  if (!store.quizStarted) {
    generateString = generateTitleScreen();
  }
  else if (store.questionNumber >= store.questions.length) {
    generateString = generateEndSceen();
  }
  else {
    //1. render the question screen
    //2. render correct
    //3. render wrong
    if(store.answer){
      generateString = generateQuizFeedback();
    } else {
      generateString = generateQuizQuestion();
    }
  }

  $('main').html(generateString);
}

/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)



function handleAnswerSubmitted() {
  $('main').on('submit', '#js-answer-form', (event) => {
    event.preventDefault();
    // Retrieve answer identifier of user-checked radio btn
    store.answer = $('input[name="answer"]:checked').val();
    renderQuizScreen();
  });
}

function handleStartQuiz() {
  $('main').on('click', '.js-start-button', (event) => {
    event.preventDefault();
    store.quizStarted = !store.quizStarted;
    renderQuizScreen();
  })
};

function handleNextQuestion() {
  $('main').on('click', '.js-continue-button', (event) => {
    store.answer = '';
    renderQuizScreen();
  })
}

function handleEndQuiz() {
  $('main').on('click', '.js-end-button', (event) => {
    store.score = 0;
    store.questionNumber = 0;
    store.quizStarted = false;
    renderQuizScreen();
  })
}

function handleQuizApp() {
  renderQuizScreen();
  handleStartQuiz();
  handleNextQuestion();
  handleAnswerSubmitted();
  handleEndQuiz();
}

//On page load, call this fuction that attatched event listeners
$(handleQuizApp);