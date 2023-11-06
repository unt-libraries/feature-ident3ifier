import { modifySrc, modifyDataElement, isImageIiifModified, resetDataRow, setAnnotationButtonState, revealResetButon, slugify } from './utils.js';

export class IiifLeafletViewer {
  constructor() {
    this.config = {
      "leafletInsertPoint": "iiif-workspace", // getElementById
      "leafletControlBarClasses": "leaflet-bar leaflet-control leaflet-control-custom bg-white",
      "iiifLayer": null,
      "iiifImageBase": "",
      "button": null,
      "item": null,
      "img": null,
      "iiifInfo": null,
      "iiifCanononicalUrl": null,
      "iiifCroppedUrl": null,
      "rectangleType": null,
      "cropControlEditOnly": null,
      "boundsControlEditOnly": null,
      "processCropControl": null,
      "processCropTool": null,
      "processBoundsControl": null,
      "processBoundsTool": null,
      "region": "full",
      "boundsData": null,
    }

    this.selectors = {
      "iiifModal": document.querySelector('#modal-iiif-crop'),
      "inserDataButton": document.querySelector('#insert-data'),
      "colorSchemeDropdown": document.querySelector("#color-scheme-dropdown"),
    }

    this.featureGroups = {
      "cropping" : new L.FeatureGroup(),
      "bounding": new L.FeatureGroup(),
    }

    this.colors = {
      active: "blue",
      schemes: [
        { name: "blue", crop: "#3388ff", bounds: "#4bebdd", invert: false },
        { name: "green", crop: "#34683F", bounds: "#7CFF9B", invert: false },
        { name: "red", crop: "#912C30", bounds: "#FF4857", invert: false },
        { name: "yellow", crop: "#AFA600", bounds: "#FFF60F", invert: false },
        { name: "black", crop: "#000000", bounds: "#404040", invert: false },
        { name: "white", crop: "#D9D9D9", bounds: "#FFFFFF", invert: true },        
      ],
    }

    this.templates = {
      "drawBoundsButton" : `<button id="bounds-button" 
                                   class="btn btn-sm btn-secondary-subtle"
                                   data-bs-toggle="tooltip"
                                   data-bs-title="Draw a labeled bounding box (Shortcut: CTRL+b)"
                                   data-bs-placement="right"
                                   data-bs-container=".leaflet-control">
                                <span class="far fa-rectangles-mixed fa-fw text-primary"
                                      aria-hidden="true"></span>
                                Bounds
                              </button>`,
      "drawCropButton" : `<button id="crop-button" 
                                  class="btn btn-sm btn-secondary-subtle"
                                  data-bs-toggle="tooltip"
                                  data-bs-title="Draw a cropping box (Shortcut: CTRL+c)"
                                  data-bs-placement="right"
                                  data-bs-container=".leaflet-control">
                                <span class="far fa-crop-simple fa-fw text-primary"
                                      aria-hidden="true"></span>
                                Crop
                              </button>`,
      "popoverInput" : `<div class="input-group">
                          <span class="input-group-text">
                            <span class="far fa-tag fa-fw"
                                  data-bs-title="add a label to this bounding box"
                                  data-bs-toggle="tooltip"></span>
                          </span>
                          <input type="text"
                                 autocomplete="on"
                                 spellcheck="true"
                                 class="form-control" 
                                 placeholder="Label" 
                                 aria-label="Label"
                                 value="">
                          <button class="bounds-delete-button btn btn-outline-danger"
                                  data-bs-title="delete this box"
                                  data-bs-toggle="tooltip">
                            <span class="far fa-xmark fa-fw"></span>
                          </button>
                          <button class="bounds-export-button btn btn-outline-primary"
                             target="_blank"
                             data-download-file=""
                             data-download-name="default.jpg"
                             data-download-outputname="default.jpg"
                             data-bs-title="view/download image with these bounds"
                             data-bs-toggle="tooltip">
                            <span class="far fa-download fa-fw"></span>
                          </button>                          
                        </div>`,
      "makeColorSelector" : (scheme) => {
        const inverted = scheme.invert ? "bg-dark" : "";
        return`<li>
                <button class="dropdown-item btn btn-link border-0" data-color-scheme="${scheme.name}">
                  <span class="${inverted} p-1 me-1">
                    <span style="color: ${scheme.crop}" class="fas fa-square"></span>
                    <span style="color: ${scheme.bounds}" class="fas fa-square"></span>
                  </span>
                  ${scheme.name}
                </button>
            </li>`
      },
    }
    this.rendered = null;
  }


