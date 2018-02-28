import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Icon, Rate, Col, Row, Card, Button } from 'antd';

import * as actionCreators from '../actions/cards';

class ShortCard extends Component {
    deleteCard = () => {
        const { actions: { deleteCard }, token, card: { slug } } = this.props;
        deleteCard(token, slug);
    };

    goToEditCard = () => {
        const { card: { slug }, dispatch } = this.props;
        dispatch(push(`/zw-admin/card-edit/${slug}`));
    }

    render = () => {
        const {
            card: {
                slug, status, title, description,
                waste_reduction_score, cost_score,
                difficulty_score,
            },
            admin,
            userview,
        } = this.props;
        const adminBtns = [];
        const actionBtns = [];
        if (admin) {
            adminBtns.push(<Col span={12} key={`edit-btn-${slug}`}>
                <Icon type="edit" onClick={this.goToEditCard} />
            </Col>);
            adminBtns.push(<Col span={12} key={`delete-btn-${slug}`}>
                <Icon type="delete" onClick={this.deleteCard} />
            </Col>);
        }
        if (userview) {
            switch (status) {
                case 'STARTED':
                    actionBtns.push(<Button key={`done-btn-${slug}`} onClick={this.done} type="success">
                        Fini !
                    </Button>);
                    break;
                case 'DONE':
                    actionBtns.push(<Button key={`undone-btn-${slug}`} onClick={this.undone} type="success">
                        En fait non, reprendre.
                    </Button>);
                    break;
                case 'NOT_CONCERNED':
                    actionBtns.push(
                        <Button
                            key={`un-not-concerned-btn-${slug}`}
                            onClick={this.unNotConcerned}
                            type="success"
                        >
                            En fait je suis concerné.
                        </Button>
                    );
                    break;
                case 'NOT_STARTED':
                default:
                    actionBtns.push(<Button key={`start-btn-${slug}`} onClick={this.start} type="success">
                        Commencer !
                    </Button>);
                    actionBtns.push(<Button key={`not-concerned-btn-${slug}`} onClick={this.notConcerned}>
                        Non concerné.
                    </Button>);
                    break;
            }
        }
        return (
            <Row>
                <Col span={12}>
                    <Card title={title} extra={adminBtns}>
                        <Row>
                            <Col span={18}>
                                <Row>{description}</Row>
                                <Row type="flex" justify="space-around">{actionBtns}</Row>
                            </Col>
                            <Col span={6}>
                                <Rate
                                    disabled
                                    defaultValue={waste_reduction_score}
                                    character={<Icon type="delete" />}
                                />
                                <Rate disabled defaultValue={cost_score} character="€" />
                                <Rate disabled defaultValue={difficulty_score} character={<Icon type="tool" />} />
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        );
    };
}

ShortCard.defaultProps = {
    admin: false,
    userview: false,
    card: {
        status: 'NOT_STARTED',
    }
};

ShortCard.propTypes = {
    admin: PropTypes.bool.isRequired,
    userview: PropTypes.bool.isRequired,
    card: PropTypes.shape({
        status: PropTypes.string,
        slug: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        waste_reduction_score: PropTypes.number.isRequired,
        difficulty_score: PropTypes.number.isRequired,
        cost_score: PropTypes.number.isRequired,
    }).isRequired,
    token: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    actions: PropTypes.shape({
        deleteCard: PropTypes.func.isRequired
    }).isRequired
};

const mapStateToProps = state => ({
    token: state.auth.token,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch),
    dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(ShortCard);
