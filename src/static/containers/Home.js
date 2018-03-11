import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Alert, Col } from 'antd';

const Home = ({ statusText }) => (
    <Col span={20} offset={2}>
        {statusText ? <Alert message={statusText} type="info" /> : null}
        <Col span={12}>
            <h1>Pourquoi ce site ?</h1>
            <p>Le zéro déchet est une démarche passionnante mais il
            parfois difficile de savoir par où commencer, ou bien comment
            supprimer un déchet. Parfois il y a même des déchets qu&#39;on ne
            savait pas exister. Ce site est là pour vous aider à vous
            lancer, vous améliorer, réduire plus, lancer des défis à vos
            amis, votre famille.
            </p>
        </Col>
    </Col>
);

Home.defaultProps = {
    statusText: null,
};

Home.propTypes = {
    statusText: PropTypes.string
};

const mapStateToProps = state => ({
    statusText: state.auth.statusText
});

export default connect(mapStateToProps)(Home);