  utils = {
    /**
     * Create additional Control placeholders
     */
    addControlPlaceholders: (map) => {
      let corners = map._controlCorners,
          l = 'leaflet-',
          container = map._controlContainer;

      // Define the createCorner arrow function within the method
      const createCorner = (vSide, hSide) => {
          const className = `${l}${vSide} ${l}${hSide}`;
          corners[vSide + hSide] = L.DomUtil.create('div', className, container);
      };
      createCorner('verticalcenter', 'left');
      createCorner('verticalcenter', 'right');
    },

    /**
     * genete a iiif image url with variable regions
     */
    croppedImageConstructor: (region) => {
      region = region || 'full';
      return `${this.config.iiifImageBase}/${region}/max/0/default.jpg`;
    },

    /**
     * generate a comma-separated region string from bounds
     */
    getIiifRegionPx: (bounds) => {
      // Get the current zoom level of the rendered map
      const zoom = this.rendered.getZoom();
      // Project the coordinates of the rectangle's corners
      const min = this.rendered.project(bounds.getSouthWest(), zoom);
      const max = this.rendered.project(bounds.getNorthEast(), zoom);
      // Get the image size at the current zoom level
      const imageSize = this.config.iiifLayer._imageSizes[zoom];
      // Calculate x and y ratios for the region
      const xRatio = this.config.iiifLayer.x / imageSize.x;
      const yRatio = this.config.iiifLayer.y / imageSize.y;
      // Calculate the region coordinates based on ratios and projected points
      const x = Math.floor(min.x * xRatio);
      const y = Math.floor(max.y * yRatio);
      const width = Math.floor((max.x - min.x) * xRatio);
      const height = Math.floor((min.y - max.y) * yRatio);
      // As per IIIF spec, ensure that no values are negative,
      // setting them to 0 if necessary
      const region = [
        x < 0 ? 0 : x,
        y < 0 ? 0 : y,
        width < 0 ? 0 : width,
        height < 0 ? 0 : height
      ];
      // Return the region coordinates as a comma-separated string
      return region.join(',');
    },

    /**
     * gather all of the bounds and their labels into an array.
     */
    getBoundingBoxData: () => {
      const data = [];
      this.featureGroups.bounding.eachLayer(layer => {
        const label = layer.bounds_label || '';
        const bounds = this.utils.getIiifRegionPx(layer.getBounds())
        data.push({ label, bounds });
      });
      return data;
    },

    /**
     * create a color scheme dropdown utility for easier viewing of
     * when iiif image layer doesn't provide contrast to bounds
     */
    buildColorSchemeDropdown: () => {
      this.colors.schemes.forEach(scheme => {
        const line = this.templates.makeColorSelector(scheme);
        this.selectors.colorSchemeDropdown.insertAdjacentHTML("beforeend", line);
      });
    },
    /**
     * get the current active color scheme.
     */
    getActiveColorScheme: () => {
      const scheme = this.colors.schemes.find(scheme => scheme.name === this.colors.active);
      return scheme;
    },

    /**
     * set the color scheme for all bounds given a named arg.
     */
    setActiveColorScheme: (schemeName) => {
      this.colors.active = schemeName;
      this.utils.changeLayerColorScheme(this.featureGroups.bounding);
      this.utils.changeLayerColorScheme(this.featureGroups.cropping);
    },

    /**
     * modify layer colors for a feature group
     */
    changeLayerColorScheme: (featureGroup) => {
      const colorScheme = this.utils.getActiveColorScheme();
      const layers = featureGroup.getLayers();
      layers.forEach(layer => {
        if (layer.bounds_type === "bounds") {
          layer.setStyle({ color: colorScheme.bounds });
        } else if (layer.bounds_type === "crop") {
          layer.setStyle({ color: colorScheme.crop });
        }
      });
    },
  }

