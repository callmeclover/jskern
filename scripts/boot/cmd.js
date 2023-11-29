/**
 * CMDChck
 * by Clover Johnson
 *
 * @param {object} kernel
 */

class CMDChck {
  constructor(kernel) {
      this.commandList = ["help", "whois", "clear", "calc", "echo", "string"];
  }

  async waitForMessage() {
    return new Promise((resolve) => {
      window.onmessage = (event) => {
        resolve(event.data);
      };
    });
  }

  async getCommand() {
    let cmd = await this.waitForMessage();
    if (this.checkCommand(cmd) === "invalid") {
      window.vgpu.drawKeystroke({ key: "Enter" });
      window.vgpu.drawKeystroke({ key: "Enter" });

      window.vgpu.ctx.fillStyle = "red";
      window.vgpu.drawKeystroke(
        "Invalid command. Run 'help' for a list of commands.",
        true
      );
      window.vgpu.ctx.fillStyle = "white";

      return;
    } else {
      switch (cmd.split(" ")[0]) {
        case "help":
          this.help(cmd);
          break;
        case "whois":
          this.whois(cmd);
          break;
        case "clear":
            this.clear(cmd);
            break;
        case "calc":
          this.calc(cmd);
          break;
        case "echo":
          this.echo(cmd);
          break;
        case "string":
          this.string(cmd);
          break;

        default:
          break;
      }
    }

    return;
  }

  checkCommand(input) {
    if (this.commandList.includes(input.split(" ")[0])) {
      return input;
    } else {
      return "invalid";
    }
  }

  /* BEGIN COMMANDS */

  help(command) {
    window.vgpu.drawKeystroke({ key: "Enter" });
    window.vgpu.drawKeystroke({ key: "Enter" });
    window.vgpu.drawKeystroke("JsKern Help Menu", true);

    window.vgpu.drawKeystroke({ key: "Enter" });
    window.vgpu.drawKeystroke("| help", true);
    window.vgpu.drawKeystroke({ key: "Enter" });
    window.vgpu.drawKeystroke("⊢ display this help menu and exit", true);

    window.vgpu.drawKeystroke({ key: "Enter" });
    window.vgpu.drawKeystroke("| clear", true);
    window.vgpu.drawKeystroke({ key: "Enter" });
    window.vgpu.drawKeystroke("⊢ clear the screen", true);
    
    window.vgpu.drawKeystroke({ key: "Enter" });
    window.vgpu.drawKeystroke("| whois [user]", true);
    window.vgpu.drawKeystroke({ key: "Enter" });
    window.vgpu.drawKeystroke("⊢ display information about [user]", true);

    window.vgpu.drawKeystroke({ key: "Enter" });
    window.vgpu.drawKeystroke("| calc [oper] [num1] [num2]", true);
    window.vgpu.drawKeystroke({ key: "Enter" });
    window.vgpu.drawKeystroke("⊢ calculates [num1] [oper] [num2]", true);

    window.vgpu.drawKeystroke({ key: "Enter" });
    window.vgpu.drawKeystroke("| echo [str]", true);
    window.vgpu.drawKeystroke({ key: "Enter" });
    window.vgpu.drawKeystroke("⊢ logs str. str must be in unescaped quotes.", true);

    window.vgpu.drawKeystroke({ key: "Enter" });
    window.vgpu.drawKeystroke("| string [manip] [str]", true);
    window.vgpu.drawKeystroke({ key: "Enter" });
    window.vgpu.drawKeystroke("⊢ manipulates str. str must be in unescaped quotes.", true);
  }

  whois(command) {
    window.vgpu.drawKeystroke({ key: "Enter" });
    window.vgpu.drawKeystroke({ key: "Enter" });

    if (command.split(" ")[1] == "amnst") {
      window.vgpu.drawKeystroke("Administrators:", true);
      window.vgpu.drawKeystroke({ key: "Enter" });
      window.vgpu.drawKeystroke({ key: "Enter" });
      window.vgpu.drawKeystroke("Current user, root", true);
    } else if (command.split(" ")[1] == "me") {
      window.vgpu.drawKeystroke("Current user:", true);
      window.vgpu.drawKeystroke({ key: "Enter" });
      window.vgpu.drawKeystroke("Administrators", true);
    } else if (command.split(" ")[1] == "root") {
      window.vgpu.drawKeystroke("root:", true);
      window.vgpu.drawKeystroke({ key: "Enter" });
      window.vgpu.drawKeystroke("Owner", true);
    } else {
      window.vgpu.ctx.fillStyle = "red";
      window.vgpu.drawKeystroke(
        "Invalid parameter. Valid parameters are 'amnst', 'me' and 'root'.",
        true
      );
      window.vgpu.ctx.fillStyle = "white";
    }
  }

  clear(command) {
    window.vgpu.clearCanvas();
  } 

  echo(command) {
    window.vgpu.drawKeystroke({ key: "Enter" });
    window.vgpu.drawKeystroke({ key: "Enter" });
    const regex = /"(.*?[^\\])"/; // Regex pattern to match text within quotation marks without a backslash to its left
    const match = command.match(regex); // Find the first match using `match()`

    if (match) {
      window.vgpu.drawKeystroke(match[1], true);
    } else {
      window.vgpu.ctx.fillStyle = "red";
      window.vgpu.drawKeystroke(
        "Invalid or non-existent second parameter found. Is it in quotes that aren't escaped?",
        true
      );
      window.vgpu.ctx.fillStyle = "white";
    }
  }

