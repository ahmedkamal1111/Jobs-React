import React, { Component, Fragment } from 'react';
import * as styles from './DataTable.module.css';
import MaterialTable from 'material-table';
import FileViewer from 'react-file-viewer';

class DataTable extends Component {
  
  constructor(props) {

    super(props);
    
    this.state = {
      
      selectedRow: null,
      
      selected: false,

      viewCv: false,
      viewJobDetails:false,
    }
  }
  componentDidMount(){
    if(this.props.flag === 0){
      this.setState(prevState => ({
        ...prevState,
        viewCv: true,
      }))
    }
    if(this.props.flag === 1) {
      this.setState(prevState => ({
        ...prevState,
        viewJobDetails: true,
      }))
    }
  }

  render () {
  
    let hide = false;
    if ( this.state.selected ) {
      hide = true;
      
    } 

    return (
      
      <section className={styles.container}>
        
        <header className={styles.header}>

        </header>
        
        <main className={styles.body}>
          
          <MaterialTable
            title="Requests"
            columns={this.props.columns}
            options={{
              
              selection: hide,
              detailPanelProps: rowData => ({
                disabled: rowData.id !== this.state.selectedRow + 1,
                color: 'primary'
              }),
              filtering: true,
              headerStyle: {
                backgroundColor: '#ccc',
                color: '#000',
                paddingLeft: 15,
              },
              rowStyle: rowData => ({
                backgroundColor: (this.state.selected && this.state.selectedRow === rowData.tableData.id) ? '#EEE' : '#FFF',
                transition: 'background .2s ease-in',
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
           
            detailPanel= {this.state.viewCv ? 
              [
              
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
                        {
                          rowData.offline_cv && rowData.ext ?
                          <FileViewer
                            fileType={rowData.ext ? rowData.ext.replace(".",""): "pdf"}
                            filePath={"https://joblaravel.tbv.cloud/tt/cvs/" + rowData.offline_cv}
                          />:
                          <div className="alert alert-danger feedback" role="alert">
                              CV not found
                          </div>
                        }
                                      
                      </div>   
                    </div>
                  )
                },
              }] : this.state.viewJobDetails ? [
                {
                  // icon: 'description',
                  tooltip: 'Show Job Details',
                  isEditable: true,
                  render: rowData => {
                    return (
                      <Fragment>
                        <h1>Responsibilities</h1>
                        <p>{rowData.Respo}</p>
                        <h3>Skills</h3>
                        <p>{rowData.Skills}</p>
                      </Fragment>
                      
                    )
                  }
                }
              ] : null
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