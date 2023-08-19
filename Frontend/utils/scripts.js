// utils/scripts.js

export const loadScript = (src, id) =>
  new Promise((resolve) => {
    if (document.getElementById(id)) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.id = id;
    script.onload = resolve;
    document.head.appendChild(script);
  });
