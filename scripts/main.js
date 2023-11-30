window.onerror = function(message, source, lineno, colno, error) {
  const errorMessage = `Error: ${message}\nSource: ${source}\nLine: ${lineno}, Column: ${colno}`;
  // Display the error message in the document
  // Replace "errorContainer" with the ID or class of the element where you want to display the error
  window.alert(errorMessage)
};

window.colorSet = {
  "error": "tomato",
  "warning": "orange",
  "success": "springgreen",
  "info": "royalblue",
  "contrast": "darkorchid",
  "default": "white"
};

window.kernel = new Kernel(document.getElementById('kernel'));
window.vcpu = new VCPU(window.kernel);
window.vgpu = new VGPU(window.kernel);

window.vcpu.boot();

// Capture keydown event to render the input on the canvas
document.addEventListener("keydown", (event) => {
  event.preventDefault();
  if (window.vcpu.acceptInput === false || window.vcpu.acceptInput === undefined) { return; }
  // Render the typed character on the canvas
  window.vgpu.drawKeystroke(event);
});