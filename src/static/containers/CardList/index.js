import React from 'react';
import { connect, PromiseState } from 'react-refetch';
import PropTypes from 'prop-types';
import { Col } from 'antd';
import ShortCardView from '../Card';

const CardListView = ({ usercardsFetch }) => {
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
    return (<Col lg={18}>{body}</Col>);
}

CardListView.propTypes = {
    token: PropTypes.string.isRequired,
    usercardsFetch: PropTypes.instanceOf(PromiseState),
};

export default connect(({ token }) => ({
    usercardsFetch: {
        url: `/api/v1/cards/user_cards/`,
        force: true,
        headers: {
            Accept: 'application/json',
            Authorization: `Token ${token}`,
        },
    },
}))(CardListView);
