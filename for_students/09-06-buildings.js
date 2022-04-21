/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import { GreaterStencilFunc } from "../libs/CS559-Three/build/three.module.js";
import { shaderMaterial } from "../libs/CS559-Framework/shaderHelper.js";
// define your buildings here - remember, they need to be imported
// into the "main" program
export class wall extends GrObject {
    constructor() {
        let box = new T.BoxGeometry(0.4,5,5);
        let material = new T.MeshStandardMaterial({color: "yellow"});

        let mesh = new T.Mesh(box,material);
        super("wall",mesh);
    }
}
export class ball extends GrObject {
    constructor() {
let image = new T.TextureLoader().load("./images/download.png");
let shaderMat = shaderMaterial("./11-08-01.vs", "./11-08-01.fs", {
    side: T.DoubleSide,
    uniforms: {
        tex: { value: image },
    },
});
let box = new T.BoxGeometry(3,3,3);
let mesh = new T.Mesh(box,shaderMat);


super("Compressor", mesh);
this.time = 0;
this.group = mesh;
    }
    stepWorld(delta, timeOfDay) {
        this.time += delta / 1000; // time in seconds
        // set the y position based on the time
        let t = this.time % 1; // where are we in the cycle?

        if (t < 0.1 || t > 0.9) this.group.position.y = 0.5;
        else {
            this.group.position.x = 0.5 + 10 * (0.16 - (0.5 - t) * (0.5 - t));
        }

        
    };
}
export class Racetrack extends GrObject {
constructor(){
    let radius =  6;
    let width =  1;
    let ring = new T.RingGeometry(radius - width, radius + width, 50, 3,0,Math.PI);
    let material = new T.MeshStandardMaterial({
        side: T.DoubleSide,
        color: "#909090",
        roughness: 1.0,
    });
    let mesh = new T.Mesh(ring, material);
    mesh.rotateX(Math.PI / 2);

    let ring2 = new  T.RingGeometry(radius - width, radius + width, 50, 3, 0, -Math.PI);
    let mesh2 = new T.Mesh(ring2,material);
    mesh2.rotateX(Math.PI / 2);
    mesh2.position.x = radius*2;

    let ring3 = new T.RingGeometry(radius - width, radius + width, 50, 3, 0, -2*Math.PI);
    let mesh3 = new T.Mesh(ring3, material);
    mesh3.rotateX(Math.PI / 2);
    mesh3.position.x = radius * 2;

    let ring4 = new T.RingGeometry(radius - width, radius + width, 50, 3, 0, 2* Math.PI);
    
    let mesh4 = new T.Mesh(ring4, material);
    mesh4.rotateX(Math.PI / 2);

    let group = new T.Group();
    group.add(mesh);
    group.add(mesh2);
    group.add(mesh3);
    group.add(mesh4);
    group.translateX( 0);
    group.translateY( 0.1); // raise track above ground to avoid z-fight
    group.translateZ( 0);
    super(`Track`, group);

    this.x =  0;
    this.z =  0;
    this.y =  0.1;
    this.r = radius;
    
}
    eval(u) {
        let p = u * 2 * Math.PI;
        return [
            this.x + this.r * Math.cos(p),
            this.y,
            this.z + this.r * Math.sin(p),
        ];
    }
    tangent(u) {
        let p = u * 2 * Math.PI;
        // unit tangent vector - not the real derivative
        return [Math.sin(p), 0, -Math.cos(p)];
    }
}

