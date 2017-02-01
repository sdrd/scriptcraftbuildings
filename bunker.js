// Build a bunker
function bunker(brick) {
  // define cobblestone as default if no brick provided
  if (typeof brick == 'undefined') {
    brick = blocks.cobblestone
  }

  // mark a starting position
  // starting position should be groud level under outside door on a side
  this.chkpt('start');

  // clear area around extending 2 blocks around bunker
  this.move('start')
  this.up(1).back(2).left(6).box(0,13,1,13)
  this.up(1).back(1).left(1).box(0,15,1,15)
  this.up(1).back(1).left(1).box(0,17,10,17)

  // fill area with brick
  this.move('start')
  this.down(1).left(4).box(brick,9,4,9)

  // bunker center
  this.move('start')
  // space inside
  this.fwd(3).left(1)
  this.box(0,3,2,3)

  // opening to the top
  this.move('start')
  this.fwd(3).left(1).up(2)
  this.box(0,1,1,1)
  // ladder to the top
  this.down(2).turn(3)
  this.box(65,1,2,1)

  // side features
  this.move('start')
  for (i=0;i<4;i++) {
    this.fwd(4).left(4).turn()
    this.bunkerSide(brick)
  }
}

// Bunker features, repeated on each side
function bunkerSide(sideBrick) {
  // assuming starting position: ground level, side door.
  this.chkpt('sideDoor')

  // hallway

  this.move('sideDoor')
  this.up(1).box(0,1,2,2)       // hallway part 1

  this.move('sideDoor')
  this.fwd(1).up(2).hangtorch() // hallway torch

  this.move('sideDoor')
  this.up(1).door()             // outer door

  this.move('sideDoor')
  this.fwd(1).box(0,1,2,2)      // hallway part 2
  this.up(1).fwd(1).turn(2)
  this.down(1).door()           // inner door

  // top features
  // center
  this.move('sideDoor')
  this.up(3)
  this.box(sideBrick,1,1,2)

  //left side
  this.move('sideDoor')
  this.up(3).left(2)
  this.box(sideBrick,1,1,1)
  this.left(2)
  this.box(sideBrick,1,1,1)

  // right side
  this.move('sideDoor')
  this.up(3).right(2)
  this.box(sideBrick,1,1,1)

  this.move('sideDoor')
  this.up(3).back(1).hangtorch() // outsie torch

  // return to sideDoor
  this.move('sideDoor')
}

var Drone = require('drone'); 
Drone.extend(bunker);
Drone.extend(bunkerSide);
