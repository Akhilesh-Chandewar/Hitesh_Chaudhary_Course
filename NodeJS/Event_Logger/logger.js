const fs = require('fs');
const os = require('os');
const EventEmitter = require('events');

class Logger extends EventEmitter {
    log(message){
        console.log(message);
        this.emit('messageLogged', {message});
    }
}

const logger = new Logger();
const logFilePath = './logs.txt';

const logToFile = (event) => {
    const logMessage = `${new Date().toISOString()} - ${event.message}\n`;
    fs.appendFile(logFilePath, logMessage, (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
        } else {
            console.log('Log message saved to file.');
        }
    });
}

logger.on('messageLogged', logToFile);

setInterval(() => {
    const freeMemory = os.freemem / os.totalmem * 100;
    const message = `Free memory: ${freeMemory.toFixed(2)}%`;
    logger.log(message);
    console.log(`Logged: ${message}`);
}
, 3000); 