
function logMessage(msg) {
  console.log(msg);
  const logArea = document.getElementById("logArea");
  logArea.innerHTML += msg + "<br>";
  logArea.scrollTop = logArea.scrollHeight; // auto-scroll
}

// ---------------- Opening Ceremony ----------------
function OpeningCeremony(scores, callback) {
  logMessage("🏁 Opening Ceremony has started!");
  let counter = 1;
  const interval = setInterval(() => {
    logMessage(`Opening Ceremony in progress... (${counter}s)`);
    counter++;
    if (counter > 3) {
      clearInterval(interval);
      logMessage("🎉 Ceremony finished. Let the games begin!");
      callback(scores, LongJump); // move to Race100M
    }
  }, 1000);
}

// ---------------- 100M Race ----------------
function Race100M(scores, callback) {
  logMessage("🏃 100M Race started...");

  setTimeout(() => {
    logMessage("🏃 Race finished! Calculating results...");

    // Generate random race times
    let raceTimes = {};
    for (let color in scores) {
      raceTimes[color] = Math.floor(Math.random() * 6) + 10; // 10-15s
    }
    logMessage("⏱ Race Times: " + JSON.stringify(raceTimes));

    // Sort by fastest time
    let sorted = Object.entries(raceTimes).sort((a, b) => a[1] - b[1]);

    // Award points
    scores[sorted[0][0]] += 50; // 1st place
    scores[sorted[1][0]] += 25; // 2nd place

    logMessage("📊 Scores after Race100M: " + JSON.stringify(scores));
    callback(scores, HighJump);
  }, 3000);
}

// ---------------- Long Jump ----------------
function LongJump(scores, callback) {
  logMessage("🤸 Long Jump started...");

  setTimeout(() => {
    let colors = Object.keys(scores);
    let winner = colors[Math.floor(Math.random() * colors.length)];

    logMessage(`🎯 Long Jump winner: ${winner.toUpperCase()} (+150 pts)`);
    scores[winner] += 150;

    logMessage("📊 Scores after LongJump: " + JSON.stringify(scores));
    callback(scores, AwardCeremony);
  }, 2000);
}

// ---------------- High Jump ----------------
function HighJump(scores, callback) {
  logMessage("🦘 High Jump started...");

  setTimeout(() => {
    let userInput = prompt("Which color made the highest jump? (red/blue/green/yellow)");

    if (userInput && scores.hasOwnProperty(userInput.toLowerCase())) {
      scores[userInput.toLowerCase()] += 100;
      logMessage(`✅ ${userInput.toUpperCase()} awarded +100 points!`);
    } else {
      logMessage("❌ High Jump was cancelled or invalid input.");
    }

    logMessage("📊 Scores after HighJump: " + JSON.stringify(scores));
    callback(scores);
  }, 1000);
}

// ---------------- Award Ceremony ----------------
function AwardCeremony(scores) {
  logMessage("🏅 Award Ceremony begins!");

  let sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);

  sorted.forEach(([color, score], index) => {
    logMessage(`${index + 1}️⃣ Place: ${color.toUpperCase()} with ${score} points`);
  });

  logMessage("🎊 Sports Day Completed!");
}

// ---------------- Start Button ----------------
document.getElementById("startBtn").addEventListener("click", () => {
  const scores = { red: 0, blue: 0, green: 0, yellow: 0 };
  document.getElementById("logArea").innerHTML = ""; // clear logs
  OpeningCeremony(scores, Race100M);
});
