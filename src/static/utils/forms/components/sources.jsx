import React, { Component } from 'react';
import { cloneDeep, defaultTo } from 'lodash';

import MultiComponent from './multiComponent';


class Sources extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sources: defaultTo(props.values, []),
        };
    };

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

export default Sources;
