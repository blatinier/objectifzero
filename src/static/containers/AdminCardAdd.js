import { cloneDeep } from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Col, Form, Layout, Spin } from 'antd';
import PropTypes from 'prop-types';

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

    createCard = (e) => {
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
        const { isFetchingCard, form } = this.props;
        let cardForm;
        // Update when we link the fetch!
        const initialData = {};
        if (this.state.editing) {
            cardForm = generateForm(form, this.createCard, cardFields, initialData, 'Edit card!');
        } else {
            cardForm = generateForm(form, this.createCard, cardFields, initialData, 'Create card!');
        }
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
};

const mapStateToProps = state => ({
    token: state.auth.token,
    isFetchingCard: state.cards.isFetchingCard,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch),
});

const ConnectedAdminCardAdd = connect(mapStateToProps, mapDispatchToProps)(AdminCardAdd);
export default Form.create()(ConnectedAdminCardAdd);
