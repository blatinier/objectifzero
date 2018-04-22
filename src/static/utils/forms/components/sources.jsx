import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { defaultTo } from 'lodash';

import MultiComponent from './multiComponent';

class Sources extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sources: defaultTo(props.value, []),
        };
    }

    onChange = (values) => {
        this.setState({ values });
        this.props.onChange(values);
    };

    render = () => {
        const defaultValue = {
            name: '',
            link: '',
            status: 'UNVERIFIED',
        };
        return (
            <MultiComponent
                defaultValue={defaultValue}
                type="sources"
                values={this.state.sources}
                onChange={this.onChange}
            />
        );
    }
}

Sources.propTypes = {
    value: PropTypes.arrayOf({}).isRequired,
    onChange: PropTypes.func.isRequired,
};

export default Sources;
