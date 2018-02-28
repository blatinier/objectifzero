import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import t from 'tcomb-form';
import { Col } from 'antd';
import PropTypes from 'prop-types';

import AdminMenu from '../AdminMenu';
import * as actionCreators from '../../actions/cards';

const Form = t.form.Form;

const DataSource = t.struct({
    name: t.String,
    link: t.String,
    status: t.enums({ VERIFIED: 'Verified', UNVERIFIED: 'Unverified' })
});

const Stat = t.struct({
    waste_reduction: t.maybe(t.Number), // in kg/year
    co2_reduction: t.maybe(t.Number), // in kg/year
    water_use_reduction: t.maybe(t.Number), // in L/year
    status: t.enums({ ACTIVE: 'Active', ARCHIVED: 'Archived' }),
    year: t.Integer,
    data_sources: t.list(DataSource)
});

const Card = t.struct({
    title: t.String,
    description: t.String,
    image: t.maybe(t.String),
    waste_reduction_score: t.Integer,
    difficulty_score: t.Integer,
    cost_score: t.Integer,
    help_links: t.maybe(t.list(t.String)), // (multi-select + add)

    // STATS
    card_stats: Stat,
});

const CardAddFormOptions = {
    fields: {
        description: {
            type: 'textarea'
        },
    }
};

class AdminCardAddView extends Component {
    state = {
        editing: false,
        formValues: {
            title: '',
            description: '',
            image: '',
            waste_reduction_score: 0,
            difficulty_score: 0,
            cost_score: 0,
            help_links: [],
            card_stats: {
                waste_reduction: 0, // in kg/year
                co2_reduction: 0, // in kg/year
                water_use_reduction: 0, // in L/year
                status: 'ACTIVE', // Active/Archived
                year: (new Date()).getFullYear(),
                data_sources: []
            },
        },
    };

    componentWillMount = () => {
        const { actions, match, token } = this.props;
        if (match.params.slug) {
            actions.cardFetch(token, match.params.slug);
        }
    };

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.card_data) {
            const { card } = nextProps.card_data;
            card.card_stats = card.card_stats;
            const links = card.help_links.split(/\r?\n/);
            card.help_links = links.filter(arr => arr);
            this.setState({
                formValues: card,
                editing: true,
            });
        }
    };

    onFormChange = (value) => {
        this.setState({ formValues: value });
    };

    createCard = (e) => {
        e.preventDefault();
        const value = this.addCardForm.getValue();
        const formData = Object.assign({}, value);
        if (formData) {
            if (formData.help_links) {
                formData.help_links = formData.help_links.join('\n');
            } else {
                formData.help_links = '';
            }
            if (this.state.editing) {
                const { slug } = this.props.match.params;
                this.props.actions.editCard(this.props.token, slug, formData);
            } else {
                this.props.actions.createCard(this.props.token, formData);
            }
        }
    };

    render = () => (
        <div className="protected">
            <AdminMenu />
            {(this.props.isFetchingCard === true) ?
                <p className="text-center">Loading card to edit...</p>
                :
                <Col lg={18}>
                    <form onSubmit={this.createCard}>
                        <Form ref={(ref) => { this.addCardForm = ref; }}
                            type={Card}
                            options={CardAddFormOptions}
                            value={this.state.formValues}
                            onChange={this.onFormChange}
                        />
                        <button type="submit" className="btn btn-success col-lg-4 col-lg-offset-4 col-xs-12">
                            { this.state.editing ? 'Edit card!' : 'Create Card!'}
                        </button>
                    </form>
                </Col>
            }
        </div>
    );
}

AdminCardAddView.defaultProps = {
    match: null,
    card_data: null
};

AdminCardAddView.propTypes = {
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
            data_sources: PropTypes.arrayOf(
                PropTypes.shape({
                    name: PropTypes.string,
                    link: PropTypes.string,
                    status: PropTypes.string
                })
            )
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

export default connect(mapStateToProps, mapDispatchToProps)(AdminCardAddView);
export { AdminCardAddView as AdminCardAddViewNotConnected };
