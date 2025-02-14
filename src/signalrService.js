import * as signalR from "@microsoft/signalr";

const connection = new signalR.HubConnectionBuilder()
  .withUrl("http://127.0.0.1:5259/scoreboard", {
    withCredentials: false, // Ensures CORS does not interfere
    transport: signalR.HttpTransportType.WebSockets
  })
  .configureLogging(signalR.LogLevel.Information)
  .withAutomaticReconnect()
  .build();

export async function startSignalR() {
  try {
    await connection.start();
    console.log("Connected to SignalR");
  } catch (err) {
    console.error("Connection Error:", err);
    setTimeout(startSignalR, 5000);
  }
}

// Listen for game state updates
connection.on("UpdateGameState", (elapsedTime, quarterTime, team1, team2) => {
  console.log("Game State Updated:", { elapsedTime, quarterTime, team1, team2 });
});

// Listen for team updates
connection.on("UpdateTeams", (team1, team2) => {
  console.log("Teams Updated:", { team1, team2 });
});


export function loadTeams(apiUrl) {
  connection.invoke("LoadTeams", apiUrl).catch(err => console.error(err));
}
