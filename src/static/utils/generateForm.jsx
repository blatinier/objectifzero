import React from 'react';
import { Button, Form } from 'antd';
const FormItem = Form.Item

const generateFormItem = (form, item, initialData) => {
    const { label = '', id = '', rules = [], component, valuePropName } = item;
    const { getFieldDecorator } = form;
    const options = {
        rules
    };
    if (initialData && id in initialData) {
        options.initialValue = initialData[id];
    }
    if (valuePropName) {
        options.valuePropName = valuePropName;
    }
    return (
        <FormItem label={label}>
            {getFieldDecorator(id, options)(component)}
        </FormItem>
    );
};

export const generateForm = (form, onSubmit, fieldSets, initialData, buttonName) => {
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
                <fieldset>
                    <legend>{legendName}</legend>
                    {formItems}
                </fieldset>
            );
        }


    }
    return (
        <Form onSubmit={onSubmit}>
            {fields}
            <Button htmlType="submit">
                {buttonName}
            </Button>
        </Form>
    );
}
