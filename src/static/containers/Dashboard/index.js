import React from 'react';
import PropTypes from 'prop-types';
import Profile from '../Profile';
import CardList from '../CardList';


class DashboardView extends React.Component {
    render() {
        const { token } = this.props;
        return (
            <div className="protected">
                <Profile token={token} />
                <CardList token={token} />
            </div>
        );
    }
};

DashboardView.propTypes = {
    token: PropTypes.string.isRequired,
};

export default DashboardView;
