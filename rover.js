const Message = require('./message.js');
const Command = require('./command.js');

class Rover {
   // Write code here!
   constructor (position) {
      this.position = position;
      this.mode = 'NORMAL';
      this.generatorWatts = 110
   };

   receiveMessage (message) {

      let commandos = message.commands;
      let response = {
         message: message.name,
         results: []
      };
      
      for (let i = 0; i < commandos.length; i++) {
         let arr =[];
         if(commandos[i].commandType === "STATUS_CHECK") {

            arr = {completed: true,
               roverStatus: {mode: this.mode, generatorWatts: this.generatorWatts, position: this.position}}
            response.results.push(arr)
         } 
         else if (commandos[i].commandType === "MODE_CHANGE") {

            arr = {completed: true};
            this.mode = commandos[i].value;
            response.results.push(arr);

         } 
         else if (commandos[i].commandType === "MOVE" ) {

            if(this.mode === "LOW_POWER") {
               arr ={completed: false}
               response.results.push(arr)
            }
            else {
               arr = {completed: true}
               this.position = commandos[i].value
               response.results.push(arr)}
            }
      }
         return response
   }
}

// let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 12000)];
// let message = new Message('Test message with two commands', commands);
// let rover = new Rover(98382);
// let response =rover.receiveMessage(message);


// console.log(response)
// console.log(rover.mode)
// console.log(rover.position)

module.exports = Rover;
