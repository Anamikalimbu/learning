let playerScore = 0;
let computerScore = 0;

function playGame(playerChoice) {

    const choices = ["rock", "paper", "scissors"];

    const computerChoice =
        choices[Math.floor(Math.random() * choices.length)];

    let result = "";

    if (playerChoice === computerChoice) {
        result = "It's a Draw! 🤝";
    } 
    else if (
        (playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "paper" && computerChoice === "rock") ||
        (playerChoice === "scissors" && computerChoice === "paper")
    ) {
        result = "You Win! 🎉";
        playerScore++;
    } 
    else {
        result = "Computer Wins! 🤖";
        computerScore++;
    }

    document.getElementById("playerChoice").textContent =
        "You: " + playerChoice;

    document.getElementById("computerChoice").textContent =
        "Computer: " + computerChoice;

    document.getElementById("result").textContent = result;

    document.getElementById("playerScore").textContent = playerScore;
    document.getElementById("computerScore").textContent = computerScore;
}
