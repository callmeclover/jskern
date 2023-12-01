window.onerror = function (message, source, lineno, colno, error) {
  const errorMessage = `Error: ${message}\nSource: ${source}\nLine: ${lineno}, Column: ${colno}`;
  // Display the error message in the document
  // Replace "errorContainer" with the ID or class of the element where you want to display the error
  window.alert(errorMessage);
};

window.delay = async function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

window.colorSet = {
  error: "tomato",
  fatal: "crimson",
  warning: "orange",
  success: "springgreen",
  info: "royalblue",
  contrast: "darkorchid",
  default: "white",
};

window.kernel = new Kernel(document.getElementById("kernel"));
window.vcpu = new VCPU(window.kernel);
window.vgpu = new VGPU(window.kernel);

window.vcpu.boot();

document.addEventListener("paste", (event) => {
  if (
    window.vcpu.acceptInput === false ||
    window.vcpu.acceptInput === undefined
  ) {
    return;
  }
  // Render the typed character on the canvas
  window.vgpu.typedText += event.clipboardData.getData("text/plain");
  window.vgpu.drawKeystroke(event.clipboardData.getData("text/plain"), true);
});

// Capture keydown event to render the input on the canvas
document.addEventListener("keydown", (event) => {
  event.preventDefault();
  if (
    window.vcpu.acceptInput === false ||
    window.vcpu.acceptInput === undefined
  ) {
    return;
  }
  if (event.ctrlKey && event.key === "v") {
    return;
  }

  // Render the typed character on the canvas
  window.vgpu.drawKeystroke(event);
});
