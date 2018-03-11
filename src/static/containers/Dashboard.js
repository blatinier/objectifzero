import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'antd';
import Profile from './Profile';
import CardList from './CardList';

const Dashboard = ({ token }) => (
    <Row>
        <Col span={6}><Profile token={token} /></Col>
        <Col span={18}>
            <Row gutter={16}>
                <CardList token={token} />
            </Row>
        </Col>
    </Row>
);

Dashboard.propTypes = {
    token: PropTypes.string.isRequired,
};

export default Dashboard;