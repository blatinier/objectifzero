import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Col, Form, Icon, Input, InputNumber, Layout, Radio, Select, Spin, Switch } from 'antd';
import PropTypes from 'prop-types';

import AdminMenu from './AdminMenu';
import * as actionCreators from '../actions/cards';

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
            if (values.help_links) {
                values.help_links = values.help_links.join('\n');
            } else {
                values.help_links = '';
            }
            if (this.state.editing) {
                const { slug } = this.props.match.params;
                editCard(token, slug, values);
            } else {
                createCard(token, values);
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
        linkId++;
        form.setFieldsValue({
            helpLinkKeys: nextHelpLinkKeys,
        });
    }

    addSource = () => {
        const { form } = this.props;
        const sourceKeys = form.getFieldValue('sourceKeys');
        const nextSourceKeys = sourceKeys.concat(sourceId);
        sourceId++;
        form.setFieldsValue({
            sourceKeys: nextSourceKeys,
        });
    }

    render() {
        const { isFetchingCard, form: { getFieldValue, getFieldDecorator } } = this.props;
        getFieldDecorator('helpLinkKeys', { initialValue: [] });
        const helpLinkKeys = getFieldValue('helpLinkKeys');
        const helpLinksItems = helpLinkKeys.map((k, index) => (
            <Form.Item>
                {getFieldDecorator(`help_links[${k}]`, {
                    validateTrigger: ['onChange', 'onBlur'],
                    rules: [{
                        required: true,
                        whitespace: true,
                        message: 'Saisissez un lien.',
                    }],
                })(<Input placeholder="Lien" />)}
                <Icon className="dynamic-delete-button"
                    type="minus-circle-o"
                    onClick={() => this.removeHelpLink(k)}
                />
            </Form.Item>
        ));
        getFieldDecorator('sourceKeys', { initialValue: [] });
        const sourceKeys = getFieldValue('sourceKeys');
        const sourcesItems = sourceKeys.map((k, index) => (
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
                    })(<Radio.Group>
                        <Radio value="VERIFIED">Vérifiée</Radio>
                        <Radio value="UNVERIFIED">Non vérifiée</Radio>
                       </Radio.Group>)}
                </Form.Item>
            </fieldset>
        ));
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
                            <Form onSubmit={this.createCard}>
                                <fieldset>
                                    <legend>Carte</legend>
                                    <Form.Item label="Titre">
                                        {getFieldDecorator('title', {
                                            rules: [{ required: true, message: 'Saisissez un titre' }],
                                        })(<Input placeholder="Titre" />)}
                                    </Form.Item>
                                    <Form.Item label="Description">
                                        {getFieldDecorator('description', {
                                            rules: [{ required: true, message: 'Saisissez une description' }],
                                        })(<Input type="textarea" rows={4} placeholder="Description" />)}
                                    </Form.Item>
                                    <Form.Item label="Score de réduction des déchets">
                                        {getFieldDecorator('waste_reduction_score', {
                                            rules: [{ required: true, message: 'Score de réduction des déchets' }],
                                        })(<InputNumber min={0} max={10} />)}
                                    </Form.Item>
                                    <Form.Item label="Score de difficulté">
                                        {getFieldDecorator('difficulty_score', {
                                            rules: [{ required: true, message: 'Score de difficulté' }],
                                        })(<InputNumber min={0} max={10} />)}
                                    </Form.Item>
                                    <Form.Item label="Score de coût">
                                        {getFieldDecorator('cost_score', {
                                            rules: [{ required: true, message: 'Score de coût' }],
                                        })(<InputNumber min={0} max={10} />)}
                                    </Form.Item>
                                    <Form.Item label="Published">
                                        {getFieldDecorator('published', {
                                            valuePropName: 'checked',
                                            initialValue: false,
                                        })(<Switch />)}
                                    </Form.Item>
                                    {helpLinksItems}
                                    <Form.Item label="Liens d'aide">
                                        <Button type="dashed" onClick={this.addHelpLink}>
                                            <Icon type="plus" /> Ajouter un lien d&apos;aide
                                        </Button>
                                    </Form.Item>
                                </fieldset>
                                <fieldset>
                                    <legend>Statistiques</legend>
                                    <Form.Item label="Réduction de déchets (kg/an)">
                                        {getFieldDecorator('card_stats.waste_reduction', {
                                        })(<InputNumber min={0} />)}
                                    </Form.Item>
                                    <Form.Item label="Réduction de CO2 (kg/an)">
                                        {getFieldDecorator('card_stats.co2_reduction', {
                                        })(<InputNumber min={0} />)}
                                    </Form.Item>
                                    <Form.Item label="Réduction de consommation d'eau (L/an)">
                                        {getFieldDecorator('card_stats.water_use_reduction', {
                                        })(<InputNumber min={0} />)}
                                    </Form.Item>
                                    <Form.Item label="Année de validité de la statistique">
                                        {getFieldDecorator('card_stats.year', {
                                        })(<InputNumber min={0} />)}
                                    </Form.Item>
                                    <Form.Item label="Status de la statistique">
                                        {getFieldDecorator('card_stats.status', {})(<Select>
                                            <Option value="ACTIVE">Active</Option>
                                            <Option value="ARCHIVED">Archived</Option>
                                        </Select>)}
                                    </Form.Item>
                                </fieldset>
                                <fieldset>
                                    <legend>Source de donnée</legend>
                                    {sourcesItems}
                                    <Form.Item label="Sources">
                                        <Button type="dashed" onClick={this.addSource}>
                                            <Icon type="plus" /> Nouvelle source
                                        </Button>
                                    </Form.Item>
                                </fieldset>
                                <Button htmlType="submit">
                                    { this.state.editing ? 'Edit card!' : 'Create Card!'}
                                </Button>
                            </Form>
                        </Col>
                    }
                </Content>
            </Layout>
        );
    }
}

AdminCardAdd.defaultProps = {
    match: null,
    card_data: null
};

AdminCardAdd.propTypes = {
    token: PropTypes.string.isRequired,
    isFetchingCard: PropTypes.bool.isRequired,
    match: PropTypes.shape({
        params: PropTypes.shape({
            slug: PropTypes.string
        })
    }),
    actions: PropTypes.shape({
        createCard: PropTypes.func.isRequired,
        editCard: PropTypes.func.isRequired,
        cardFetch: PropTypes.func.isRequired
    }).isRequired,
    card_data: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        image: PropTypes.string,
        waste_reduction_score: PropTypes.number,
        difficulty_score: PropTypes.number,
        cost_score: PropTypes.number,
        help_links: PropTypes.arrayOf(PropTypes.string),
        card_stats: PropTypes.shape({
            waste_reduction: PropTypes.number,
            co2_reduction: PropTypes.number,
            water_use_reduction: PropTypes.number,
            status: PropTypes.string,
            year: PropTypes.number,
            data_sources: PropTypes.arrayOf(PropTypes.shape({
                name: PropTypes.string,
                link: PropTypes.string,
                status: PropTypes.string
            }))
        }),
    }),
};


const mapStateToProps = state => ({
    token: state.auth.token,
    card_data: state.cards.current_card,
    isFetchingCard: state.cards.isFetchingCard,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

const ConnectedAdminCardAdd = connect(mapStateToProps, mapDispatchToProps)(AdminCardAdd);
export default Form.create()(ConnectedAdminCardAdd);
