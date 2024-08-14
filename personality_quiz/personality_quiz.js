// Initialize scores and question count
var score = 0; // Store the total score
var questionCount = 0; // Store the number of questions answered

// Define correct answers for each question
const correctAnswers = {
  q1: "[Correct Answer]",  // Correct answer for Question 1
  q2: "[Correct Answer]",   // Correct answer for Question 2
  q3: "[Correct Answer]" // Correct answer for Question 3
};

// Track which questions have been answered
const answeredQuestions = {
  q1: false,
  q2: false,
  q3: false
};

// Get references to answer buttons, score display, and other elements
var q1a1 = document.getElementById("q1a1");
var q1a2 = document.getElementById("q1a2");

var q2a1 = document.getElementById("q2a1");
var q2a2 = document.getElementById("q2a2");

var q3a1 = document.getElementById("q3a1");
var q3a2 = document.getElementById("q3a2");

var scoreDisplay = document.getElementById("score-display");
var result = document.getElementById("result");
var playAgainButton = document.getElementById("play-again");
var userNameInput = document.getElementById("user-name");

// Disable buttons after answering
function disableButtons(buttons) {
  buttons.forEach(button => button.disabled = true);
}

// Handle answer selection
function handleAnswer(questionId, selectedAnswer, buttons) {
  if (!answeredQuestions[questionId]) {
    // Check if the selected answer is correct
    if (selectedAnswer === correctAnswers[questionId]) {
      score += 1;
    }

    questionCount += 1;

    // Update score display
    scoreDisplay.innerText = `Score: ${score}`;

    console.log("questionCount = " + questionCount + " score = " + score);

    // Mark the question as answered and disable buttons
    answeredQuestions[questionId] = true;
    disableButtons(buttons);

    // Check if all questions have been answered
    if (questionCount === 3) {
      console.log("The quiz is done!");
      updateResult();
    }
  }
}

// Listen for click on answer buttons and call appropriate function
q1a1.addEventListener("click", () => handleAnswer("q1", q1a1.innerText, [q1a1, q1a2]));
q1a2.addEventListener("click", () => handleAnswer("q1", q1a2.innerText, [q1a1, q1a2]));

q2a1.addEventListener("click", () => handleAnswer("q2", q2a1.innerText, [q2a1, q2a2]));
q2a2.addEventListener("click", () => handleAnswer("q2", q2a2.innerText, [q2a1, q2a2]));

q3a1.addEventListener("click", () => handleAnswer("q3", q3a1.innerText, [q3a1, q3a2]));
q3a2.addEventListener("click", () => handleAnswer("q3", q3a2.innerText, [q3a1, q3a2]));

// Update the result based on score
function updateResult() {
  const userName = userNameInput.value || "User";
  let resultMessage = `${userName}, your total score is ${score} out of 3.`;
 
  // Determine the outcome based on score
  if (score === 3) {
    resultMessage += " Perfect score!";
  } else if (score === 2) {
    resultMessage += " Almost there!";
  } else if (score === 1) {
    resultMessage += " Better luck next time.";
  } else {
    resultMessage += " No correct answers.";
  }

  result.innerHTML = resultMessage;
  playAgainButton.style.display = "block"; // Show the "Play Again" button
  console.log(resultMessage);
}

// Handle the "Play Again" button click
playAgainButton.addEventListener("click", () => {
  // Reset quiz state
  score = 0;
  questionCount = 0;

  // Reset answered questions
  Object.keys(answeredQuestions).forEach(key => answeredQuestions[key] = false);

  // Re-enable answer buttons
  [q1a1, q1a2].forEach(button => button.disabled = false);
  [q2a1, q2a2].forEach(button => button.disabled = false);
  [q3a1, q3a2].forEach(button => button.disabled = false);

  // Clear results and hide the "Play Again" button
  scoreDisplay.innerText = `Score: 0`;
  result.innerHTML = "Your result is...";
  playAgainButton.style.display = "none";

  // Clear the name input field
  userNameInput.value = "";
});