  /**
   * Initial leaflet "map" configuration
   */
  setupRenderedIIIFImage() {
    // the base rendering of the leaflet map
    this.rendered = L.map(this.config.leafletInsertPoint, {
      attributionControl: false,
      center: [0, 0],
      crs: L.CRS.Simple,
      zoom: 1,
      minZoom: 1,
      maxZoom: 5,
    });
    // add the featureGroup for cropping rectangle
    this.rendered.addLayer(this.featureGroups.cropping);
    this.rendered.addLayer(this.featureGroups.bounding);
    this.utils.addControlPlaceholders(this.rendered);
  }

  /**
   * Clean up the map when the display modal is hidden
   */
  cleanupTasks(which) {
    // remove the cropping rectangle from the feature group
    if (which === "all") {
      this.featureGroups.cropping.clearLayers();
      this.featureGroups.bounding.clearLayers();
      this.rendered.removeControl(this.config.cropControlEditOnly);
      this.rendered.removeControl(this.config.boundsControlEditOnly);
      this.rendered.addControl(this.config.processCropTool)
      //this.config.processCropTool.addTo(this.rendered);
    } else if (which === "crop") {
      this.featureGroups.cropping.clearLayers();
      this.rendered.removeControl(this.config.cropControlEditOnly);
      //this.config.processCropTool.addTo(this.rendered);
      this.rendered.addControl(this.config.processCropTool)
    } else if (which === "bounds") {
      this.featureGroups.bounding.clearLayers();
      this.rendered.removeControl(this.config.boundsControlEditOnly);  
    }
    // unset config variables
    this.config.button, this.config.item, this.config.img, this.config.iiifInfo, this.config.rectangleType, this.config.iiifCanononicalUrl, this.config.iiifCroppedUrl, this.config.boundsData = null;
    // unsert the cropping region to iiif "full"
    this.config.region = "full";
  }

  /**
   * calculate the bounding box of a drawn rectangle and create a new
   * iiif url for the cropped image.
   */
  cropRenderedImage(bounds) {
    // get the bouding box as a comma-seperated string
    const region = this.utils.getIiifRegionPx(bounds);
    // Create the URL for the cropped image
    const url = this.utils.croppedImageConstructor(region);
    this.config.region = `${region}`;
    // Update the "data-iiif-cropped-src" attribute of the #insert-data element
    //this.selectors.inserDataButton.setAttribute("data-iiif-cropped-src", url);
    this.config.iiifCroppedUrl = url;
    // Return the generated URL
    return url;
  }


  /**
   * bounds popover
   */
  initPopover = (layer) => {
    // popover content
    const content = this.templates.popoverInput;
    // Calculate the offset for the top-right corner
    const offsetX = layer._bounds._northEast.lng - layer._bounds._southWest.lng;
    const offsetY = layer._bounds._northEast.lat - layer._bounds._southWest.lat;
    // generate a DOM element with the content
    let popupEL = L.DomUtil.create('div', 'infoWindow');
        popupEL.innerHTML = content;
    // bind the popup to the current rectangle
    layer.bindPopup(popupEL, {
      closeButton: true,
      minWidth: 300,
      maxWidth: 350,
      offset: [offsetX, -offsetY], // offset placement
    });

    this.handleBoundsLayerClick(layer);
    this.handlePopupOpen(layer);
    this.handleBoundsDeleteClick(layer);
    this.updateBoundsExportPath(layer);
  };

