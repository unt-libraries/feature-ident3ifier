import { rotate, mirror, cycleQuality } from './iiif.js';
import { debounce, resetState, toggleRowAnnotation, insertRowNote, scrollToRow } from './utils.js'

const config = {
  "containerSelector": ".item",
  "rowSelector": "data-csv-controls",
  "message": "Are you sure you want to leave this page? Your unsaved changes may be lost."
}


export const windowListeners = () => {

  /**
   * prevent accidental data loss by prompting the user prior to
   * navigating away from the current page.
   */
  if (document.body.classList.contains('check-unload')) {
    window.addEventListener('beforeunload', function (e) {
        e.preventDefault();
        const confirmationMessage = config.message;
        e.returnValue = confirmationMessage;
        return confirmationMessage;
    });
  }
};

export const clickListeners = () => {
  /**
   * watch for click events on the document.
   */
  document.addEventListener('click', (event) => {
    // apply actions to specific targets
    const target = event.target;
    const container = target.closest(config.containerSelector);

    // no container? do nothing.
    if (!container) { return; };

    const rowSelectorStr = container.getAttribute(config.rowSelector);

    /**
     * iiif rotation button.
     */
    if (target.closest("button.rotation-button")) {
      rotate(container, rowSelectorStr, target);
    }
    /**
     * iiif mirroring button.
     */  
    if (target.closest("button.flip-horizontal")) {
      mirror(container, rowSelectorStr, target);
    }
    /**
     * iiif color quality button.
     */
    if (target.closest("button[data-iiif-action]")) {
      cycleQuality(container, rowSelectorStr, target);
    }
    /**
     * reset the state of an item and associated rows to original state
     */
  	if (target.closest("button[data-reset-state]")) {
  	  resetState(container, rowSelectorStr, target);
  	}
    /**
     * toggle 1/0 on row annotations
     */
    if (target.closest("button.annotation-button")) {
      toggleRowAnnotation(container, rowSelectorStr, target);
    }
    /**
     * toggle 1/0 on row annotations
     */
    if (target.closest("button.scroll-button")) {
      scrollToRow(rowSelectorStr);
    }
  });
};

export const inputListeners = () => {
  /**
   * watch for click events on the document.
   */
  document.addEventListener('input', (event) => {
    const target = event.target;
    const container = target.closest(config.containerSelector);

    // no container? do nothing.
    if (!container) { return; };

    const rowSelectorStr = container.getAttribute(config.rowSelector);

    if (target.classList.contains('rotation-input')) {
      debounce(rotate(container, rowSelectorStr, target), 500);
    }
    if (target.classList.contains('annotation-note')) {
      debounce(insertRowNote(container, rowSelectorStr, target), 500);
    }
  });
};