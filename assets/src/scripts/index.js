import { windowListeners, clickListeners, inputListeners } from './listeners.js'
import { optInToolTips } from './utils.js';
import { IiifLeafletViewer } from './iiif-leaflet.js';
import { ItemSelector } from './items.js';
import { cloneHandlers } from './clone.js';
import { exporter } from './export.js';

const selector = new ItemSelector();
selector.addEventListeners();

const iiifLeaflet = new IiifLeafletViewer();
iiifLeaflet.setupRenderedIIIFImage();
iiifLeaflet.addEventListeners();
iiifLeaflet.leafletControls();


const cloneing = new cloneHandlers();
cloneing.addEventListeners();

windowListeners();
clickListeners();
inputListeners();

const exportCSV = new exporter();
exportCSV.addEventListeners();