  /**
   * Events to occur when bounds control is clicked
   */
  boundsControlClickHandler = () => {
    // set a temp var with a rectangle type: 'bounds'
    this.config.rectangleType = "bounds";
    // create a new drawing rectangle with shape options
    const rectangle = new L.Draw.Rectangle(this.rendered);
    const colorScheme = this.utils.getActiveColorScheme();
    rectangle.setOptions({
      shapeOptions: {
        color: colorScheme.bounds,
        dashArray: "6",
        weight: 3,
      },
    });
    // enable the drawn rectangle.
    rectangle.enable();
  }

  /**
   * Events to occur when bounds control is clicked
   */
  cropControlClickHandler = () => {
    // set a temp var with a rectangle type: 'bounds'
    this.config.rectangleType = "crop";
    // create a new drawing rectangle with shape options
    const rectangle = new L.Draw.Rectangle(this.rendered);
    const colorScheme = this.utils.getActiveColorScheme();

    rectangle.setOptions({
      shapeOptions: {
        color: colorScheme.crop,
        dashArray: "1",
        weight: 4,
      },
    });
    // enable the drawn rectangle.
    rectangle.enable();
  }

  /**
   * Events occuring on bounds rectangle click
   */
  handleBoundsLayerClick = (layer) => {
    // open the data entry popup on click
    layer.on('click', () => {
      layer.openPopup();
    });
  }


  /**
   * handlers for popup text input.
   */
  handleBoundsInputChange = (input, layer) => {
    input.addEventListener('blur', (e) => {
      // Store the entered value on the layer
      this.setCustomProperty(layer, "bounds_label", e.target.value);
      this.config.boundsData = this.utils.getBoundingBoxData();
      // update the downloadable filename with user entered value
      const button = e.target.closest(".leaflet-popup-content").querySelector(".bounds-export-button");
      // this value never changes
      const downloadFileName = button.getAttribute("data-download-name");
      // copy
      let outputname = downloadFileName
      // prepend formated slugified input text if it exists.
      const slugifiedValue = e.target.value ? `${slugify(e.target.value)}-` : "";
      outputname = `${slugifiedValue}${outputname}`;
      // set as the output attr.
      button.setAttribute("data-download-outputname", outputname);
    });
  };

  /**
   * actions occuring when bounds popup is opened.
   */
  handlePopupOpen = (layer) => {
    layer.on('popupopen', () => {
      // Find the input element in the popup content
      const popupContent = layer.getPopup().getContent();
      const input = popupContent.querySelector("input");
      // wait for the popover to be available and focus
      setTimeout(() => {
        input.focus();
      }, 500);
      // blur listener
      this.handleBoundsInputChange(input, layer);
    });
  };


  handleBoundsDeleteClick = (layer)=> {
    const deleteButton = layer.getPopup().getContent().querySelector(".bounds-delete-button");
    deleteButton.addEventListener('click', (e) => {
      // get the button and close the bootstrap tooltip
      const button = e.target.closest("button");
      const tooltip = bootstrap.Tooltip.getOrCreateInstance(button);
      tooltip.hide();
      // close the popup
      layer.closePopup();
      // remove the layer from the feature group
      this.featureGroups.bounding.removeLayer(layer);
    });
  };

