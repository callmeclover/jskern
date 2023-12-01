window.draw_kstk = function (command) {
    window.vgpu.drawKeystroke({ key: "Enter" });
    window.vgpu.drawKeystroke({ key: "Enter" });
    let regex = new RegExp('"(.*?)"', 'i');
    let match = regex.exec(command);

    if (!match) {
      window.vgpu.drawKeystroke(
        "[ERR]: Invalid or non-existent second parameter found. Is it in quotes that aren't escaped?",
        true,
        "error"
      );
      return;
    } else {
    window.vgpu.drawKeystroke(match[1], true, command.split(" ")[1]);
    }
    return;
  };
  
  // do not edit below
  window.draw_kstk.description = "gives user direct access to the vgpu's string renderer. text must be in quotes.";
  window.draw_kstk.parameters = ["color", "text"];
  