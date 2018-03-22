import React, { Fragment, Component } from 'react';
import { defaultTo } from 'lodash';
import { Button, Icon, Row, Col, Input, Radio } from 'antd';


class MultiComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            values: defaultTo(props.values, []),
        };
    };

    addItem = () => {
        const { values } = this.state;
        const { defaultValue } = this.props;
        values.push(defaultValue);
        this.setState({ values });
    };

    removeItem = (index) => () => {
        const { values } = this.state;
        values.splice(index, 1);
        this.setState({ values });
    };

    onChange = index => (evt) => {
        const { values } = this.state;
        values[index] = evt.target.value;
        this.setState({ values });
        this.props.onChange(values);
    };

    onChangeSource = (name, index) => (evt) => {
        const { values } = this.state;
        values[index][name] = evt.target.value;
        this.setState({ values });
        this.props.onChange(values);
    };

    buildComponent = (value, index, onChangeFunc) => {
        const { type, placeholder } = this.props;
        switch (type) {
            case "input":
                return (
                    <Input
                        id={index}
                        placeholder={placeholder}
                        value={value}
                        onChange={onChangeFunc}
                        onBlur={onChangeFunc}
                    />
                );
                break;
            case "sources":
                return (
                    <fieldset>
                        Nom
                        <Input
                            onChange={this.onChangeSource('name', index)}
                            value={value.name}
                        />
                        Lien
                        <Input
                            onChange={this.onChangeSource('link', index)}
                            value={value.link}
                        />
                        Status
                        <Radio.Group
                            defaultValue="UNVERIFIED"
                            value={value.status}
                            onChange={this.onChangeSource('status', index)}
                        >
                            <Radio value="VERIFIED">Vérifiée</Radio>
                            <Radio value="UNVERIFIED">Non Vérifiée</Radio>
                        </Radio.Group>
                    </fieldset>
                );
                break;
            default:
                return undefined;
        }
    };

    render = () => {
        const { values } = this.state;
        const items = values.map((value, index) => (
            <Row key={index}>
                <Col span={12}>
                    {this.buildComponent(value, index, this.onChange(index))}
                </Col>
                <Col span={12}>
                    <Icon
                        type="minus-circle-o"
                        onClick={this.removeItem(index)}
                    />
                </Col>
            </Row>
        ));

        return (
            <Fragment>
                {items}
                <Button type="dashed" onClick={this.addItem}>
                    <Icon type="plus" />
                </Button>
            </Fragment>
        );

    }
}

export default MultiComponent;
