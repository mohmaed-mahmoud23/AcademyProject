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

  await connection.start();

  console.log("SignalR Connected");

  return connection;
};