import { initializeComponent, showToast } from "/scripts/shared.js";

initializeComponent();

document.querySelector("#tooltip-btn").addEventListener("click", () => {
  const title = document.querySelector("#tooltip").value;

  chrome.action.setTitle(
    {
      title,
    },
    () => {
      showToast({
        body: `Set tooltip text to "${title}"`,
      });
    }
  );
});

document.querySelector("#badge-text-btn").addEventListener("click", () => {
  const text = document.querySelector("#badge").value;

  chrome.action.setBadgeText(
    {
      text,
    },
    () => {
      showToast({
        body: `Set badge text to "${text}"`,
      });
    }
  );
});

document
  .querySelector("#toolbar-image-random")
  .addEventListener("click", () => {
    const randomHexColor =
      "#" + Math.floor(Math.random() * 16777215).toString(16);

    const canvas = new OffscreenCanvas(16, 16);
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, 16, 16);
    context.fillStyle = randomHexColor;
    context.fillRect(0, 0, 16, 16);
    const imageData = context.getImageData(0, 0, 16, 16);
    chrome.action.setIcon({ imageData: imageData }, () => {
      showToast({
        body: `Set toolbar icon to "${randomHexColor}"`,
      });
    });
  });

document
  .querySelector("#toolbar-badge-random")
  .addEventListener("click", () => {
    const randomHexColor =
      "#" + Math.floor(Math.random() * 16777215).toString(16);

    chrome.action.setBadgeBackgroundColor({ color: randomHexColor }, () => {
      showToast({
        body: `Set badge color to "${randomHexColor}"`,
      });
    });
  });

document.querySelector("#toolbar-image-file").addEventListener("click", () => {
  const [file] = document.querySelector("#icon-file-input").files;

  if (file) {
    const canvas = new OffscreenCanvas(16, 16);
    const context = canvas.getContext("2d");

    var img = new Image();
    img.onload = function () {
      context.drawImage(
        img,
        0,
        0,
        img.width,
        img.height,
        0,
        0,
        canvas.width,
        canvas.height
      );

      chrome.action.setIcon(
        { imageData: context.getImageData(0, 0, 16, 16) },
        () => {
          showToast({
            body: `Updated toolbar icon`,
          });
        }
      );
    };

    img.src = URL.createObjectURL(file);
  } else {
    showToast({
      variant: "bg-danger",
      body: `No image selected`,
    });
  }
});

document.querySelector("#toolbar-reset").addEventListener("click", () => {
  showToast({
    body: `Reset toolbar icon`,
  });

  chrome.action.setIcon({ path: "/icons/codesearch_16x16.png" }, () => {});

  chrome.action.setTitle(
    {
      title: "Example Chrome Extension",
    },
    () => {}
  );

  chrome.action.setBadgeText(
    {
      text: "",
    },
    () => {}
  );
});
