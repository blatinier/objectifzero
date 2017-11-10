import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import * as actionCreators from '../../actions/cards';

class CardListView extends React.Component {
    static propTypes = {
        isFetching: PropTypes.bool.isRequired,
        cards: PropTypes.arrayOf(
            PropTypes.shape({
                title: PropTypes.string
            })
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
        return (
            <div className="col-lg-9">
                {this.props.isFetching === true ?
                    <p className="text-center">Loading cards...</p>
                    :
                    <div>
                        <div className="margin-top-small">
                            <div className="alert alert-info">
                                <b>YAY</b>
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
        cards: state.cards,
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
