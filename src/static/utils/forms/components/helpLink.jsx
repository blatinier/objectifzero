import React, { Component } from 'react';
import { defaultTo } from 'lodash';

import MultiComponent from './multiComponent';


class HelpLink extends Component {

    constructor(props) {
        super(props);
        this.state = {
           helpLinks: defaultTo(props.value, []),
        };
    };

    onChange = (values) => {
        this.setState({ helpLinks: values });
        this.props.onChange(values);
    };

    render = () => (
        <MultiComponent
            defaultValue=""
            type="input"
            placeholder="Lien"
            values={this.state.helpLinks}
            onChange={this.onChange}
        />
    );
}

export default HelpLink;
