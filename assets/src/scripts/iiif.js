import { modifySrc, modifyDataElement, isImageIiifModified, revealResetButon } from './utils.js';


/**
* Invert the IIIF URL with '!' and update the data-iiif-src attribute.
* @param {HTMLElement} img - The image element to be inverted.
*/
export const mirror = (container, rowSelectorStr, button) => {
  const image = container.querySelector('.img-thumbnail');
  const base = image.getAttribute('data-iiif-src').split('/max/')[0];
  const currentMaxValue = image.getAttribute('data-iiif-src').split('/max/')[1];
  const insertMirrorValue = currentMaxValue.includes('!') ? "" : "!";
  const invertMaxValue = currentMaxValue.includes('!') ? currentMaxValue.replace('!', '') : `!${currentMaxValue}`;
  const newSrc = `${base}/max/${invertMaxValue}`;
  modifySrc(image, newSrc);
  // reveal the reset buton
  revealResetButon(container);

  modifyDataElement(rowSelectorStr, ".entry_iiif_mirror", insertMirrorValue);
  isImageIiifModified(rowSelectorStr);
};


/**
* Cycles iiif quality 'colors' between default, grayscale, and bitonal
*/
export const cycleQuality = (container, rowSelectorStr, button) => {
  const image = container.querySelector('.img-thumbnail');
  const qualityList = ['default.jpg', 'gray.jpg', 'bitonal.jpg'];
  const currentSrc = image.getAttribute('data-iiif-src');
  for (let i = 0; i < qualityList.length; i++) {
      if (currentSrc.endsWith(qualityList[i])) {
          const nextIndex = (i + 1) % qualityList.length;
          const newQuality = qualityList[nextIndex];
          const newSrc = currentSrc.replace(qualityList[i], newQuality);
          modifySrc(image, newSrc);
          // reveal the reset buton
          revealResetButon(container);
          modifyDataElement(rowSelectorStr, ".entry_iiif_quality", `${newQuality}`);
          isImageIiifModified(rowSelectorStr);
          break;
      }
  }
};


/**
* Apply rotation to an image.
*/
const updateRotationSrc = (image, rotation) => {
  const path = image.getAttribute('data-iiif-src');
  const base = path.split('/max/')[0]; // Split URL
  const end = path.split('/max/')[1];
  const currentRotation = end.split("/")[0]
  const suffix = end.split("/")[1]
  const newSrc = `${base}/max/${rotation}/${suffix}`;
  modifySrc(image, newSrc);
};

/**
* generic rotation handler for buttons and inputs
*/
export const rotate = (container, rowSelectorStr, target) => {
	const rotationInput = container.querySelector('.rotation-input');
	const image = container.querySelector('.img-thumbnail');
	const currentRotation = parseInt(rotationInput.value || 0);
	if (target === rotationInput) {
	  updateRotationSrc(image, currentRotation);
	  rotationInput.value = currentRotation;
    modifyDataElement(rowSelectorStr, ".entry_iiif_rotation", currentRotation);
    isImageIiifModified(rowSelectorStr);
	} else {
	  const newRotation = (currentRotation + 90) % 360;
	  updateRotationSrc(image, newRotation);
	  rotationInput.value = newRotation;
    modifyDataElement(rowSelectorStr, ".entry_iiif_rotation", newRotation);
    isImageIiifModified(rowSelectorStr);
	}
  // reveal the reset buton
  revealResetButon(container);
};