export class Racecar extends GrObject {
    constructor(track) {
        let cy = new T.CylinderGeometry(0.3, 0.3, 0.2, 32);
        let material = new T.MeshBasicMaterial({ color: "brown" });
        let cylinder = new T.Mesh(cy, material);
        cylinder.position.y = 0.3;
        cylinder.rotateZ(Math.PI * 0.5);
        cylinder.position.x = 0.6;

        let cylinder2 = new T.Mesh(cy, material);
        cylinder2.position.y = 0.3;
        cylinder2.rotateZ(Math.PI * 0.5);
        cylinder2.position.x = -0.6;

        let cylinder3 = new T.Mesh(cy, material);
        cylinder3.position.y = 0.3;
        cylinder3.rotateZ(Math.PI * 0.5);
        cylinder3.position.x = -0.6;
        cylinder3.position.z = -1.2;

        let cylinder4 = new T.Mesh(cy, material);
        cylinder4.position.y = 0.3;
        cylinder4.rotateZ(Math.PI * 0.5);
        cylinder4.position.x = 0.6;
        cylinder4.position.z = -1.2;

        let box = new T.BoxGeometry(1, 0.3, 2);
        let material2 = new T.MeshBasicMaterial({ color: "pink" });
        let body = new T.Mesh(box, material2);
        body.position.y = 0.15;

        let geometry = new T.Geometry();
        geometry.vertices.push(new T.Vector3(-0.3, 0.65, 0.3));//0
        geometry.vertices.push(new T.Vector3(0.3, 0.65, 0.3));//1
        geometry.vertices.push(new T.Vector3(-0.5, 0.15, 0.5));//2
        geometry.vertices.push(new T.Vector3(0.5, 0.15, 0.5));//3
        geometry.vertices.push(new T.Vector3(-0.3, 0.65, -0.8));//4
        geometry.vertices.push(new T.Vector3(0.3, 0.65, -0.8));//5
        geometry.vertices.push(new T.Vector3(-0.5, 0.15, -1));//6
        geometry.vertices.push(new T.Vector3(0.5, 0.15, -1));//7

        geometry.vertices.push(new T.Vector3(0.325, 0.6, 0.2));//8
        geometry.vertices.push(new T.Vector3(0.325, 0.6, -0.2));//9
        geometry.vertices.push(new T.Vector3(0.45, 0.2, 0.2));//10
        geometry.vertices.push(new T.Vector3(0.45, 0.2, -0.2));//11

        geometry.vertices.push(new T.Vector3(0.325, 0.6, -0.4));//12
        geometry.vertices.push(new T.Vector3(0.325, 0.6, -0.7));//13
        geometry.vertices.push(new T.Vector3(0.45, 0.2, -0.4));//14
        geometry.vertices.push(new T.Vector3(0.45, 0.2, -0.7));//15

        geometry.vertices.push(new T.Vector3(-0.325, 0.6, 0.2));//16
        geometry.vertices.push(new T.Vector3(-0.325, 0.6, -0.2));//17
        geometry.vertices.push(new T.Vector3(-0.45, 0.2, 0.2));//18
        geometry.vertices.push(new T.Vector3(-0.45, 0.2, -0.2));//19

        geometry.vertices.push(new T.Vector3(-0.325, 0.6, -0.4));//20
        geometry.vertices.push(new T.Vector3(-0.325, 0.6, -0.7));//21
        geometry.vertices.push(new T.Vector3(-0.45, 0.2, -0.4));//22
        geometry.vertices.push(new T.Vector3(-0.45, 0.2, -0.7));//23

        geometry.vertices.push(new T.Vector3(0.325, 0.6, 0.323));//24
        geometry.vertices.push(new T.Vector3(0.325, 0.6, -0.823));//25
        geometry.vertices.push(new T.Vector3(0.45, 0.2, 0.48));//26
        geometry.vertices.push(new T.Vector3(0.45, 0.2, -0.98));//27

        geometry.vertices.push(new T.Vector3(-0.325, 0.6, 0.323));//28
        geometry.vertices.push(new T.Vector3(-0.325, 0.6, -0.823));//29
        geometry.vertices.push(new T.Vector3(-0.45, 0.2, 0.48));//30
        geometry.vertices.push(new T.Vector3(-0.45, 0.2, -0.98));//31
        geometry.faceVertexUvs = [[]];

        //right first window
        let f7 = new T.Face3(10, 11, 8);
        geometry.faces.push(f7);
        geometry.faceVertexUvs[0].push([
            new T.Vector2(0.85, 0.7),
            new T.Vector2(0.95, 0.7),
            new T.Vector2(0.85, 0.05)
        ]);
        let f8 = new T.Face3(8, 11, 9);
        geometry.faces.push(f8);
        geometry.faceVertexUvs[0].push([
            new T.Vector2(0.85, 0.7),
            new T.Vector2(0.95, 0.7),
            new T.Vector2(0.85, 0.05)
        ]);

        //second window
        let f9 = new T.Face3(14, 15, 12);
        geometry.faces.push(f9);
        geometry.faceVertexUvs[0].push([
            new T.Vector2(0.85, 0.7),
            new T.Vector2(0.95, 0.7),
            new T.Vector2(0.85, 0.05)
        ]);
        let f10 = new T.Face3(12, 15, 13);
        geometry.faces.push(f10);
        geometry.faceVertexUvs[0].push([
            new T.Vector2(0.85, 0.7),
            new T.Vector2(0.95, 0.7),
            new T.Vector2(0.85, 0.05)
        ]);

        //left first window
        let f11 = new T.Face3(19, 18, 17);
        geometry.faces.push(f11);
        geometry.faceVertexUvs[0].push([
            new T.Vector2(0.85, 0.7),
            new T.Vector2(0.95, 0.7),
            new T.Vector2(0.85, 0.05)
        ]);
        let f12 = new T.Face3(17, 18, 16);
        geometry.faces.push(f12);
        geometry.faceVertexUvs[0].push([
            new T.Vector2(0.85, 0.7),
            new T.Vector2(0.95, 0.7),
            new T.Vector2(0.85, 0.05)
        ]);

        //second window 
        let f13 = new T.Face3(23, 22, 21);
        geometry.faces.push(f13);
        geometry.faceVertexUvs[0].push([
            new T.Vector2(0.85, 0.7),
            new T.Vector2(0.95, 0.7),
            new T.Vector2(0.85, 0.05)
        ]);
        let f14 = new T.Face3(21, 22, 20);
        geometry.faces.push(f14);
        geometry.faceVertexUvs[0].push([
            new T.Vector2(0.85, 0.7),
            new T.Vector2(0.95, 0.7),
            new T.Vector2(0.85, 0.05)
        ]);

        //front 
        let f1 = new T.Face3(2, 3, 0);
        geometry.faces.push(f1);
        geometry.faceVertexUvs[0].push([
            new T.Vector2(0.85, 0.7),
            new T.Vector2(0.95, 0.7),
            new T.Vector2(0.85, 0.05)
        ]);
        let f2 = new T.Face3(0, 3, 1);
        geometry.faces.push(f2);
        geometry.faceVertexUvs[0].push([
            new T.Vector2(0.85, 0.7),
            new T.Vector2(0.95, 0.7),
            new T.Vector2(0.85, 0.05)
        ]);

        //back
        let f5 = new T.Face3(4, 5, 6);
        geometry.faces.push(f5);
        geometry.faceVertexUvs[0].push([
            new T.Vector2(0.85, 0.7),
            new T.Vector2(0.95, 0.7),
            new T.Vector2(0.85, 0.05)
        ]);
        let f6 = new T.Face3(6, 5, 7);
        geometry.faces.push(f6);
        geometry.faceVertexUvs[0].push([
            new T.Vector2(0.85, 0.7),
            new T.Vector2(0.95, 0.7),
            new T.Vector2(0.85, 0.05)
        ]);

        //top
        let f3 = new T.Face3(0, 1, 4);
        geometry.faces.push(f3);

        let f4 = new T.Face3(4, 1, 5);
        geometry.faces.push(f4);

        //rest  
        let f15 = new T.Face3(24, 25, 1);
        geometry.faces.push(f15);
        let f16 = new T.Face3(1, 25, 5);
        geometry.faces.push(f16);

        let f17 = new T.Face3(3, 7, 26);
        geometry.faces.push(f17);
        let f18 = new T.Face3(26, 7, 27);
        geometry.faces.push(f18);

        let f19 = new T.Face3(26, 10, 24);
        geometry.faces.push(f19);
        let f20 = new T.Face3(24, 10, 8);
        geometry.faces.push(f20);

        let f21 = new T.Face3(11, 14, 9);
        geometry.faces.push(f21);
        let f22 = new T.Face3(9, 14, 12);
        geometry.faces.push(f22);

        let f23 = new T.Face3(15, 27, 13);
        geometry.faces.push(f23);
        let f24 = new T.Face3(13, 27, 25);
        geometry.faces.push(f24);

        let f25 = new T.Face3(29, 28, 4);
        geometry.faces.push(f25);
        let f26 = new T.Face3(4, 28, 0);
        geometry.faces.push(f26);

        let f27 = new T.Face3(6, 2, 31);
        geometry.faces.push(f27);
        let f28 = new T.Face3(31, 2, 30);
        geometry.faces.push(f28);

        let f29 = new T.Face3(18, 30, 16);
        geometry.faces.push(f29);
        let f30 = new T.Face3(16, 30, 28);
        geometry.faces.push(f30);

        let f31 = new T.Face3(22, 19, 20);
        geometry.faces.push(f31);
        let f32 = new T.Face3(20, 19, 17);
        geometry.faces.push(f32);

        let f33 = new T.Face3(31, 23, 29);
        geometry.faces.push(f33);
        let f34 = new T.Face3(29, 23, 21);
        geometry.faces.push(f34);
        geometry.computeFaceNormals();
        geometry.uvsNeedUpdate = true;
        let tl = new T.TextureLoader().load("./images/5361.png");
        let materialcar = new T.MeshBasicMaterial({ map: tl });
        let mesh = new T.Mesh(geometry, materialcar);
        let group = new T.Group();
        body.position.y = 0.5;
        body.position.z = -0.5;
        group.add(cylinder);
        group.add(cylinder2);
        group.add(cylinder3);
        group.add(cylinder4);
        body.add(mesh);
        group.add(body);
        super("car", group);
        this.track = track;
        this.u = 0;
        // the fbx loader puts the car on the ground - we need a ride point above the ground
        this.ridePoint = new T.Object3D();
        this.ridePoint.translateY(0.5);
        this.objects[0].add(this.ridePoint);
        this.rideable = this.ridePoint;
    }
    stepWorld(delta, timeOfDay) {
        this.u += delta / 3000;
        let pos;
        if (Math.floor(this.u) % 2 == 1) {
            pos = this.track.eval(this.u);
            pos[0] = 6 * -Math.cos(this.u * 2 * Math.PI);
            pos[0] += 24;
            this.objects[0].position.set(pos[0] - 12, pos[1], pos[2]);
        } else {
            pos = this.track.eval(this.u);
            this.objects[0].position.set(pos[0], pos[1], pos[2]);
        }

        let dir = this.track.tangent(this.u);
        // since we can't easily construct the matrix, figure out the rotation
        // easy since this is 2D!
        let zAngle = Math.atan2(dir[2], dir[0]);
        // turn the object so the Z axis is facing in that direction
        if (Math.floor(this.u) % 2 == 1) {
            this.objects[0].rotation.y = Math.PI / 2 + zAngle;
        }
        else{
            this.objects[0].rotation.y = -zAngle - Math.PI / 2;
        }
        
    }
}
let simpleHouseCount = 0;
export class House2 extends GrObject{
    constructor(){
        let geometry = new T.Geometry();

        geometry.vertices.push(new T.Vector3(0, 3.5, 0));//0
        geometry.vertices.push(new T.Vector3(2.5, 3.5, 0));//1
        geometry.vertices.push(new T.Vector3(0, 2.5, 1));//2
        geometry.vertices.push(new T.Vector3(2.5, 2.5, 1));//3
        geometry.vertices.push(new T.Vector3(0, 2.5, -1));//4
        geometry.vertices.push(new T.Vector3(2.5, 2.5, -1));//5

        geometry.vertices.push(new T.Vector3(0, 2, 1));//6
        geometry.vertices.push(new T.Vector3(2.5, 2, 1));//7
        geometry.vertices.push(new T.Vector3(0.3, 2, 1));//8
        geometry.vertices.push(new T.Vector3(2.2, 2, 1));//9
        geometry.vertices.push(new T.Vector3(0, 1.5, 1));//10
        geometry.vertices.push(new T.Vector3(2.5, 1.5, 1));//11
        geometry.vertices.push(new T.Vector3(0.3, 1.5, 1));//12
        geometry.vertices.push(new T.Vector3(2.2, 1.5, 1));//13

        geometry.vertices.push(new T.Vector3(1.1, 1, 1));//14
        geometry.vertices.push(new T.Vector3(1.4, 1, 1));//15
        geometry.vertices.push(new T.Vector3(1.1, 0, 1));//16
        geometry.vertices.push(new T.Vector3(1.4, 0, 1));//17

        geometry.vertices.push(new T.Vector3(1.1, 1.5, 1));//18
        geometry.vertices.push(new T.Vector3(1.4, 1.5, 1));//19

        geometry.vertices.push(new T.Vector3(0, 0, 1));//20
        geometry.vertices.push(new T.Vector3(2.5, 0, 1));//21

        geometry.vertices.push(new T.Vector3(0, 0, -1));//22
        geometry.vertices.push(new T.Vector3(2.5, 0, -1));//23

        geometry.faceVertexUvs = [[]];
        //front roof
        let f1 = new T.Face3(2, 3, 0);
        geometry.faces.push(f1);
        geometry.faceVertexUvs[0].push([
            new T.Vector2(0.8, 0),
            new T.Vector2(1, 0),
            new T.Vector2(0.8, 0.2)
        ]);
        let f2 = new T.Face3(0, 3, 1);
        geometry.faces.push(f2);
        geometry.faceVertexUvs[0].push([
            new T.Vector2(0.8, 0),
            new T.Vector2(1, 0),
            new T.Vector2(0.8, 0.2)
        ]);
        //back roof
        let f3 = new T.Face3(0, 1, 4);
        geometry.faces.push(f3);
        geometry.faceVertexUvs[0].push([
            new T.Vector2(0.8, 0),
            new T.Vector2(1, 0),
            new T.Vector2(0.8, 0.2)
        ]);
        let f4 = new T.Face3(4, 1, 5);
        geometry.faces.push(f4);
        geometry.faceVertexUvs[0].push([
            new T.Vector2(0.8, 0),
            new T.Vector2(1, 0),
            new T.Vector2(0.8, 0.2)
        ]);
        //left roof
        let f5 = new T.Face3(4, 2, 0);
        geometry.faces.push(f5);
        geometry.faceVertexUvs[0].push([
            new T.Vector2(0.4, 0),
            new T.Vector2(0.6, 0),
            new T.Vector2(0.4, 0.2)
        ]);
        //right roof
        let f6 = new T.Face3(3, 5, 1);
        geometry.faces.push(f6);
        geometry.faceVertexUvs[0].push([
            new T.Vector2(0.4, 0),
            new T.Vector2(0.6, 0),
            new T.Vector2(0.4, 0.2)
        ]);
        //front
        let f7 = new T.Face3(6, 7, 2);
        geometry.faces.push(f7);
        let f8 = new T.Face3(2, 7, 3);
        geometry.faces.push(f8);
        

        let f11 = new T.Face3(12, 13, 8);
        geometry.faces.push(f11);
        let f12 = new T.Face3(8, 13, 9);
        geometry.faces.push(f12);

        

        //rest
        let f17 = new T.Face3(20, 16, 10);
        geometry.faces.push(f17);
        let f18 = new T.Face3(10, 16, 18);
        geometry.faces.push(f18);
        let f19 = new T.Face3(14, 15, 18);
        geometry.faces.push(f19);
        let f20 = new T.Face3(18, 15, 19);
        geometry.faces.push(f20);
        let f21 = new T.Face3(17, 21, 19);
        geometry.faces.push(f21);
        let f22 = new T.Face3(19, 21, 11);
        geometry.faces.push(f22);

        //left
        let f23 = new T.Face3(22, 20, 2);
        geometry.faces.push(f23);
        let f24 = new T.Face3(22, 2, 4);
        geometry.faces.push(f24);

        //right
        let f25 = new T.Face3(21, 23, 3);
        geometry.faces.push(f25);
        let f26 = new T.Face3(3, 23, 5);
        geometry.faces.push(f26);

        //back
        let f27 = new T.Face3(4, 5, 22);
        geometry.faces.push(f27);
        let f28 = new T.Face3(22, 5, 23);
        geometry.faces.push(f28);

        geometry.computeFaceNormals();
        geometry.uvsNeedUpdate = true;

        let geometry2 = new T.Geometry();
        geometry2.vertices.push(new T.Vector3(0, 2, 1));//6 0
        geometry2.vertices.push(new T.Vector3(2.5, 2, 1));//7 1
        geometry2.vertices.push(new T.Vector3(0.3, 2, 1));//8 2
        geometry2.vertices.push(new T.Vector3(2.2, 2, 1));//9 3
        geometry2.vertices.push(new T.Vector3(0, 1.5, 1));//10 4
        geometry2.vertices.push(new T.Vector3(2.5, 1.5, 1));//11 5
        geometry2.vertices.push(new T.Vector3(0.3, 1.5, 1));//12 6
        geometry2.vertices.push(new T.Vector3(2.2, 1.5, 1));//13 7
        
        geometry2.vertices.push(new T.Vector3(1.1, 1, 1));//14 8
        geometry2.vertices.push(new T.Vector3(1.4, 1, 1));//15 9
        geometry2.vertices.push(new T.Vector3(1.1, 0, 1));//16 10
        geometry2.vertices.push(new T.Vector3(1.4, 0, 1));//17 11

        geometry2.faceVertexUvs = [[]];
        //window 1
        let fw = new T.Face3(4, 6, 0);
        geometry2.faces.push(fw);
        geometry2.faceVertexUvs[0].push([
            new T.Vector2(0.105, 0.55),
            new T.Vector2(0.165, 0.55),
            new T.Vector2(0.105, 0.9)
        ]);
        let fw2 = new T.Face3(0, 6, 2);
        geometry2.faces.push(fw2);
        geometry2.faceVertexUvs[0].push([
            new T.Vector2(0.105, 0.9),
            new T.Vector2(0.165, 0.55),
            new T.Vector2(0.165, 0.9)
        ]);
        //window 2
        let fw3 = new T.Face3(7, 5, 3);
        geometry2.faces.push(fw3);
        geometry2.faceVertexUvs[0].push([
            new T.Vector2(0.105, 0.55),
            new T.Vector2(0.165, 0.55),
            new T.Vector2(0.105, 0.9)
        ]);
        let fw4 = new T.Face3(3, 5, 1);
        geometry2.faces.push(fw4);
        geometry2.faceVertexUvs[0].push([
            new T.Vector2(0.105, 0.9),
            new T.Vector2(0.165, 0.55),
            new T.Vector2(0.165, 0.9)
        ]);
        //door
        let fw5 = new T.Face3(10, 11, 8);
        geometry2.faces.push(fw5);
        geometry2.faceVertexUvs[0].push([
            new T.Vector2(0.45, 0.7),
            new T.Vector2(0.55, 0.7),
            new T.Vector2(0.45, 0.05)
        ]);
        let fw6 = new T.Face3(8, 11, 9);
        geometry2.faces.push(fw6);
        geometry2.faceVertexUvs[0].push([
            new T.Vector2(0.45, 0.05),
            new T.Vector2(0.55, 0.7),
            new T.Vector2(0.55, 0.05)
        ]);

        let tl = new T.TextureLoader().load("./images/5361.png");
        let t2 = new T.TextureLoader().load("./images/house.png")
        let material = new T.MeshStandardMaterial({ map: tl });
        let material2 = new T.MeshBasicMaterial({ map: t2 });
        let mesh = new T.Mesh(geometry, material);
        let mesh2 = new T.Mesh(geometry2, material2);
        let group = new T.Group();
        group.add(mesh);
        group.add(mesh2);
        super(`House-${++simpleHouseCount}`, group);
    }
}

