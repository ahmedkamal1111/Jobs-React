import React, { useState } from 'react';
import MaterialTable, { MTableToolbar, Chip, MTableFilterRow } from 'material-table';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'

export default function MaterialTableDemo() {
    const [startDate, setStartDate] = useState(new Date("2019/07/09"));
    const [endDate, setEndDate] = useState(new Date("2019/09/09"));
    const [state, setState] = React.useState({
        columns: [
            {
                title: 'Name',
                field: 'name',
                customFilterAndSearch: (term, rowData) => term === rowData.name.length,
            },
            { title: 'Surname', field: 'surname' },
            { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
            {
                title: 'Birth Place',
                field: 'birthCity',
                lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
            },
            {
                title: 'Date',
                field: 'date',
                type: 'date',

            },
            
            
                // {
                //     title: 'Start Date',
                //     field: 'start date',
                //     type: 'date',   
                // },
                // {
                //     title: 'End Date',
                //     field: 'end date',
                //     type: 'date',
                // }
            
        
            
        ],
        data: [
            { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63, date: '09.11.2019' },
            {
                name: 'Zerya Betül',
                surname: 'Baran',
                birthYear: 2017,
                birthCity: 34,
                date: '09.12.2019'
            },
            {
                name: 'Zerya Betül',
                surname: 'Baran',
                birthYear: 2017,
                birthCity: 34,
                date: '09.14.2019'
            },
        ],
    });

    return (
        <div>
        <MaterialTable
            title="Editable Example"
            columns={state.columns}
            data={state.data}
            editable={{
                onRowAdd: newData =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            const data = [...state.data];
                            data.push(newData);
                            setState({ ...state, data });
                        }, 600);
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            const data = [...state.data];
                            data[data.indexOf(oldData)] = newData;
                            setState({ ...state, data });
                        }, 600);
                    }),
                onRowDelete: oldData =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            const data = [...state.data];
                            data.splice(data.indexOf(oldData), 1);
                            setState({ ...state, data });
                        }, 600);
                    }),
            }}
            options={{
                filtering: true,
                // filterCellStyle: {
                //     backgroundColor: '#b02828'
                // }
                
            }}
            // components={{
            //     Toolbar: props => (
            //         <div style={{ padding: '0px 0px', }}>
            //             <MTableToolbar {...props} />
            //             <DatePicker
                            // selected={startDate}
                            // onChange={date => setStartDate(date)}
                            // selectsStart
                            // startDate={startDate}
                            // endDate={endDate}
                            
            //             />
            //             <DatePicker
            //                 selected={endDate}
            //                 onChange={date => setEndDate(date)}
            //                 selectsEnd
            //                 endDate={endDate}
            //                 minDate={startDate}
            //             />
                        
                        
            //         </div>
                    
            //     ),
                
                    
                
            // }}

        />
        <DatePicker 
            selected={startDate}
            onChange={date => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
         
        />

        <DatePicker
            selected={endDate}
            onChange={date => setEndDate(date)}
            selectsEnd
            endDate={endDate}
            minDate={startDate}
            
        />

        </div>
    );
}
