import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import './style.scss';

import AdminMenu from '../AdminMenu';
import ShortCardView, { ShortCardViewNotConnected } from '../Card';
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
        let myCards;
        let cardsJsx;
        if (cards) {
            myCards = cards.cards;
            if (myCards) {
                cardsJsx = myCards.map(card => <ShortCardView key={card.title} card={card} />);
            }
        }
        return (
            <div className="protected">
                <AdminMenu />
                <div className="col-lg-9">
                    <a onClick={this.goToAddCard} className="btn btn-default btn-circle">
                        <i className="fa fa-plus" />
                    </a>
                    {(isFetching === true || !myCards) ?
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
        PropTypes.instanceOf(ShortCardViewNotConnected)
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
