import React from 'react';
import { connect, PromiseState } from 'react-refetch';
import PropTypes from 'prop-types';
import ShortCardView from '../Card';
import { SERVER_URL } from '../../utils/config';

class CardListView extends React.Component {
    render() {
        const { usercardsFetch } = this.props;
        let body;
        if (usercardsFetch.pending) {
            body = <p className="text-center">Loading cards...</p>;
        } else if (usercardsFetch.fulfilled) {
            const cards = usercardsFetch.value;
            if (cards.length) {
                body = (
                    <div>
                        {cards.map(card => <ShortCardView userview key={card.title} card={card} />)}
                    </div>
                );
            }
        }
        return (
            <div className="col-lg-9">
                {body}
            </div>
        );
    }
}

CardListView.propTypes = {
    token: PropTypes.string.isRequired,
    usercardsFetch: PropTypes.instanceOf(PromiseState),
};

export default connect(({ token }) => ({
    usercardsFetch: {
        url: `${SERVER_URL}/api/v1/cards/user_cards/`,
        force: true,
        headers: {
            Accept: 'application/json',
            Authorization: `Token ${token}`,
        },
    },
}))(CardListView);
