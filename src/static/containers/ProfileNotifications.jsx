import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect as reduxConnect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { connect, PromiseState } from 'react-refetch';
import { Spin, Card, Button, Row, Col } from 'antd';

import withRedirectOnLogout from '../utils/withRedirectOnLogout';
import * as actionCreators from '../actions/notifications';

class ProfileNotifications extends Component {
    acceptNotification = slug => () => {
        const {
            token,
            actions: { acceptFriendNotification },
        } = this.props;
        acceptFriendNotification(token, slug);
    };

    rejectNotification = slug => () => {
        const {
            token,
            actions: { rejectFriendNotification },
        } = this.props;
        rejectFriendNotification(token, slug);
    };

    render = () => {
        const { notificationsFetch } = this.props;
        let notificationsDisplay;
        if (notificationsFetch.pending) {
            notificationsDisplay = (
                <Fragment>
                    <Spin size="large" />
                    Récupération des notifications...
                </Fragment>
            );
        } else if (notificationsFetch.fulfilled) {
            const notifications = notificationsFetch.value.results;
            console.log('### NOTIFICATIONS ', notifications);
            notificationsDisplay = notifications.map(
                notif => (
                    <Card key={notif.slug}>
                        <Row>
                            <Col span={16} offset={2}>
                                {notif.created_by.username}
                            </Col>
                            <Col span={2}>
                                <Button type="primary" onClick={this.acceptNotification(notif.slug)}> Accepter </Button>
                            </Col>
                            <Col span={2} offset={1}>
                                <Button type="dashed" onClick={this.rejectNotification(notif.slug)}> Rejeter </Button>
                            </Col>
                        </Row>
                    </Card>
                ));
        }

        return (
            <Row>
                <Col className="container" offset={5} span={14}>
                    <h1>Requête d'amis</h1>
                    {notificationsDisplay}
                </Col>
            </Row>
        );
   };
}

ProfileNotifications.propTypes = {
    dispatch: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired,
    notificationsFetch: PropTypes.instanceOf(PromiseState).isRequired,
    actions: PropTypes.shape({
        acceptFriendNotification: PropTypes.func.isRequired,
        rejectFriendNotification: PropTypes.func.isRequired,
    }),
};

const mapStateToProps = state => ({
    token: state.auth.token,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch),
});

const ConnectedProfileNotifications = reduxConnect(mapStateToProps, mapDispatchToProps)(ProfileNotifications);

export default connect(({ token }) => ({
    notificationsFetch: {
        url: '/api/v1/notifications/list-add/',
        force: true,
        headers: {
            Accept: 'application/json',
            Authorization: `Token ${token}`,
        },
    },
}))(withRedirectOnLogout(ConnectedProfileNotifications, { refetchFunc: 'notificationsFetch' }));
