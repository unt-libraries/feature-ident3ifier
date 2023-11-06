/**
 * convenience shared variables.
 */
const config = {
  "statsCountEls": document.querySelectorAll(".stats-count"),
}

/**
 * enable bootstrap tooltiops
 */
export const optInToolTips = (() => {
  /**
   * self executing init of bootstrap tooltips
   */
  new bootstrap.Tooltip("body", {
    selector: "[data-bs-toggle='tooltip']",
    container: "body",
    trigger: "hover"
  });
})();

export const optInPopovers = (() => {
  /**
   * self executing init of bootstrap tooltips
   */
  new bootstrap.Popover("header, main, footer", {
    selector: "[data-bs-toggle='popover']",
    container: "body",
    trigger: "click"
  });
})();

/**
 * debounce function
 */
export const debounce = (func, delay) => {
  let timerId;
  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

/**
 * make sure that quotes are double escaped in csv outputs.
 */
export const escapeCSVValue = (value) => {
  if (typeof value !== 'string') {
    return value.toString();
  }
  return `${value.replace(/"/g, "'")}`;
};

/**
 * generate a random~ish string of 7 characters in the range [a-z0-9]
 */
export const makeHash = () => {
  const hash = [...Array(30)]
                  .map(() => Math.random().toString(36)[2])
                  .slice(10, 17)
                  .join('');
  return hash;
};

/**
 * unveil a lazysizes image
 */
export const unveilImage = (img) => {
  if (typeof lazySizes !== 'undefined') {
    lazySizes.loader.unveil(img);
  }
};

/**
 * update the src of an image
 */
export const modifySrc = (image, newSrc) => {
    image.setAttribute('data-src', newSrc);
    image.setAttribute('data-iiif-src', newSrc);
    unveilImage(image);
};

/**
 * Reset and item and associated data to it's original state.
 */
export const resetState = (container, rowSelectorStr) => {
  const associatedRow = document.querySelector(rowSelectorStr);
  const dataPoints = associatedRow.querySelectorAll('td[data-initial-value]');
  resetDataRow(dataPoints);

  const rotationInput = container.querySelector('.rotation-input');
  const annotationInput = container.querySelector('.annotation-note');
  const image = container.querySelector('.img-thumbnail');
  const smallImageAttr = image.getAttribute("data-canoncial-small-src");
  const iiifImageAttr = image.getAttribute("data-canonical-iiif-src");
  const resetButton = container.querySelector("[data-reset-state='initial']");
  const annotationButtons = container.querySelectorAll("button.annotation-button");

  annotationButtons.forEach( button => {
    setAnnotationButtonState(button, false);
  });
  rotationInput.value = "";
  annotationInput.value = "";
  resetButton.classList.add("d-none");
  image.setAttribute('data-iiif-src', iiifImageAttr);
  image.setAttribute('data-src', smallImageAttr);
  unveilImage(image);
};

/**
 * update the visible rows count
 */
export const  updateVisibleRowsCount = () => {
  const visibleRows = document.querySelectorAll('.entry:not(.d-none)').length;
  config.statsCountEls.forEach(el => {
    el.textContent = visibleRows;
  });
};

/**
 * Modify the value of one element in the export data row.
 */
export const modifyDataElement = (rowSelectorStr, dataSelectorStr, value) => {
  const dataRow = document.querySelector(rowSelectorStr);
  const dataElem = dataRow.querySelector(dataSelectorStr);
  if (typeof value === 'string') {
    if (value.length > 0) {
      dataElem.textContent = `${value}`;
    } else {
      dataElem.textContent = "";
    }
  } else if (typeof value === 'number') {
    dataElem.textContent = value.toString();
  } else {
    dataElem.textContent = "";
  }
  highlightDataRow(dataRow);
};

/**
 * dom parser, returning a decoded value.
 */
export const domParserUtil = str => {
    const parser = new DOMParser();
    const decodedValue = parser.parseFromString(`<!doctype html><body>${str}`, 'text/html').body.textContent;
    return decodedValue;
};

/**
 * reset all of the values in a row to their intial state.
 */
export const resetDataRow = elems => {
  elems.forEach(el => {
      const dataInitialValue = el.getAttribute('data-initial-value');
      if (dataInitialValue !== null) {
          const defaultValue = domParserUtil(dataInitialValue);
          el.textContent = defaultValue;
      }
  });
};

/**
 * set color classes on annotation buttons
 */
export const setAnnotationButtonState = (button, state) => {
  if (state) {
    button.classList.add("btn-success");
    button.classList.remove("btn-outline-secondary-subtle");
  } else {
    button.classList.add("btn-outline-secondary-subtle");
    button.classList.remove("btn-success");
  }
};

/**
 * toggles a boolean annotation.
 */
export const toggleRowAnnotation = (container, rowSelectorStr, target) => {
  const button = target.closest("button");
  const associatedRow = document.querySelector(rowSelectorStr);
  const fieldSelector = button.getAttribute("data-export-toggles");
  const associatedField = associatedRow.querySelector(fieldSelector);

  if (associatedField.textContent == "0") {
    associatedField.textContent = "1";
    setAnnotationButtonState(button, true);
  } else {
    associatedField.textContent = "0";
    setAnnotationButtonState(button, false);
  }
  highlightDataRow(associatedRow);
  // reveal the reset buton
  revealResetButon(container);
};

/**
 * set boolean value in export row if one or more iiif properties have been set
 */
export const isImageIiifModified = (rowSelectorStr) => {
  const workingRow = document.querySelector(rowSelectorStr);
  const entryIsModifiedEl = workingRow.querySelector(".entry_is_modified");
  let modifiedValue = entryIsModifiedEl.textContent;

  // Function to check if all ".iiif-element" spans have matching content and initial-state values
  const allElementsMatch = () => {
    const iiifElements = workingRow.querySelectorAll(".iiif-element");
    for (const element of iiifElements) {
      const textContent = element.textContent;
      const initialState = element.getAttribute("data-initial-value");
      if (textContent !== initialState) {
        return false;
      }
    }
    return true;
  };
  if (modifiedValue === "0") {
    entryIsModifiedEl.textContent = "1";
  } else if (allElementsMatch()) {
    entryIsModifiedEl.textContent = "0";
  }
};

/**
 * Add a text note to the data export row
 */
export const insertRowNote = (container, rowSelectorStr, target) => {
  const controlsSelector = target.getAttribute("data-export-toggles");
  const associatedRow = document.querySelector(rowSelectorStr);
  const controlsElement = associatedRow.querySelector(controlsSelector);
  let insertValue = escapeCSVValue(target.value);
  if (target.value === "") {
    controlsElement.textContent = "";
  } else {
    controlsElement.textContent = insertValue;
  }
};

export const highlightDataRow = (row) => {
  row.classList.add('table-primary', 'highlight');
  setTimeout(() => {
    row.classList.remove('table-primary', 'highlight');
  }, 2000);
};

export const revealResetButon = (container) => {
  const resetButton = container.querySelector('[data-reset-state="initial"]');
  resetButton.classList.remove("d-none");
};

/**
 * scroll to the relevent csv row and highlight it.
 */
export const scrollToRow = (rowSelectorStr) => { 
  const associatedRow = document.querySelector(rowSelectorStr);
  if (associatedRow) {
    associatedRow.scrollIntoView({behavior: 'smooth', block: 'nearest', inline: 'start'});
    highlightDataRow(associatedRow);
  }
}

/**
 * slugify a string
 */
export const slugify = (str) => {
  return String(str)
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}
