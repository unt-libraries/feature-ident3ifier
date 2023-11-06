import { makeHash, resetState, resetDataRow } from './utils.js'
import { removeButton } from './templates.js'
import { updateVisibleRowsCount } from './utils.js';

export class cloneHandlers {
  constructor() {
    this.config = {
      "includeClasses": ["text-danger", "fa-square-xmark"],
      "excludeClasses": ["text-success", "fa-square-check"],
      "cloneClasses": ["text-info", "fa-square-c"],
    }
  }
  /**
   * cloning an item.
   * 1. modifiers/prerequisits
   *    - only allow clones on originals.
   *    - only allow clones to items that are not excluded
   * 
   * 2. copy an item with handlers 
   * 3. Modify the clone
   *    - Modify ID of cloned item to incldue random hash
   *    - reset various child settings to initial state
   *    - Modify pointers to matching CSV line with random hash.
   *    - Remove the ability to preview the full sized from the clone
   *    - Add a "Remove" Button to the cloned item in place of the preview link
   *    - Add styles to cloned item to demarcate it from surrounding context.
   * 3. Insert the clone adjacent to origianl item. 
   *    
   * 
   * 4. Copy and Insert the associated csv row into the sidebar list
   * 5. Modify the Clones CSV Row
   *    - Reset its values to initial state.
   *    - update its identifier to match cloned item.
   *    
   * 6. Update counters for total visible. Ensure total hidden also works.
   *
   * 7. events:
   *    - on remove clone
   *       a. update counts/stats.
   *       b. remove matching csv row.
   * 
   */


    /**
    * modfy features of a cloned item and return it.
    */
    modifyCloneItem = (clone, randomID) => {

        // update the id.        
        let cloneId = clone.getAttribute("id"),
            rowId = clone.getAttribute("data-csv-controls");
        cloneId = `${cloneId}-${randomID}`;
        rowId = `${rowId}-${randomID}`;
        clone.setAttribute("id",cloneId);
        clone.setAttribute("data-csv-controls", rowId);
        // reset the state of displayed clone to 'new'
        resetState(clone, rowId);

        // hide the external preview link
        const topLinks = clone.querySelector(".item-top-buttons");
        const previewLink = topLinks.querySelector("a.external-preview")
        topLinks.insertAdjacentHTML("beforeend", removeButton);
        previewLink.classList.add("d-none");

        // update visual id.
        const visualId = clone.querySelector(".item-visual-fs-id");
        const oldContent = visualId.textContent;
        visualId.textContent= `${oldContent} (copy)`;

        const tooltip = bootstrap.Tooltip.getOrCreateInstance(visualId)
        tooltip.setContent({ '.tooltip-inner':  `Fileset # ${oldContent}, variant ${randomID}` })

        const duplicateButton = clone.querySelector("button.clone");
        duplicateButton.classList.add("d-none");        

        return clone;
    };

    /**
     * clone a data row
     */
    cloneDataRow = (rowSelector, randomID,) => {
        const row = document.querySelector(rowSelector);
        const rowClone = row.cloneNode(true);
        const rowIDValule = rowSelector.replace("#", "");
        const cloneId = `${rowIDValule}-${randomID}`;
        rowClone.setAttribute("id", cloneId);

        const clone_id = rowClone.querySelector(".entry_clone_id");
        clone_id.textContent = `${randomID}`;

        // Iterate through the span elements within the cloned element
        const dataPoints = rowClone.querySelectorAll('span[data-initial-value]');
        
        resetDataRow(dataPoints);

        // insert row
        row.parentNode.insertBefore(rowClone, row.nextSibling); // Insert the cloned element after the original

        // modify icon to indicate it is a clone
        const csvInclusionIndicator = rowClone.querySelector("svg");
        csvInclusionIndicator.classList.add(...this.config.cloneClasses);
        csvInclusionIndicator.classList.remove(...this.config.excludeClasses);

        // update the count of visible rows
        updateVisibleRowsCount();

    };

    cloneItem = target => {
        const container = target.closest('.item');
        const rowSelector = container.getAttribute("data-csv-controls");
        const randomID = makeHash();
        let clone = container.cloneNode(true);
        this.cloneDataRow(rowSelector, randomID);
        clone = this.modifyCloneItem(clone, randomID);
        
        container.after(clone);
    };
    removeClone = target => {
        const button = target.closest('button');
        const tooltip = bootstrap.Tooltip.getOrCreateInstance(button);
        tooltip.hide();
        const container = target.closest('.item');
        container.remove();
        updateVisibleRowsCount();
    };
    removeRow = target => {
        const container = target.closest('.item');
        const rowSelector = container.getAttribute("data-csv-controls");
        const matchingRow = document.querySelector(rowSelector);
        matchingRow.remove();
        updateVisibleRowsCount();
    };


    /**
    * Listeners
    */
    addEventListeners = () => {
        document.addEventListener('click', (event) => {
            // apply actions to specific targets
            const target = event.target;
            
            /**
             * cloning action. Make a copy of the current 'item'
             */
            if (target.closest("button.clone")) {
              this.cloneItem(target);
            }
            /**
             * cloning action. Make a copy of the current 'item'
             */
            if (target.closest("button.remove-clone")) {
              this.removeClone(target);
              this.removeRow(target);
            }
        });
    };

}

