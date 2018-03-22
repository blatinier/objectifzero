import React, { Fragment } from 'react';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';
import { connect, PromiseState } from 'react-refetch';
import { Col, Icon, Layout, Row } from 'antd';

import AdminMenu from './AdminMenu';
import ShortCard from './ShortCard';

const { Content, Sider } = Layout;

class AdminCard extends React.Component {
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
                    <Fragment>
                        {cards.map(card => (<ShortCard admin key={card.title} card={card} />))}
                    </Fragment>
                );
            }
        }
        return (
            <Layout>
                <Sider><AdminMenu /></Sider>
                <Content>
                    <Row>
                        <a onClick={this.goToAddCard}>
                            <Icon type="plus-circle" style={{ fontSize: 30 }} />
                        </a>
                    </Row>
                    <Row>
                        <Col offset={3} span={18}>
                            {cardsJsx}
                        </Col>
                    </Row>
                </Content>
            </Layout>
        );
    }
}

AdminCard.propTypes = {
    dispatch: PropTypes.func.isRequired,
    cardsFetch: PropTypes.instanceOf(PromiseState).isRequired,
};

export default connect(({ token }) => ({
    cardsFetch: {
        url: '/api/v1/cards/list-add/',
        force: true,
        headers: {
            Accept: 'application/json',
            Authorization: `Token ${token}`,
        },
    },
}))(AdminCard);
