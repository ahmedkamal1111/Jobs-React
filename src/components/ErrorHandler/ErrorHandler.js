import React, { Fragment } from 'react';

import Backdrop from '../Backdrop/Backdrop';
import Modal from '../Modal/Modal';

const errorHandler = props => (
  
  <Fragment>

    { props.error && <Backdrop onClick={ props.hanldeError } /> }
    
    {
      props.error && (
    
        <Modal
          title="An Error Occurred"
          onCancelModal={props.handleError}
          onAcceptModal={props.handleError}
          acceptEnabled
        >
        
          <p> { props.error.message } </p>
        
        </Modal>

      )
    }
  </Fragment>
);

export default errorHandler;
