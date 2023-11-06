import { updateVisibleRowsCount } from './utils.js';

export class ItemSelector {
  constructor() {
    this.config = {
      "toggleVisibilityState": document.querySelector("#toggle-exclude-state"),
      "toggleVisibilityCount": document.querySelector("#toggle-exclude-count"),
      "exclusionCount": 0,
      "showingHiddenItems": true,
      "opacityClass": "opacity-25",
      "hiddenClass": "d-none",
      "csvControls": "data-csv-controls",
      "includeText": "Include",
      "excludeText": "Exclude",
      "showText": "Show",
      "hideText": "Hide",
      "includeClasses": ["text-danger", "fa-square-xmark"],
      "excludeClasses": ["text-success", "fa-square-check"],
      "visualExcludeClasses": ["bg-danger", "opacity-25"],
    }
  }


  /**
   * toggle the visibility of excluded items and their associated csv rows
   */
  toggleVisibility = () => {
    const excludedItems = document.querySelectorAll(".excluded-item");
    if (this.config.toggleVisibilityState.textContent === this.config.hideText) {
      this.config.showingHiddenItems = false;
      this.config.toggleVisibilityState.textContent = this.config.showText;
      excludedItems.forEach( item => {
        const csvRow = item.getAttribute(this.config.csvControls);
        const csvRowEl = document.querySelector(csvRow);
        item.classList.add(this.config.hiddenClass);
        csvRowEl.classList.add(this.config.hiddenClass);
        updateVisibleRowsCount();
      });
    } else {
      this.config.toggleVisibilityState.textContent = this.config.hideText;
      this.config.showingHiddenItems = true;
      excludedItems.forEach( item => {
        const csvRow = item.getAttribute(this.config.csvControls);
        const csvRowEl = document.querySelector(csvRow);
        item.classList.remove(this.config.hiddenClass);
        csvRowEl.classList.remove(this.config.hiddenClass);
        updateVisibleRowsCount();
      });
    }
  };

  /**
  * exclude item handler
  */
  excludeItem = event => {
    event.preventDefault();
    const targetLink = event.target.closest("a");
    const targetText = targetLink.querySelector("span");
    const closestItem = targetLink.closest(".item");
    const closestItemFormEls = closestItem.querySelectorAll("button, input, .input-group-text");
    const image = closestItem.querySelector("img");
    const csvSelectorID = closestItem.getAttribute(this.config.csvControls);
    const matchingCSV = document.querySelector(csvSelectorID);
    const csvInclusionIndicator = matchingCSV.querySelector("svg");

    // Toggle wording, styles, and visibility
    if (targetText.textContent === this.config.includeText) {
        targetText.textContent = this.config.excludeText;
        closestItem.classList.remove("excluded-item");
        image.classList.remove(...this.config.visualExcludeClasses);
        this.config.exclusionCount--;
        csvInclusionIndicator.classList.add(...this.config.excludeClasses);
        csvInclusionIndicator.classList.remove(...this.config.includeClasses);
        closestItemFormEls.forEach( el => {
          el.removeAttribute('disabled');
          el.classList.remove(this.config.opacityClass)
        });
    } else {
        targetText.textContent = this.config.includeText;
        closestItem.classList.add("excluded-item");
        image.classList.add(...this.config.visualExcludeClasses);
        this.config.exclusionCount++;
        csvInclusionIndicator.classList.add(...this.config.includeClasses);
        csvInclusionIndicator.classList.remove(...this.config.excludeClasses);
        closestItemFormEls.forEach( el => {
          el.setAttribute('disabled', true);
          el.classList.add(this.config.opacityClass)
        });
        if (!this.config.showingHiddenItems) {
            closestItem.classList.add(this.config.hiddenClass);
            matchingCSV.classList.add(this.config.hiddenClass);
            updateVisibleRowsCount();
        }
    }
    this.config.toggleVisibilityCount.textContent = this.config.exclusionCount;
  };


  /**
   * Listeners
   */
  addEventListeners = () => {
    /**
     * click event handlers
     */
    document.addEventListener('click', (event) => {
      const target = event.target;
      if (target.closest(".exclude")) {
        this.excludeItem(event);
      }
      if (target.closest("#toggle-exclude-visibility")) {
        this.toggleVisibility();
      }
    });
  }
}
