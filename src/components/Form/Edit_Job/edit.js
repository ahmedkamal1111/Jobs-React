 import React, { Component } from 'react';
import Axios from 'axios';
import "../form.css";
import DataTable from '../../../containers/DataTable/Datatable'

 export default class EditJob extends Component {
        constructor(props) {
            super(props)
            this.state = {
                columns: [
                    { 
                      title: 'Company Id', 
                      field: 'CID', 
                      filtering: false,
                    //   editable: 'never',  
                    },
                    { 
                      title: 'Job Id', 
                      field: 'id', 
                      filterPlaceholder: 'name',
                    //   editable: 'never',  
                    },
                    { 
                      title: 'Position', 
                      field: 'Name', 
                      filterPlaceholder: 'Date',
                    //   editable: 'never',  
                    },
                    // { 
                    //   title: 'Responsibilities', 
                    //   field: 'Respo', 
                    //   filterPlaceholder: 'Status',
                  
                    // },
                    // { 
                    //   title: 'Skills', 
                    //   field: 'Skills', 
                    //   filterPlaceholder: 'Location',
                    //   editable: true, 
                    // }
                  ],
                  data: [],
            }
        }

        componentDidMount(){
            Axios.get("https://joblaravel.tbv.cloud/showallJobs",
            {
                params:
                {
                    cid: "1",
                }
            })
            .then(response => {
                this.setState({
                    data: response.data.filter(job => job.Job_Type !== 5)
                })
            })
            
        }

        render(){
            return (
                <div className="content-form">
                    <div className="container">
                        <DataTable  columns={this.state.columns} data={this.state.data} flag={1}/>
                    </div>
                </div>
            )
        }
 }