import quizDataRaw from './questions.js';

let quizData = [];
let currentIndex = 0;
let score = 0;
let userProgressState = []; 
let userSelectedAnswers = []; 

// DOM Elements Link Map
const flashcard = document.getElementById('flashcard');
const questionText = document.getElementById('questionText');
const optionsContainer = document.getElementById('optionsContainer');
const hintText = document.getElementById('hintText');
const explanationText = document.getElementById('explanationText');
const cardIndexEl = document.getElementById('cardIndex');
const scoreTrackerEl = document.getElementById('scoreTracker');
const progressBar = document.getElementById('progressBar');
const feedbackIcon = document.getElementById('feedbackIcon');
const feedbackTitle = document.getElementById('feedbackTitle');
const cardBack = document.querySelector('.card-back');
const nextBtn = document.getElementById('nextBtn');
const resetBtn = document.getElementById('resetBtn');
const prevBtn = document.getElementById('prevBtn');
const navNextBtn = document.getElementById('navNextBtn');
const hintAction = document.getElementById('hintAction');
const resultsScreen = document.getElementById('resultsScreen');
const finalScoreText = document.getElementById('finalScoreText');
const questionGrid = document.getElementById('questionGrid');
const navigationPanel = document.getElementById('navigationPanel');
const reviewToggle = document.getElementById('reviewToggle');
const returnToExplanationBtn = document.getElementById('returnToExplanationBtn');
const frontNextBtn = document.getElementById('frontNextBtn');

function shuffleQuestions() {
    quizData = [...quizDataRaw];
    for (let i = quizData.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [quizData[i], quizData[j]] = [quizData[j], quizData[i]];
    }
    userProgressState = new Array(quizData.length).fill('untouched');
    userSelectedAnswers = new Array(quizData.length).fill(null);
}

function buildNavigationGrid() {
    questionGrid.innerHTML = '';
    for (let i = 0; i < quizData.length; i++) {
        const circle = document.createElement('div');
        circle.className = `q-circle ${userProgressState[i]}`;
        circle.textContent = i + 1;
        if (i === currentIndex) circle.classList.add('active');
        
        circle.onclick = () => {
            currentIndex = i;
            initCard();
        };
        questionGrid.appendChild(circle);
    }
}

function typesetMath() {
    if (window.MathJax && window.MathJax.typesetPromise) {
        MathJax.typesetPromise();
    }
}

function initCard() {
    hintText.classList.add('hidden');
    returnToExplanationBtn.classList.add('hidden');
    frontNextBtn.classList.add('hidden'); // Initially keep hidden on fresh cards
    flashcard.classList.remove('flipped');
    
    prevBtn.disabled = currentIndex === 0;
    navNextBtn.disabled = currentIndex === quizData.length - 1;

    const allAnswered = userProgressState.every(state => state !== 'untouched');
    if (allAnswered && currentIndex >= quizData.length) {
        showResults();
        return;
    }

    const currentCard = quizData[currentIndex];
    
    cardIndexEl.textContent = `Card ${currentIndex + 1} of ${quizData.length}`;
    
    const totalAnsweredCount = userProgressState.filter(s => s !== 'untouched').length;
    progressBar.style.width = `${(totalAnsweredCount / quizData.length) * 100}%`;
    
    questionText.innerHTML = ` ${currentCard.question} `;
    hintText.innerHTML = ` ${currentCard.hint} `;
    explanationText.innerHTML = ` ${currentCard.explanation} `;

    optionsContainer.innerHTML = '';
    currentCard.options.forEach((option, idx) => {
        const button = document.createElement('button');
        button.className = 'option';
        button.innerHTML = `<span> ${option} </span><i class="fa-regular fa-circle"></i>`;
        
        if (userProgressState[currentIndex] !== 'untouched') {
            const savedChoice = userSelectedAnswers[currentIndex];
            if (idx === currentCard.correctIndex) {
                button.classList.add('correct');
                button.querySelector('i').className = 'fa-solid fa-circle-check';
            } else if (idx === savedChoice) {
                button.classList.add('incorrect');
                button.querySelector('i').className = 'fa-solid fa-circle-xmark';
            }
            button.style.cursor = 'default';
            frontNextBtn.classList.remove('hidden'); // Expose next page control if history log paths match
        } else {
            button.onclick = () => selectOption(idx, button);
        }
        optionsContainer.appendChild(button);
    });

    if (userProgressState[currentIndex] !== 'untouched') {
        const isCorrect = userProgressState[currentIndex] === 'correct';
        setupFeedbackCard(isCorrect);
        flashcard.classList.add('flipped');
    }

    buildNavigationGrid();
    setTimeout(typesetMath, 50);
}

