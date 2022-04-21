/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as SimpleObjects from "../libs/CS559-Framework/SimpleObjects.js";

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
let mydiv = document.getElementById("div1");

let world = new GrWorld({ width: mydiv ? 600 : 800, where: mydiv });

let check = new T.TextureLoader().load("./images/bump.jpg");
let ct = cubeTextureHelp("./images/t");
world.scene.background = ct;
    
let shaderMat = new T.MeshStandardMaterial({ color: "white", bumpMap: check, side: T.DoubleSide, envMap: ct, metalness: 1.0, roughness: 0 });
let sph = new SimpleObjects.GrSphere({ x: -2, y: 1, material: shaderMat });
world.add(sph);
world.go();
