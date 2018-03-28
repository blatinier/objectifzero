import React from 'react';
import { Icon, Input, Select, Switch } from 'antd';

const Option = Select.Option;

const usernameField = {
    label: 'Username',
    id: 'username',
    rules: [{
        required: true,
        message: 'Saisissez un nom d\'utilisateur',
    }],
    component: <Input prefix={<Icon type="user" />} placeholder="Username" />,
};

const emailField = {
    label: 'Email',
    id: 'email',
    rules: [{
        required: true,
        message: 'Saisissez un email',
    }],
    component: <Input prefix={<Icon type="mail" />} placeholder="Email" />,
};

const passwordField = {
    label: 'Mot de passe',
    id: 'password',
    rules: [{
        required: true,
        message: 'Saisissez un mot de passe',
    }],
    component: <Input
                prefix={<Icon type="lock" />}
                type="password"
                placeholder="Mot de passe"
                />
};

const isStaffField = {
    label: 'Admin',
    id: 'is_staff',
    valuePropName: 'checked',
    component: <Switch />
};

const hasGardenField = {
    label: 'Jardin',
    id: 'has_garden',
    valuePropName: 'checked',
    component: <Switch />,
};

const homeOwnerField = {
    label: 'Propriétaire',
    id: 'home_owner',
    valuePropName: 'checked',
    component: <Switch />,
};

const doSmokeField = {
    label: 'Fumeur',
    id: 'do_smoke',
    valuePropName: 'checked',
    component: <Switch />,
};

const genderField = {
    label: 'Sexe',
    id: 'gender',
    rules: [{
        required: true,
        message: 'Please select a value',
    }],
    component: (
        <Select>
            <Option value="M">Male</Option>
            <Option value="F">Female</Option>
        </Select>
    ),
};

export const createUserFields = [
    {
        items: [
            usernameField,
            emailField,
            passwordField,
            isStaffField,
            hasGardenField,
            homeOwnerField,
            doSmokeField,
            genderField,
        ],
    },
];

export const editUserFields = [
    {
        items: [
            usernameField,
            emailField,
            isStaffField,
            hasGardenField,
            homeOwnerField,
            doSmokeField,
            genderField,
        ],
    },
];
