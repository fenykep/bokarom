# bokarom


At the current state run with
`cargo run` in the root dir.
It starts a http (Port 3030) and a websockets (Port 8080) server,
on the http port it serves the "static/" folder.

In that folder there is an old.html, that binds to the 8080 port of the same IP
it was served from, estabilishes a websockets connection and then updates the UI with the values received from the broadcast channel of the server.