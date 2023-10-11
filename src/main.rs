use log::info;
use warp::Filter;
use std::sync::{Arc, Mutex};
use local_ip_address::local_ip;
use tokio_tungstenite::accept_async;
use tokio::net::{TcpListener, TcpStream};
use std::{collections::HashSet, env, io::Error};
use tokio_tungstenite::tungstenite::protocol::Message;
use futures_util::{future, SinkExt, StreamExt, TryStreamExt};

#[tokio::main]
async fn main() -> Result<(), Error> {
    let _ = env_logger::try_init();

    let my_local_ip = local_ip();

    // Define the HTTP server (serving the HTML file) on port 3030
    let current_dir = std::env::current_dir().expect("failed to read current directory");
    let html = warp::fs::dir(current_dir);

    let http_server = warp::serve(html);
    
    if let Ok(my_local_ip) = my_local_ip {
        println!("This is my local IP address: {:?}", my_local_ip);
        // let http_addr: std::net::SocketAddr = my_local_ip.parse().unwrap();
        let http_addr: std::net::SocketAddr = (format!("{:?}:3030",my_local_ip)).parse().expect("Unable to parse the socket");
        tokio::spawn(http_server.bind(http_addr));


    } else {
        println!("Error getting local IP: {:?}", my_local_ip);
    }



    // Define the WebSocket server on port 8080
    // let addr = env::args().nth(1).unwrap_or_else(|| "192.168.1.4:8080".to_string());
    let addr = format!("{:?}:8080",my_local_ip.unwrap());
    println!("{:?}",addr);
    
    let try_socket = TcpListener::bind(&addr).await;
    let listener = try_socket.expect("Failed to bind");
    info!("WebSocket Listening on: {}", addr);

    // Create a broadcast channel for WebSocket messages
    let (tx, mut rx) = tokio::sync::broadcast::channel::<Message>(256);

    while let Ok((stream, _)) = listener.accept().await {
        let tx = tx.clone(); // Clone the broadcast sender for each connection
        tokio::spawn(handle_connection(stream, tx));
    }

    Ok(())
}

async fn handle_connection(
    stream: TcpStream,
    tx: tokio::sync::broadcast::Sender<Message>,
) {
    // let addr = stream.peer_addr().expect("connected streams should have a peer address");
    // info!("Peer address: {}", addr);

    let ws_stream = tokio_tungstenite::accept_async(stream)
        .await
        .expect("Error during the websocket handshake occurred");

    let (mut ws_sink, ws_stream) = ws_stream.split();
    let tx_clone = tx.clone();

    println!("WebSocket connection established.");

    // Spawn a task to send broadcast messages to this client
    tokio::spawn(async move {
        let mut rx = tx.subscribe();
        
        // Send a welcome message to the client
        let welcome_message = "00111111000000000000000000000000000000000011111111111100000000000000003c3c3c3c3c3c3c3c3c00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000ffffffffff000000003c3c3c0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000111111110000000000000000000000000000000000000000000000001100";
        if ws_sink.send(Message::Text(welcome_message.to_string())).await.is_err() {
            return; // Exit the task if sending the welcome message fails
        }

        while let Some(msg) = rx.recv().await.ok() {
            if ws_sink.send(msg).await.is_err() {
                break;
            }
        }

        // while let Some(msg) = rx.recv().await.ok() {
        //     if &ws_sink_clone as *const _ != &ws_sink as *const _ {
        //         if ws_sink.send(msg).await.is_err() {
        //             break;
        //         }
        //     }
        // }

        // while let Some(msg) = rx.recv().await.ok() {
        //     // Exclude the sender by checking if the WebSocket sink matches the current client's sink
        //     if let Err(_) = ws_sink_arc.lock().unwrap().send(msg.clone()).await {
        //         break;
        //     }
        // }
    });

    // Forward messages from the client to the broadcast channel
    let forward = ws_stream.try_for_each(move |msg| {
        println!("Received message from client: {}", msg);
        if (format!("{}",msg)!="") {
            tx_clone.send(msg).ok();
        }
        future::ready(Ok(()))
    });

    if let Err(e) = forward.await {
        eprintln!("WebSocket error: {:?}", e);
    }
}
