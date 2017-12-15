import React from 'react';
import PropTypes from 'prop-types';

class AdminMenu extends React.Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        className: PropTypes.string,
    };

    render() {
        return (
            <div className="col-lg-3">
                <div className="col-lg-12">
                    Users
                </div>
                <div className="col-lg-12">
                    Cards
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch
    };
};
export default AdminMenu;
