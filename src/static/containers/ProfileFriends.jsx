import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';
import { connect, PromiseState } from 'react-refetch';
import { Row, Col, Spin, Icon } from 'antd';

import withRedirectOnLogout from '../utils/withRedirectOnLogout';

class Friends extends Component {
    goToAddFriend = () => {
        this.props.dispatch(push('/profile/friends-add'));
    };

    render = () => {
        const { friendsFetch } = this.props;
        let friendsDisplay;
        if (friendsFetch.pending) {
            friendsDisplay = (
                <Fragment>
                    <Spin size="large" />
                    Loading friends...
                </Fragment>
            );
        } else if (friendsFetch.fulfilled) {
            console.log('### FRIENDS ', friendsFetch.value);
            friendsDisplay ="FRIENDS LIST ";
        }

        return (
            <Fragment>
                <Row>
                    <a onClick={this.goToAddFriend}>
                        <Icon type="plus-circle" style={{ fontSize: 30 }} />
                    </a>
                </Row>
                <Row>
                    <Col>{friendsDisplay}</Col>
                </Row>
            </Fragment>
        );
    };
}

Friends.propTypes = {
    dispatch: PropTypes.func.isRequired,
    friendsFetch: PropTypes.instanceOf(PromiseState).isRequired,
};

export default connect(({ token }) => ({
    friendsFetch: {
        url: '/api/v1/users/list_friends/',
        force: true,
        headers: {
            Accept: 'application/json',
            Authorization: `Token ${token}`,
        },
    },
}))(withRedirectOnLogout(Friends, { refetchFunc: 'friendsFetch' }));
