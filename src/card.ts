// James Gwozdz
// CST-451
// 10-16-23
// This is my own work

import { Container, FederatedMouseEvent, Sprite, Ticker } from "pixi.js";

export class Card extends Container {

  // create all variables used in the Card class
  private readonly cardHeight: number;
  private readonly cardWidth: number;
  private readonly speed: number;
  private readonly cardX: number;
  private readonly cardY: number;
  private readonly image: string;
  private readonly flipUp: any;
  private readonly flipDown: any;
  private flipped: boolean;
  private marked: boolean;
  private readonly card: Sprite;

  // constructor to initialize every variable
  // inputs are: (height, width, speed, x, y, image)
  constructor(height: number, width: number, speed: number, x: number, y: number, image: string) {
    super();

    this.cardHeight = height;
    this.cardWidth = width;
    this.speed = speed;
    this.cardX = x;
    this.cardY = y;
    this.image = image;
    this.flipUp = this.FlipUp.bind(this);
    this.flipDown = this.FlipDown.bind(this);
    this.flipped = false;
    this.marked = false;

    // set up the card Sprite for animation
    this.card = Sprite.from("cardBack.png");
    this.card.width = this.cardWidth;
    this.card.height = this.cardHeight;
    this.card.x = this.cardX;
    this.card.y = this.cardY;
    this.card.on("click", this.Click, this);
    this.card.eventMode = 'dynamic';

    this.addChild(this.card);
  }

  // private method that flips a card from facedown to faceup revealing the number
  private FlipUp(): void {
    if (this.card.width <= 2) {
      this.card.texture = Sprite.from(this.image).texture;
      this.flipped = true;
    }
    if (this.flipped) {
      this.card.width += this.cardWidth / this.speed;
      this.card.x -= this.cardWidth / (2 * this.speed);
      if (this.card.width >= this.cardWidth) {
        this.card.width = this.cardWidth;
        this.card.x = this.cardX;
        Ticker.shared.remove(this.flipUp);
        Ticker.shared.stop();
      }
    }
    else {
      this.card.width -= this.cardWidth / this.speed;
      this.card.x += this.cardWidth / (2 * this.speed);
    }
    console.log(`width: ${this.card.width}, x: ${this.card.x}`);
  }

  // private method that flips a card from faceup to facedown hiding the number
  private FlipDown(): void {
    if (this.card.width <= 2) {
      this.card.texture = Sprite.from("cardBack.png").texture;
      this.flipped = false;
    }
    if (!this.flipped) {
      this.card.width += this.cardWidth / this.speed;
      this.card.x -= this.cardWidth / (2 * this.speed);
      if (this.card.width >= this.cardWidth) {
        this.card.width = this.cardWidth;
        this.card.x = this.cardX;
        Ticker.shared.remove(this.flipDown);
        Ticker.shared.stop();
      }
    }
    else {
      this.card.width -= this.cardWidth / this.speed;
      this.card.x += this.cardWidth / (2 * this.speed);
    }
    console.log(`width: ${this.card.width}, x: ${this.card.x}`);
  }

  // private method that occurs when a card is clicked
  // calls a flipping method unless it is marked or another card is flipping
  private Click(e: FederatedMouseEvent): void {
    if (!Ticker.shared.started && !this.marked) {
      if (this.flipped) {
        this.Flip();
      }
      else {
        Ticker.shared.add(this.flipUp);
      }
    }
  }

  // public method that calls flipDown() every tick of the Ticker
  public Flip(): void {
    Ticker.shared.add(this.flipDown);
  }

  // public method that marks and darkens the card or unmarks and lightens the card
  public Mark(): void {
    if (!this.marked) {
      this.marked = true;
      this.card.tint = 0x666666;
    }
    else {
      this.marked = false;
      this.card.tint = 0xFFFFFF;
    }
  }
}