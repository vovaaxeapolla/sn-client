export default function LoadingAnim(array, callback, options) {
    let delay = 1000 / array.length;
    array.forEach((element, index) => {
      setTimeout(() => callback(element), index * delay + Math.random() * delay);
    });
  }