import React from 'react';
import Profile from '../Profile';
import CardList from '../CardList';


const DashboardView = () => (
    <div className="protected">
        <Profile />
        <CardList />
    </div>
);

export default DashboardView;
