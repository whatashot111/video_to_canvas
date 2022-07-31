(function createVideoElement() {
  const constraints = (window.constraints = {
    audio: false,
    video: { facingMode: "user" },
    // video: { facingMode: { exact: "environment" } },
  });
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      const videoElement = document.getElementById("video");
      videoElement.srcObject = stream;
    })
    .catch((error) => {
      console.log(error);
      alert("May the browser didn't support or there is some errors.");
    });
})();

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const video = document.querySelector("video");
let id = 0;

video.addEventListener("play", () => {
  function step() {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    id = id + 1;
    if (id <= 60) {
      let appendableImage = new Image(canvas.width, canvas.height);
      appendableImage.src = canvas.toDataURL();
      appendableImage.onload = function sendImageData() {
        randomFunction({ imgId: id, img: appendableImage });
      };
    }
    requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
});

function randomFunction(imgObj) {
  console.log(imgObj.imgId);
  console.log(imgObj.img.src);
}
