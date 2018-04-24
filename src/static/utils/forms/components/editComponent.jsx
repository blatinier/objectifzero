import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, Input, Select, Icon } from 'antd';

import './editComponent.css';

class EditComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: true,
            value: props.value,
        };
    };

    onChange = (evt) => {
        const { value } = evt.target;
        this.setState({ value });
        this.props.onChange(value);
    };

    onChangeDisabled = () => {
        this.setState({ disabled: false });
    };

    buildDisabled = () => {
        const { type, componentProps } = this.props;
        const { value } = this.state;
        let component;
        switch (type) {
            case 'select':
                component = (
                    <Select
                        disabled
                        value={value}
                        {...componentProps}
                    />
                );
                break;
            default:
                component = (
                    <Input
                        disabled
                        value={value}
                        {...componentProps}
                    />
                );
        }

        return (
            <Row gutter={6} className="edit-component">
                <Col span={22}>
                    {component}
                </Col>
                <Col span={2}>
                    <div className="edit" onClick={this.onChangeDisabled}>
                        <Icon className="edit-icon" type="edit" />
                    </div>
                </Col>
            </Row>
        );
    };

    buildComponent = () => {
        const { type, componentProps } = this.props;
        const { value } = this.state;
        let component;
        switch (type) {
            case 'select':
                component = (
                    <Select
                        onChange={this.onChange}
                        value={value}
                        {...componentProps}
                    />
                );
                break;
            default:
                component = (
                    <Input
                        onChange={this.onChange}
                        value={value}
                        {...componentProps}
                    />
                );
        }
        return (
            <Fragment>
                {component}
            </Fragment>
        );

    };

    render = () => {
        const { disabled } = this.state;
        let component;
        if (disabled) {
            component = this.buildDisabled();
        } else {
            component = this.buildComponent();
        }
        return (
            <Fragment>
                {component}
            </Fragment>
        );
    };
}

EditComponent.defautlProps = {
};

EditComponent.propTypes = {
    onChange: PropTypes.func,
    type: PropTypes.string.isRequired,
    componentProps: PropTypes.object,
};

export default EditComponent;
