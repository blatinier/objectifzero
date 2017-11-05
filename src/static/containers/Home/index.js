import React from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './style.scss';
import reactLogo from './images/react-logo.png';
import reduxLogo from './images/redux-logo.png';

class HomeView extends React.Component {
    static propTypes = {
        statusText: PropTypes.string,
        userName: PropTypes.string,
        dispatch: PropTypes.func.isRequired
    };

    static defaultProps = {
        statusText: '',
        userName: ''
    };

    goToProtected = () => {
        this.props.dispatch(push('/protected'));
    };

    render() {
        return (
            <div className="container">
                <div className="text-center">
                    <h1>Pourquoi ce site ?</h1>
                    <p>Le zéro déchet c'est une démarche passionnante mais il
                    parfois difficile de savoir par où commencer ou bien comment
                    supprimer un déchet. Parfois il y a même des déchets qu'on ne
                    savait pas exister. Ce site est là pour ça. Vous aider à vous
                    lancer, vous améliorer, réduire plus, lancer des défis à vos
                    amis, votre famille.</p>
                </div>
                <div className="margin-top-medium text-center">
                    <p>Attempt to access some <a onClick={this.goToProtected}><b>protected content</b></a>.</p>
                </div>
                <div className="margin-top-medium">
                    {this.props.statusText ?
                        <div className="alert alert-info">
                            {this.props.statusText}
                        </div>
                        :
                        null
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userName: state.auth.userName,
        statusText: state.auth.statusText
    };
};

export default connect(mapStateToProps)(HomeView);
export { HomeView as HomeViewNotConnected };
