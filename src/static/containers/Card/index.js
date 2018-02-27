import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Icon, Rate } from 'antd';
import './style.scss';

import * as actionCreators from '../../actions/cards';

class ShortCardView extends Component {
    deleteCard = () => {
        const { actions, token, card } = this.props;
        actions.deleteCard(token, card.slug);
    };

    goToEditCard = () => {
        const { slug } = this.props.card;
        this.props.dispatch(push(`/zw-admin/card-edit/${slug}`));
    }

    render = () => {
        const { card, admin, userview } = this.props;
        const adminBtns = [];
        const actionBtns = [];
        const { slug } = card;
        if (admin) {
            adminBtns.push(<div key={`edit-btn-${slug}`} className="col-lg-2">
                <i className="cursor fa fa-pencil fa-2x"
                    onClick={this.goToEditCard}
                />
            </div>);
            adminBtns.push(<div key={`delete-btn-${slug}`} className="col-lg-2">
                <i className="cursor fa fa-times fa-2x"
                    onClick={this.deleteCard}
                />
            </div>);
        }
        if (userview) {
            const { status } = card;
            if (status == "NOT_STARTED" || !status) {
                actionBtns.push(<button key={`start-btn-${slug}`}
                    onClick={this.start}
                    className="btn btn-success col-lg-offset-1 col-lg-2">
                    Commencer !
                </button>);
                actionBtns.push(<button key={`not-concerned-btn-${slug}`}
                    onClick={this.notConcerned}
                    className="btn col-lg-offset-1 col-lg-2">
                    Non concerné.
                </button>);
            } else if (status == "STARTED") {
                actionBtns.push(<button key={`done-btn-${slug}`}
                    onClick={this.done}
                    className="btn btn-success col-lg-offset-1 col-lg-2">
                    Fini !
                </button>);
            } else if (status == "DONE") {
                actionBtns.push(<button key={`undone-btn-${slug}`}
                    onClick={this.undone}
                    className="btn btn-success col-lg-offset-1 col-lg-2">
                    En fait non, reprendre.
                </button>);
            } else if (status == "NOT_CONCERNED") {
                actionBtns.push(<button key={`un-not-concerned-btn-${slug}`}
                    onClick={this.unNotConcerned}
                    className="btn btn-success col-lg-offset-1 col-lg-2">
                    En fait je suis concerné.
                </button>);
            }
        }
        return (
            <div className="panel panel-default card">
                <div className="panel-body">
                    <Row>
                        <div className="pull-right">
                            {adminBtns}
                        </div>
                    </Row>
                    <Row>
                        <Col span={20}>
                            <h2>{card.title}</h2>
                            <p>{card.description}</p>
                        </Col>
                        <Col span={4}>
                            <Rate disabled defaultValue={card.waste_reduction_score} character={<Icon type="delete" />} />
                            <Rate disabled defaultValue={card.cost_score} character="€" />
                            <Rate disabled defaultValue={card.difficulty_score} character={<Icon type="tool" />} />
                        </Col>
                    </Row>
                    <Row>
                        {actionBtns}
                    </Row>
                </div>
            </div>
        );
    };
}

ShortCardView.defaultProps = {
    admin: false,
    userview: false,
    card: {
        status: "NOT_STARTED"
    }
};

ShortCardView.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(ShortCardView);
export { ShortCardView as ShortCardViewNotConnected };
