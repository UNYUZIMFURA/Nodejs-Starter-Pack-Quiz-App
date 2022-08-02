let index = 0;
let count = 0;
let timeDiv = document.getElementById('time-counter')
let timeButton = document.getElementById('time-btn');
let hasSelected = false;
let selectedAnswer;
let instructionsDiv = document.getElementById('instructions')
let startButton = document.getElementById('start')
let nextButton = document.getElementById('next')
let errorParagraph = document.getElementById('error')
let crown = document.getElementById('crown')
const p = document.getElementById('p')
const answersDiv = document.getElementById('answers-div')
const questionsDiv = document.getElementById('questions-div')
let handler;

const questions = [
    {
        question: "1. What is CSS?",
        answer: ["Colors Style Sheets", "Cascading Style Sheets", "Creative Style System", "Cascading Style Papers"],
        correct: "Cascading Style Sheets"
    },

    {
        question: "2. What is javascript?",
        answer: ['A markup language', 'Scripting language', "Styling Language", "A popular language"],
        correct: 'Scripting language'
    },

    {
        question: "3. What is React?",
        answer: ['A javascript library', "A CSS library", "A chemical substance", "A reactant"],
        correct: 'A javascript library'
    },

    {
        question: "4. What is PHP?",
        answer: ['Hypertext Preprocessor', 'Programming Horrible Programs', "Preps Have Processors", 'Pop Hip Pop'],
        correct: 'Hypertext Preprocessor'
    }
]

// Starting the game

function startGame() {
    setIndex()
    setTime()

    timeDiv.style.display = "flex"
    startButton.style.display = "none"
    instructionsDiv.style.display = "none"
    answersDiv.style.height = '50%'
    answersDiv.style.background = 'none'
    nextButton.style.display = "block"
    p.innerText = questions[index - 1].question

    // Mapping in the answers array and display them accordingly

    questions[index - 1].answer.forEach((button, i) => {
        let butto = document.createElement('button')
        butto.classList.add('start')
        butto.setAttribute('value', questions[index - 1].answer[i])
        butto.innerText = questions[index - 1].answer[i]
        answersDiv.appendChild(butto)

        clickButton()
        function clickButton() {
            butto.addEventListener('click', (e) => {
                if (document.querySelector('button.selected')) {
                    document.querySelector('button.selected').classList.remove('selected')
                }
                butto.classList.add('selected')

                hasSelected = true
                selectedAnswer = e.target.value
                if (e.target.value == questions[index - 1].correct) {
                    count++
                }
            })
        }
    })
}

// Function to go to the next question

function nextQuest() {
    while (answersDiv.firstChild) {
        answersDiv.removeChild(answersDiv.firstChild)
    }

    if (index - 1 < questions.length) {
        setTime()
        setIndex()
    } else {
        return
    }

    p.innerText = (questions[index - 1]) ? questions[index - 1].question : ""

    if (questions[index - 1] == undefined) {
        timeDiv.style.display = "none"
        p.style.marginTop = "15rem"
        p.innerText = "You have scored " + count + " " + "of " + questions.length
        clearInterval(handler)
        return
    }

    questions[index - 1].answer.forEach((button, i) => {
        let butto = document.createElement('button')
        butto.classList.add('start')
        butto.setAttribute('value', questions[index - 1].answer[i])
        butto.innerText = questions[index - 1].answer[i]
        answersDiv.appendChild(butto)
        clickButton()

// What to do onclicking the button

        function clickButton() {
            butto.addEventListener('click', (e) => {
                if (document.querySelector('button.selected')) {
                    document.querySelector('button.selected').classList.remove('selected')
                }
                butto.classList.add('selected')
                hasSelected = true
                selectedAnswer = e.target.value
                if (e.target.value == questions[index - 1].correct) {
                    count++
                }
            })
        }
    })

}

// Setting index to go to the next question 

function setIndex() {
    index++
    return index
}

// Tracking time

function setTime() {
    let time = 20
    clearInterval(handler)
    updateTime()
    handler = setInterval(updateTime, 1000)
    function updateTime() {
        if (time == 0) {
            clearInterval(handler)
            nextQuest()
        }
        const minutes = Math.floor(time / 60)
        let seconds = time % 60
        seconds = seconds < 10 ? '0' + seconds : seconds
        timeButton.innerText = `${minutes}:${seconds}`
        time > 0 ? time-- : ''
    }
}