export class Tree extends GrObject{
    constructor(){
        let geometry = new T.ConeGeometry(0.3, 0.8, 32);
        let material = new T.MeshBasicMaterial({ color: "lightgreen" });
        let cone = new T.Mesh(geometry, material);
        cone.position.y = 0.4;
        super("TREE",cone);
    }
}

let count = 0;
export class bird extends GrObject {

    constructor(params = {}) {
        let flying = new T.Group();

        let cone = new T.ConeGeometry(0.1, 0.5, 32);
        let coneMaterial = new T.MeshStandardMaterial({ color: "red" });
        let coneMesh = new T.Mesh(cone, coneMaterial);
        flying.add(coneMesh);
        coneMesh.position.y = 0.25;
        let maingroup = new T.Group();
        coneMesh.add(maingroup);

        let body = new T.BoxGeometry(1, 0.5, 2);
        let bodyMaterial = new T.MeshStandardMaterial({ color: "pink" });
        let bodyMesh = new T.Mesh(body, bodyMaterial);
        bodyMesh.scale.set(0.5, 0.5, 0.5);
        bodyMesh.position.y = 2;
        bodyMesh.position.x = 3;
        maingroup.add(bodyMesh);

        let coneMesh2 = new T.Mesh(cone, coneMaterial);
        coneMesh2.rotateX(Math.PI * 0.5);
        coneMesh2.position.z = 1.5;
        bodyMesh.add(coneMesh2);
        coneMesh2.scale.set(2, 2, 2);

        const points = [];
        for (let i = 0; i < 10; i++) {
            points.push(new T.Vector2(Math.sin(i * 0.2) * 10 + 5, (i - 5) * 2));
        }
        const geometry = new T.LatheGeometry(points);
        const material = new T.MeshBasicMaterial({ color: "brown" });
        const lathe = new T.Mesh(geometry, material);
        lathe.scale.set(0.02, 0.02, 0.02);
        lathe.position.y = 0.25;
        lathe.lookAt(-bodyMesh.position.x, bodyMesh.position.y, bodyMesh.position.z);
        coneMesh.add(lathe);
        super(`bird-${count++}`, flying);
   
        this.ob = flying;
        this.platform = coneMesh;

        this.ob.position.x = params.x ? Number(params.x) : 0;
        this.ob.position.y = params.y ? Number(params.y) : 0;
        this.ob.position.z = params.z ? Number(params.z) : 0;
        let scale = params.size ? Number(params.size) : 2;
        flying.scale.set(scale, scale, scale);
    }

