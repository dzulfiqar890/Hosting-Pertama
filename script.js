const questions = [
    {
        question:"Siapakah Vilain di cerita ini?",
        answers: [
            {text: "Masa Lalunya", correct: false},
            {text: "Letda Hypeer", correct: false},
            {text: "Diri Sendiri", correct: false},
            {text: "Dzulfiqar", correct: true},
        ]
    },
    {
        question:"Orang Terjahat?",
        answers: [
            {text: "Ruok", correct: false},
            {text: "Kuda FF", correct: false},
            {text: "Tulis Sendiri", correct: true},
            {text: "Koruptor", correct: false},
        ]
    },
    {
        question:"Orang Baik??",
        answers: [
            {text: "Dzulfiqar", correct: false},
            {text: "Dzulfiqar", correct: false},
            {text: "Dzulfiqar", correct: false},
            {text: "Dzulfiqar Baik", correct: true},
        ]
    },
    {
        question:"Spotify?",
        answers: [
            {text: "Bulan Kencana", correct: false},
            {text: "Phonk Song", correct: true},
            {text: "Sad Song", correct: false},
            {text: "Drunk Text", correct: false},
        ]
    }
];
const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML= "Next";
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
    question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();