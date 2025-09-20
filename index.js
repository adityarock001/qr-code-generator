let imgBox = document.getElementById("imgBox");
let qrImage = document.getElementById("qrImage");
let qrText = document.getElementById("qrText");
let downloadBtn = document.getElementById("downloadBtn");
let toggleBtn = document.getElementById("toggleMode");
let container = document.querySelector(".container");
let body = document.body;

function generateQR() {
  const text = qrText.value.trim();

  if (text.length > 0) {
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(text)}`;
    qrImage.crossOrigin = "anonymous"; // to allow image download
    qrImage.src = qrUrl;

    qrImage.onload = () => {
      createDownloadLink(qrImage); // create download button after image loads
      qrText.value = "";
    };

    imgBox.classList.add("show-img");
    qrText.classList.remove("shake");
  } else {
    qrText.classList.add("shake");
    setTimeout(() => qrText.classList.remove("shake"), 400);
  }
}

function createDownloadLink(image) {
  // Create canvas
  const canvas = document.createElement("canvas");
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(image, 0, 0);

  // Convert canvas to data URL
  canvas.toBlob(blob => {
    const url = URL.createObjectURL(blob);
    downloadBtn.href = url;
    downloadBtn.download = "QRCode.png";
  }, "image/png");
}

// Dark Mode Toggle
toggleBtn.addEventListener("click", () => {
  container.classList.toggle("dark");
  body.classList.toggle("dark-bg");
  toggleBtn.textContent = container.classList.contains("dark") ? "☀️" : "🌙";
});
