/**
 * CMDChck
 * by Clover Johnson
 *
 * @param {object} kernel
 */

class CMDChck {
  constructor(kernel) {
      this.commandList = ["help", "whois", "clear", "calc", "echo", "string", "import"];
      this.intCommands = {
        help: this.help,
        whois: this.whois,
        clear: this.clear,
        calc: this.calc,
        echo: this.echo,
        string: this.string,
        import: this.importcmd,
      };
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

  const command = cmd.split(" ")[0];

  if (this.commandList.includes(command)) {
    this.intCommands[command](cmd);
  } else {
    window.vgpu.drawKeystroke({ key: "Enter" });
    window.vgpu.drawKeystroke({ key: "Enter" });

    window.vgpu.drawKeystroke("[ERR]: Invalid command. Run 'help' for a list of commands.", true, "error");
  }

  return;
}

  /* BEGIN COMMANDS */

help(command) {
  const commands = [
    { command: "| help", description: "display this help menu and exit" },
    { command: "| clear", description: "clear the screen" },
    { command: "| whois [user]", description: "display information about [user]" },
    { command: "| calc [oper] [num1] [num2]", description: "calculates [num1] [oper] [num2]" },
    { command: "| echo [str]", description: "logs str. str must be in unescaped quotes." },
    { command: "| string [manip] [str]", description: "manipulates str. str must be in unescaped quotes." },
    { command: "| import [url]", description: "imports external commands from a url. very dangerous if you dont know what you're doing." }
  ];

  window.vgpu.drawKeystroke({ key: "Enter" });
  commands.forEach(({ command, description }) => {
    window.vgpu.drawKeystroke({ key: "Enter" });
    window.vgpu.drawKeystroke(command, true);
    window.vgpu.drawKeystroke({ key: "Enter" });
    window.vgpu.drawKeystroke(description, true);
  });
}

whois(command) {
  const validParameters = ["amnst", "me", "root"];
  const parameter = command.split(" ")[1];

  if (validParameters.includes(parameter)) {
    window.vgpu.drawKeystroke({ key: "Enter" });
    window.vgpu.drawKeystroke({ key: "Enter" });

    switch (parameter) {
      case "amnst":
        window.vgpu.drawKeystroke("Administrators:", true);
        window.vgpu.drawKeystroke({ key: "Enter" });
        window.vgpu.drawKeystroke({ key: "Enter" });
        window.vgpu.drawKeystroke("Current user, root", true);
        break;
      
      case "me":
        window.vgpu.drawKeystroke("Current user:", true);
        window.vgpu.drawKeystroke({ key: "Enter" });
        window.vgpu.drawKeystroke("Administrators", true);
        break;

      case "root":
        window.vgpu.drawKeystroke("root:", true);
        window.vgpu.drawKeystroke({ key: "Enter" });
        window.vgpu.drawKeystroke("Owner", true);
        break;
    }
  } else {
    window.vgpu.drawKeystroke(
      "[ERR]: Invalid parameter. Valid parameters are 'amnst', 'me' and 'root'.",
      true,
      "error"
    );
  }
}

  clear(command) {
    window.vgpu.clearCanvas();
  } 

echo(command) {
  window.vgpu.drawKeystroke({ key: "Enter" });
  window.vgpu.drawKeystroke({ key: "Enter" });
  const regex = /"(.*?[^\\])"/;
  const match = command.match(regex);

  if (match) {
    window.vgpu.drawKeystroke(match[1], true);
  } else {
    const errorMessage = `[ERR]: Invalid or non-existent second parameter found. Is it in quotes that aren't escaped?`;
    window.vgpu.drawKeystroke(errorMessage, true, "error");
  }
}

  get(command) {
    // TODO: use fetch API for http requests
  }

  string(command) {
    window.vgpu.drawKeystroke({"key": "Enter"});
    window.vgpu.drawKeystroke({"key": "Enter"});

  const validateParameter = (parameter) => {
    const regex = /"(.*?[^\\])"/;
    const match = parameter.match(regex);
    if (match) {
      return match[1];
    } else {
      window.vgpu.drawKeystroke(
        "[ERR]: Invalid or non-existent third parameter found. Is it in quotes that aren't escaped?",
        true,
        "error"
      );
      return null;
    }
  };

  const processCommand = (parameter, action) => {
    const value = validateParameter(parameter);
    if (value) {
      switch (action) {
        case "lw":
          window.vgpu.drawKeystroke(value.toLowerCase(), true);
          break;
        case "up":
          window.vgpu.drawKeystroke(value.toUpperCase(), true);
          break;
        case "wf":
          window.vgpu.drawKeystroke(value.toWellFormed(), true);
          break;
        case "rv":
          window.vgpu.drawKeystroke(value.split("").reverse().join(""), true);
          break;
        default:
          window.vgpu.drawKeystroke(
            "[ERR]: Invalid or non-existent second parameter found. Valid parameters are 'lw', 'up', 'wf' and 'rv'.",
            true,
            "error"
          );
          break;
      }
    }
  };

  processCommand(command, command.split(" ")[1]);
}

calc(command) {
  
  window.drawKeystroke({ key: "Enter" });
  drawKeystroke({ key: "Enter" });
  
  const params = command.split(" ");
  const operation = params[1];
  const num1 = parseFloat(params[2]);
  const num2 = parseFloat(params[3]);
  
  const validateParams = () => {
    if (isNaN(num1) || isNaN(num2)) {
      window.vgpu.drawKeystroke("[ERR]: Invalid or missing second or third parameter. Valid parameters are INT or FLOAT.", true, "error");
      return false;
    }
    return true;
  };
  
  switch (operation) {
    case "add":
      if (validateParams()) {
        window.vgpu.drawKeystroke((num1 + num2).toString(), true);
      }
      break;

    case "sub":
      if (validateParams()) {
        window.vgpu.drawKeystroke((num1 - num2).toString(), true);
      }
      break;

    case "mul":
      if (validateParams()) {
        window.vgpu.drawKeystroke((num1 * num2).toString(), true);
      }
      break;

    case "div":
      if (validateParams()) {
        window.vgpu.drawKeystroke((num1 / num2).toString(), true);
      }
      break;

    default:
      window.vgpu.drawKeystroke("[ERR]: Invalid first parameter. Valid parameters are 'add', 'sub', 'mul' and 'div'.", true, "error");
      break;
  }
}

  importcmd(command) {
    window.vgpu.drawKeystroke({ key: "Enter" });
    window.vgpu.drawKeystroke({ key: "Enter" });
    window.vgpu.drawKeystroke("[WARN]: Importing commands is very dangerous! Make sure you know what you are doing.", true, "warning");
    // TODO: fetch js module file, set function to be child of this. and add name to commandlist
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
