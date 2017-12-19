import React from 'react';
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
    data_source_status: t.String // (verified / Unverified)
});

const Stat = t.struct({
    waste_reduction: t.Number, // in kg/year
    co2_reduction: t.Number, // in kg/year
    water_user_reduction: t.Number, // in L/year
    stat_status: t.String, // Active/Archived
    year: t.Integer
});

const Card = t.struct({
    title: t.String,
    description: t.String,
    image: t.String,
    waste_reduction_score: t.Integer,
    difficulty_score: t.Integer,
    cost_score: t.Integer,
    help_links: t.list(t.String), // (multi-select + add)

    // STATS
    stats: Stat,

    // DataSource (multi-select box + add)
    data_source: t.list(DataSource)
});

class AdminCardAddView extends React.Component {
    static propTypes = {
        actions: PropTypes.shape({
            cardsFetch: PropTypes.func.isRequired
        }).isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            formValues: {
                // TODO
            },
        };
    }

    onFormChange = (value) => {
        this.setState({ formValues: value });
    };

    render() {
        return (
            <div className="protected">
                <AdminMenu />
                <div className="col-lg-9">
                    <form onSubmit={this.createCard}>
                        <Form ref={(ref) => { this.addCardForm = ref; }}
                            type={Card}
                            value={this.state.formValues}
                            onChange={this.onFormChange}
                        />
                    </form>
                </div>
            </div>
        );
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actionCreators, dispatch)
    };
};

export default connect(mapDispatchToProps)(AdminCardAddView);
export { AdminCardAddView as AdminCardAddViewNotConnected };
