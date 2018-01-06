import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import t from 'tcomb-form';
import PropTypes from 'prop-types';

import AdminMenu from '../AdminMenu';
import * as actionCreators from '../../actions/cards';

const Form = t.form.Form;

const DataSource = t.struct({
    data_source_name: t.String,
    data_source_link: t.String,
    data_source_status: t.enums({ VERIFIED: 'Verified', UNVERIFIED: 'Unverified' })
});

const Stat = t.struct({
    waste_reduction: t.maybe(t.Number), // in kg/year
    co2_reduction: t.maybe(t.Number), // in kg/year
    water_use_reduction: t.maybe(t.Number), // in L/year
    stat_status: t.enums({ ACTIVE: 'Active', ARCHIVED: 'Archived' }),
    year: t.Integer
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
    stats: Stat,

    // DataSource (multi-select box + add)
    data_source: t.list(DataSource)
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
        formValues: {
            title: '',
            description: '',
            image: '',
            waste_reduction_score: 0,
            difficulty_score: 0,
            cost_score: 0,
            help_links: [],
            stats: {
                waste_reduction: 0, // in kg/year
                co2_reduction: 0, // in kg/year
                water_use_reduction: 0, // in L/year
                stat_status: 'ACTIVE', // Active/Archived
                year: (new Date()).getFullYear()
            },
            data_source: []
        },
    };

    componentDidMount = () => {
        // TODO check props, if existing, setState and modify action add into edit
    };

    onFormChange = (value) => {
        this.setState({ formValues: value });
    };

    createCard = (e) => {
        e.preventDefault();
        const value = this.addCardForm.getValue();
        if (value) {
            this.props.actions.createCard(this.props.token, value);
        }
    };

    render = () => (
        <div className="protected">
            <AdminMenu />
            <div className="col-lg-9">
                <form onSubmit={this.createCard}>
                    <Form ref={(ref) => { this.addCardForm = ref; }}
                        type={Card}
                        options={CardAddFormOptions}
                        value={this.state.formValues}
                        onChange={this.onFormChange}
                    />
                    <button type="submit" className="btn btn-success col-lg-4 col-lg-offset-4 col-xs-12">
                        Create Card!
                    </button>
                </form>
            </div>
        </div>
    );
}

AdminCardAddView.propTypes = {
    token: PropTypes.string.isRequired,
    actions: PropTypes.shape({
        createCard: PropTypes.func.isRequired
    }).isRequired,
    card_slug: PropTypes.string,
    card_data: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        image: PropTypes.string,
        waste_reduction_score: PropTypes.number,
        difficulty_score: PropTypes.number,
        cost_score: PropTypes.number,
        help_links: PropTypes.arrayOf(PropTypes.string),
        stats: PropTypes.shape({
            waste_reduction: PropTypes.number,
            co2_reduction: PropTypes.number,
            water_use_reduction: PropTypes.number,
            stat_status: PropTypes.string,
            year: PropTypes.number
        }),
        data_source: PropTypes.arrayOf(
            PropTypes.shape({
                data_source_name: PropTypes.string,
                data_source_link: PropTypes.string,
                data_source_status: PropTypes.string
            })
        )
    }),
};


const mapStateToProps = state => ({
    token: state.auth.token,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminCardAddView);
export { AdminCardAddView as AdminCardAddViewNotConnected };
