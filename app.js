const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector("#reset-btn");
const newGameBtn = document.querySelector("#new-btn");
const msgContainer = document.querySelector(".msg-container");
const msg = document.querySelector("#msg");
const darkmodeToggle = document.getElementById("darkmode-toggle");

let turn0 = true;

const winPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

function resetGame() {
  turn0 = true;
  boxes.forEach(box => {
    box.disabled = false;
    box.innerText = "";
    box.classList.remove("zero");
  });
  msgContainer.classList.add("hide");
}

function disableBoxes() {
  boxes.forEach(box => box.disabled = true);
}

function showWinner(winner) {
  msg.innerText = `🎉 Congratulations, ${winner} wins!`;
  msgContainer.classList.remove("hide");
  msgContainer.classList.add("show");
  disableBoxes();
}

function showTie() {
  msg.innerText = "🤝 It's a Tie! Great game!";
  msgContainer.classList.remove("hide");
  msgContainer.classList.add("show");
  disableBoxes();
}

function checkWinner() {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    const valA = boxes[a].innerText;
    const valB = boxes[b].innerText;
    const valC = boxes[c].innerText;

    if (valA && valA === valB && valB === valC) {
      showWinner(valA);
      return;
    }
  }

  if ([...boxes].every(box => box.innerText !== "")) {
    showTie();
  }
}

boxes.forEach(box => {
  box.addEventListener("click", () => {
    if (box.innerText !== "") return;

    box.innerText = turn0 ? "0" : "X";
    if (turn0) box.classList.add("zero");
    else box.classList.remove("zero");

    box.disabled = true;
    turn0 = !turn0;
    checkWinner();
  });
});

resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);

darkmodeToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark", darkmodeToggle.checked);
});
