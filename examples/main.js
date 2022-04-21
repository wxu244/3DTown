/*jshint esversion: 6 */
// @ts-check

//
// CS559 - Graphics Town - Workbook 12
// Example Code: 
// Example "Town"
//
// This sets up the town loading different objects. 
//
// It should be called from the onload function, after the world has been created

/** These imports are for the examples - feel free to remove them */
import { SimpleHouse } from "./house.js";
import { CircularTrack, TrackCube, TrackCar } from "./track.js";
import { Helicopter, Helipad } from "./helicopter.js";
import { ShinySculpture } from "./shinySculpture.js";
import { MorphTest } from "./morph.js";
import { House2, Tree, bird, sheep, Racetrack, Racecar, ball, stone, YellowTree,wall} from "../for_students/09-06-buildings.js";
import * as T from "../libs/CS559-Three/build/three.module.js";


function cubeTextureHelp(name, ext = "png", swapBottomFront = true) {
  return new T.CubeTextureLoader().load([
    name + "_Right." + ext,
    name + "_Left." + ext,
    name + "_Top." + ext,
    name + (swapBottomFront ? "_Front." : "_Bottom.") + ext,
    name + "_Back." + ext,
    name + (swapBottomFront ? "_Bottom." : "_Front.") + ext
  ]);
}
/********************************************************************** */
/** EXAMPLES - student should not use this! It is just for reference    */
/** you may use the sample objects, but not the sample layout           */
/***/
export function town(world) {
// make one row of houses standing by
  for (let i = -15; i < 16; i += 5) {
    world.add(shift(new House2(), i));
  }

  for(let i = -4; i< 0;i++){
    world.add(shift2(new Tree(),i));
  }
  for (let i = 1; i < 5; i++) {
    world.add(shift2(new Tree(), i));
  }
  let flying = new bird({ x: 0, z: 0 });
  world.add(flying);

  for (let i = -4; i < 0; i++) {
    world.add(shift4(new Tree(), i));
  }
  for (let i = 1; i < 5; i++) {
    world.add(shift4(new Tree(), i));
  }
  let flying2 = new bird({ x: 12, z: 0 });
  world.add(flying2);
  let track = new Racetrack();
  world.add(track);
  let tc1 = new Racecar(track);
  tc1.u = 0.125;
  world.add(tc1);
  world.add(shift3(new sheep(),-15));

  /** Helicopter*/
  world.add(new Helipad(-15, 0, 0));
  world.add(new Helipad(15, 0, 0));
  world.add(new Helipad(0, 0, -17));
  world.add(new Helipad(0, 0, 17));
  let copter = new Helicopter();
  world.add(copter);
  copter.getPads(world.objects);

  let ct = cubeTextureHelp("./images/r");
  world.scene.background = ct;

  let box = new ball();

  world.add(shift5(box,12));
  world.add(shift7(new wall(), 12));
  world.add(shift3(new stone(), 18));

  world.add(shift6(new YellowTree(), -10));

  world.add(shift6(new YellowTree(), 10));
}

function shift(grobj, x) {
  grobj.objects[0].translateX(-12);
  grobj.objects[0].translateZ(x);
  return grobj;
}

function shift2(grobj, x) {
  grobj.objects[0].translateZ(x);
  return grobj;
}
function shift3(grobj, x) {
  grobj.objects[0].translateX(10);
  grobj.objects[0].translateZ(x);
  grobj.objects[0].rotateY(-Math.PI*0.5);
  
  return grobj;
}
function shift4(grobj, x) {
  grobj.objects[0].translateZ(x);
  grobj.objects[0].translateX(12);
  return grobj;
}
function shift5(grobj, x) {
  grobj.objects[0].translateZ(x);
  grobj.objects[0].translateX(12);
  return grobj;
}

function shift6(grobj, x) {
  grobj.objects[0].translateX(-14);
  grobj.objects[0].translateZ(x);
  return grobj;
}

function shift7(grobj, x) {
  grobj.objects[0].translateZ(x);
  grobj.objects[0].translateX(-1.2);
  return grobj;
}