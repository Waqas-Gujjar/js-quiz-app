let currentQuiz = 0;
let score = 0;

const questionEl = document.getElementById('question');
const answerEls = document.querySelectorAll('.answer');
const option1 = document.getElementById('option-1');
const option2 = document.getElementById('option-2');
const option3 = document.getElementById('option-3');
const option4 = document.getElementById('option-4');
const submitBtn = document.getElementById('submit');
const scoreDisplay = document.getElementById('score-display');

// Load the current quiz question
function loadQuiz() {
    deselectAnswers();

    const currentQuizData = quizData[currentQuiz];

    questionEl.innerText = currentQuizData.question;
    option1.innerText = currentQuizData.a;
    option2.innerText = currentQuizData.b;
    option3.innerText = currentQuizData.c;
    option4.innerText = currentQuizData.d;
}

// Deselect previously selected answers
function deselectAnswers() {
    answerEls.forEach(answerEl => answerEl.checked = false);
}

// Get the selected answer
function getSelected() {
    let answer;
    answerEls.forEach(answerEl => {
        if (answerEl.checked) {
            answer = answerEl.id;
        }
    });
    return answer;
}

// Load the first question
loadQuiz();

// Event listener for the submit button
submitBtn.addEventListener('click', () => {
    const answer = getSelected();

    if (answer) {
        if (answer === quizData[currentQuiz].correct) {
            score++;
        }

        currentQuiz++;

        if (currentQuiz < quizData.length) {
            loadQuiz();
        } else {
            // Show results with a centered reload button
            document.getElementById('quiz').innerHTML = `
                <h2>You answered ${score}/${quizData.length} questions correctly.</h2>
                <div class="btn-container">
                    <button id="reload" onclick="location.reload()">Reload</button>
                </div>
            `;

            // Apply inline CSS styles to the reload button
            const reloadBtn = document.getElementById('reload');
            reloadBtn.style.backgroundColor = 'blueviolet';
            reloadBtn.style.color = 'white';
            reloadBtn.style.padding = '10px 20px';
            reloadBtn.style.fontSize = '1.5rem';
            reloadBtn.style.border = 'none';
            reloadBtn.style.borderRadius = '50px';
            reloadBtn.style.cursor = 'pointer';
            reloadBtn.style.marginTop = '20px';

            // Apply flexbox centering to the button container
            const btnContainer = document.querySelector('.btn-container');
            btnContainer.style.display = 'flex';
            btnContainer.style.justifyContent = 'center';
            btnContainer.style.marginTop = '20px';
        }

        // Update score display
        scoreDisplay.innerText = `Score: ${score}`;
    } else {
        alert('Please select an answer before submitting!');
    }
});
