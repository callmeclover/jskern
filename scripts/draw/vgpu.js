function calcMaxLineLength(canvas) {
  const lineWidth = Math.ceil(canvas.width / 14) * 14;
  const adjustedLineWidth = lineWidth - 18;
  return adjustedLineWidth;
}

/**
 *  VGPU
 *  by Clover Johnson
 *
 *  @param {object} kernel
 */

class VGPU {
  $state;

  $typewriterX = 10;
  $typewriterY = 24;

  constructor(kernel) {
    this.ctx = kernel.ctx;
    this.canvas = kernel.canvas;
    this.overlay = document.getElementById("overlay");

    this.maxLineLength = calcMaxLineLength(this.canvas);

    this.typedText = "";

    this.xnppos = 10;
    this.ynppos = 0;
  }

  setNPPOS() {
    this.xnppos = this.$typewriterX;
    this.ynppos = this.$typewriterY;
  }

  /**
   * Draws a keystroke on the canvas based on the key pressed.
   *
   * @param {KeyboardEvent} e - The event object representing the key press.
   * @param {boolean} isWord - Whether the input is a word or not.
   */
  drawKeystroke(e, isWord) {
    const CHAR_WIDTH = 14;
    const LINE_HEIGHT = 28;
   
   
    const newLine = () => {
      this.$typewriterX = 10;
      this.$typewriterY += LINE_HEIGHT;
    };
   
   
    const drawChar = (char) => {
      this.ctx.fillText(char, this.$typewriterX, this.$typewriterY);
      this.$typewriterX += CHAR_WIDTH;
    };
   
   
    const isBackspaceAllowed = () => {
      const prevCharX = this.$typewriterX - CHAR_WIDTH;
      const prevCharY = this.$typewriterY;
   
   
      if (prevCharX <= this.xnppos - CHAR_WIDTH && prevCharY === this.ynppos) {
        return false;
      }
      if (
        !(prevCharX <= this.xnppos && prevCharY > this.ynppos) &&
        prevCharX < this.xnppos &&
        prevCharY > this.ynppos
      ) {
        return true;
      }
      if (prevCharX <= this.xnppos && prevCharY > this.ynppos) {
        if (prevCharX < 0 || prevCharX === 0) {
            this.$typewriterX = this.maxLineLength;
            this.$typewriterY -= LINE_HEIGHT;
          } else {
            return true;
          }
      }
      return true;
    };
   
   
    const handleBackspace = () => {
      if (isBackspaceAllowed()) {
        this.$typewriterX -= CHAR_WIDTH;
        this.typedText = this.typedText.slice(0, -1);
      }
    };
   
   
    const handleEnter = () => {
      if (!window.vcpu.inCommand) {
        newLine();
      } else {
        window.postMessage(this.typedText);
        window.vcpu.inCommand = false;
        window.vcpu.acceptInput = false;
        this.typedText = "";
      }
    };
   
   
    if (isWord) {
      Array.from(e).forEach((char) => {
        if (this.$typewriterX + CHAR_WIDTH > this.canvas.width) {
          newLine();
        }
        drawChar(char);
      });
      return;
    }
   
   
    if (e.key.length === 1) {
      if (this.$typewriterX + CHAR_WIDTH > this.canvas.width) {
        newLine();
      }
      this.typedText += e.key.toLowerCase();
      drawChar(e.key);
    } else if (e.key === "Backspace") {
      handleBackspace();
    } else if (e.key === "Enter") {
      handleEnter();
    }
   
   
    this.ctx.clearRect(this.$typewriterX, this.$typewriterY - 20, 24, LINE_HEIGHT);
   }
   
   

  /**
   * Redraws the canvas and reinstates it's properties.
   *
   * @return {void}
   */
  redrawCanvas() {
    // Reinstate properties
    this.ctx.font = "24px monospace";
    this.ctx.fillStyle = "white";

    // Redraw the canvas
    this.ctx.drawImage(this.$state, 0, 0);
  }

  drawCursor() {
    this.ctx.fillText("_", this.$typewriterX, this.$typewriterY);
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.$typewriterX = 10;
    this.$typewriterY = 24;
  }
}
