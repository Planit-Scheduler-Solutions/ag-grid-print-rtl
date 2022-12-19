import { ColDef, GetRowIdParams, GridApi, GridReadyEvent } from '@ag-grid-community/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-print-list',
  templateUrl: './print-list.component.html',
  styleUrls: ['./print-list.component.scss'],
  styles:[]
})
export class PrintListComponent implements OnInit {

  defaultColDef: ColDef | undefined;
  columnDefs: ColDef[] | undefined;


  gridApi: GridApi | undefined;
  constructor() { }

  ngOnInit(): void {
    this.defaultColDef = this.getDefaulteColDef();
    this.columnDefs = this.createColumns();

    window.onafterprint = () => {
      const eGridDiv = document.querySelector('.list-print') as HTMLElement;
      eGridDiv.style.height = '100%';
      eGridDiv.style.width = '100%';
      this.gridApi?.setDomLayout();
    };
  }

  private getDefaulteColDef(): ColDef {
    return {
      sortable: true,
      resizable: true,
      editable: true
    };
  }

  private createColumns(): ColDef[] {
    const columns: ColDef[] = [];
    columns.push({
      colId: 'id',
      headerName: 'Id',
      field: 'id',
      width: 80
    });
    for (let i = 0; i <= 30; i++) {
      columns.push({
        colId: `column-${i + 1}`,
        headerName: `Column-${i + 1}`,
        field: `column-${i + 1}`,
        width: Math.random() * (200 - 80) + 80
      });
    }
    return columns;
  }

  getRowNodeId = (params: GetRowIdParams) => {
    return params.data['id'];
  };

  gridReady(params: GridReadyEvent) {

    this.gridApi = params.api;
    const rows = this.getRows();
    params.api.setRowData(rows);
  }


  getRows(): any[] {
    const rows = [];
    // rows
    for (let i = 0; i < 200; i++) {
      // properties
      const row: { [key: string]: any } = {};
      row['id'] = i + 1;
      for (let j = 0; j <= 30; j++) {
        row[`column-${j + 1}`] = `row${i + 1}-column${j + 1}`;
      }
      rows.push(row);
    }
    return rows;
  }

  printList() {

    const eGridDiv = document.querySelector('.list-print') as HTMLElement;
    eGridDiv.style.height = '';
    eGridDiv.style.width = '';
    this.gridApi?.setDomLayout('print');

    // By ag-grid takes 2 seconds to change the DomLayout.
    setTimeout(() => {
      window.print();
    }, 2000);
  }

}