  /**
   * update the url and filename of the download image region button.
   */
  updateBoundsExportPath = (layer) => {
    // get the button
    const exportButton = layer.getPopup().getContent().querySelector(".bounds-export-button");
    // identify the region
    const region = this.utils.getIiifRegionPx(layer.getBounds());
    // create a new downlaodable url path
    const url = this.utils.croppedImageConstructor(region);
    // Extract the identifier (e.g., 'metapth317618') from the URL
    const identifierMatch = url.match(/\/ark:\/\d+\/([^/]+)\//);
    const identifier = identifierMatch ? identifierMatch[1] : '';
    // Split the regions string into an array of integers
    const regionArray = region.split(',').map(Number);
    // Create the download filename
    const filename = `${identifier}-region-${regionArray.join('_')}.jpg`;
    // add the content disposition arg to the URL to ensure downloads.
    const downloadURL = `${url}?response-content-disposition=attachment`;
    exportButton.setAttribute("data-download-file", downloadURL);
    exportButton.setAttribute("data-download-name", filename);
    exportButton.setAttribute("data-download-outputname", filename);

  };


  /**
   * Download an image region via fetch.
   */
  async downloadImage(target) {
      try {
        const button = target.closest(".bounds-export-button");
        const downloadURL = button.getAttribute("data-download-file");
        const downloadName = button.getAttribute("data-download-outputname");

        // Use the fetch API to get the image as a Blob
        const response = await fetch(downloadURL);
        if (!response.ok) {
          throw new Error(`Failed to fetch the image (HTTP ${response.status})`);
        }

        const blob = await response.blob();

        // Create a blob URL with the desired file name
        const blobUrl = URL.createObjectURL(blob);

        // Create a link element to trigger the download
        const link = document.createElement('a');
        link.href = blobUrl;

        // Set the download attribute with the desired file name
        link.setAttribute('download', downloadName);

        // Simulate a click on the link to trigger the download
        link.click();

        // Clean up the blob URL after the download
        URL.revokeObjectURL(blobUrl);
        link.remove();
      } catch (error) {
        console.error('Download failed:', error);
      }
    }



  /**
   * set custom property to a leaflet layer
   */
  setCustomProperty = (layer, propName, value) => {
    if (value !== undefined) {
      layer[propName] = value;
    } else {
      layer[propName] = '';
    }
  };


  /**
   * Listeners
   */
  addEventListeners = () => {

    /**
     * "hidden.bs.modal" event handler
     */
    this.selectors.iiifModal.addEventListener('hidden.bs.modal', event => {
      // remove the iiif image layer.
      if (this.config.iiifLayer) {
        this.rendered.removeLayer(this.config.iiifLayer);
      }
      // reset UX.
      this.cleanupTasks("all");
    });

    /**
     * "shown.bs.modal" event handler
     */
    this.selectors.iiifModal.addEventListener('shown.bs.modal', event => {
      //
      // Set various config options for the current rendering.
      //

      // Button that triggered the modal
      this.config.button = event.relatedTarget;
      // closest item
      this.config.item = this.config.button.closest('.item');
      // associated image
      this.config.img = this.config.item.querySelector("img");
      // iiif json url
      this.config.iiifInfo = this.config.img.getAttribute("data-iiif-info");
      // iiif image url
      this.config.iiifCanononicalUrl = this.config.img.getAttribute("data-canonical-iiif-src");
      // iiif url minus info.json
      this.config.iiifImageBase = this.config.iiifInfo.split('/info')[0];
      
      // We are in modal, so map needs size updates after "shown".
      this.rendered.invalidateSize();
      // add the base iiif image to the rendered 'map'
      this.config.iiifLayer = L.tileLayer.iiif(this.config.iiifInfo, {}).addTo(this.rendered);
    });


    /**
     * misc click handlers for dynamic inserts
     */
    this.selectors.iiifModal.addEventListener("click", event => {
      const target = event.target;

      /**
       * update settings for color schemes of drawn boxes
       */
      if (target.closest("[data-color-scheme]")) {
        const dataScheme = target.closest("[data-color-scheme]").getAttribute("data-color-scheme");
        this.utils.setActiveColorScheme(dataScheme);
      };

      /**
       * exporting a cropped image
       */
      if (target.closest(".bounds-export-button")) {
        this.downloadImage(target);
      }

    });

    /**
     * work is complete, insert data back to main UI and close modal
     */
    this.selectors.inserDataButton.addEventListener('click', event => {
      // get the iiif cropped image url
      const croppedPath = this.config.iiifCroppedUrl;
      const boundsData = this.config.boundsData;
      // container in main screen
      const container = this.config.item;
      // reset rotation input to 0
      container.querySelector('.rotation-input').value = "";
      // find and show the reset button
      revealResetButon(container);
      // get the current modal
      const modalEl = document.querySelector("#modal-iiif-crop");
      const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
      // modify the main imag source so it shows the cropped image
      if (croppedPath) {
        modifySrc(this.config.img, croppedPath);  
      }
      // get the associated data row for the current image
      const coorespondingRow = container.getAttribute("data-csv-controls");
      const coorespondingRowEl = document.querySelector(coorespondingRow);
      // unset any annotations that were previously made.
      const annotationButtons = container.querySelectorAll(".annotation-button");
      annotationButtons.forEach(button => {
        setAnnotationButtonState(button, false);
      });
      // reset the data row to initial state.
      const dataPoints = coorespondingRowEl.querySelectorAll('span[data-initial-value]');
      resetDataRow(dataPoints);
      // add the iiif bounds to the row's field
      modifyDataElement(coorespondingRow, ".entry_iiif_region", this.config.region);
      // inject any bounds data and labels to csv.
      
      if (boundsData) {
        const stringifiedBounds = JSON.stringify(boundsData);
        const csvSafeBounds = stringifiedBounds.replace(/"/g, '""');
        modifyDataElement(coorespondingRow, ".entry_iiif_labeled_bounds", `${csvSafeBounds}`);
      }
      // indicate on the data row that a iiif modiciation has been made.
      isImageIiifModified(coorespondingRow);
      // close the modal.
      modal.hide();
    });

    /**
     * On rectangle creation, draw a layer, get bounds &
     * generate new iiif url, remove 'full' drawing controls
     * to prevent more rectangles, add "edit" control.
     */
    this.rendered.on(L.Draw.Event.CREATED, e => {
      // get the bounds of the current draw layer
      const bounds = e.layer.getBounds();
      if (this.config.rectangleType === "bounds") {
        // add the rectangle to the copping feature group.
        this.featureGroups.bounding.addLayer(e.layer);
        this.setCustomProperty(e.layer, "bounds_label", "");
        this.setCustomProperty(e.layer, "bounds_type", "bounds");
        this.initPopover(e.layer);
        this.config.boundsControlEditOnly.addTo(this.rendered);
        // push all of the layer data into an array
        this.config.boundsData = this.utils.getBoundingBoxData();
      } else if (this.config.rectangleType === "crop") {
        // allow only a single cropping layer, clear any remaining previous.
        this.featureGroups.cropping.clearLayers();
        // generate a cropped iiif url with the bounds
        // and make bounds info available for 
        // display/export on main screen.
        this.cropRenderedImage(bounds);
        // add a bounds type property to the layer
        this.setCustomProperty(e.layer, "bounds_type", "crop");
        // add the rectangle to the copping feature group.
        this.featureGroups.cropping.addLayer(e.layer);
        // disable pointer events on this layer
        e.layer.getElement().style.pointerEvents = 'none';
        // add the "edit only" controls to the UI
        this.config.cropControlEditOnly.addTo(this.rendered);
        // remove the new drawing control so only a single crop is possible.
        //this.config.processCropControl.remove(this.rendered);
        this.rendered.removeControl(this.config.processCropTool);
      }
    });

    /**
     * On edit of existing rectangle, update the iiif image
     * url with new bounds.
     */
    this.rendered.on('draw:edited', e => {
      // editing is active, get all of the layers
      const layers = e.layers;
      layers.eachLayer( layer => {
        if (layer.bounds_type === "bounds") {
          // push all of the layer data into an array
          this.config.boundsData = this.utils.getBoundingBoxData();
        } else if (layer.bounds_type === "crop") {
          // generate a cropped iiif url with the bounds
          // and make bounds info available for 
          // display/export on main screen.
          const bounds = layer.getBounds();
          this.cropRenderedImage(bounds);  
        }
      });
    });

    /**
     * On rectangle delete, reset to initial state
     */
    this.rendered.on(L.Draw.Event.DELETED, e => {
      const layers = e.layers;
      layers.eachLayer( layer => {
        const layerType = layer.bounds_type;
        if (layerType === "bounds") {
          // there can be multiple bounds layers. do cleanup task only if there are none left.
          if (this.featureGroups.bounding.getLayers().length === 0){
            this.cleanupTasks("bounds");
          }
        } else if (layerType === "crop") {
          // there can only be a single crop layer but check to be safe.
          if (this.featureGroups.cropping.getLayers().length === 0){
            this.cleanupTasks("crop");
            this.rendered.addControl(this.config.processCropTool);
          }
        }
      });
    });

  }; // end event listeners


  /**
   * configure leaflet edit controls
   */
  leafletControls = () => {


    /**
     * a rectangle drawing tool for adding mutliple bounding boxes.
     */

    const cropTool = L.Control.extend({
      // where it goes
      options: {
        position: 'topleft'
      },
      // html dom element
      onAdd: () => {
        // custom control bar for the button.
        this.config.processCropControl = L.DomUtil.create(
          'div', 
          this.config.leafletControlBarClasses
        );
        //customize leaflet draw texts
        L.drawLocal.draw.handlers.rectangle.tooltip.start = 'Draw a cropping box';
        // the button
        this.config.processCropControl.innerHTML = this.templates.drawCropButton;
        this.config.processCropControl.addEventListener("click", this.cropControlClickHandler);

        document.addEventListener("keydown", (event) => {
          // Check if CMD/CTRL key is held and the "B" key is pressed
          if (event.ctrlKey && event.key === "c") {
            // Execute your function here
            this.cropControlClickHandler();
          }
        });
        return this.config.processCropControl;
      },
      onRemove: () => {
        //this.config.processCropControl = null;
        //this.selectors.inserDataButton.setAttribute("data-iiif-cropped-src", this.config.iiifCanononicalUrl);
      }
    });


    /**
     * a rectangle drawing tool for adding mutliple bounding boxes.
     */

    const boundsTool = L.Control.extend({
      // where it goes
      options: {
        position: 'verticalcenterleft'
      },
      // html dom element
      onAdd: () => {
        // custom control bar for the button.
        this.config.processBoundsControl = L.DomUtil.create(
          'div', 
          this.config.leafletControlBarClasses
        );
        //customize leaflet draw texts
        L.drawLocal.draw.handlers.rectangle.tooltip.start = 'Draw, then click box to label.';
        // the button
        this.config.processBoundsControl.innerHTML = this.templates.drawBoundsButton;
        this.config.processBoundsControl.addEventListener("click", this.boundsControlClickHandler);

        document.addEventListener("keydown", (event) => {
          // Check if CMD/CTRL key is held and the "B" key is pressed
          if (event.ctrlKey && event.key === "b") {
            // Execute your function here
            this.boundsControlClickHandler();
          }
        });
        return this.config.processBoundsControl;

      }
    });

    /**
     * edit controls, don't allow further drawing
     */
    this.config.boundsControlEditOnly = new L.Control.Draw({
      edit: {
        featureGroup: this.featureGroups.bounding,
      },
      draw: false,
      position: "verticalcenterleft",
    });

    /**
     * edit controls, don't allow further drawing
     */
    this.config.cropControlEditOnly = new L.Control.Draw({
      edit: {
        featureGroup: this.featureGroups.cropping,
      },
      draw: false,
      position: "topleft",
    });

    // add cropping tool to display
    this.config.processCropTool = new cropTool();
    this.rendered.addControl(this.config.processCropTool);

    // add bounds tool to display
    this.config.processBoundsTool = new boundsTool();
    this.rendered.addControl(this.config.processBoundsTool)

    this.utils.buildColorSchemeDropdown();
  };
}; // end class LeafletIIIF
