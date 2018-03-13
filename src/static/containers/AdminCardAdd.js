import { cloneDeep } from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Col, Form, Icon, Input, InputNumber, Layout, Radio, Select, Spin, Switch } from 'antd';
import PropTypes from 'prop-types';

import AdminMenu from './AdminMenu';
import * as actionCreators from '../actions/cards';
import { generateForm } from '../utils/generateForm';
import { cardFields } from '../utils/forms/card';

const { Option } = Select;
const { Content, Sider } = Layout;

let linkId = 0;
let sourceId = 0;
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

    removeHelpLink = (k) => {
        const { form } = this.props;
        const helpLinkKeys = form.getFieldValue('helpLinkKeys');
        form.setFieldsValue({
            helpLinkKeys: helpLinkKeys.filter(key => key !== k),
        });
    }

    addHelpLink = () => {
        const { form } = this.props;
        const helpLinkKeys = form.getFieldValue('helpLinkKeys');
        const nextHelpLinkKeys = helpLinkKeys.concat(linkId);
        linkId += 1;
        form.setFieldsValue({
            helpLinkKeys: nextHelpLinkKeys,
        });
    }

    addSource = () => {
        const { form } = this.props;
        const sourceKeys = form.getFieldValue('sourceKeys');
        const nextSourceKeys = sourceKeys.concat(sourceId);
        sourceId += 1;
        form.setFieldsValue({
            sourceKeys: nextSourceKeys,
        });
    }

    render() {
        const { isFetchingCard, form: { getFieldValue, getFieldDecorator } } = this.props;
        getFieldDecorator('helpLinkKeys', { initialValue: [] });
        const helpLinkKeys = getFieldValue('helpLinkKeys');
        const helpLinksItems = helpLinkKeys.map(k => (
            <Form.Item>
                {getFieldDecorator(`help_links[${k}]`, {
                    validateTrigger: ['onChange', 'onBlur'],
                    rules: [{
                        required: true,
                        whitespace: true,
                        message: 'Saisissez un lien.',
                    }],
                })(<Input placeholder="Lien" />)}
                <Icon
                    className="dynamic-delete-button"
                    type="minus-circle-o"
                    onClick={() => this.removeHelpLink(k)}
                />
            </Form.Item>
        ));
        getFieldDecorator('sourceKeys', { initialValue: [] });
        const sourceKeys = getFieldValue('sourceKeys');
        const sourcesItems = sourceKeys.map(k => (
            <fieldset>
                <legend>Source n°{k}</legend>
                <Form.Item label="Nom">
                    {getFieldDecorator(`card_stats.data_sources[${k}].name`, {
                        rules: [{ required: true, message: 'Nom de la source.' }],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="Lien">
                    {getFieldDecorator(`card_stats.data_sources[${k}].link`, {
                        rules: [{ required: true, message: 'Lien vers la source.' }],
                    })(<Input />)}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator(`card_stats.data_sources[${k}].status`, {
                        initialValue: 'UNVERIFIED',
                    })(
                        <Radio.Group>
                            <Radio value="VERIFIED">Vérifiée</Radio>
                            <Radio value="UNVERIFIED">Non vérifiée</Radio>
                        </Radio.Group>
                    )}
                </Form.Item>
            </fieldset>
        ));
        let cardForm;
        const initialData = {}  // Update when we link the fetch!
        if (this.state.editing) {
            cardForm = generateForm(form, this.createCard, cardFields, initialData, 'Edit card!')
        } else {
            cardForm = generateForm(form, this.createCard, cardFields, initialData, 'Create card!')
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
    cardData: null,
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
