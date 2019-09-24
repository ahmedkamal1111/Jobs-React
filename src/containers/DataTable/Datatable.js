import React, { Component } from 'react';
import * as styles from './DataTable.module.css';
import MaterialTable from 'material-table';
import mohamed from '../../assets/Cvs/Mohamed_Ayman_Mazlom.pdf';
import FileViewer from 'react-file-viewer';

class DataTable extends Component {
  
  constructor(props) {

    super(props);
    
    this.state = {
      
      selectedRow: null,
      
      selected: false,
      
      type: 'pdf', 
      
      columns: [
        { 
          title: 'Id', 
          field: 'id', 
          filtering: false,
          editable: 'never',  
        },
        { 
          title: 'Name', 
          field: 'name', 
          filterPlaceholder: 'name',
          editable: 'never',  
        },
        { 
          title: 'Date', 
          field: 'date', 
          filterPlaceholder: 'Date',
          editable: 'never',  
        },
        { 
          title: 'Status', 
          field: 'status', 
          filterPlaceholder: 'Status',
          lookup: { 
            0: 'New', 
            1: 'Shortlisted', 
            2: 'Rejected'
          }, 
        },
        { 
          title: 'Location', 
          field: 'location', 
          filterPlaceholder: 'Location',
          editable: 'never'  
        }
      ],
      
      data: [
        { 
          id: 1,
          name: 'Mohamed',  
          date: "20-8-1987", 
          status: 1 
        },
        { 
          id: 2,
          name: 'Zerya etül',  
          date: "11-7-2017", 
          status: 2 
        },
        { 
          id: 3,
          name: 'Zer Betül', 
          surname: 'Baran', 
          date: "15-5-2017", 
          status: 2 
        },
        { 
          id: 4,
          name: 'Zery ü',  
          date: "17-8-2017", 
          status: 2 
        },
      ]
    }
  }

  render () {

    let hide = false;
    
    if ( this.state.selected ) {
      hide = true;
      console.log( this.state.selectedRow )
    } 

    return (
      
      <section className={styles.container}>
        
        <header className={styles.header}>

        </header>
        
        <main className={styles.body}>
          
          <MaterialTable
            title="Requests"
            columns={this.state.columns}
            options={{
              selection: hide,
              detailPanelProps: rowData => ({
                disabled: rowData.id !== this.state.selectedRow + 1,
                color: 'primary'
              }),
              filtering: true,
              headerStyle: {
                backgroundColor: '#ccc',
                color: '#000'
              },
              rowStyle: rowData => ({
                backgroundColor: (this.state.selected && this.state.selectedRow === rowData.tableData.id) ? '#EEE' : '#FFF',
                transition: 'background .2s ease-in'
              }),
              actionsColumnIndex: -1,
            }}
            data={this.state.data}
            editable={{
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    {
                      const data = this.state.data;
                      const index = data.indexOf(oldData);
                      data[index] = newData;
                      this.setState({ data }, () => resolve());
                    }
                    resolve()
                  }, 1000)
                }),
              onRowDelete: oldData =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    {
                      let data = this.state.data;
                      const index = data.indexOf(oldData);
                      data.splice(index, 1);
                      this.setState({ data }, () => resolve());
                    }
                    resolve()
                  }, 1000)
                }),
            }}
            detailPanel= {[
              { 
                icon: 'description',
                tooltip: 'Show CV',
                render: rowData => {
                  return (
                    <div className={styles.PDF}>
                      
                      <div className={styles.details} >
                        <h2>More details</h2>
                        <p>Name: { rowData.name }</p>
                        <p>phone: 0102952456</p>
                      </div>
                      
                      <div className={styles.cv}>  

                        <FileViewer
                          fileType={this.state.type}
                          filePath={mohamed}
                        />
                                        
                      </div>   
                    </div>
                  )
                },
              }]
            }
            onRowClick={((evt, rowData) => this.setState({ 
              selectedRow : rowData.tableData.id, 
              selected : !this.state.selected
            }))}
          />
        </main>
        
      </section>
    );
  }
}

export default DataTable;