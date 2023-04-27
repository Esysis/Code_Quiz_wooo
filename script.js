const startButton = document.getElementById('start-button');
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonContainer = document.getElementById('answer-buttons'); // Add this line
const answerButtons = answerButtonContainer.getElementsByClassName('answer-button'); // Modify this line
Array.from(answerButtons).forEach(button => {
    button.addEventListener('click', () => {
        checkAnswer(button.textContent);
    });
});
const gameOver = document.getElementById('game-over');
const initialsInput = document.getElementById('initials');
const saveScoreButton = document.getElementById('save-score');
const questions = [
    {
        question: "Which do we use to style the webpage?",
        options: ["CSS", "JavaScript", "HTML", "Turkey Sandwich"],
        correctAnswer: "CSS"
    },
    {
        question: "what do we use to make the page interactive?",
        options: ["CSS", "JavaScript", "HTML", "Turkey Sandwich"],
        correctAnswer: "JavaScript"
    },
    {
        question: "What makes the <body> and <header>?",
        options: ["CSS", "JavaScript", "HTML", "Turkey Sandwich"],
        correctAnswer: "HTML"
    },
    {
        question: "WHich of these uses if else statements?",
        options: ["CSS", "JavaScript", "HTML", "Turkey Sandwich"],
        correctAnswer: "JavaScript"
    },
    {
        question: "Which of these can we change what the pointer will look like while hovering?",
        options: ["CSS", "JavaScript", "HTML", "Turkey Sandwich"],
        correctAnswer: "CSS"
    }
];


startButton.addEventListener('click', startQuiz)
saveScoreButton.addEventListener('click', saveScore)

let timer;
let currentQuestionIndex = 0;

function startQuiz() {
    startButton.classList.add('hidden');
    questionContainer.classList.remove('hidden');
    timer = 60;
    startTimer();
    showQuestion();
}

let intervalId

function startTimer() {
    const timerElement = document.createElement('div');
    timerElement.id = 'timer';
    document.body.appendChild(timerElement);

    intervalId = setInterval(() => {
        timer--;
        timerElement.textContent = `Time remaining: ${timer}s`;

        if (timer <= 0) {
            clearInterval(intervalId);
            endQuiz();
        }
    }, 1000);
}

function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];

    questionElement.textContent = currentQuestion.question;

    Array.from(answerButtons).forEach((button, index) => {
        button.textContent = currentQuestion.options[index];
    });
}

function checkAnswer(answer) {
    const currentQuestion = questions[currentQuestionIndex];

    if(answer !== currentQuestion.correctAnswer) {
        timer -= 10;
    }

    currentQuestionIndex++;

    if(currentQuestionIndex < questions.length) {
        showQuestion();
    } 
    else {
        endQuiz();
    }
}

function endQuiz() {
    questionContainer.classList.add('hidden');
    gameOver.classList.remove('hidden');
    clearInterval(intervalId);
}

function saveScore() {
    event.preventDefault();
    const initials = initialsInput.value;
    const score = timer;

    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    const newScore = {
        initials: initials,
        score: score
    };

    highScores.push(newScore);
    highScores.sort((a, b) => b.score - a.score);

    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.href = 'highscores.html';
} 