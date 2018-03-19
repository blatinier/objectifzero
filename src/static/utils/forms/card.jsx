import React from 'react';
import { Icon, Input, Select, Switch, InputNumber } from 'antd';

import HelpLink from './components/helpLink';
import Sources from './components/sources';

const Option = Select.Option;

const titleField = {
    label: 'Title',
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
        message: 'Score de réduction des déchets',
    }],
    component: <InputNumber min={0} max={10} />,
};

const difficultyScoreField = {
    label: 'Score de difficulté',
    id: 'difficulty_score',
    rules: [{
        required: true,
        message: 'Score de difficulté',
    }],
    component: <InputNumber min={0} max={10} />,
};

const costScoreField = {
    label: 'Score de coût',
    id: 'cost_score',
    rules: [{
        required: true,
        message: 'Score de coût',
    }],
    component: <InputNumber min={0} max={10} />,
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
    component: <HelpLink />,
};

const wasteReductionField = {
    label: 'Réduction de déchets (kg/an)',
    id: 'card_stats.waste_reduction',
    component: <InputNumber min={0} />,
};

const coReductionField = {
    label: 'Réducton de CO3 (kg/an)',
    id: 'card_stats.co2_reduction',
    component: <InputNumber min={0} />,
};

const waterUseReductionField = {
    label: 'Réduction de consommation d\'eau (kg/an)',
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