    stepWorld(delta, timeOfDay) {
        this.platform.rotateY(-0.003 * delta);
    }
}
export class sheep extends GrObject {
    constructor(params = {}) {
        
        var mat_grey = new T.MeshLambertMaterial({ color: 0xf3f2f7 });
        var mat_yellow = new T.MeshLambertMaterial({ color: 0xfeb42b });
        var mat_dark = new T.MeshLambertMaterial({ color: 0x5a6e6c });
        
        var mat_stone = new T.MeshLambertMaterial({ color: 0x9eaeac });
        var pi = Math.PI;
        let total = new T.Group();
        //-------------------------------------trees-------------------------------------
        var tree = new T.Group();
        total.add(tree);
        //trunk
        var geo_trunk = new T.IcosahedronGeometry(9, 0);
        var trunk = new T.Mesh(geo_trunk, mat_grey);
        var a = new T.Vector3(1, 0, 10);
        trunk.rotation.x = pi / 2;
        trunk.position.y = 5;
        trunk.scale.set(0.03, 0.03, 1);
        trunk.castShadow = true;
        trunk.receiveShadow = true;
        tree.add(trunk);

        //crown
        var geo_crown = new T.IcosahedronGeometry(2.5, 0);
        var crown = new T.Mesh(geo_crown, mat_yellow);
        crown.scale.y = 0.4;
        crown.rotation.z = -0.5;
        crown.rotation.x = -0.2;
        crown.position.set(trunk.position.x, 12, trunk.position.z);
        crown.castShadow = true;
        tree.add(crown);

        //leaf
        var leaf = new T.Group();
        var mainStem = new T.Mesh(geo_trunk, mat_grey);
        mainStem.scale.set(0.007, 0.007, 0.16);
        mainStem.rotation.x = pi / 2;
        mainStem.castShadow = true;
        leaf.add(mainStem);

        var geo_blade = new T.CylinderGeometry(0.7, 0.7, 0.05, 12);
        var blade = new T.Mesh(geo_blade, mat_yellow);
        blade.rotation.z = pi / 2;
        blade.scale.x = 1.2;
        blade.position.set(-0.05, 0.4, 0);
        blade.castShadow = true;
        leaf.add(blade);

        var subStems = [];
        for (var i = 0; i < 8; i++) {
            subStems[i] = mainStem.clone();
            subStems[i].scale.set(0.0055, 0.0055, 0.01);
            subStems[i].castShadow = true;
            leaf.add(subStems[i]);
        }
        subStems[0].rotation.x = -pi / 4;
        subStems[0].scale.z = 0.04;
        subStems[0].position.set(0, 0.8, 0.2);

        subStems[2].rotation.x = -pi / 6;
        subStems[2].scale.z = 0.05;
        subStems[2].position.set(0, 0.5, 0.25);

        subStems[4].rotation.x = -pi / 8;
        subStems[4].scale.z = 0.055;
        subStems[4].position.set(0, 0.2, 0.3);

        subStems[6].rotation.x = -pi / 10;
        subStems[6].scale.z = 0.045;
        subStems[6].position.set(0, -0.1, 0.26);

        for (var i = 1; i < 8; i += 2) {
            subStems[i].rotation.x = -subStems[i - 1].rotation.x;
            subStems[i].scale.z = subStems[i - 1].scale.z;
            subStems[i].position.set(
                0,
                subStems[i - 1].position.y,
                -subStems[i - 1].position.z
            );
        }
        leaf.rotation.x = pi / 3;
        leaf.rotation.z = 0.2;
        leaf.position.set(trunk.position.x - 0.2, 5, trunk.position.z + 1);
        tree.add(leaf);

        var leaf_1 = leaf.clone();
        leaf_1.rotation.x = -pi / 3;
        leaf_1.position.set(trunk.position.x - 0.2, 6, trunk.position.z - 1);
        tree.add(leaf_1);
        tree.rotation.y = -pi / 12;
        tree.position.set(-2, 0, -2);
        total.add(tree);

        var tree_1 = tree.clone();
        tree_1.scale.set(0.8, 0.8, 0.8);
        tree_1.position.set(-1, 0, -5);
        tree_1.rotation.y = -pi / 5;
        total.add(tree_1);

        var tree_2 = tree.clone();
        tree_2.scale.set(0.7, 0.7, 0.7);
        tree_2.position.set(-2, 0, 0.5);
        tree_2.rotation.y = -pi / 12;
        tree_2.children[2].rotation.x = -pi / 3;
        tree_2.children[2].position.z = trunk.position.z - 1;
        tree_2.children[3].rotation.x = pi / 3;
        tree_2.children[3].position.z = trunk.position.z + 1;
        total.add(tree_2);

        //-------------------------------------stone-------------------------------------
        var geo_stone = new T.DodecahedronGeometry(1, 0);
        var stone = [];
        for (var i = 0; i < 2; i++) {
            stone[i] = new T.Mesh(geo_stone, mat_stone);
            total.add(stone[i]);
            stone[i].castShadow = true;
        }
        stone[0].rotation.set(0, 12, pi / 2);
        stone[0].scale.set(3, 1, 1);
        stone[0].position.set(-1, 1, 4.6);

        stone[1].rotation.set(0, 0, pi / 2);
        stone[1].scale.set(1, 1, 1);
        stone[1].position.set(0, 0.7, 5.3);

        //-------------------------------------sheep-------------------------------------
        //sheep body
        var sheep = new T.Group();
        // var geo_sheepHead=new THREE.SphereGeometry(.5,8,6);
        var geo_sheepHead = new T.IcosahedronGeometry(1, 0);
        var sheepHead = new T.Mesh(geo_sheepHead, mat_dark);
        sheepHead.scale.z = 0.6;
        sheepHead.scale.y = 1.1;
        sheepHead.position.y = 2.5;
        sheepHead.rotation.x = -0.2;
        sheepHead.castShadow = true;
        sheep.add(sheepHead);

        var geo_sheepBody = new T.IcosahedronGeometry(3.5, 0);
        var sheepBody = new T.Mesh(geo_sheepBody, mat_grey);
        sheepBody.position.set(0, sheepHead.position.y, -2.2);
        sheepBody.scale.set(0.5, 0.5, 0.6);
        sheepBody.rotation.set(0, 0, pi / 3);
        sheepBody.castShadow = true;
        sheep.add(sheepBody);

        var geo_tail = new T.IcosahedronGeometry(0.5, 0);
        var tail = new T.Mesh(geo_tail, mat_grey);
        tail.position.set(sheepHead.position.x, sheepHead.position.y + 1.2, -3.8);
        tail.castShadow = true;
        sheep.add(tail);

        var hair = [];
        var geo_hair = new T.IcosahedronGeometry(0.4, 0);
        for (var i = 0; i < 5; i++) {
            hair[i] = new T.Mesh(geo_hair, mat_grey);
            hair[i].castShadow = true;
            sheep.add(hair[i]);
        }

        hair[0].position.set(-0.4, sheepHead.position.y + 0.9, -0.1);
        hair[1].position.set(0, sheepHead.position.y + 1, -0.1);
        hair[2].position.set(0.4, sheepHead.position.y + 0.9, -0.1);
        hair[3].position.set(-0.1, sheepHead.position.y + 0.9, -0.4);
        hair[4].position.set(0.12, sheepHead.position.y + 0.9, -0.4);

        hair[0].rotation.set(pi / 12, 0, pi / 3);
        hair[1].rotation.set(pi / 12, pi / 6, pi / 3);
        hair[2].rotation.set(pi / 12, 0, pi / 3);
        hair[3].rotation.set(pi / 12, 0, pi / 3);
        hair[4].rotation.set(pi / 12, pi / 6, pi / 3);

        hair[0].scale.set(0.6, 0.6, 0.6);
        hair[2].scale.set(0.8, 0.8, 0.8);
        hair[3].scale.set(0.7, 0.7, 0.7);
        hair[4].scale.set(0.6, 0.6, 0.6);

        var legs = [];
        var geo_leg = new T.CylinderGeometry(0.15, 0.1, 1, 5);
        for (var i = 0; i < 4; i++) {
            legs[i] = new T.Mesh(geo_leg, mat_dark);
            legs[i].castShadow = true;
            legs[i].receiveShadow = true;
            sheep.add(legs[i]);
        }
        legs[0].position.set(0.5, 1.1, -1.5);
        legs[1].position.set(-0.5, 1.1, -1.5);
        legs[2].position.set(0.8, 1.1, -3);
        legs[3].position.set(-0.8, 1.1, -3);

        var feet = [];
        var geo_foot = new T.DodecahedronGeometry(0.2, 0);
        for (var i = 0; i < legs.length; i++) {
            feet[i] = new T.Mesh(geo_foot, mat_dark);
            sheep.add(feet[i]);
            feet[i].scale.set(1, 0.8, 1);
            feet[i].castShadow = true;
            feet[i].receiveShadow = true;
            feet[i].position.set(legs[i].position.x, 0, legs[i].position.z + 0.09);
        }
        feet[0].position.y = 0.56;
        feet[1].position.y = 0.66;
        feet[2].position.y = 0.7;
        feet[3].position.y = 0.7;
        //eyes
        var geo_eye = new T.CylinderGeometry(0.3, 0.2, 0.05, 8);
        var eyes = [];
        for (var i = 0; i < 2; i++) {
            eyes[i] = new T.Mesh(geo_eye, mat_grey);
            sheep.add(eyes[i]);
            eyes[i].castShadow = true;
            eyes[i].position.set(0, sheepHead.position.y + 0.1, 0.5);
            eyes[i].rotation.x = pi / 2 - pi / 15;
        }
        eyes[0].position.x = 0.3;
        eyes[1].position.x = -eyes[0].position.x;

        eyes[0].rotation.z = -pi / 15;
        eyes[1].rotation.z = -eyes[0].rotation.z;

        //eyeballs
        var geo_eyeball = new T.SphereGeometry(0.11, 8, 8);
        var eyeballs = [];
        for (var i = 0; i < 2; i++) {
            eyeballs[i] = new T.Mesh(geo_eyeball, mat_dark);
            sheep.add(eyeballs[i]);
            eyeballs[i].castShadow = true;
            eyeballs[i].position.set(
                eyes[i].position.x,
                eyes[i].position.y,
                eyes[i].position.z + 0.02
            );
        }

        sheep.position.set(4.8, -0.2, -1);
        sheep.scale.set(0.8, 0.8, 0.8);
        sheep.rotation.set(0, pi / 4, 0);
        total.add(sheep);
        super("sheep", total);
    }
}

