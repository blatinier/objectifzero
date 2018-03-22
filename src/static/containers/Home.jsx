import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Col, Row } from 'antd';

import './Home.css';

import hummingbird from '../images/hummingbird.svg';
import cheerleader from '../images/cheerleader.svg';
import cook from '../images/cook.svg';
import pet from '../images/pet.svg';
import surf from '../images/surf.svg';
import geek from '../images/geek.svg';

const Home = () => (
    <Col span={20} offset={2}>
        <Row>
            <Col span={14} offset={2} className="home-block">
                <h2>Enjoy zéro déchets</h2>
                <p>
                    Parce que tous les gestes comptent !
                    Parce que toutes les améliorations dans votre façon de consommer sont
                    un pas vers une consommation plus responsable.
                    Parce qu&apos;il est important de rester motivés et positifs.
                    <b> Enjoy zéro déchet</b>
                </p>
            </Col>
            <Col span={4} offset={2} className="home-img">
                <img src={hummingbird} alt="" />
            </Col>
        </Row>
        <Row>
            <Col span={4} offset={2} className="home-img">
                <img src={cheerleader} alt="" />
            </Col>
            <Col span={14} offset={2} className="home-block">
                <h2>Restez motivés !</h2>
                <p>
                    Il est toujours plus facile de voir ce qui ne va pas.
                    Ici on va vous montrer le chemin que vous avez fait et l&apos;impact que vos
                    efforts ont eu. Il est possible de faire mieux, mais chaque geste
                    acquis est une force qu&apos;il faut utiliser comme motivation.
                </p>
            </Col>
        </Row>
        <Row>
            <Col span={14} offset={2} className="home-block">
                <h2>Des pistes d&apos;amélioration adaptées à votre style de vie</h2>
                <p>
                    Le zéro déchet est une démarche passionnante mais il est
                    parfois difficile de savoir par où commencer, ou bien comment
                    supprimer un déchet. Parfois il y a même des déchets dont
                    on ignorait l&apos;existance. Nous allons vous aider à vous
                    lancer, vous améliorer, réduire plus, lancer des défis à vos
                    amis, votre famille. Rejoignez nous !
                </p>
            </Col>
            <Col span={4} offset={2} className="home-img">
                <Col span={12}><img src={cook} alt="" /></Col>
                <Col span={12}><img src={pet} alt="" /></Col>
                <Col span={12}><img src={surf} alt="" /></Col>
                <Col span={12}><img src={geek} alt="" /></Col>
            </Col>
        </Row>
    </Col>
);

Home.defaultProps = {
    statusText: null,
};

Home.propTypes = {
    statusText: PropTypes.string,
};

const mapStateToProps = state => ({
    statusText: state.auth.statusText,
});

export default connect(mapStateToProps)(Home);
