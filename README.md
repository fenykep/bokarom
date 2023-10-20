# bokarom

A yearly database of weeks of users and rooms, where each quarter-hour is represented as one byte where each byte corresponds to a person/room. The bytes are stored currently in plaintext files as strings of 400 hexadecimal characters. (1byte=2char * 4 (15mins in an hour) * 10 (8:00-18:00) * 5 (5 workdays in a week) = 400) and these files are stored in a directory structure of / /r (room) /p (person) /p/hexID/weekNo

At the current state run with
`cargo run` in the root dir.
It starts a http (Port 3030) and a websockets (Port 8080) server,
serving javascript that interacts with the websockets server

In that folder there is an index.html, that binds to the 8080 port of the same IP
it was served from, estabilishes a websockets connection and then updates the UI with the values received from the broadcast channel of the server.
