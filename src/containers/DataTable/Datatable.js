import React, { Component } from 'react';
import * as styles from './DataTable.module.css';
import MaterialTable from 'material-table';
import FileViewer from 'react-file-viewer';

class DataTable extends Component {
  
  constructor(props) {

    super(props);
    
    this.state = {
      
      selectedRow: null,
      
      selected: false,
      

      
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
            data={this.props.data}
            editable={{
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    {
                      const data = this.props.data;
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
                      let data = this.props.data;
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
                        <ul>
                          <li>Name: { rowData.name }</li>
                          <li>phone: {rowData.mobile}</li>
                        </ul>
                      </div>
                      
                      <div className={styles.cv}>  

                        <FileViewer
                          fileType={rowData.ext.replace(".","")}
                          filePath={"http://joblaravel.tbv.cloud/tt/cvs/" + rowData.offline_cv}
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