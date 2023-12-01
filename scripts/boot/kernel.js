/**
 * Kernel
 * by Clover Johnson
 *
 * @param {HTMLCanvasElement} canvas
 */

class Kernel {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");

    // Set the canvas size
    this.canvas.width = window.innerWidth;
    this.canvas.height = 10000;

    // Set the font and text color
    this.ctx.font = "24px monospace";
    this.ctx.fillStyle = "white";
  }
}
