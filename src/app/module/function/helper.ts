export function copyObject<T>(obj: T): T {
  const jsonObj = JSON.stringify(obj);
  return JSON.parse(jsonObj);
}

export function headerFromMobile(): boolean {
  // User agent string method
  let isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  // CSS media queries method
  if (!isMobile) {
    let bodyElement = document.getElementsByTagName('body')[0];
    isMobile =
      window
        .getComputedStyle(bodyElement)
        .getPropertyValue('content')
        .indexOf('mobile') !== -1;
  }
  return isMobile;
}
