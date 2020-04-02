import React from 'react';

const validationComponent = (props) => {
    let msg = 'Text long enough';

    if ( props.length <= 5 ) {
        msg = 'Text Too short';
    }

    return (
        <div>
            <p>{msg}</p>
        </div>
    );
}

export default validationComponent;