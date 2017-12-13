import React from 'react';
import PropTypes from 'prop-types';

class AdminMenu extends React.Component {
    static propTypes = {
        action: PropTypes.func.isRequired,
        className: PropTypes.string,
    };

    render() {
        return (
            <div className="col-lg-3">
            </div>
        );
    }
}

export default AdminMenu;
