// Make top menu buttons functional
$("#reset").click(function () {
    window.location.reload();
});
$("#home").click(function () {
    window.location.href = "Games.html";
});

$("#autocross").click(function () {
    window.location.href = "autocross.html";
});

$("#brandMatch").click(function () {
    window.location.href = "brandMatch.html";
});

$("#readMe").click(function () {
    window.location.href = "readme.txt";
});

var score = 0;

// All available questions
document.getElementById("score").textContent = score;

var allQuestions = [{
    //0
    question: "The Lola T70 driven by John Surtees won the first Can-Am championship in 1966.",
    answer: true,
    note: "Team Surtees won the first Can-Am championship with Graham Hill completing 5 rounds, and John Surtees completing all rounds of competition."
},
{
    //1
    question: "The first Formula One Grand Prix winner was Guiseppe Farina at the 1950 British Grand Prix.",
    answer: true,
    note: "Farina went on to win the Swiss and Italian Grand Pix, making him the first World Drivers' Champion."
},
{
    //2
    question: "The 1911 International 500-Mile Sweepstakes Race was held at the Indianapolis Motor Speedway on Tuesday, May 30, 1911.",
    answer: true,
    note: "The 1911 International 500-Mile Sweepstakes was the inuagural running of the Indianapolis 500, which is the most prestigious automobile race in the world."
},
{
    //3
    question: "The Ford Model T only came in black.",
    answer: false,
    note: "When first introduced, the Model T was available in grey, green, blue and red, but not black until later."
},
{
    //4
    question: "Henry Ford once said \"Any customer can have a car painted any color, so long as it's black.\"",
    answer: true,
    note: "Most Model Ts were black in color due to the lower cost, better durability and faster drying time of black paint of the era."
},
{
    //5
    question: "The highest selling automobile of all time is the Volkswagen Beetle, with almost 22,000,000 sold.",
    answer: false,
    note: "The Toyota Corolla is the highest selling automobile of all time, with 40,000,000 sold."
},
{
    //6
    question: "John Dillinger's favorite automobiles to steal were Duesenbergs.",
    answer: false,
    note: "John Dillinger preferred stealing Fords."
},
{
    //7
    question: "The original Batmobile was created by customizer George Barris from the chassis of a 1955 Lincoln concept car.",
    answer: true,
    note: "George Barris modified the $250,000 Ford Lincoln Future concept car into the iconic 1960s Batombile in just 3 weeks!"
},
{
    //8
    question: "In the mid-1960s Ford developed its Single Overhead Cam 427 as an answer to the domination of Chrysler's Hemispherical engine in NASCAR.",
    answer: true,
    note: "Carl Kiekhaefer used the Chrysler HEMI engine to win the Grand National Series of NASCAR two years in a row, 1955 and 1956."
},
{
    //9
    question: "For gasoline engines, a 10:1 air to fuel mixture is classified as lean mixture.",
    answer: false,
    note: "10:1 air fuel mixture is classified as rich. Stoichiometric, or ideal, air fuel ratio is 14.7 parts air to 1 part fuel. 14.7:1."
},
{
    //10
    question: "The sidewall height of a 300/50r16 tire is 150mm.",
    answer: true,
    note: "Tire sidewall height measurements are a percentage of tread width. A 300/50r15 is a 300mm wide tire with a height of 50% of the width (or 150mm), of Radial construction (r) and a wheel size of 16 inches."
},
{
    //11
    question: "The Nash Metropolitan was the first car marketed specifically to females",
    answer: true,
    note: "Nash promoted this new, economy car as a second family vehicle with females as the target audience."
},
{
    //12
    question: "From 1996 to 2015, the \"Best in Show\" winners of the Amelia Island Concours d'Elegance have all been Rolls-Royces.",
    answer: false,
    note: "A wide variety of automotive marques have been awarded \"Best in Show\" at the Amelia Island Concours d'Elegance."
},
{
    //13
    question: "Before cars, Ferruccio Lamborghini built tractors.",
    answer: true,
    note: "Ferruccio Lamborghini began building sports cars after a disagreement with Enzo Ferrari over a bad experience with his Ferrari."
},
{
    //14
    question: "The Ford Mustang was never offered with a 260 cubic inch V8 engine.",
    answer: false,
    note: "When Ford first launched the Ford Mustang for the 1965 model year, the \"F-Code\" 260 cubic inch V8 was an option. These early Mustangs are often referred to as 1964.5 models, because Ford updated the lineup mid-year 1965."
},
{
    //15
    question: "The Ford Mustang got its name from a fighter plane.",
    answer: true,
    note: "It was named after the North American Aviation P-15 Mustang."
}
];

