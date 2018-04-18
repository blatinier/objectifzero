import React from 'react';
import { Input, Icon } from 'antd';

// TBD: Maybe a Select or a AutoCompletion item?
const friendsInputField = {
    label: 'Friend',
    id: 'friend',
    rules: [{
        required: true,
        message: 'Saisissez le nom de l\'ami que vous voulez ajouter',
    }],
    component: <Input prefix={<Icon type="user" />} placeholder="Nom de l'ami" />,
};

export const friendsAddFields = [
    {
        items: [
            friendsInputField,
        ],
    },
];
