import React from 'react';
import { Button, Form } from 'antd';
import { get } from 'lodash';

import './Form.css';

const FormItem = Form.Item

const generateFormItem = (form, item, initialData) => {
    const { label = '', id = '', rules = [], component, valuePropName } = item;
    const { getFieldDecorator } = form;
    const options = {
        rules
    };
    if (initialData) {
        options.initialValue = get(initialData, id);
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

export const generateFields = (form, fieldSets, initialData) => {
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
    return fields;

}

export const generateForm = (form, onSubmit, onCancel, fieldSets, initialData, buttonName) => {
    let cancelButton;
    if (onCancel) {
        cancelButton = (
            <Button
                onClick={onCancel}
                size="large"
            >
                Annuler
            </Button>
        );
    }
    return (
        <Form onSubmit={onSubmit}>
            {generateFields(form, fieldSets, initialData)}
            <Button
                className="validate-form"
                htmlType="submit"
                type="primary"
                size="large"
            >
                {buttonName}
            </Button>
            {cancelButton}
       </Form>
    );
}
