import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './style.scss';

class HomeView extends React.Component {
    static propTypes = {
        statusText: PropTypes.string
    };

    static defaultProps = {
        statusText: '',
    };

    render() {
        return (
            <div className="container">
                {this.props.statusText ?
                    <div className="margin-top-medium">
                        <div className="alert alert-info">
                            {this.props.statusText}
                        </div>
                    </div>
                    :
                    null
                }
                <div>
                    <h1>Pourquoi ce site ?</h1>
                    <p>Le zéro déchet est une démarche passionnante mais il
                    parfois difficile de savoir par où commencer, ou bien comment
                    supprimer un déchet. Parfois il y a même des déchets qu&quote;on ne
                    savait pas exister. Ce site est là pour vous aider à vous
                    lancer, vous améliorer, réduire plus, lancer des défis à vos
                    amis, votre famille.</p>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        statusText: state.auth.statusText
    };
};

export default connect(mapStateToProps)(HomeView);
export { HomeView as HomeViewNotConnected };
