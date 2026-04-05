let players = [];
let rounds = [];
let currentRound = [];

function addPlayer() {
  const input = document.getElementById("playerInput");
  const name = input.value.trim();

  if (name === "") return;

  players.push(name);
  input.value = "";
  updatePlayers();
}

function updatePlayers() {
  const list = document.getElementById("playersList");
  list.innerHTML = "";

  players.forEach(p => {
    const li = document.createElement("li");
    li.textContent = p;
    list.appendChild(li);
  });
}

function startTournament() {
  if (players.length < 2) {
    alert("Ajoute au moins 2 joueurs !");
    return;
  }

  currentRound = [...players];
  generateMatches();
}

function generateMatches() {
  const container = document.getElementById("matches");
  container.innerHTML = "";

  let nextRound = [];

  for (let i = 0; i < currentRound.length; i += 2) {
    const p1 = currentRound[i];
    const p2 = currentRound[i + 1];

    if (!p2) {
      nextRound.push(p1);
      continue;
    }

    const matchDiv = document.createElement("div");
    matchDiv.className = "match";

    const btn1 = document.createElement("button");
    btn1.textContent = p1;
    btn1.className = "player-btn";
    btn1.onclick = () => selectWinner(p1, p2, matchDiv, nextRound);

    const btn2 = document.createElement("button");
    btn2.textContent = p2;
    btn2.className = "player-btn";
    btn2.onclick = () => selectWinner(p2, p1, matchDiv, nextRound);

    matchDiv.appendChild(btn1);
    matchDiv.appendChild(btn2);

    container.appendChild(matchDiv);
  }

  rounds.push(nextRound);
}

function selectWinner(winner, loser, matchDiv, nextRound) {
  matchDiv.innerHTML = `<strong>Winner: ${winner}</strong>`;
  nextRound.push(winner);

  checkEnd(nextRound);
}

function checkEnd(nextRound) {
  const allMatchesDone = document.querySelectorAll(".match button").length === 0;

  if (allMatchesDone) {
    if (nextRound.length === 1) {
      document.getElementById("matches").innerHTML =
        `<h2>🏆 Champion : ${nextRound[0]}</h2>`;
    } else {
      currentRound = nextRound;
      generateMatches();
    }
  }
}