function selectOption(selectedIndex, element) {
    if (userProgressState[currentIndex] !== 'untouched') return;

    const currentCard = quizData[currentIndex];
    const options = optionsContainer.querySelectorAll('.option');
    userSelectedAnswers[currentIndex] = selectedIndex;

    if (selectedIndex === currentCard.correctIndex) {
        element.classList.add('correct');
        element.querySelector('i').className = 'fa-solid fa-circle-check';
        userProgressState[currentIndex] = 'correct';
        score++;
        scoreTrackerEl.textContent = `Score: ${score}`;
        setupFeedbackCard(true);
    } else {
        element.classList.add('incorrect');
        element.querySelector('i').className = 'fa-solid fa-circle-xmark';
        userProgressState[currentIndex] = 'incorrect';
        
        options[currentCard.correctIndex].classList.add('correct');
        options[currentCard.correctIndex].querySelector('i').className = 'fa-solid fa-circle-check';
        setupFeedbackCard(false);
    }

    options.forEach(btn => btn.style.cursor = 'default');
    frontNextBtn.classList.remove('hidden'); // Reveal next control node right after option selection

    buildNavigationGrid();
    flashcard.classList.add('flipped');
    setTimeout(typesetMath, 100);
}

function setupFeedbackCard(isCorrect) {
    cardBack.className = `card-face card-back ${isCorrect ? 'is-correct' : 'is-incorrect'}`;
    feedbackIcon.innerHTML = isCorrect ? '<i class="fa-solid fa-circle-check"></i>' : '<i class="fa-solid fa-circle-xmark"></i>';
    feedbackTitle.textContent = isCorrect ? 'Excellent Answer!' : 'Incorrect Approach';
}

function showResults() {
    document.querySelector('.flashcard-wrapper').classList.add('hidden');
    navigationPanel.classList.add('hidden');
    resultsScreen.classList.remove('hidden');
    progressBar.style.width = '100%';
    finalScoreText.textContent = `You finished the deck with an overall score of ${score} out of ${quizData.length}`;
}

function resetQuiz() {
    currentIndex = 0;
    score = 0;
    scoreTrackerEl.textContent = `Score: ${score}`;
    document.querySelector('.flashcard-wrapper').classList.remove('hidden');
    navigationPanel.classList.remove('hidden');
    resultsScreen.classList.add('hidden');
    shuffleQuestions();
    initCard();
}

// Action Event Configurations
hintAction.onclick = (e) => {
    e.stopPropagation();
    hintText.classList.toggle('hidden');
    typesetMath();
};

reviewToggle.onclick = (e) => {
    e.stopPropagation();
    flashcard.classList.remove('flipped'); 
    returnToExplanationBtn.classList.remove('hidden'); 
};

returnToExplanationBtn.onclick = (e) => {
    e.stopPropagation();
    flashcard.classList.add('flipped'); 
    returnToExplanationBtn.classList.add('hidden');
};

frontNextBtn.onclick = () => {
    if (currentIndex < quizData.length - 1) {
        currentIndex++;
        initCard();
    } else {
        showResults();
    }
};

nextBtn.onclick = () => {
    if (currentIndex < quizData.length - 1) {
        currentIndex++;
        initCard();
    } else {
        showResults();
    }
};

prevBtn.onclick = () => {
    if (currentIndex > 0) {
        currentIndex--;
        initCard();
    }
};

navNextBtn.onclick = () => {
    if (currentIndex < quizData.length - 1) {
        currentIndex++;
        initCard();
    }
};

resetBtn.onclick = () => {
    resetQuiz();
};

shuffleQuestions();
initCard();
