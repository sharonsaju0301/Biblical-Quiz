const questions = [
    {
        question: "What was the first bird that Noah sent out from the ark?",
        answers: [
            {text: "Dove", correct:false},
            {text: "Raven", correct:true},
            {text: "Sparrow", correct:false},
            {text: "Eagle", correct:false},
        ]
    },
    {
        question: "What is the first commandment with a promise?",
        answers: [
            {text: "You shall have no other gods before Me", correct:false},
            {text: "You shall not kill", correct:false},
            {text: "Remember the Sabbath day", correct:false},
            {text: "Honor your father and mother", correct:true},
        ]
    },
    {
        question: "How many plagues did God send upon Egypt?",
        answers: [
            {text: "5", correct:false},
            {text: "7", correct:false},
            {text: "10 ", correct:true},
            {text: "12", correct:false},
        ]
    },
    {
        question: "Who was the first king of Israel?",
        answers: [
            {text: "Saul", correct:true},
            {text: "David", correct:false},
            {text: "Solomon", correct:false},
            {text: "Samuel", correct:false},
        ]
    },
    {
        question: "What was Paul’s original name before his conversion?",
        answers: [
            {text: "Simon", correct:false},
            {text: "Silas", correct:false},
            {text: "Saul", correct:true},
            {text: "Levi", correct:false},
        ]
    },
    {
        question: "Which disciple walked on water with Jesus before sinking?",
        answers: [
            {text: "John", correct:false},
            {text: "Peter ", correct:true},
            {text: "Silas", correct:false},
            {text: "Andrew", correct:false},
        ]
    },
    {
        question: "What was the name of the giant that David defeated?",
        answers: [
            {text: "Goliath ", correct:true},
            {text: "Og", correct:false},
            {text: "Sihon", correct:false},
            {text: "Absalom", correct:false},
        ]
    },
    {
        question: "Who was swallowed by a great fish?",
        answers: [
            {text: "Elijah ", correct:false},
            {text: "Elisha", correct:false},
            {text: "Jonah ", correct:true},
            {text: "Moses", correct:false},
        ]
    },
    {
        question: "Who was the mother of Jesus?",
        answers: [
            {text: "Elizabeth ", correct:false},
            {text: "Ruth", correct:false},
            {text: "Mary  ", correct:true},
            {text: "Martha", correct:false},
        ]
    },
    {
        question: "In the parable of the Good Samaritan, who was the first person to pass by the injured man?",
        answers: [
            {text: "A soldier ", correct:false},
            {text: "A priest", correct:true},
            {text: "A fisherman", correct:false},
            {text: "A tax collector", correct:false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct =  answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
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
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct")
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again!";
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


startQuiz();