import { cloneDeep } from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Col, Form, Layout, Spin } from 'antd';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import AdminMenu from './AdminMenu';
import * as actionCreators from '../actions/cards';
import { generateForm } from '../utils/generateForm';
import { cardFields } from '../utils/forms/card';

const { Content, Sider } = Layout;

class AdminCardAdd extends Component {
    state = {
        editing: false,
    };

    componentWillMount = () => {
        const {
            actions: { cardFetch },
            match: { params: { slug } },
            token,
        } = this.props;
        if (slug) {
            cardFetch(token, slug);
        }
    };

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.match.params.slug) {
            this.setState({
                editing: true,
            });
        }
    };

    validateCard = (e) => {
        e.preventDefault();
        const {
            token,
            form: { validateFields },
            actions: { editCard, createCard },
        } = this.props;
        validateFields((err, values) => {
            if (err) {
                return;
            }
            const clonedValues = cloneDeep(values);
            if (clonedValues.help_links) {
                clonedValues.help_links = clonedValues.help_links.join('\n');
            } else {
                clonedValues.help_links = '';
            }
            if (this.state.editing) {
                const { slug } = this.props.match.params;
                editCard(token, slug, clonedValues);
            } else {
                createCard(token, clonedValues);
            }
        });
    };

    saveFormRef = (form) => {
        this.form = form;
    }

    render() {
        const { isFetchingCard, form, cardData } = this.props;
        let cardForm;
        const initialData = {
            title: get(cardData, 'title', ''),
            description: get(cardData, 'description', ''),
            waste_reduction_score: get(cardData, 'waste_reduction_score'),
            difficulty_score: get(cardData, 'difficulty_score'),
            cost_score: get(cardData, 'cost_score'),
            published: get(cardData, 'published', false),
            help_links: get(cardData, 'help_links', []),
            card_stats: {
                waste_reduction: get(cardData, 'card_stats.waste_reduction'),
                water_use_reduction: get(cardData, 'card_stats.water_use_reduction'),
                year: get(cardData, 'card_stats.year'),
                status: get(cardData, 'card_stats.status'),
                data_sources: get(cardData, 'data_sources', []),
            },
        };
        cardForm = generateForm(form, this.validateCard, cardFields, initialData, this.state.editing ? 'Edit card!' : 'Create card!');
        return (
            <Layout>
                <Sider>
                    <AdminMenu />
                </Sider>
                <Content>
                    {(isFetchingCard === true) ?
                        <div className="text-center">
                            <Spin size="large" />
                            Loading card to edit...
                        </div>
                        :
                        <Col span={12} offset={6}>
                            {cardForm}
                        </Col>
                    }
                </Content>
            </Layout>
        );
    }
}

AdminCardAdd.defaultProps = {
    match: null,
};

AdminCardAdd.propTypes = {
    token: PropTypes.string.isRequired,
    isFetchingCard: PropTypes.bool.isRequired,
    form: PropTypes.shape().isRequired,
    match: PropTypes.shape({
        params: PropTypes.shape({
            slug: PropTypes.string,
        }),
    }),
    actions: PropTypes.shape({
        createCard: PropTypes.func.isRequired,
        editCard: PropTypes.func.isRequired,
        cardFetch: PropTypes.func.isRequired,
    }).isRequired,
    cardData: PropTypes.shape({}),
};

const mapStateToProps = state => ({
    token: state.auth.token,
    isFetchingCard: state.cards.isFetchingCard,
    cardData: state.cards.current_card,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch),
});

const ConnectedAdminCardAdd = connect(mapStateToProps, mapDispatchToProps)(AdminCardAdd);
export default Form.create()(ConnectedAdminCardAdd);
