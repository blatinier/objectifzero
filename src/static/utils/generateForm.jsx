import React from 'react';
import { Button, Form } from 'antd';

import './Form.css';

const FormItem = Form.Item

const generateFormItem = (form, item, initialData) => {
    const { label = '', id = '', rules = [], component, valuePropName } = item;
    const { getFieldDecorator } = form;
    const options = {
        rules
    };
    if (initialData) {
        if (id.includes('.')) {
            const splitArray = id.split('.');
            if (splitArray[0] in initialData) {
                let init = initialData[splitArray[0]];
                for (let data of splitArray.slice(1)) {
                    init = init[data];
                }
                options.initialValue = init;
            }
        } else if (id in initialData) {
            options.initialValue = initialData[id];
        }
    }
    if (valuePropName) {
        options.valuePropName = valuePropName;
    }
    return (
        <FormItem key={label} label={label}>
            {getFieldDecorator(id, options)(component)}
        </FormItem>
    );
};

export const generateForm = (form, onSubmit, onCancel, fieldSets, initialData, buttonName) => {
    const fields = [];
    if (fieldSets.length === 1) {
        const items = fieldSets[0].items;
        for (const item of items) {
            fields.push(generateFormItem(form, item, initialData));
        }
    } else {
        for (const fieldSet of fieldSets) {
            const { legendName, items } = fieldSet;
            const formItems = []
            for (const item of items) {
                formItems.push(generateFormItem(form, item, initialData));
            }
            fields.push(
                <fieldset key={legendName}>
                    <legend>{legendName}</legend>
                    {formItems}
                </fieldset>
            );
        }


    }
    return (
        <Form onSubmit={onSubmit}>
            {fields}
            <Button
                className="validate-form"
                htmlType="submit"
                type="primary"
                size="large"
            >
                {buttonName}
            </Button>
            <Button
                onClick={onCancel}
                size="large"
            >
                Cancel
            </Button>
        </Form>
    );
}
