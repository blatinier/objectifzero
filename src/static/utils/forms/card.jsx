import React from 'react';
import { Icon, Input, Select, Switch, InputNumber, Rate } from 'antd';
import { defaultTo } from 'lodash';
import Schema from 'async-validator';
import FaMoney from 'react-icons/lib/fa/money';

import HelpLink from './components/helpLink';
import Sources from './components/sources';

const Option = Select.Option;

const titleField = {
    label: 'Titre',
    id: 'title',
    rules: [{
        required: true,
        message: 'Saisissez un titre',
    }],
    component: <Input placeholder="Titre" />,
};

const descriptionField = {
    label: 'Description',
    id: 'description',
    rules: [{
        required: true,
        message: 'Saisissez une description',
    }],
    component: <Input type="textarea" rows={4} placeholder="Description" />,
};

const wasteReductionScoreField = {
    label: 'Score de réduction des déchets',
    id: 'waste_reduction_score',
    rules: [{
        required: true,
        message: 'Saisissez un score de réduction des déchets',
    }],
    component: <Rate allowHalf character={<Icon type="delete" />} />,
};

const difficultyScoreField = {
    label: 'Score de difficulté',
    id: 'difficulty_score',
    rules: [{
        required: true,
        message: 'Saisissez un score de difficulté',
    }],
    component: <Rate allowHalf character={<Icon type="tool" />} />,
};

const costScoreField = {
    label: 'Score de coût',
    id: 'cost_score',
    rules: [{
        required: true,
        message: 'Saisissez un score de coût',
    }],
    component: <Rate allowHalf character={<FaMoney />} />,
};

const publishedField = {
    label: 'Published',
    id: 'published',
    valuePropName: 'checked',
    component: <Switch />,
};

const helpLinkField = {
    label: 'Liens d\'aide',
    id: 'help_links',
    rules: [
        {
            // Only take input which have been written
            transform: value => value ? (value.filter(link => link.length > 0)) : [],
            validator: (rule, value, cb) => {
                for (let link of value) {
                    const urlValidator = new Schema({ link: { type: 'url' } });
                    urlValidator.validate({ link }, (errors) => {
                        if (errors) {
                            cb('Au moins un des liens d\'aide est incorrect');
                        }
                    });
                }
                // No error
                cb();
            },
        },
    ],
    component: <HelpLink />,
};

const wasteReductionField = {
    label: 'Réduction de déchets (kg/an)',
    id: 'card_stats.waste_reduction',
    component: <InputNumber min={0} />,
};

const coReductionField = {
    label: 'Réducton de CO2 (kg/an)',
    id: 'card_stats.co2_reduction',
    component: <InputNumber min={0} />,
};

const waterUseReductionField = {
    label: 'Réduction de consommation d\'eau (L/an)',
    id: 'card_stats.water_use_reduction',
    component: <InputNumber min={0} />,
};

const yearField = {
    label: 'Année de validité de la statistique',
    id: 'card_stats.year',
    component: <InputNumber min={0} />,
};

const statusField = {
    label: 'Status de la statistique',
    id: 'card_stats.status',
    component: (
        <Select>
            <Option value="ACTIVE">Active</Option>
            <Option value="ARCHIVED">Archived</Option>
        </Select>
    ),
};

const sourcesField = {
    label: 'Sources',
    id: 'card_stats.data_sources',
    rules: [
        {
            transform: value => defaultTo(value, []),
            validator: (rule, values, cb) => {
                for (let value of values) {
                    if (value.name.length === 0 || value.link.length === 0) {
                        cb('Au moins une des sources est incorrecte : le nom et le lien sont requis');
                    }
                    const urlValidator = new Schema({ link: { type: 'url' } });
                    urlValidator.validate({ link: value.link }, (error) => {
                        if (error) {
                            cb('Au moins une des sources est incorrecte : le lien doit être une url');
                        }
                    });
                }
                cb();
            },
        },
    ],
    component: <Sources />,
};

export const cardFields = [
    {
        legendName: 'Carte',
        items: [
            titleField,
            descriptionField,
            wasteReductionScoreField,
            difficultyScoreField,
            costScoreField,
            publishedField,
            helpLinkField,
        ],
    },
    {
        legendName: 'Statistiques',
        items: [
            wasteReductionField,
            coReductionField,
            waterUseReductionField,
            yearField,
            statusField,
        ],
    },
    {
        legendName: 'Source de données',
        items: [
            sourcesField,
        ],
    },
];
