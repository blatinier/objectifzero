import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import './style.scss';

import AdminMenu from '../AdminMenu';
import * as actionCreators from '../../actions/cards';

class AdminCardAddView extends React.Component {
    static propTypes = {
        actions: PropTypes.shape({
            cardsFetch: PropTypes.func.isRequired
        }).isRequired
    };

    render() {
        const { cards } = this.props;
        return (
            <div className="protected">
                <AdminMenu />
                <div className="col-lg-9">
                FORM ! YAY !
                </div>
            </div>
        );
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actionCreators, dispatch)
    };
};

export default connect(mapDispatchToProps)(AdminCardAddView);
export { AdminCardAddView as AdminCardAddViewNotConnected };
