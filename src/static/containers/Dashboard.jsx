import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect, PromiseState } from 'react-refetch';
import { Col, Row } from 'antd';
import { isArray } from 'lodash';

import ZeroCard from './ZeroCard';
import withRedirectOnLogout from '../utils/withRedirectOnLogout';

import './Dashboard.css';

const Dashboard = ({ usercardsFetch, refreshUserCards }) => {
    if (usercardsFetch.pending) {
        return <p className="text-center">Loading cards...</p>;
    } else if (usercardsFetch.fulfilled) {
        const cards = usercardsFetch.value;
        if (isArray(cards) && cards.length) {
            return (
                <Row>
                    <Col className="container" offset={5} span={14}>
                        <Fragment>
                            {cards.map(usercard => (
                                <ZeroCard
                                    admin={false}
                                    userview
                                    key={usercard.card.title}
                                    card={usercard.card}
                                    status={usercard.status}
                                    refreshUserCards={refreshUserCards}
                                />
                            ))}
                        </Fragment>
                    </Col>
                </Row>
            );
        }
    }
    return null;
};

Dashboard.propTypes = {
    usercardsFetch: PropTypes.instanceOf(PromiseState).isRequired,
    refreshUserCards: PropTypes.func.isRequired,
};

const usercardsFetch = token => ({
    url: '/api/v1/user_cards/',
    force: true,
    headers: {
        Accept: 'application/json',
        Authorization: `Token ${token}`,
    },
});

export default connect(({ token }) => ({
    usercardsFetch: usercardsFetch(token),
    refreshUserCards: () => ({
        usercardsFetch: {
            refreshing: true,
            ...usercardsFetch(token),
        },
    }),
}))(withRedirectOnLogout(Dashboard, { refetchFunc: 'usercardsFetch' }));
