// James Gwozdz
// CST-451
// 10-16-23
// This is my own work

import { Application } from 'pixi.js'
import { Card } from './card';

// create a new pixi canvas for Sprites to reside in
const app = new Application({
  view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
  resolution: window.devicePixelRatio || 1,
  autoDensity: true,
  backgroundColor: 0xFFFFFF,
  width: screen.availWidth,
  height: screen.availHeight
});

// add Sprites tp the canvas
const seven = new Card(200, 150, 50, 1100, 200, "cardSeven.png");
seven.Mark();
app.stage.addChild(new Card(200, 150, 50, 200, 200, "cardSeven.png"));
app.stage.addChild(new Card(100, 75, 50, 500, 200, "ace.png"));
app.stage.addChild(new Card(200, 150, 100, 800, 200, "cardSeven.png"));
app.stage.addChild(seven);