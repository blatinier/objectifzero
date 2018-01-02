import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './style.scss';

const HomeView = ({ statusText }) => {
    let statusComponent;
    if (statusText) {
        statusComponent = (
            <div className="margin-top-medium">
                <div className="alert alert-info">
                    {statusText}
                </div>
            </div>
        );
    }
    return (
        <div className="container">
            {statusComponent}
            <div>
                <h1>Pourquoi ce site ?</h1>
                <p>Le zéro déchet est une démarche passionnante mais il
                parfois difficile de savoir par où commencer, ou bien comment
                supprimer un déchet. Parfois il y a même des déchets qu&#39;on ne
                savait pas exister. Ce site est là pour vous aider à vous
                lancer, vous améliorer, réduire plus, lancer des défis à vos
                amis, votre famille.</p>
            </div>
        </div>
    );
};

HomeView.propTypes = {
    statusText: PropTypes.string
};

HomeView.defaultProps = {
    statusText: '',
};

const mapStateToProps = state => ({
    statusText: state.auth.statusText
});

export default connect(mapStateToProps)(HomeView);
export { HomeView as HomeViewNotConnected };
