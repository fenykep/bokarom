use std::io;
use log::info;
use warp::Filter;
use std::fs::File;
use std::io::{Read, Write};
use std::sync::{Arc};
// use std::sync::{Arc, Mutex};
// use std::sync::Arc;
use tokio::sync::Mutex;
use local_ip_address::local_ip;
use tokio_tungstenite::accept_async;
use tokio::net::{TcpListener, TcpStream};
use std::{collections::HashSet, env, io::Error};
use tokio_tungstenite::tungstenite::protocol::Message;
use futures_util::{future, SinkExt, StreamExt, TryStreamExt};
use chrono::{TimeZone, NaiveDateTime, Utc, Datelike, Weekday, NaiveDate};

#[tokio::main]
async fn main() -> Result<(), Error> {
    let _ = env_logger::try_init();

    let my_local_ip = local_ip();

    // Define the HTTP server (serving the HTML file) on port 3030
    let current_dir = std::env::current_dir().expect("failed to read current directory");
    let html = warp::fs::dir(current_dir);

    let http_server = warp::serve(html);


   let file_path = "db/r_01_42.wek";

   // Read the content from the file into a string
   // let mut file = File::open(file_path)?;
   let mut file_content = String::new();
   File::open(file_path)?.read_to_string(&mut file_content)?;
   // file.read_to_string(&mut file_content)?;

   // println!("File Content: {}", file_content);

   // // This was commented out to read from file, but maybe youll have to revert that
   // let in_mem_hex_string = Arc::new(Mutex::new(
   //      String::from("00111111000000000000000000000000000000000011111111111100000000000000003c3c3c3c3c3c3c3c3c00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000ffffffffff000000003c3c3c0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000111111110000000000000000000000000000000000000000000000001100"),
   //  ));

   let in_mem_hex_string = Arc::new(Mutex::new(file_content));

   // this doesnt work, you cant print this kinda pointer like whatever without locking it up
   // println!("{}", in_mem_hex_string);


   // let in_mem_hex_string: Box<String> = Box::new("00111111000000000000000000000000000000000011111111111100000000000000003c3c3c3c3c3c3c3c3c00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000ffffffffff000000003c3c3c0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000111111110000000000000000000000000000000000000000000000001100".to_string());
   // let leaked_hex_string: &'static mut String = Box::leak(in_mem_hex_string);
    
    if let Ok(my_local_ip) = my_local_ip {
        println!("This is my local IP address: {:?}", my_local_ip);
        // let http_addr: std::net::SocketAddr = my_local_ip.parse().unwrap();
        let http_addr: std::net::SocketAddr = (format!("{:?}:3030",my_local_ip)).parse().expect("Unable to parse the socket");
        tokio::spawn(http_server.bind(http_addr));


    } else {
        println!("Error getting local IP: {:?}", my_local_ip);
    }

    // Current time in UTC
    let now_utc = Utc::now();
    // Current date in UTC
    let today_utc = now_utc.date_naive();
    println!("Date now: {}", today_utc);
    println!("Week number: {}", today_utc.iso_week().week());


    println!("we started up, gotta load the saved stuff now");

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
        // tokio::spawn(handle_connection(stream, tx));
        let in_mem_hex_string_clone = Arc::clone(&in_mem_hex_string);

        //let in_mem_hex_string_clone = in_mem_hex_string.clone(); // Clone the Arc
        tokio::spawn(handle_connection(stream, tx, in_mem_hex_string_clone));
        // tokio::spawn(handle_connection(stream, tx, leaked_hex_string));
    }

    Ok(())
}

async fn handle_connection(
    stream: TcpStream,
    tx: tokio::sync::broadcast::Sender<Message>,
    in_mem_hex_string: Arc<Mutex<String>>,
    // leaked_db: &'static String,
) {
    // let addr = stream.peer_addr().expect("connected streams should have a peer address");
    // info!("Peer address: {}", addr);

    // let db_clone = leaked_db.clone();
    // Clone the in-memory hex string for this connection's welcome message
    let welcome_message = {
        let in_mem_hex_string = in_mem_hex_string.lock().await;
        in_mem_hex_string.clone()
    };

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
        // let welcome_message = "00111111000000000000000000000000000000000011111111111100000000000000003c3c3c3c3c3c3c3c3c00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000ffffffffff000000003c3c3c0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000111111110000000000000000000000000000000000000000000000001100";
        // To access the shared variable:
        // let in_mem_hex_string = in_mem_hex_string.lock().await;
        // let welcome_message = in_mem_hex_string.as_str();

        println!("this will be the welcommessage: {}", welcome_message);        
        if ws_sink.send(Message::Text(welcome_message.to_string())).await.is_err() {
            return; // Exit the task if sending the welcome message fails
        }

        // // old version that works but without the inMemVariable
        // while let Some(msg) = rx.recv().await.ok() {
        //     if ws_sink.send(msg).await.is_err() {
        //         break;
        //     }
        // }

        // this is the new one that tries to pass down the pointer, lets see if it works
        while let Some(msg) = rx.recv().await.ok() {
            // Update the in-memory hex string with the received message
            let mut in_mem_hex_string = in_mem_hex_string.lock().await;
            *in_mem_hex_string = msg.to_string();

            // Broadcast the updated in-memory hex string to all clients
            let updated_message = in_mem_hex_string.clone();
            //tx.send(Message::Text(updated_message)).ok();
            if ws_sink.send(msg).await.is_err() {
                break;
            }
        }

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
