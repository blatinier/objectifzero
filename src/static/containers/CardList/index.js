import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import ShortCardView from '../Card';
import * as actionCreators from '../../actions/cards';

class CardListView extends React.Component {
    static propTypes = {
        isFetching: PropTypes.bool.isRequired,
        cards: PropTypes.arrayOf(
            PropTypes.instanceOf(ShortCardView)
        ),
        token: PropTypes.string.isRequired,
        actions: PropTypes.shape({
            usercardsFetch: PropTypes.func.isRequired
        }).isRequired
    };

    static defaultProps = {
        cards: []
    };

    componentWillMount() {
        const token = this.props.token;
        this.props.actions.usercardsFetch(token);
    }

    render() {
        const { cards } = this.props;
        return (
            <div className="col-lg-9">
                {(this.props.isFetching === true || cards === null) ?
                    <p className="text-center">Loading cards...</p>
                    :
                    <div>
                        {cards.map(card => <ShortCardView card={card} />)}
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    let cards = {};
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
        actions: bindActionCreators(actionCreators, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardListView);
export { CardListView as CardListViewNotConnected };