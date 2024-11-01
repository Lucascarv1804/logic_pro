const options = document.querySelectorAll('.answer');

options.forEach(option => {

    option.addEventListener('click', () => {
        options.forEach(a => a.classList.remove('selected'));
        option.classList.add('selected');
    });
});

const questions = [
    { text: "P∧¬P é uma contradição", answer: false },
    { text: "P∨¬P é uma tautologia", answer: true },
    { text: "(P∧Q)∨¬Q é uma tautologia", answer: false },
    { text: "P→(Q∨¬Q) é uma contradição", answer: false },
    { text: "(P∧Q)→P é uma contingência", answer: true },
    { text: "(P→Q)∧(Q→P) é uma contingência", answer: true },
    { text: "P→(P∧Q) é uma contradição", answer: false },
    { text: "(P∧Q)∨(P∧¬Q) é uma tautologia", answer: false },
    { text: "(P∨Q)∧(¬P∨¬Q) é uma contingência", answer: true },
    { text: "P→(Q→P) é uma tautologia", answer: true },
];

let currentQuestionIndex = 0;
let score = 0;
let timer;


function displayQuestion() {
    const questionTxt = document.querySelector(".question");
    questionTxt.textContent = questions[currentQuestionIndex].text;
}

function startTimer() {
    let timeLeft = 60;

    document.querySelector(".timer").textContent = timeLeft;

    timer = setInterval(() => {
        timeLeft--;
        document.querySelector(".timer").textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
        }
    }, 1000);
}

displayQuestion();
startTimer();
