import * as signalR from "@microsoft/signalr";

let connection: signalR.HubConnection | null = null;

export const startNotificationConnection = async () => {

  if (connection) return connection;

  connection = new signalR.HubConnectionBuilder()
    .withUrl("https://localhost:7012/hubs/notifications", {
      accessTokenFactory: () => localStorage.getItem("token") || "",
    })
    .withAutomaticReconnect()
    .build();

  try {
    await connection.start();
    console.log("SignalR Connected");
  } catch (err) {
    console.error("SignalR Connection Error:", err);
  }

  return connection;
};