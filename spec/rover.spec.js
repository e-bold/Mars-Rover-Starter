const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  // test7
  test ('constructor sets position and default values for mode and generatorWatts', function(){
    let rover = new Rover (98382)
    expect(rover.position).toBe(98382);
    expect(rover.mode).toBe('NORMAL');
    expect(rover.generatorWatts).toBe(110);
  });
  
  // test8
  test('response returned by receiveMessage contains the name of the message', function(){
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let rover = new Rover (98382);
    let message = new Message('Test message with two commands', commands);
    let response = rover.receiveMessage(message);
    console.log(response);
    expect(response.message).toBe('Test message with two commands');
  });

   //test9
   test ("response returned by receiveMessage includes two results if two commands are sent in the message", function(){
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover (98382);
    let response = rover.receiveMessage(message);
    console.log(response);
    expect(response.results.length).toBe(commands.length);
   });

  //  test10
  test("responds correctly to the status check command", function(){
    let commands = [new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover (98382);
    let response = rover.receiveMessage(message);
    expect(response.results[0].completed).toBe(true);
    expect(response.results[0].roverStatus.mode).toEqual('NORMAL');
    expect(response.results[0].roverStatus.generatorWatts).toEqual(110);
    expect(response.results[0].roverStatus.position).toEqual(98382);
  });

  // test11
  test('responds correctly to mode change command', function () {
    const rover = new Rover(98382);
    const commands = [new Command('MODE_CHANGE', 'LOW_POWER')];
    const message = new Message('Test message', commands);
    const response = rover.receiveMessage(message);
    expect(rover.mode).toBe('LOW_POWER');
    expect(response.results[0].completed).toBe(true);
  });

  //test12
  test("responds with a false completed value when attempting to move in LOW_POWER mode", function(){
    const rover = new Rover(98382);
    const commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 12000)];
    const message = new Message('Test message', commands);
    const response = rover.receiveMessage(message);
    expect(rover.position).toBe(98382);
    expect(response.results[1].completed).toBe(false);
  });

  //test13
  test("responds with the position for the move command", function(){
    const rover = new Rover(98382);
    const commands = [new Command('MOVE', 12000)];
    const message = new Message('Test message', commands);
    const response = rover.receiveMessage(message);
    expect(rover.position).toBe(12000);
    expect(response.results[0].completed).toBe(true);
  });
});
