import React from 'react';
import { connect, PromiseState } from 'react-refetch';
import PropTypes from 'prop-types';
import ShortCard from './ShortCard';

const CardList = ({ usercardsFetch }) => {
    if (usercardsFetch.pending) {
        return <p className="text-center">Loading cards...</p>;
    } else if (usercardsFetch.fulfilled) {
        const cards = usercardsFetch.value;
        if (cards.length) {
            return (
                <div>
                    {cards.map(card => <ShortCard userview key={card.title} card={card} />)}
                </div>
            );
        }
    }
    return null;
};

CardList.propTypes = {
    usercardsFetch: PropTypes.instanceOf(PromiseState).isRequired,
};

export default connect(({ token }) => ({
    usercardsFetch: {
        url: '/api/v1/cards/user_cards/',
        force: true,
        headers: {
            Accept: 'application/json',
            Authorization: `Token ${token}`,
        },
    },
}))(CardList);
