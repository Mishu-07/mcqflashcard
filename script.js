import quizDataRaw from './questions.js';

let quizData = [];
let currentIndex = 0;
let score = 0;

// Tracks individual question outcomes: 'untouched', 'correct', or 'incorrect'
let userProgressState = []; 
// Caches historical answer configurations chosen per question to recall them when jumping back
let userSelectedAnswers = []; 

// DOM Linkage Map
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

function shuffleQuestions() {
    quizData = [...quizDataRaw];
    for (let i = quizData.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [quizData[i], quizData[j]] = [quizData[j], quizData[i]];
    }
    // Set baseline arrays matching tracking boundaries
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
    flashcard.classList.remove('flipped');
    
    // Manage dynamic arrow visibility parameters
    prevBtn.disabled = currentIndex === 0;
    navNextBtn.disabled = currentIndex === quizData.length - 1;

    // Check complete deck metrics conditions
    const allAnswered = userProgressState.every(state => state !== 'untouched');
    if (allAnswered && currentIndex >= quizData.length) {
        showResults();
        return;
    }

    const currentCard = quizData[currentIndex];
    
    cardIndexEl.textContent = `Card ${currentIndex + 1} of ${quizData.length}`;
    
    // Calculate progress bar relative to total answers given
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
        
        // Handle render states based on whether this card has historical records
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
        } else {
            button.onclick = () => selectOption(idx, button);
        }
        optionsContainer.appendChild(button);
    });

    // Restore back-face data states cleanly if already flipped/processed historical cards
    if (userProgressState[currentIndex] !== 'untouched') {
        const isCorrect = userProgressState[currentIndex] === 'correct';
        setupFeedbackCard(isCorrect);
        // Flip instantly without delay intervals
        flashcard.classList.add('flipped');
    }

    buildNavigationGrid();
    typesetMath();
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

    // Freeze choice updates once selected
    options.forEach(btn => btn.style.cursor = 'default');

    typesetMath();
    buildNavigationGrid();
    
    // Auto-reveal slide action
    setTimeout(() => {
        flashcard.classList.add('flipped');
    }, 150);
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

// Action Event Setup Blocks
hintAction.onclick = (e) => {
    e.stopPropagation();
    hintText.classList.toggle('hidden');
    typesetMath();
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

// Initial Core Launch Routine
shuffleQuestions();
initCard();