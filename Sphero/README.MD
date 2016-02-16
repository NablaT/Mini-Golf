### SPHERO MINI-GOLF

## SETUP

- Go in the Sphero folder.
- Do `npm install`.

## START

- Go in the Sphero folder.
- Run the 'ls -a /dev | grep tty.Sphero' command in a terminal.
- Copy the response. It should look like 'tty.Sphero-XXX-XXX-XXX'.
- Go in the 'sockets/sphero.js' file.
- Search this 'orb    = sphero("/dev/tty.Sphero-XXX-XXX-XXX")' and replace the Sphero in the file by your Sphero.
- Go back in the Sphero folder.
- Do `grunt` or `npm start`.

## TEST

- Go in the Sphero folder.
- Do `npm test`.

## ARCHITECTURE

- The `app.js` file contains all we need to creates a functional node js app.
- The `sockets` folder contains the socket communication with the sphero device.
