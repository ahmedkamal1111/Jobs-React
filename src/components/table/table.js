import React from 'react';
import MaterialTable from 'material-table';

export default class SimpleTable extends React.Component {
    render() {
      return (
        <MaterialTable
          title="Custom Filtering Algorithm Preview"
          columns={[
            {
              title: 'Name', 
              field: 'name',
              customFilterAndSearch: (term, rowData) => term == rowData.name.length
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
                // customFilterAndSearch:
            }
          ]}
          data={[
            { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63, date: '20.9.2018' },
            { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34 },
          ]}
          options={{
            filtering: true
          }}
        />
      )
    }
  }