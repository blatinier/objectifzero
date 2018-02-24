import React from 'react';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';
import './style.scss';
import { connect, PromiseState } from 'react-refetch';

import AdminMenu from '../AdminMenu';
import ShortCardView from '../Card';
import { SERVER_URL } from '../../utils/config';

class AdminCardView extends React.Component {
    goToAddCard = () => {
        this.props.dispatch(push('/zw-admin/card-add'));
    }

    render() {
        const { cardsFetch } = this.props;
        let cardsJsx;
        if (cardsFetch.pending) {
            cardsJsx = <p className="text-center">Loading cards...</p>;
        } else if (cardsFetch.fulfilled) {
            const cards = cardsFetch.value.results;
            if (cards.length) {
                cardsJsx = (
                    <div>
                        {cards.map((card) => <ShortCardView admin key={card.title} card={card} />)}
                    </div>
                );
            }
        }
        return (
            <div className="protected">
                <AdminMenu />
                <div className="col-lg-9">
                    <a onClick={this.goToAddCard} className="btn btn-default btn-circle">
                        <i className="fa fa-plus" />
                    </a>
                    {cardsJsx}
                </div>
            </div>
        );
    }
}

AdminCardView.propTypes = {
    dispatch: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired,
    cardsFetch: PropTypes.instanceOf(PromiseState),
};

export default connect(({ token }) => ({
    cardsFetch: {
        url: `${SERVER_URL}/api/v1/cards/list-add/`,
        force: true,
        headers: {
            Accept: 'application/json',
            Authorization: `Token ${token}`,
        },
    },
}))(AdminCardView);