  get(command) {
    // TODO: use fetch API for http requests
  }

  string(command) {
    window.vgpu.drawKeystroke({ key: "Enter" });
    window.vgpu.drawKeystroke({ key: "Enter" });

    const regex = /"(.*?[^\\])"/; // Regex pattern to match text within quotation marks without a backslash to its left
    const match = command.match(regex); // Find the first match using `match()`
    
      switch (command.split(" ")[1]) {
        case "lw":
          if (match) {
          window.vgpu.drawKeystroke(match[1].toLowerCase(), true);
        } else {
          window.vgpu.ctx.fillStyle = "red";
          window.vgpu.drawKeystroke(
            "Invalid or non-existent third parameter found. Is it in quotes that aren't escaped?",
            true
          );
          window.vgpu.ctx.fillStyle = "white";
        }
          break;
        case "up":
          if (match) {
          window.vgpu.drawKeystroke(match[1].toUpperCase(), true);
        } else {
          window.vgpu.ctx.fillStyle = "red";
          window.vgpu.drawKeystroke(
            "Invalid or non-existent third parameter found. Is it in quotes that aren't escaped?",
            true
          );
          window.vgpu.ctx.fillStyle = "white";
        }
          break;
        case "wf":
          if (match) {
          window.vgpu.drawKeystroke(match[1].toWellFormed(), true);
        } else {
          window.vgpu.ctx.fillStyle = "red";
          window.vgpu.drawKeystroke(
            "Invalid or non-existent third parameter found. Is it in quotes that aren't escaped?",
            true
          );
          window.vgpu.ctx.fillStyle = "white";
        }
          break;
        case "rv":
          if (match) {
          window.vgpu.drawKeystroke(match[1].reverse(), true);
        } else {
          window.vgpu.ctx.fillStyle = "red";
          window.vgpu.drawKeystroke(
            "Invalid or non-existent third parameter found. Is it in quotes that aren't escaped?",
            true
          );
          window.vgpu.ctx.fillStyle = "white";
        }
          break;
      
        default:
          window.vgpu.ctx.fillStyle = "red";
      window.vgpu.drawKeystroke(
        "Invalid or non-existent second parameter found. Valid parameters are 'lw', 'up', 'wf' and 'rv'.",
        true
      );
      window.vgpu.ctx.fillStyle = "white";
          break;
      }
  }

  calc(command) {
    window.vgpu.drawKeystroke({ key: "Enter" });
    window.vgpu.drawKeystroke({ key: "Enter" });
    if (command.split(" ")[1]) {
      switch (command.split(" ")[1]) {
        case "add":
          if (command.split(" ")[2] && command.split(" ")[3]) {
            window.vgpu.drawKeystroke((parseFloat(command.split(" ")[2]) + parseFloat(command.split(" ")[3])).toString(), true);
          } else {
            window.vgpu.ctx.fillStyle = "red";
            window.vgpu.drawKeystroke(
              "Invalid or missing second or third parameter. Valid parameters are INT or FLOAT.",
              true
            );
            window.vgpu.ctx.fillStyle = "white";
          }
          break;

        case "sub":
          if (command.split(" ")[2] && command.split(" ")[3]) {
            window.vgpu.drawKeystroke((parseFloat(command.split(" ")[2]) - parseFloat(command.split(" ")[3])).toString(), true);
          } else {
            window.vgpu.ctx.fillStyle = "red";
            window.vgpu.drawKeystroke(
              "Invalid or missing second or third parameter. Valid parameters are INT or FLOAT.",
              true
            );
            window.vgpu.ctx.fillStyle = "white";
          }
          break;

        case "mul":
          if (command.split(" ")[2] && command.split(" ")[3]) {
            window.vgpu.drawKeystroke(parseFloat(command.split(" ")[2]) * parseFloat(command.split(" ")[3]).toString(), true);
          } else {
            window.vgpu.ctx.fillStyle = "red";
            window.vgpu.drawKeystroke(
              "Invalid or missing second or third parameter. Valid parameters are INT or FLOAT.",
              true
            );
            window.vgpu.ctx.fillStyle = "white";
          }
          break;

        case "div":
          if (command.split(" ")[2] && command.split(" ")[3]) {
            window.vgpu.drawKeystroke(parseFloat(command.split(" ")[2]) / parseFloat(command.split(" ")[3]).toString(), true);
          } else {
            window.vgpu.ctx.fillStyle = "red";
            window.vgpu.drawKeystroke(
              "Invalid or missing second or third parameter. Valid parameters are INT or FLOAT.",
              true
            );
            window.vgpu.ctx.fillStyle = "white";
          }
          break;
      
        default:
          window.vgpu.ctx.fillStyle = "red";
      window.vgpu.drawKeystroke(
        "Invalid first parameter. Valid parameters are 'add', 'sub', 'mul' and 'div'.",
        true
      );
      window.vgpu.ctx.fillStyle = "white";
          break;
      }
    } else {
      window.vgpu.ctx.fillStyle = "red";
      window.vgpu.drawKeystroke(
        "No first parameter found. Valid parameters are 'add', 'sub', 'mul' and 'div'.",
        true
      );
      window.vgpu.ctx.fillStyle = "white";
    }
  }


  // TODO: Implement IndexedDB file system for touch, ls, cd, etc.
  
  ls(command) {
    // TODO
  }

  touch(command) {
    // TODO
  }

  cd(command) {
    // TODO
  }


  /* END COMMANDS */
}