export class stone extends GrObject {
    constructor() {
        var mat_stone = new T.MeshLambertMaterial({ color: 0x9eaeac });
        let total = new T.Group();
        var geo_stone = new T.DodecahedronGeometry(1, 0);
        var stone = [];
        for (var i = 0; i < 2; i++) {
            stone[i] = new T.Mesh(geo_stone, mat_stone);
            total.add(stone[i]);
            stone[i].castShadow = true;
        }
        stone[0].rotation.set(0, 12, Math.PI / 2);
        stone[0].scale.set(3, 1, 1);
        stone[0].position.set(-1, 1, 4.6);

        stone[1].rotation.set(0, 0, Math.PI / 2);
        stone[1].scale.set(1, 1, 1);
        stone[1].position.set(0, 0.7, 5.3);

        super("stone",total);
    }
}
export class YellowTree extends GrObject {
    constructor() {
        var mat_grey = new T.MeshLambertMaterial({ color: 0xf3f2f7 });
        var mat_yellow = new T.MeshLambertMaterial({ color: 0xfeb42b });
        
        var pi = Math.PI;
        let total = new T.Group();
        //-------------------------------------trees-------------------------------------
        var tree = new T.Group();
        total.add(tree);
        //trunk
        var geo_trunk = new T.IcosahedronGeometry(9, 0);
        var trunk = new T.Mesh(geo_trunk, mat_grey);
        var a = new T.Vector3(1, 0, 10);
        trunk.rotation.x = pi / 2;
        trunk.position.y = 5;
        trunk.scale.set(0.03, 0.03, 1);
        trunk.castShadow = true;
        trunk.receiveShadow = true;
        tree.add(trunk);

        //crown
        var geo_crown = new T.IcosahedronGeometry(2.5, 0);
        var crown = new T.Mesh(geo_crown, mat_yellow);
        crown.scale.y = 0.4;
        crown.rotation.z = -0.5;
        crown.rotation.x = -0.2;
        crown.position.set(trunk.position.x, 12, trunk.position.z);
        crown.castShadow = true;
        tree.add(crown);

        //leaf
        var leaf = new T.Group();
        var mainStem = new T.Mesh(geo_trunk, mat_grey);
        mainStem.scale.set(0.007, 0.007, 0.16);
        mainStem.rotation.x = pi / 2;
        mainStem.castShadow = true;
        leaf.add(mainStem);

        var geo_blade = new T.CylinderGeometry(0.7, 0.7, 0.05, 12);
        var blade = new T.Mesh(geo_blade, mat_yellow);
        blade.rotation.z = pi / 2;
        blade.scale.x = 1.2;
        blade.position.set(-0.05, 0.4, 0);
        blade.castShadow = true;
        leaf.add(blade);

        var subStems = [];
        for (var i = 0; i < 8; i++) {
            subStems[i] = mainStem.clone();
            subStems[i].scale.set(0.0055, 0.0055, 0.01);
            subStems[i].castShadow = true;
            leaf.add(subStems[i]);
        }
        subStems[0].rotation.x = -pi / 4;
        subStems[0].scale.z = 0.04;
        subStems[0].position.set(0, 0.8, 0.2);

        subStems[2].rotation.x = -pi / 6;
        subStems[2].scale.z = 0.05;
        subStems[2].position.set(0, 0.5, 0.25);

        subStems[4].rotation.x = -pi / 8;
        subStems[4].scale.z = 0.055;
        subStems[4].position.set(0, 0.2, 0.3);

        subStems[6].rotation.x = -pi / 10;
        subStems[6].scale.z = 0.045;
        subStems[6].position.set(0, -0.1, 0.26);

        for (var i = 1; i < 8; i += 2) {
            subStems[i].rotation.x = -subStems[i - 1].rotation.x;
            subStems[i].scale.z = subStems[i - 1].scale.z;
            subStems[i].position.set(
                0,
                subStems[i - 1].position.y,
                -subStems[i - 1].position.z
            );
        }
        leaf.rotation.x = pi / 3;
        leaf.rotation.z = 0.2;
        leaf.position.set(trunk.position.x - 0.2, 5, trunk.position.z + 1);
        tree.add(leaf);

        var leaf_1 = leaf.clone();
        leaf_1.rotation.x = -pi / 3;
        leaf_1.position.set(trunk.position.x - 0.2, 6, trunk.position.z - 1);
        tree.add(leaf_1);
        tree.rotation.y = -pi / 12;
        tree.position.set(-2, 0, -2);
        total.add(tree);

        var tree_1 = tree.clone();
        tree_1.scale.set(0.8, 0.8, 0.8);
        tree_1.position.set(-1, 0, -5);
        tree_1.rotation.y = -pi / 5;
        total.add(tree_1);

        var tree_2 = tree.clone();
        tree_2.scale.set(0.7, 0.7, 0.7);
        tree_2.position.set(-2, 0, 0.5);
        tree_2.rotation.y = -pi / 12;
        tree_2.children[2].rotation.x = -pi / 3;
        tree_2.children[2].position.z = trunk.position.z - 1;
        tree_2.children[3].rotation.x = pi / 3;
        tree_2.children[3].position.z = trunk.position.z + 1;
        total.add(tree_2);

        super("YellowTree", total);
    }
}