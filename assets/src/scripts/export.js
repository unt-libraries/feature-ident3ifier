export class exporter {
  constructor() {
    this.config = {
      "exportData": "button.export-data",
      "exportPaths": "button.export-paths",
      "dataElement": document.querySelector("#data-export"),
      "csvData": "",
      "imgPaths": "",
      "aubreyDomain" : "https://texashistory.unt.edu",
    }
  }

  /**
   * generate a csv header
   * @return {[type]} [description]
   */
  createHeader = (headerItem) => {
    const headerColumns = Array.from(headerItem.querySelectorAll("th.exportable"));
    const headerColumnsArray = headerColumns.map((column) => `"${column.textContent.trim()}"`);
    const headerRow = headerColumnsArray.join(',');
    this.config.csvData = `${headerRow}\n`;
  };

  /**
   * populate the csv rows
   */
  gatherData = (data) => {

    // Iterate through data rows
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      const columns = row.querySelectorAll('td[data-exportable="1"]');
      const rowData = [];
      // Iterate through columns in each row
      columns.forEach((column) => {
        rowData.push(`"${column.textContent}"`);
      });
      // Join columns with a comma and add to CSV data
      this.config.csvData += rowData.join(',') + '\n';
    }
  };


  /**
   * generate a blob and init the click on a temp a link before
   * destroying it.
   */
  downloadCSV = () => {
    const blob = new Blob([this.config.csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'exported-data.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

  /**
   * gather latest data and execute the build/download of the csv file.
   */
  exportCSV = () => {
    // get only visible list items
    const rows = this.config.dataElement.querySelectorAll("tr:not(.d-none)");
    const headerItem = rows[0];
    this.createHeader(headerItem);
    if (rows.length > 0) {
      //const [header, ...data] = rows
      this.gatherData(rows);
      this.downloadCSV();
    } else {
      alert("no data to download");
    }
  };

  /**
   * build image paths for each row.
   */
  buildPaths = () => {
    const data = this.config.dataElement.querySelectorAll("tr:not(.d-none)");
    let pagePath,
        entryIiifRegion,
        entryIiifSize,
        entryIiifRotation,
        entryIiifMirror,
        entryIiifQuality;
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      pagePath = row.querySelector('td.entry_id').textContent;
      entryIiifRegion = row.querySelector('td.entry_iiif_region').textContent;
      entryIiifSize = row.querySelector('td.entry_iiif_size').textContent;
      entryIiifRotation = row.querySelector('td.entry_iiif_rotation').textContent;
      entryIiifMirror = row.querySelector('td.entry_iiif_mirror').textContent;
      entryIiifQuality = row.querySelector('td.entry_iiif_quality').textContent;
      this.config.imgPaths += `${this.config.aubreyDomain}/iiif/ark:/67531/${pagePath}/${entryIiifRegion}/${entryIiifSize}/${entryIiifMirror}${entryIiifRotation}/${entryIiifQuality}\n`;
    }
  };

  /**
   * generate a blob and init the click on a temp a link before
   * destroying it.
   */
  downloadPaths = () => {
    const blob = new Blob([this.config.imgPaths], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'exported-paths.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }


  addEventListeners = () => {
    /**
     * watch for click events on the document.
     */
    document.addEventListener('click', (event) => {
      // apply actions to specific targets
      const target = event.target;
      /**
       * data export as csv
       */
      if (target.closest(this.config.exportData)) {
        this.exportCSV();
      }   
      if (target.closest(this.config.exportPaths)) {
        this.buildPaths();
        this.downloadPaths();
      }  
    });
  };
}
