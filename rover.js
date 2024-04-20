class Rover {
   // Write code here!
   constructor(position) {
      this.position = position;
      this.mode = 'NORMAL';
      this.generatorWatts = 110
   }
}
let arma = new Rover(15)
console.log(arma)

module.exports = Rover;