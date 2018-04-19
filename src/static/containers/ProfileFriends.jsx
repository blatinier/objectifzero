import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect as reduxConnect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { connect, PromiseState } from 'react-refetch';
import { Row, Col, Spin, Icon, Card, Button } from 'antd';

import withRedirectOnLogout from '../utils/withRedirectOnLogout';
import * as actionCreators from '../actions/users';

class Friends extends Component {
    goToAddFriend = () => {
        this.props.dispatch(push('/profile/friends-add'));
    };

    removeFriend = friendId => () => {
        const {
            token,
            actions: { removeFriend },
        } = this.props;
        removeFriend(token, friendId);
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
            const friends = friendsFetch.value;
            friendsDisplay = friends.map(friend => (
                <Card key={friend.id}>
                    <Row>
                        <Col span={18} offset={2}>
                            {friend.username}
                        </Col>
                        <Col span={2}>
                            <Button type="danger" onClick={this.removeFriend(friend.id)}>
                                Supprimer
                            </Button>
                        </Col>
                    </Row>
                </Card>
            ));
        }

        return (
            <Fragment>
                <Row>
                    <a onClick={this.goToAddFriend}>
                        <Icon type="plus-circle" style={{ fontSize: 30 }} />
                    </a>
                </Row>
                <Row>
                    <Col className="container" offset={5} span={14}>
                        {friendsDisplay}
                    </Col>
                </Row>
            </Fragment>
        );
    };
}

Friends.propTypes = {
    dispatch: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired,
    friendsFetch: PropTypes.instanceOf(PromiseState).isRequired,
    actions: PropTypes.shape({
        removeFriend: PropTypes.func.isRequired,
    }).isRequired,
};

const mapStateToProps = state => ({
    token: state.auth.token,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch),
});

const ConnectedFriends = reduxConnect(mapStateToProps, mapDispatchToProps)(Friends);

export default connect(({ token }) => ({
    friendsFetch: {
        url: '/api/v1/users/list_friends/',
        force: true,
        headers: {
            Accept: 'application/json',
            Authorization: `Token ${token}`,
        },
    },
}))(withRedirectOnLogout(ConnectedFriends, { refetchFunc: 'friendsFetch' }));