var selectedQuestions = [];
var currentQuestionIndex = 0;
var questionNumber = 0;
var numberSpan = document.getElementById("number");
var questionDisplay = document.getElementById("question-display");
var submitButton = document.getElementById("submit-answer");
var nextButton = document.getElementById("next-question");
var noteDisplay = document.getElementById("note-display");
var answerTrueRadio = document.getElementById("answer-true");
var answerFalseRadio = document.getElementById("answer-false");
var numberOfQuestions = 5;

// Create a random selection of 5 questions

function selectRandomQuestion() {
    for (let i = 0; i < numberOfQuestions && allQuestions.length > 0; i++) {
        const randomIndex = Math.floor(Math.random() * allQuestions.length);
        selectedQuestions.push(allQuestions.splice(randomIndex, 1)[0]);
    }
}

// Display the question, or show final score
function displayQuestion() {

    if (currentQuestionIndex < selectedQuestions.length) {
        nextButton.disabled = true;
        questionDisplay.textContent = selectedQuestions[currentQuestionIndex].question;
        answerTrueRadio.checked = false; // Uncheck previous selections
        answerFalseRadio.checked = false;
        questionNumber++;
        numberSpan.textContent = questionNumber;
    }
    else {
        document.getElementById("formSection").setAttribute("style", "visibility:hidden");
        document.getElementById("header").textContent = "Quiz Finished! Your final score is: " + score + " out of 5!";
        document.getElementById("restart").setAttribute("style", "visibility:visible")
    }
}

// Check the answer and display a note.
function checkAnswer() {
    if (currentQuestionIndex < selectedQuestions.length) {
        var userAnswer = null;
        if (answerTrueRadio.checked) {
            userAnswer = true;
        } else if (answerFalseRadio.checked) {
            userAnswer = false;
        }

        if (userAnswer !== null) {
            if (userAnswer === selectedQuestions[currentQuestionIndex].answer) {
                score++;
                document.getElementById("score").textContent = score;
                document.getElementById("note-display").setAttribute("style", "color: #53b2b5");
                noteDisplay.textContent = "Correct! " + selectedQuestions[currentQuestionIndex].note;
                submitButton.disabled = true;
                nextButton.disabled = false;
            } else {
                document.getElementById("note-display").setAttribute("style", "color: #a2150c");
                noteDisplay.textContent = "Incorrect. " + selectedQuestions[currentQuestionIndex].note;
                submitButton.disabled = true;
                nextButton.disabled = false;
            }

            // Updates next question button when user reaches final question in queue
            if (currentQuestionIndex === selectedQuestions.length - 1) {
                nextButton.textContent = "Finish Quiz";
            } else {
                nextButton.textContent = "Next Question";
            }


        }

        else {
            noteDisplay.textContent = "Please select an answer."; // Inform the user if no option is selected
        }
    }
}

// function for next question button.
function nextQuestion() {
    currentQuestionIndex++;
    noteDisplay.textContent = "";
    submitButton.disabled = false;
    displayQuestion();

}

// Initial selection of 5 random questions
selectRandomQuestion();

// Initial display of the first question
displayQuestion();

// Add event listener to the Submit and Next buttons
submitButton.addEventListener("click", checkAnswer);
nextButton.addEventListener("click", nextQuestion);