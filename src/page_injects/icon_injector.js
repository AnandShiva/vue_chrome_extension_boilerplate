import { IQ_ASPECT_RATIO } from '../constants/constants.json';

export default {};

export function injectStaticLaunchIcon(launcherClickHandler) {
  const body = document.getElementsByTagName('body')[0];
  const staticIcon = document.createElement('img');
  staticIcon.id = 'static-launch-logo';
  staticIcon.src = chrome.extension.getURL('icons/extension-icon.png');
  const iconSize = '4';
  staticIcon.style.height = `${iconSize}rem`;
  staticIcon.style.width = `${iconSize * IQ_ASPECT_RATIO}rem`;
  staticIcon.style.position = 'fixed';
  staticIcon.style.bottom = '1rem';
  staticIcon.style.right = '1rem';
  staticIcon.style.background = 'white';
  staticIcon.style.zIndex = '1000';
  body.appendChild(staticIcon);
  staticIcon.addEventListener('click', launcherClickHandler);
}
