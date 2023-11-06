
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
var $c05524284fb73718$exports = {};

$parcel$export($c05524284fb73718$exports, "debounce", () => $c05524284fb73718$export$61fc7d43ac8f84b0);
$parcel$export($c05524284fb73718$exports, "makeHash", () => $c05524284fb73718$export$8e2a98f196e841ed);
$parcel$export($c05524284fb73718$exports, "modifySrc", () => $c05524284fb73718$export$a3910f6f60cd09c4);
$parcel$export($c05524284fb73718$exports, "resetState", () => $c05524284fb73718$export$8e84bad0b35de9e8);
$parcel$export($c05524284fb73718$exports, "resetDataRow", () => $c05524284fb73718$export$5444a0f1902ae2a);
$parcel$export($c05524284fb73718$exports, "setAnnotationButtonState", () => $c05524284fb73718$export$2f0b67ff18e4b205);
$parcel$export($c05524284fb73718$exports, "updateVisibleRowsCount", () => $c05524284fb73718$export$10b0a283df5b7616);
$parcel$export($c05524284fb73718$exports, "modifyDataElement", () => $c05524284fb73718$export$7f4aff9b2a7a6f4f);
$parcel$export($c05524284fb73718$exports, "toggleRowAnnotation", () => $c05524284fb73718$export$e7f3f4207dc89804);
$parcel$export($c05524284fb73718$exports, "revealResetButon", () => $c05524284fb73718$export$b4528f10ad5ce756);
$parcel$export($c05524284fb73718$exports, "isImageIiifModified", () => $c05524284fb73718$export$6ef1b8364d192eee);
$parcel$export($c05524284fb73718$exports, "insertRowNote", () => $c05524284fb73718$export$aef68affd449292e);
$parcel$export($c05524284fb73718$exports, "scrollToRow", () => $c05524284fb73718$export$71590875881b540);
$parcel$export($c05524284fb73718$exports, "slugify", () => $c05524284fb73718$export$c383cdd2a518017a);
/**
 * convenience shared variables.
 */ const $c05524284fb73718$var$config = {
    "statsCountEls": document.querySelectorAll(".stats-count")
};
const $c05524284fb73718$export$6bc1650c0c74f98c = (()=>{
    /**
   * self executing init of bootstrap tooltips
   */ new bootstrap.Tooltip("body", {
        selector: "[data-bs-toggle='tooltip']",
        container: "body",
        trigger: "hover"
    });
})();
const $c05524284fb73718$export$e95ba1dac66585c2 = (()=>{
    /**
   * self executing init of bootstrap tooltips
   */ new bootstrap.Popover("header, main, footer", {
        selector: "[data-bs-toggle='popover']",
        container: "body",
        trigger: "click"
    });
})();
const $c05524284fb73718$export$61fc7d43ac8f84b0 = (func, delay)=>{
    let timerId;
    return (...args)=>{
        clearTimeout(timerId);
        timerId = setTimeout(()=>{
            func.apply(undefined, args);
        }, delay);
    };
};
const $c05524284fb73718$export$242a2a0b03ee012e = (value)=>{
    if (typeof value !== "string") return value.toString();
    return `${value.replace(/"/g, "'")}`;
};
const $c05524284fb73718$export$8e2a98f196e841ed = ()=>{
    const hash = [
        ...Array(30)
    ].map(()=>Math.random().toString(36)[2]).slice(10, 17).join("");
    return hash;
};
const $c05524284fb73718$export$aaf4e0f063a15c21 = (img)=>{
    if (typeof lazySizes !== "undefined") lazySizes.loader.unveil(img);
};
const $c05524284fb73718$export$a3910f6f60cd09c4 = (image, newSrc)=>{
    image.setAttribute("data-src", newSrc);
    image.setAttribute("data-iiif-src", newSrc);
    $c05524284fb73718$export$aaf4e0f063a15c21(image);
};
const $c05524284fb73718$export$8e84bad0b35de9e8 = (container, rowSelectorStr)=>{
    const associatedRow = document.querySelector(rowSelectorStr);
    const dataPoints = associatedRow.querySelectorAll("td[data-initial-value]");
    $c05524284fb73718$export$5444a0f1902ae2a(dataPoints);
    const rotationInput = container.querySelector(".rotation-input");
    const annotationInput = container.querySelector(".annotation-note");
    const image = container.querySelector(".img-thumbnail");
    const smallImageAttr = image.getAttribute("data-canoncial-small-src");
    const iiifImageAttr = image.getAttribute("data-canonical-iiif-src");
    const resetButton = container.querySelector("[data-reset-state='initial']");
    const annotationButtons = container.querySelectorAll("button.annotation-button");
    annotationButtons.forEach((button)=>{
        $c05524284fb73718$export$2f0b67ff18e4b205(button, false);
    });
    rotationInput.value = "";
    annotationInput.value = "";
    resetButton.classList.add("d-none");
    image.setAttribute("data-iiif-src", iiifImageAttr);
    image.setAttribute("data-src", smallImageAttr);
    $c05524284fb73718$export$aaf4e0f063a15c21(image);
};
const $c05524284fb73718$export$10b0a283df5b7616 = ()=>{
    const visibleRows = document.querySelectorAll(".entry:not(.d-none)").length;
    $c05524284fb73718$var$config.statsCountEls.forEach((el)=>{
        el.textContent = visibleRows;
    });
};
const $c05524284fb73718$export$7f4aff9b2a7a6f4f = (rowSelectorStr, dataSelectorStr, value)=>{
    const dataRow = document.querySelector(rowSelectorStr);
    const dataElem = dataRow.querySelector(dataSelectorStr);
    if (typeof value === "string") {
        if (value.length > 0) dataElem.textContent = `${value}`;
        else dataElem.textContent = "";
    } else if (typeof value === "number") dataElem.textContent = value.toString();
    else dataElem.textContent = "";
    $c05524284fb73718$export$f6c230cabcb57525(dataRow);
};
const $c05524284fb73718$export$437833b605e0a2c9 = (str)=>{
    const parser = new DOMParser();
    const decodedValue = parser.parseFromString(`<!doctype html><body>${str}`, "text/html").body.textContent;
    return decodedValue;
};
const $c05524284fb73718$export$5444a0f1902ae2a = (elems)=>{
    elems.forEach((el)=>{
        const dataInitialValue = el.getAttribute("data-initial-value");
        if (dataInitialValue !== null) {
            const defaultValue = $c05524284fb73718$export$437833b605e0a2c9(dataInitialValue);
            el.textContent = defaultValue;
        }
    });
};
const $c05524284fb73718$export$2f0b67ff18e4b205 = (button, state)=>{
    if (state) {
        button.classList.add("btn-success");
        button.classList.remove("btn-outline-secondary-subtle");
    } else {
        button.classList.add("btn-outline-secondary-subtle");
        button.classList.remove("btn-success");
    }
};
const $c05524284fb73718$export$e7f3f4207dc89804 = (container, rowSelectorStr, target)=>{
    const button = target.closest("button");
    const associatedRow = document.querySelector(rowSelectorStr);
    const fieldSelector = button.getAttribute("data-export-toggles");
    const associatedField = associatedRow.querySelector(fieldSelector);
    if (associatedField.textContent == "0") {
        associatedField.textContent = "1";
        $c05524284fb73718$export$2f0b67ff18e4b205(button, true);
    } else {
        associatedField.textContent = "0";
        $c05524284fb73718$export$2f0b67ff18e4b205(button, false);
    }
    $c05524284fb73718$export$f6c230cabcb57525(associatedRow);
    // reveal the reset buton
    $c05524284fb73718$export$b4528f10ad5ce756(container);
};
const $c05524284fb73718$export$6ef1b8364d192eee = (rowSelectorStr)=>{
    const workingRow = document.querySelector(rowSelectorStr);
    const entryIsModifiedEl = workingRow.querySelector(".entry_is_modified");
    let modifiedValue = entryIsModifiedEl.textContent;
    // Function to check if all ".iiif-element" spans have matching content and initial-state values
    const allElementsMatch = ()=>{
        const iiifElements = workingRow.querySelectorAll(".iiif-element");
        for (const element of iiifElements){
            const textContent = element.textContent;
            const initialState = element.getAttribute("data-initial-value");
            if (textContent !== initialState) return false;
        }
        return true;
    };
    if (modifiedValue === "0") entryIsModifiedEl.textContent = "1";
    else if (allElementsMatch()) entryIsModifiedEl.textContent = "0";
};
const $c05524284fb73718$export$aef68affd449292e = (container, rowSelectorStr, target)=>{
    const controlsSelector = target.getAttribute("data-export-toggles");
    const associatedRow = document.querySelector(rowSelectorStr);
    const controlsElement = associatedRow.querySelector(controlsSelector);
    let insertValue = $c05524284fb73718$export$242a2a0b03ee012e(target.value);
    if (target.value === "") controlsElement.textContent = "";
    else controlsElement.textContent = insertValue;
};
const $c05524284fb73718$export$f6c230cabcb57525 = (row)=>{
    row.classList.add("table-primary", "highlight");
    setTimeout(()=>{
        row.classList.remove("table-primary", "highlight");
    }, 2000);
};
const $c05524284fb73718$export$b4528f10ad5ce756 = (container)=>{
    const resetButton = container.querySelector('[data-reset-state="initial"]');
    resetButton.classList.remove("d-none");
};
const $c05524284fb73718$export$71590875881b540 = (rowSelectorStr)=>{
    const associatedRow = document.querySelector(rowSelectorStr);
    if (associatedRow) {
        associatedRow.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "start"
        });
        $c05524284fb73718$export$f6c230cabcb57525(associatedRow);
    }
};
const $c05524284fb73718$export$c383cdd2a518017a = (str)=>{
    return String(str).normalize("NFKD").replace(/[\u0300-\u036f]/g, "").trim().toLowerCase().replace(/[^a-z0-9 -]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
};


const $b0389e232f6b8026$export$205349702e9dbad8 = (container, rowSelectorStr, button)=>{
    const image = container.querySelector(".img-thumbnail");
    const base = image.getAttribute("data-iiif-src").split("/max/")[0];
    const currentMaxValue = image.getAttribute("data-iiif-src").split("/max/")[1];
    const insertMirrorValue = currentMaxValue.includes("!") ? "" : "!";
    const invertMaxValue = currentMaxValue.includes("!") ? currentMaxValue.replace("!", "") : `!${currentMaxValue}`;
    const newSrc = `${base}/max/${invertMaxValue}`;
    (0, $c05524284fb73718$exports.modifySrc)(image, newSrc);
    // reveal the reset buton
    (0, $c05524284fb73718$exports.revealResetButon)(container);
    (0, $c05524284fb73718$exports.modifyDataElement)(rowSelectorStr, ".entry_iiif_mirror", insertMirrorValue);
    (0, $c05524284fb73718$exports.isImageIiifModified)(rowSelectorStr);
};
const $b0389e232f6b8026$export$480ef2648a3d6e33 = (container, rowSelectorStr, button)=>{
    const image = container.querySelector(".img-thumbnail");
    const qualityList = [
        "default.jpg",
        "gray.jpg",
        "bitonal.jpg"
    ];
    const currentSrc = image.getAttribute("data-iiif-src");
    for(let i = 0; i < qualityList.length; i++)if (currentSrc.endsWith(qualityList[i])) {
        const nextIndex = (i + 1) % qualityList.length;
        const newQuality = qualityList[nextIndex];
        const newSrc = currentSrc.replace(qualityList[i], newQuality);
        (0, $c05524284fb73718$exports.modifySrc)(image, newSrc);
        // reveal the reset buton
        (0, $c05524284fb73718$exports.revealResetButon)(container);
        (0, $c05524284fb73718$exports.modifyDataElement)(rowSelectorStr, ".entry_iiif_quality", `${newQuality}`);
        (0, $c05524284fb73718$exports.isImageIiifModified)(rowSelectorStr);
        break;
    }
};
/**
* Apply rotation to an image.
*/ const $b0389e232f6b8026$var$updateRotationSrc = (image, rotation)=>{
    const path = image.getAttribute("data-iiif-src");
    const base = path.split("/max/")[0]; // Split URL
    const end = path.split("/max/")[1];
    const currentRotation = end.split("/")[0];
    const suffix = end.split("/")[1];
    const newSrc = `${base}/max/${rotation}/${suffix}`;
    (0, $c05524284fb73718$exports.modifySrc)(image, newSrc);
};
const $b0389e232f6b8026$export$bb628a54ab399bc9 = (container, rowSelectorStr, target)=>{
    const rotationInput = container.querySelector(".rotation-input");
    const image = container.querySelector(".img-thumbnail");
    const currentRotation = parseInt(rotationInput.value || 0);
    if (target === rotationInput) {
        $b0389e232f6b8026$var$updateRotationSrc(image, currentRotation);
        rotationInput.value = currentRotation;
        (0, $c05524284fb73718$exports.modifyDataElement)(rowSelectorStr, ".entry_iiif_rotation", currentRotation);
        (0, $c05524284fb73718$exports.isImageIiifModified)(rowSelectorStr);
    } else {
        const newRotation = (currentRotation + 90) % 360;
        $b0389e232f6b8026$var$updateRotationSrc(image, newRotation);
        rotationInput.value = newRotation;
        (0, $c05524284fb73718$exports.modifyDataElement)(rowSelectorStr, ".entry_iiif_rotation", newRotation);
        (0, $c05524284fb73718$exports.isImageIiifModified)(rowSelectorStr);
    }
    // reveal the reset buton
    (0, $c05524284fb73718$exports.revealResetButon)(container);
};



const $0a22ea1dd42efec1$var$config = {
    "containerSelector": ".item",
    "rowSelector": "data-csv-controls",
    "message": "Are you sure you want to leave this page? Your unsaved changes may be lost."
};
const $0a22ea1dd42efec1$export$43242bb6343d2f7e = ()=>{
    /**
   * prevent accidental data loss by prompting the user prior to
   * navigating away from the current page.
   */ if (document.body.classList.contains("check-unload")) window.addEventListener("beforeunload", function(e) {
        e.preventDefault();
        const confirmationMessage = $0a22ea1dd42efec1$var$config.message;
        e.returnValue = confirmationMessage;
        return confirmationMessage;
    });
};
const $0a22ea1dd42efec1$export$2c1b6360c48648a1 = ()=>{
    /**
   * watch for click events on the document.
   */ document.addEventListener("click", (event)=>{
        // apply actions to specific targets
        const target = event.target;
        const container = target.closest($0a22ea1dd42efec1$var$config.containerSelector);
        // no container? do nothing.
        if (!container) return;
        const rowSelectorStr = container.getAttribute($0a22ea1dd42efec1$var$config.rowSelector);
        /**
     * iiif rotation button.
     */ if (target.closest("button.rotation-button")) (0, $b0389e232f6b8026$export$bb628a54ab399bc9)(container, rowSelectorStr, target);
        /**
     * iiif mirroring button.
     */ if (target.closest("button.flip-horizontal")) (0, $b0389e232f6b8026$export$205349702e9dbad8)(container, rowSelectorStr, target);
        /**
     * iiif color quality button.
     */ if (target.closest("button[data-iiif-action]")) (0, $b0389e232f6b8026$export$480ef2648a3d6e33)(container, rowSelectorStr, target);
        /**
     * reset the state of an item and associated rows to original state
     */ if (target.closest("button[data-reset-state]")) (0, $c05524284fb73718$exports.resetState)(container, rowSelectorStr, target);
        /**
     * toggle 1/0 on row annotations
     */ if (target.closest("button.annotation-button")) (0, $c05524284fb73718$exports.toggleRowAnnotation)(container, rowSelectorStr, target);
        /**
     * toggle 1/0 on row annotations
     */ if (target.closest("button.scroll-button")) (0, $c05524284fb73718$exports.scrollToRow)(rowSelectorStr);
    });
};
const $0a22ea1dd42efec1$export$78cc4fc4130130de = ()=>{
    /**
   * watch for click events on the document.
   */ document.addEventListener("input", (event)=>{
        const target = event.target;
        const container = target.closest($0a22ea1dd42efec1$var$config.containerSelector);
        // no container? do nothing.
        if (!container) return;
        const rowSelectorStr = container.getAttribute($0a22ea1dd42efec1$var$config.rowSelector);
        if (target.classList.contains("rotation-input")) (0, $c05524284fb73718$exports.debounce)((0, $b0389e232f6b8026$export$bb628a54ab399bc9)(container, rowSelectorStr, target), 500);
        if (target.classList.contains("annotation-note")) (0, $c05524284fb73718$exports.debounce)((0, $c05524284fb73718$exports.insertRowNote)(container, rowSelectorStr, target), 500);
    });
};




class $092d54e4b9019d31$export$b25d5547354908f9 {
    constructor(){
        this.config = {
            "leafletInsertPoint": "iiif-workspace",
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
            "boundsData": null
        };
        this.selectors = {
            "iiifModal": document.querySelector("#modal-iiif-crop"),
            "inserDataButton": document.querySelector("#insert-data"),
            "colorSchemeDropdown": document.querySelector("#color-scheme-dropdown")
        };
        this.featureGroups = {
            "cropping": new L.FeatureGroup(),
            "bounding": new L.FeatureGroup()
        };
        this.colors = {
            active: "blue",
            schemes: [
                {
                    name: "blue",
                    crop: "#3388ff",
                    bounds: "#4bebdd",
                    invert: false
                },
                {
                    name: "green",
                    crop: "#34683F",
                    bounds: "#7CFF9B",
                    invert: false
                },
                {
                    name: "red",
                    crop: "#912C30",
                    bounds: "#FF4857",
                    invert: false
                },
                {
                    name: "yellow",
                    crop: "#AFA600",
                    bounds: "#FFF60F",
                    invert: false
                },
                {
                    name: "black",
                    crop: "#000000",
                    bounds: "#404040",
                    invert: false
                },
                {
                    name: "white",
                    crop: "#D9D9D9",
                    bounds: "#FFFFFF",
                    invert: true
                }
            ]
        };
        this.templates = {
            "drawBoundsButton": `<button id="bounds-button" 
                                   class="btn btn-sm btn-secondary-subtle"
                                   data-bs-toggle="tooltip"
                                   data-bs-title="Draw a labeled bounding box (Shortcut: CTRL+b)"
                                   data-bs-placement="right"
                                   data-bs-container=".leaflet-control">
                                <span class="far fa-rectangles-mixed fa-fw text-primary"
                                      aria-hidden="true"></span>
                                Bounds
                              </button>`,
            "drawCropButton": `<button id="crop-button" 
                                  class="btn btn-sm btn-secondary-subtle"
                                  data-bs-toggle="tooltip"
                                  data-bs-title="Draw a cropping box (Shortcut: CTRL+c)"
                                  data-bs-placement="right"
                                  data-bs-container=".leaflet-control">
                                <span class="far fa-crop-simple fa-fw text-primary"
                                      aria-hidden="true"></span>
                                Crop
                              </button>`,
            "popoverInput": `<div class="input-group">
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
            "makeColorSelector": (scheme)=>{
                const inverted = scheme.invert ? "bg-dark" : "";
                return `<li>
                <button class="dropdown-item btn btn-link border-0" data-color-scheme="${scheme.name}">
                  <span class="${inverted} p-1 me-1">
                    <span style="color: ${scheme.crop}" class="fas fa-square"></span>
                    <span style="color: ${scheme.bounds}" class="fas fa-square"></span>
                  </span>
                  ${scheme.name}
                </button>
            </li>`;
            }
        };
        this.rendered = null;
    }
    utils = {
        /**
     * Create additional Control placeholders
     */ addControlPlaceholders: (map)=>{
            let corners = map._controlCorners, l = "leaflet-", container = map._controlContainer;
            // Define the createCorner arrow function within the method
            const createCorner = (vSide, hSide)=>{
                const className = `${l}${vSide} ${l}${hSide}`;
                corners[vSide + hSide] = L.DomUtil.create("div", className, container);
            };
            createCorner("verticalcenter", "left");
            createCorner("verticalcenter", "right");
        },
        /**
     * genete a iiif image url with variable regions
     */ croppedImageConstructor: (region)=>{
            region = region || "full";
            return `${this.config.iiifImageBase}/${region}/max/0/default.jpg`;
        },
        /**
     * generate a comma-separated region string from bounds
     */ getIiifRegionPx: (bounds)=>{
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
            return region.join(",");
        },
        /**
     * gather all of the bounds and their labels into an array.
     */ getBoundingBoxData: ()=>{
            const data = [];
            this.featureGroups.bounding.eachLayer((layer)=>{
                const label = layer.bounds_label || "";
                const bounds = this.utils.getIiifRegionPx(layer.getBounds());
                data.push({
                    label: label,
                    bounds: bounds
                });
            });
            return data;
        },
        /**
     * create a color scheme dropdown utility for easier viewing of
     * when iiif image layer doesn't provide contrast to bounds
     */ buildColorSchemeDropdown: ()=>{
            this.colors.schemes.forEach((scheme)=>{
                const line = this.templates.makeColorSelector(scheme);
                this.selectors.colorSchemeDropdown.insertAdjacentHTML("beforeend", line);
            });
        },
        /**
     * get the current active color scheme.
     */ getActiveColorScheme: ()=>{
            const scheme = this.colors.schemes.find((scheme)=>scheme.name === this.colors.active);
            return scheme;
        },
        /**
     * set the color scheme for all bounds given a named arg.
     */ setActiveColorScheme: (schemeName)=>{
            this.colors.active = schemeName;
            this.utils.changeLayerColorScheme(this.featureGroups.bounding);
            this.utils.changeLayerColorScheme(this.featureGroups.cropping);
        },
        /**
     * modify layer colors for a feature group
     */ changeLayerColorScheme: (featureGroup)=>{
            const colorScheme = this.utils.getActiveColorScheme();
            const layers = featureGroup.getLayers();
            layers.forEach((layer)=>{
                if (layer.bounds_type === "bounds") layer.setStyle({
                    color: colorScheme.bounds
                });
                else if (layer.bounds_type === "crop") layer.setStyle({
                    color: colorScheme.crop
                });
            });
        }
    };
    /**
   * Initial leaflet "map" configuration
   */ setupRenderedIIIFImage() {
        // the base rendering of the leaflet map
        this.rendered = L.map(this.config.leafletInsertPoint, {
            attributionControl: false,
            center: [
                0,
                0
            ],
            crs: L.CRS.Simple,
            zoom: 1,
            minZoom: 1,
            maxZoom: 5
        });
        // add the featureGroup for cropping rectangle
        this.rendered.addLayer(this.featureGroups.cropping);
        this.rendered.addLayer(this.featureGroups.bounding);
        this.utils.addControlPlaceholders(this.rendered);
    }
    /**
   * Clean up the map when the display modal is hidden
   */ cleanupTasks(which) {
        // remove the cropping rectangle from the feature group
        if (which === "all") {
            this.featureGroups.cropping.clearLayers();
            this.featureGroups.bounding.clearLayers();
            this.rendered.removeControl(this.config.cropControlEditOnly);
            this.rendered.removeControl(this.config.boundsControlEditOnly);
            this.rendered.addControl(this.config.processCropTool);
        //this.config.processCropTool.addTo(this.rendered);
        } else if (which === "crop") {
            this.featureGroups.cropping.clearLayers();
            this.rendered.removeControl(this.config.cropControlEditOnly);
            //this.config.processCropTool.addTo(this.rendered);
            this.rendered.addControl(this.config.processCropTool);
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
   */ cropRenderedImage(bounds) {
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
   */ initPopover = (layer)=>{
        // popover content
        const content = this.templates.popoverInput;
        // Calculate the offset for the top-right corner
        const offsetX = layer._bounds._northEast.lng - layer._bounds._southWest.lng;
        const offsetY = layer._bounds._northEast.lat - layer._bounds._southWest.lat;
        // generate a DOM element with the content
        let popupEL = L.DomUtil.create("div", "infoWindow");
        popupEL.innerHTML = content;
        // bind the popup to the current rectangle
        layer.bindPopup(popupEL, {
            closeButton: true,
            minWidth: 300,
            maxWidth: 350,
            offset: [
                offsetX,
                -offsetY
            ]
        });
        this.handleBoundsLayerClick(layer);
        this.handlePopupOpen(layer);
        this.handleBoundsDeleteClick(layer);
        this.updateBoundsExportPath(layer);
    };
    /**
   * Events to occur when bounds control is clicked
   */ boundsControlClickHandler = ()=>{
        // set a temp var with a rectangle type: 'bounds'
        this.config.rectangleType = "bounds";
        // create a new drawing rectangle with shape options
        const rectangle = new L.Draw.Rectangle(this.rendered);
        const colorScheme = this.utils.getActiveColorScheme();
        rectangle.setOptions({
            shapeOptions: {
                color: colorScheme.bounds,
                dashArray: "6",
                weight: 3
            }
        });
        // enable the drawn rectangle.
        rectangle.enable();
    };
    /**
   * Events to occur when bounds control is clicked
   */ cropControlClickHandler = ()=>{
        // set a temp var with a rectangle type: 'bounds'
        this.config.rectangleType = "crop";
        // create a new drawing rectangle with shape options
        const rectangle = new L.Draw.Rectangle(this.rendered);
        const colorScheme = this.utils.getActiveColorScheme();
        rectangle.setOptions({
            shapeOptions: {
                color: colorScheme.crop,
                dashArray: "1",
                weight: 4
            }
        });
        // enable the drawn rectangle.
        rectangle.enable();
    };
    /**
   * Events occuring on bounds rectangle click
   */ handleBoundsLayerClick = (layer)=>{
        // open the data entry popup on click
        layer.on("click", ()=>{
            layer.openPopup();
        });
    };
    /**
   * handlers for popup text input.
   */ handleBoundsInputChange = (input, layer)=>{
        input.addEventListener("blur", (e)=>{
            // Store the entered value on the layer
            this.setCustomProperty(layer, "bounds_label", e.target.value);
            this.config.boundsData = this.utils.getBoundingBoxData();
            // update the downloadable filename with user entered value
            const button = e.target.closest(".leaflet-popup-content").querySelector(".bounds-export-button");
            // this value never changes
            const downloadFileName = button.getAttribute("data-download-name");
            // copy
            let outputname = downloadFileName;
            // prepend formated slugified input text if it exists.
            const slugifiedValue = e.target.value ? `${(0, $c05524284fb73718$exports.slugify)(e.target.value)}-` : "";
            outputname = `${slugifiedValue}${outputname}`;
            // set as the output attr.
            button.setAttribute("data-download-outputname", outputname);
        });
    };
    /**
   * actions occuring when bounds popup is opened.
   */ handlePopupOpen = (layer)=>{
        layer.on("popupopen", ()=>{
            // Find the input element in the popup content
            const popupContent = layer.getPopup().getContent();
            const input = popupContent.querySelector("input");
            // wait for the popover to be available and focus
            setTimeout(()=>{
                input.focus();
            }, 500);
            // blur listener
            this.handleBoundsInputChange(input, layer);
        });
    };
    handleBoundsDeleteClick = (layer)=>{
        const deleteButton = layer.getPopup().getContent().querySelector(".bounds-delete-button");
        deleteButton.addEventListener("click", (e)=>{
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
   */ updateBoundsExportPath = (layer)=>{
        // get the button
        const exportButton = layer.getPopup().getContent().querySelector(".bounds-export-button");
        // identify the region
        const region = this.utils.getIiifRegionPx(layer.getBounds());
        // create a new downlaodable url path
        const url = this.utils.croppedImageConstructor(region);
        // Extract the identifier (e.g., 'metapth317618') from the URL
        const identifierMatch = url.match(/\/ark:\/\d+\/([^/]+)\//);
        const identifier = identifierMatch ? identifierMatch[1] : "";
        // Split the regions string into an array of integers
        const regionArray = region.split(",").map(Number);
        // Create the download filename
        const filename = `${identifier}-region-${regionArray.join("_")}.jpg`;
        // add the content disposition arg to the URL to ensure downloads.
        const downloadURL = `${url}?response-content-disposition=attachment`;
        exportButton.setAttribute("data-download-file", downloadURL);
        exportButton.setAttribute("data-download-name", filename);
        exportButton.setAttribute("data-download-outputname", filename);
    };
    /**
   * Download an image region via fetch.
   */ async downloadImage(target) {
        try {
            const button = target.closest(".bounds-export-button");
            const downloadURL = button.getAttribute("data-download-file");
            const downloadName = button.getAttribute("data-download-outputname");
            // Use the fetch API to get the image as a Blob
            const response = await fetch(downloadURL);
            if (!response.ok) throw new Error(`Failed to fetch the image (HTTP ${response.status})`);
            const blob = await response.blob();
            // Create a blob URL with the desired file name
            const blobUrl = URL.createObjectURL(blob);
            // Create a link element to trigger the download
            const link = document.createElement("a");
            link.href = blobUrl;
            // Set the download attribute with the desired file name
            link.setAttribute("download", downloadName);
            // Simulate a click on the link to trigger the download
            link.click();
            // Clean up the blob URL after the download
            URL.revokeObjectURL(blobUrl);
            link.remove();
        } catch (error) {
            console.error("Download failed:", error);
        }
    }
    /**
   * set custom property to a leaflet layer
   */ setCustomProperty = (layer, propName, value)=>{
        if (value !== undefined) layer[propName] = value;
        else layer[propName] = "";
    };
    /**
   * Listeners
   */ addEventListeners = ()=>{
        /**
     * "hidden.bs.modal" event handler
     */ this.selectors.iiifModal.addEventListener("hidden.bs.modal", (event)=>{
            // remove the iiif image layer.
            if (this.config.iiifLayer) this.rendered.removeLayer(this.config.iiifLayer);
            // reset UX.
            this.cleanupTasks("all");
        });
        /**
     * "shown.bs.modal" event handler
     */ this.selectors.iiifModal.addEventListener("shown.bs.modal", (event)=>{
            //
            // Set various config options for the current rendering.
            //
            // Button that triggered the modal
            this.config.button = event.relatedTarget;
            // closest item
            this.config.item = this.config.button.closest(".item");
            // associated image
            this.config.img = this.config.item.querySelector("img");
            // iiif json url
            this.config.iiifInfo = this.config.img.getAttribute("data-iiif-info");
            // iiif image url
            this.config.iiifCanononicalUrl = this.config.img.getAttribute("data-canonical-iiif-src");
            // iiif url minus info.json
            this.config.iiifImageBase = this.config.iiifInfo.split("/info")[0];
            // We are in modal, so map needs size updates after "shown".
            this.rendered.invalidateSize();
            // add the base iiif image to the rendered 'map'
            this.config.iiifLayer = L.tileLayer.iiif(this.config.iiifInfo, {}).addTo(this.rendered);
        });
        /**
     * misc click handlers for dynamic inserts
     */ this.selectors.iiifModal.addEventListener("click", (event)=>{
            const target = event.target;
            /**
       * update settings for color schemes of drawn boxes
       */ if (target.closest("[data-color-scheme]")) {
                const dataScheme = target.closest("[data-color-scheme]").getAttribute("data-color-scheme");
                this.utils.setActiveColorScheme(dataScheme);
            }
            /**
       * exporting a cropped image
       */ if (target.closest(".bounds-export-button")) this.downloadImage(target);
        });
        /**
     * work is complete, insert data back to main UI and close modal
     */ this.selectors.inserDataButton.addEventListener("click", (event)=>{
            // get the iiif cropped image url
            const croppedPath = this.config.iiifCroppedUrl;
            const boundsData = this.config.boundsData;
            // container in main screen
            const container = this.config.item;
            // reset rotation input to 0
            container.querySelector(".rotation-input").value = "";
            // find and show the reset button
            (0, $c05524284fb73718$exports.revealResetButon)(container);
            // get the current modal
            const modalEl = document.querySelector("#modal-iiif-crop");
            const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
            // modify the main imag source so it shows the cropped image
            if (croppedPath) (0, $c05524284fb73718$exports.modifySrc)(this.config.img, croppedPath);
            // get the associated data row for the current image
            const coorespondingRow = container.getAttribute("data-csv-controls");
            const coorespondingRowEl = document.querySelector(coorespondingRow);
            // unset any annotations that were previously made.
            const annotationButtons = container.querySelectorAll(".annotation-button");
            annotationButtons.forEach((button)=>{
                (0, $c05524284fb73718$exports.setAnnotationButtonState)(button, false);
            });
            // reset the data row to initial state.
            const dataPoints = coorespondingRowEl.querySelectorAll("span[data-initial-value]");
            (0, $c05524284fb73718$exports.resetDataRow)(dataPoints);
            // add the iiif bounds to the row's field
            (0, $c05524284fb73718$exports.modifyDataElement)(coorespondingRow, ".entry_iiif_region", this.config.region);
            // inject any bounds data and labels to csv.
            if (boundsData) {
                const stringifiedBounds = JSON.stringify(boundsData);
                const csvSafeBounds = stringifiedBounds.replace(/"/g, '""');
                (0, $c05524284fb73718$exports.modifyDataElement)(coorespondingRow, ".entry_iiif_labeled_bounds", `${csvSafeBounds}`);
            }
            // indicate on the data row that a iiif modiciation has been made.
            (0, $c05524284fb73718$exports.isImageIiifModified)(coorespondingRow);
            // close the modal.
            modal.hide();
        });
        /**
     * On rectangle creation, draw a layer, get bounds &
     * generate new iiif url, remove 'full' drawing controls
     * to prevent more rectangles, add "edit" control.
     */ this.rendered.on(L.Draw.Event.CREATED, (e)=>{
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
                e.layer.getElement().style.pointerEvents = "none";
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
     */ this.rendered.on("draw:edited", (e)=>{
            // editing is active, get all of the layers
            const layers = e.layers;
            layers.eachLayer((layer)=>{
                if (layer.bounds_type === "bounds") // push all of the layer data into an array
                this.config.boundsData = this.utils.getBoundingBoxData();
                else if (layer.bounds_type === "crop") {
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
     */ this.rendered.on(L.Draw.Event.DELETED, (e)=>{
            const layers = e.layers;
            layers.eachLayer((layer)=>{
                const layerType = layer.bounds_type;
                if (layerType === "bounds") // there can be multiple bounds layers. do cleanup task only if there are none left.
                {
                    if (this.featureGroups.bounding.getLayers().length === 0) this.cleanupTasks("bounds");
                } else if (layerType === "crop") // there can only be a single crop layer but check to be safe.
                {
                    if (this.featureGroups.cropping.getLayers().length === 0) {
                        this.cleanupTasks("crop");
                        this.rendered.addControl(this.config.processCropTool);
                    }
                }
            });
        });
    };
    /**
   * configure leaflet edit controls
   */ leafletControls = ()=>{
        /**
     * a rectangle drawing tool for adding mutliple bounding boxes.
     */ const cropTool = L.Control.extend({
            // where it goes
            options: {
                position: "topleft"
            },
            // html dom element
            onAdd: ()=>{
                // custom control bar for the button.
                this.config.processCropControl = L.DomUtil.create("div", this.config.leafletControlBarClasses);
                //customize leaflet draw texts
                L.drawLocal.draw.handlers.rectangle.tooltip.start = "Draw a cropping box";
                // the button
                this.config.processCropControl.innerHTML = this.templates.drawCropButton;
                this.config.processCropControl.addEventListener("click", this.cropControlClickHandler);
                document.addEventListener("keydown", (event)=>{
                    // Check if CMD/CTRL key is held and the "B" key is pressed
                    if (event.ctrlKey && event.key === "c") // Execute your function here
                    this.cropControlClickHandler();
                });
                return this.config.processCropControl;
            },
            onRemove: ()=>{
            //this.config.processCropControl = null;
            //this.selectors.inserDataButton.setAttribute("data-iiif-cropped-src", this.config.iiifCanononicalUrl);
            }
        });
        /**
     * a rectangle drawing tool for adding mutliple bounding boxes.
     */ const boundsTool = L.Control.extend({
            // where it goes
            options: {
                position: "verticalcenterleft"
            },
            // html dom element
            onAdd: ()=>{
                // custom control bar for the button.
                this.config.processBoundsControl = L.DomUtil.create("div", this.config.leafletControlBarClasses);
                //customize leaflet draw texts
                L.drawLocal.draw.handlers.rectangle.tooltip.start = "Draw, then click box to label.";
                // the button
                this.config.processBoundsControl.innerHTML = this.templates.drawBoundsButton;
                this.config.processBoundsControl.addEventListener("click", this.boundsControlClickHandler);
                document.addEventListener("keydown", (event)=>{
                    // Check if CMD/CTRL key is held and the "B" key is pressed
                    if (event.ctrlKey && event.key === "b") // Execute your function here
                    this.boundsControlClickHandler();
                });
                return this.config.processBoundsControl;
            }
        });
        /**
     * edit controls, don't allow further drawing
     */ this.config.boundsControlEditOnly = new L.Control.Draw({
            edit: {
                featureGroup: this.featureGroups.bounding
            },
            draw: false,
            position: "verticalcenterleft"
        });
        /**
     * edit controls, don't allow further drawing
     */ this.config.cropControlEditOnly = new L.Control.Draw({
            edit: {
                featureGroup: this.featureGroups.cropping
            },
            draw: false,
            position: "topleft"
        });
        // add cropping tool to display
        this.config.processCropTool = new cropTool();
        this.rendered.addControl(this.config.processCropTool);
        // add bounds tool to display
        this.config.processBoundsTool = new boundsTool();
        this.rendered.addControl(this.config.processBoundsTool);
        this.utils.buildColorSchemeDropdown();
    };
}
 // end class LeafletIIIF



class $60db234c2c008520$export$cd303fea6ed83a4 {
    constructor(){
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
            "includeClasses": [
                "text-danger",
                "fa-square-xmark"
            ],
            "excludeClasses": [
                "text-success",
                "fa-square-check"
            ],
            "visualExcludeClasses": [
                "bg-danger",
                "opacity-25"
            ]
        };
    }
    /**
   * toggle the visibility of excluded items and their associated csv rows
   */ toggleVisibility = ()=>{
        const excludedItems = document.querySelectorAll(".excluded-item");
        if (this.config.toggleVisibilityState.textContent === this.config.hideText) {
            this.config.showingHiddenItems = false;
            this.config.toggleVisibilityState.textContent = this.config.showText;
            excludedItems.forEach((item)=>{
                const csvRow = item.getAttribute(this.config.csvControls);
                const csvRowEl = document.querySelector(csvRow);
                item.classList.add(this.config.hiddenClass);
                csvRowEl.classList.add(this.config.hiddenClass);
                (0, $c05524284fb73718$exports.updateVisibleRowsCount)();
            });
        } else {
            this.config.toggleVisibilityState.textContent = this.config.hideText;
            this.config.showingHiddenItems = true;
            excludedItems.forEach((item)=>{
                const csvRow = item.getAttribute(this.config.csvControls);
                const csvRowEl = document.querySelector(csvRow);
                item.classList.remove(this.config.hiddenClass);
                csvRowEl.classList.remove(this.config.hiddenClass);
                (0, $c05524284fb73718$exports.updateVisibleRowsCount)();
            });
        }
    };
    /**
  * exclude item handler
  */ excludeItem = (event)=>{
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
            closestItemFormEls.forEach((el)=>{
                el.removeAttribute("disabled");
                el.classList.remove(this.config.opacityClass);
            });
        } else {
            targetText.textContent = this.config.includeText;
            closestItem.classList.add("excluded-item");
            image.classList.add(...this.config.visualExcludeClasses);
            this.config.exclusionCount++;
            csvInclusionIndicator.classList.add(...this.config.includeClasses);
            csvInclusionIndicator.classList.remove(...this.config.excludeClasses);
            closestItemFormEls.forEach((el)=>{
                el.setAttribute("disabled", true);
                el.classList.add(this.config.opacityClass);
            });
            if (!this.config.showingHiddenItems) {
                closestItem.classList.add(this.config.hiddenClass);
                matchingCSV.classList.add(this.config.hiddenClass);
                (0, $c05524284fb73718$exports.updateVisibleRowsCount)();
            }
        }
        this.config.toggleVisibilityCount.textContent = this.config.exclusionCount;
    };
    /**
   * Listeners
   */ addEventListeners = ()=>{
        /**
     * click event handlers
     */ document.addEventListener("click", (event)=>{
            const target = event.target;
            if (target.closest(".exclude")) this.excludeItem(event);
            if (target.closest("#toggle-exclude-visibility")) this.toggleVisibility();
        });
    };
}



/**
 * a basic button to remove items.
 */ const $6e2faf9ef6bd98bb$export$8d776830dbcce823 = `<button type="button" 
                                    class="remove-clone btn btn-danger btn-sm"
                                    data-bs-toggle="tooltip"
                                    data-bs-title="remove this copied item">
                              <span class="fas fa-xmark"></span>
                            </button>`;


class $ff281a2e237e03c4$export$7563ddced79f09e4 {
    constructor(){
        this.config = {
            "includeClasses": [
                "text-danger",
                "fa-square-xmark"
            ],
            "excludeClasses": [
                "text-success",
                "fa-square-check"
            ],
            "cloneClasses": [
                "text-info",
                "fa-square-c"
            ]
        };
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
   */ /**
    * modfy features of a cloned item and return it.
    */ modifyCloneItem = (clone, randomID)=>{
        // update the id.        
        let cloneId = clone.getAttribute("id"), rowId = clone.getAttribute("data-csv-controls");
        cloneId = `${cloneId}-${randomID}`;
        rowId = `${rowId}-${randomID}`;
        clone.setAttribute("id", cloneId);
        clone.setAttribute("data-csv-controls", rowId);
        // reset the state of displayed clone to 'new'
        (0, $c05524284fb73718$exports.resetState)(clone, rowId);
        // hide the external preview link
        const topLinks = clone.querySelector(".item-top-buttons");
        const previewLink = topLinks.querySelector("a.external-preview");
        topLinks.insertAdjacentHTML("beforeend", (0, $6e2faf9ef6bd98bb$export$8d776830dbcce823));
        previewLink.classList.add("d-none");
        // update visual id.
        const visualId = clone.querySelector(".item-visual-fs-id");
        const oldContent = visualId.textContent;
        visualId.textContent = `${oldContent} (copy)`;
        const tooltip = bootstrap.Tooltip.getOrCreateInstance(visualId);
        tooltip.setContent({
            ".tooltip-inner": `Fileset # ${oldContent}, variant ${randomID}`
        });
        const duplicateButton = clone.querySelector("button.clone");
        duplicateButton.classList.add("d-none");
        return clone;
    };
    /**
     * clone a data row
     */ cloneDataRow = (rowSelector, randomID)=>{
        const row = document.querySelector(rowSelector);
        const rowClone = row.cloneNode(true);
        const rowIDValule = rowSelector.replace("#", "");
        const cloneId = `${rowIDValule}-${randomID}`;
        rowClone.setAttribute("id", cloneId);
        const clone_id = rowClone.querySelector(".entry_clone_id");
        clone_id.textContent = `${randomID}`;
        // Iterate through the span elements within the cloned element
        const dataPoints = rowClone.querySelectorAll("span[data-initial-value]");
        (0, $c05524284fb73718$exports.resetDataRow)(dataPoints);
        // insert row
        row.parentNode.insertBefore(rowClone, row.nextSibling); // Insert the cloned element after the original
        // modify icon to indicate it is a clone
        const csvInclusionIndicator = rowClone.querySelector("svg");
        csvInclusionIndicator.classList.add(...this.config.cloneClasses);
        csvInclusionIndicator.classList.remove(...this.config.excludeClasses);
        // update the count of visible rows
        (0, $c05524284fb73718$exports.updateVisibleRowsCount)();
    };
    cloneItem = (target)=>{
        const container = target.closest(".item");
        const rowSelector = container.getAttribute("data-csv-controls");
        const randomID = (0, $c05524284fb73718$exports.makeHash)();
        let clone = container.cloneNode(true);
        this.cloneDataRow(rowSelector, randomID);
        clone = this.modifyCloneItem(clone, randomID);
        container.after(clone);
    };
    removeClone = (target)=>{
        const button = target.closest("button");
        const tooltip = bootstrap.Tooltip.getOrCreateInstance(button);
        tooltip.hide();
        const container = target.closest(".item");
        container.remove();
        (0, $c05524284fb73718$exports.updateVisibleRowsCount)();
    };
    removeRow = (target)=>{
        const container = target.closest(".item");
        const rowSelector = container.getAttribute("data-csv-controls");
        const matchingRow = document.querySelector(rowSelector);
        matchingRow.remove();
        (0, $c05524284fb73718$exports.updateVisibleRowsCount)();
    };
    /**
    * Listeners
    */ addEventListeners = ()=>{
        document.addEventListener("click", (event)=>{
            // apply actions to specific targets
            const target = event.target;
            /**
             * cloning action. Make a copy of the current 'item'
             */ if (target.closest("button.clone")) this.cloneItem(target);
            /**
             * cloning action. Make a copy of the current 'item'
             */ if (target.closest("button.remove-clone")) {
                this.removeClone(target);
                this.removeRow(target);
            }
        });
    };
}


