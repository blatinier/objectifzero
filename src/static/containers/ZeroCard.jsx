import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Badge, Button, Card, Col, Icon, Modal, Rate, Row } from 'antd';

import { deleteCard } from '../actions/cards';
import editUserCard from '../actions/userCards';

import './ZeroCard.css';

class ZeroCard extends Component {
    state = { visible: false }

    delCard = () => {
        const { actions: { deleteCardAction }, token, card: { slug } } = this.props;
        deleteCardAction(token, slug);
    };

    goToEditCard = () => {
        const { card: { slug }, dispatch } = this.props;
        dispatch(push(`/zw-admin/card-edit/${slug}`));
    };

    changeCardStatus = (cardStatus) => {
        const {
            refreshUserCards,
            actions: { editUserCardAction },
            token,
            card: { id },
        } = this.props;
        editUserCardAction(token, id, { status: cardStatus }, refreshUserCards);
    };

    start = () => this.changeCardStatus('STARTED');
    done = () => this.changeCardStatus('DONE');
    undone = () => this.changeCardStatus('STARTED');
    stop = () => this.changeCardStatus('NOT_STARTED');
    concerned = () => this.changeCardStatus('NOT_STARTED');
    notConcerned = () => this.changeCardStatus('NOT_CONCERNED');
    see = () => this.setState({ visible: true });
    close = () => this.setState({ visible: false });

    renderCardStats = (hasStats, waste_reduction_score, co2_reduction, water_use_reduction) => hasStats ? (
        <Row>
            <h1>Statistiques</h1>
            <ul>
                { waste_reduction_score
                    ? <li key="waste_reduction_score">
                        Réduction de déchets&nbsp;: {waste_reduction_score} kg/an
                    </li>
                : null }
                { co2_reduction
                    ? <li key="co2_reduction">
                        Réduction d&apos;émissions de CO²&nbsp;: {co2_reduction} kg/an
                    </li>
                : null }
                { water_use_reduction
                    ? <li key="water_use_reduction">
                        Réduction d&apos;eau consommée&nbsp;: {water_use_reduction} l/an
                    </li>
                : null }
            </ul>
        </Row>
    ) : null;

    renderDataSources = (hasStats, data_sources) => (hasStats && data_sources) ? (
        <Row>
            <h1>Sources des données</h1>
            <ul className="data-sources">
                {data_sources.map(ds => (
                    <li key={ds.name}>
                        <Badge status={('VERIFIED' === ds.status) ? 'success' : 'warning'} />
                        <a href={ds.link}>{ds.name}</a>
                    </li>
                ))}
            </ul>
        </Row>
    ) : null;

    render = () => {
        const {
            card: {
                slug, status, title, description,
                waste_reduction_score, cost_score,
                difficulty_score, help_links,
                card_stats: {
                    co2_reduction,
                    waste_reduction,
                    water_use_reduction,
                    data_sources,
                },
            },
            admin,
            userview,
        } = this.props;
        const hasStats = (co2_reduction || water_use_reduction || waste_reduction);

        const { visible } = this.state;
        const actionBtns = [];
        if (admin) {
            actionBtns.push(<Icon type="edit" key={`edit-${slug}`} onClick={this.goToEditCard} />);
            actionBtns.push(<Icon type="delete" key={`delete-${slug}`} onClick={this.delCard} />);
        } else if (userview) {
            switch (status) {
                case 'STARTED':
                    actionBtns.push(
                        <Button key={`done-btn-${slug}`} onClick={this.done} type="primary">
                            Fini !
                        </Button>
                    );
                    actionBtns.push(
                        <Button key={`stop-btn-${slug}`} onClick={this.stop} type="danger">
                            Pause
                        </Button>
                    );
                    break;
                case 'DONE':
                    actionBtns.push(
                        <Button key={`undone-btn-${slug}`} onClick={this.undone} type="primary">
                            En fait non, reprendre.
                        </Button>
                    );
                    break;
                case 'NOT_CONCERNED':
                    actionBtns.push(
                        <Button
                            key={`concerned-btn-${slug}`}
                            onClick={this.concerned}
                            type="primary"
                        >
                            En fait je suis concerné.
                        </Button>
                    );
                    break;
                case 'NOT_STARTED':
                default:
                    actionBtns.push(
                        <Button key={`start-btn-${slug}`} onClick={this.start} type="primary">
                            Commencer !
                        </Button>
                    );
                    actionBtns.push(
                        <Button key={`not-concerned-btn-${slug}`} onClick={this.notConcerned}>
                            Non concerné.
                        </Button>
                    );
            }
        }
        actionBtns.push(<Icon type="eye-o" key={`see-${slug}`} onClick={this.see} />);
        return (
            <Col span={24} className="zerocard">
                <Card title={title} actions={actionBtns}>
                    <Col span={19}>
                        <Row>{description}</Row>
                    </Col>
                    <Col span={5}>
                        <Rate
                            disabled
                            defaultValue={waste_reduction_score}
                            character={<Icon type="delete" />}
                        />
                        <Rate disabled defaultValue={cost_score} character="€" />
                        <Rate disabled defaultValue={difficulty_score} character={<Icon type="tool" />} />
                    </Col>
                </Card>
                <Modal
                    destroyOnClose
                    visible={visible}
                    title={title}
                    width={1000}
                    onCancel={this.close}
                    footer={<Button key="back" onClick={this.close}>Fermer</Button>}
                >
                    <Row>
                        <Col span={19}>
                            {description}
                        </Col>
                        <Col span={5}>
                            <Rate
                                disabled
                                defaultValue={waste_reduction_score}
                                character={<Icon type="delete" />}
                            />
                            <Rate disabled defaultValue={cost_score} character="€" />
                            <Rate disabled defaultValue={difficulty_score} character={<Icon type="tool" />} />
                        </Col>
                        { (help_links) ? (
                            <Col span={19}>
                                <h2>Lien pour vous aider dans cet objectif</h2>
                                {help_links}
                            </Col>
                        ) : null }
                    </Row>
                    {this.renderCardStats(hasStats, waste_reduction_score, co2_reduction, water_use_reduction)}
                    {this.renderDataSources(hasStats, data_sources)}
                </Modal>
            </Col>
        );
    };
}

ZeroCard.defaultProps = {
    refreshUserCards: () => {},
};

ZeroCard.propTypes = {
    admin: PropTypes.bool.isRequired,
    userview: PropTypes.bool.isRequired,
    status: PropTypes.string,
    card: PropTypes.shape({
        slug: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        waste_reduction_score: PropTypes.number.isRequired,
        difficulty_score: PropTypes.number.isRequired,
        cost_score: PropTypes.number.isRequired,
        help_links: PropTypes.arrayOf(PropTypes.string),
        card_stats: PropTypes.shape({
            co2_reduction: PropTypes.string,
            waste_reduction: PropTypes.string,
            water_use_reduction: PropTypes.string,
            data_sources: PropTypes.arrayOf(
                PropTypes.shape({
                    name: PropTypes.string,
                    link: PropTypes.string,
                    status: PropTypes.string,
                })
            ),
        }),
    }).isRequired,
    token: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    actions: PropTypes.shape({
        deleteCardAction: PropTypes.func.isRequired,
        editUserCardAction: PropTypes.func.isRequired,
    }).isRequired,
    refreshUserCards: PropTypes.func,
};

const mapStateToProps = state => ({
    token: state.auth.token,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({
        deleteCardAction: deleteCard,
        editUserCardAction: editUserCard,
    }, dispatch),
    dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(ZeroCard);
