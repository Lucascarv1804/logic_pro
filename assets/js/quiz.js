const options = document.querySelectorAll('.answer');
const nome = localStorage.getItem("name");
options.forEach(option => {
    option.addEventListener('click', () => {
        options.forEach(a => a.classList.remove('selected'));
        option.classList.add('selected');
        
        const userAnswer = option.classList.contains('true');
        checkAnswer(userAnswer);
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
            showFeedback(false);
            currentQuestionIndex++;
            
            if (currentQuestionIndex < questions.length) {
                setTimeout(() => {
                    displayQuestion();
                    startTimer();
                    resetOptions();
                }, 2000);
            } else {
                endGame();
            }
        }
    }, 1000);
}

function checkAnswer(userAnswer) {
    clearInterval(timer);
    const correctAnswer = questions[currentQuestionIndex].answer;

    if (userAnswer === correctAnswer) {
        score += 10;
        showFeedback(true);
        updateScore(score);
    } else {
        showFeedback(false);
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        setTimeout(() => {
            displayQuestion();
            startTimer();
            resetOptions();
        }, 2000);
    } else {
        endGame();
    }
}

function showFeedback(isCorrect) {
    const feedback = document.getElementById("feedback");
    const feedbackText = document.getElementById("feedback-text");
    feedback.classList.remove("hidden");
    feedback.classList.add("visible");

    feedbackText.textContent = isCorrect ? "Correto!" : "Incorreto!";

    setTimeout(() => {
        feedback.classList.remove("visible");
        feedback.classList.add("hidden");
    }, 1200);
}

function resetOptions() {
    options.forEach(option => {
        option.classList.remove('selected');
    });
}

function endGame() {
    clearInterval(timer);
    const questionTxt = document.querySelector(".question");
    questionTxt.textContent = `Fim do jogo ${nome}! Sua pontuação foi de: ${score}`;

    options.forEach(option => {
        option.disabled = true;
    });
    adicionarRanking(nome, score);
}

function updateScore(newScore) {
    const scoreElement = document.querySelector(".points");
    scoreElement.textContent = newScore;
}

function adicionarRanking(nome, score) {
    const usuario = {
        nome: nome,
        score: score
    };
    const ranking = JSON.parse(localStorage.getItem("ranking")) || [];
    const maxRanking = 5;

    if (ranking.length < maxRanking || ranking.some(u => u.score < usuario.score)) {
        ranking.push(usuario);
        ranking.sort((a, b) => b.score - a.score);
        ranking.splice(maxRanking);
        const newJson = JSON.stringify(ranking);
        localStorage.setItem("ranking", newJson);
    }
}

displayQuestion();
startTimer();
console.log("Ranking:", localStorage.getItem("ranking"));