class $b31daaec168ff7f7$export$372e2d09604f52f0 {
    constructor(){
        this.config = {
            "exportData": "button.export-data",
            "exportPaths": "button.export-paths",
            "dataElement": document.querySelector("#data-export"),
            "csvData": "",
            "imgPaths": "",
            "aubreyDomain": "https://texashistory.unt.edu"
        };
    }
    /**
   * generate a csv header
   * @return {[type]} [description]
   */ createHeader = (headerItem)=>{
        const headerColumns = Array.from(headerItem.querySelectorAll("th.exportable"));
        const headerColumnsArray = headerColumns.map((column)=>`"${column.textContent.trim()}"`);
        const headerRow = headerColumnsArray.join(",");
        this.config.csvData = `${headerRow}\n`;
    };
    /**
   * populate the csv rows
   */ gatherData = (data)=>{
        // Iterate through data rows
        for(let i = 1; i < data.length; i++){
            const row = data[i];
            const columns = row.querySelectorAll('td[data-exportable="1"]');
            const rowData = [];
            // Iterate through columns in each row
            columns.forEach((column)=>{
                rowData.push(`"${column.textContent}"`);
            });
            // Join columns with a comma and add to CSV data
            this.config.csvData += rowData.join(",") + "\n";
        }
    };
    /**
   * generate a blob and init the click on a temp a link before
   * destroying it.
   */ downloadCSV = ()=>{
        const blob = new Blob([
            this.config.csvData
        ], {
            type: "text/csv"
        });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "exported-data.csv";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    };
    /**
   * gather latest data and execute the build/download of the csv file.
   */ exportCSV = ()=>{
        // get only visible list items
        const rows = this.config.dataElement.querySelectorAll("tr:not(.d-none)");
        const headerItem = rows[0];
        this.createHeader(headerItem);
        if (rows.length > 0) {
            //const [header, ...data] = rows
            this.gatherData(rows);
            this.downloadCSV();
        } else alert("no data to download");
    };
    /**
   * build image paths for each row.
   */ buildPaths = ()=>{
        const data = this.config.dataElement.querySelectorAll("tr:not(.d-none)");
        let pagePath, entryIiifRegion, entryIiifSize, entryIiifRotation, entryIiifMirror, entryIiifQuality;
        for(let i = 1; i < data.length; i++){
            const row = data[i];
            pagePath = row.querySelector("td.entry_id").textContent;
            entryIiifRegion = row.querySelector("td.entry_iiif_region").textContent;
            entryIiifSize = row.querySelector("td.entry_iiif_size").textContent;
            entryIiifRotation = row.querySelector("td.entry_iiif_rotation").textContent;
            entryIiifMirror = row.querySelector("td.entry_iiif_mirror").textContent;
            entryIiifQuality = row.querySelector("td.entry_iiif_quality").textContent;
            this.config.imgPaths += `${this.config.aubreyDomain}/iiif/ark:/67531/${pagePath}/${entryIiifRegion}/${entryIiifSize}/${entryIiifMirror}${entryIiifRotation}/${entryIiifQuality}\n`;
        }
    };
    /**
   * generate a blob and init the click on a temp a link before
   * destroying it.
   */ downloadPaths = ()=>{
        const blob = new Blob([
            this.config.imgPaths
        ], {
            type: "text/plain"
        });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "exported-paths.txt";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    };
    addEventListeners = ()=>{
        /**
     * watch for click events on the document.
     */ document.addEventListener("click", (event)=>{
            // apply actions to specific targets
            const target = event.target;
            /**
       * data export as csv
       */ if (target.closest(this.config.exportData)) this.exportCSV();
            if (target.closest(this.config.exportPaths)) {
                this.buildPaths();
                this.downloadPaths();
            }
        });
    };
}


const $dac83ab1647e9376$var$selector = new (0, $60db234c2c008520$export$cd303fea6ed83a4)();
$dac83ab1647e9376$var$selector.addEventListeners();
const $dac83ab1647e9376$var$iiifLeaflet = new (0, $092d54e4b9019d31$export$b25d5547354908f9)();
$dac83ab1647e9376$var$iiifLeaflet.setupRenderedIIIFImage();
$dac83ab1647e9376$var$iiifLeaflet.addEventListeners();
$dac83ab1647e9376$var$iiifLeaflet.leafletControls();
const $dac83ab1647e9376$var$cloneing = new (0, $ff281a2e237e03c4$export$7563ddced79f09e4)();
$dac83ab1647e9376$var$cloneing.addEventListeners();
(0, $0a22ea1dd42efec1$export$43242bb6343d2f7e)();
(0, $0a22ea1dd42efec1$export$2c1b6360c48648a1)();
(0, $0a22ea1dd42efec1$export$78cc4fc4130130de)();
const $dac83ab1647e9376$var$exportCSV = new (0, $b31daaec168ff7f7$export$372e2d09604f52f0)();
$dac83ab1647e9376$var$exportCSV.addEventListeners();


//# sourceMappingURL=main.js.map
