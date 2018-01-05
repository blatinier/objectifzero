import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import './style.scss';

import AdminMenu from '../AdminMenu';
import ShortCardView from '../Card';
import * as actionCreators from '../../actions/cards';

class AdminCardView extends React.Component {
    static defaultProps = {
        cards: []
    };

    componentWillMount() {
        const { actions, token } = this.props;
        actions.cardsFetch(token);
    }

    goToAddCard = () => {
        this.props.dispatch(push('/zw-admin/card-add'));
    }

    render() {
        const { cards, isFetching } = this.props;
        let cardsJsx;
        if (cards) {
            cardsJsx = cards.map(card => <ShortCardView admin={true} key={card.title} card={card} />);
        }
        return (
            <div className="protected">
                <AdminMenu />
                <div className="col-lg-9">
                    <a onClick={this.goToAddCard} className="btn btn-default btn-circle">
                        <i className="fa fa-plus" />
                    </a>
                    {(isFetching === true) ?
                        <p className="text-center">Loading cards...</p>
                        :
                        <div>
                            {cardsJsx}
                        </div>
                    }
                </div>
            </div>
        );
    }
}

AdminCardView.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    cards: PropTypes.arrayOf(
        PropTypes.shape({
            cost_score: PropTypes.number,
            description: PropTypes.string,
            difficulty_score: PropTypes.number,
            image: PropTypes.string,
            slug: PropTypes.string,
            title: PropTypes.string,
            waste_reduction_score: PropTypes.number
        })
    ),
    token: PropTypes.string.isRequired,
    actions: PropTypes.shape({
        cardsFetch: PropTypes.func.isRequired
    }).isRequired
};


const mapStateToProps = (state) => {
    let cards = [];
    if (state.cards) {
        cards = state.cards.cards;
    }
    return {
        token: state.auth.token,
        isFetching: state.cards.isFetchingCards,
        cards,
    };
};

const mapDispatchToProps = dispatch => ({
    dispatch,
    actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminCardView);
export { AdminCardView as AdminCardViewNotConnected };
