import React from 'react';
import { connect } from 'react-redux';
import Profile from '../Profile';
import CardList from '../CardList';

class DashboardView extends React.Component {
    render() {
        return (
            <div className="protected">
                <div className="container">
                    <Profile></Profile>
                    <CardList></CardList>
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
    };
};

export default connect(mapStateToProps)(DashboardView);
export { DashboardView as DashboardViewNotConnected };
