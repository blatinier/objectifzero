import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import './style.scss';

import AdminMenu from '../AdminMenu';
import ShortCardView from '../Card';
import ShortCardViewNotConnected from '../Card';
import * as actionCreators from '../../actions/cards';

class AdminCardView extends React.Component {
    static propTypes = {
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

    static defaultProps = {
        cards: []
    };

    componentWillMount() {
        const token = this.props.token;
        this.props.actions.cardsFetch(token);
    }

    goToAddCard = () => {
        this.props.dispatch(push('/zw-admin/card-add'));
    }

    render() {
        var cards = null;
        if (this.props.cards) {
            cards = this.props.cards.cards;
            var cards_jsx = null;
            if (cards) {
                cards_jsx = cards.map(card => <ShortCardView key={card.title} card={card} />);
            }
        }
        return (
            <div className="protected">
                <AdminMenu />
                <div className="col-lg-9">
                    <a onClick={this.goToAddCard} className="btn btn-default btn-circle"><i className="fa fa-plus"></i></a>
                    {(this.props.isFetching === true || cards === null) ?
                        <p className="text-center">Loading cards...</p>
                        :
                        <div>
                            {cards_jsx}
                        </div>
                    }
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    let cards = Array();
    if (state.cards) {
        cards = state.cards.cards;
    }
    return {
        token: state.auth.token,
        cards: cards,
        isFetching: state.cards.isFetchingCards,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: dispatch,
        actions: bindActionCreators(actionCreators, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminCardView);
export { AdminCardView as AdminCardViewNotConnected };
