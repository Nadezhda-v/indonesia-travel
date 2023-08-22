const styles = new Map();
console.log(styles);

const addStyle = (url) => {
  const existingLink = document.querySelector(`link[href="${url}"]`);

  if (styles.has(url) && existingLink) {
    return styles.get(url);
  } else {
    const stylePromise = new Promise((resolve) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = url;

      link.addEventListener('load', () => {
        resolve();
      });
      document.head.append(link);
    });

    styles.set(url, stylePromise);
    return stylePromise;
  }
};

const removeStyle = (url) => new Promise((resolve) => {
  const existingLink = document.querySelector(`link[href="${url}"]`);
  if (existingLink) {
    existingLink.remove();
    resolve();
  }
});

export {
  addStyle,
  removeStyle,
};
