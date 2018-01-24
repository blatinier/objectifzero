import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import './style.scss';

import * as actionCreators from '../../actions/cards';

class ShortCardView extends Component {
    deleteCard = () => {
        const { actions, token, card } = this.props;
        actions.deleteCard(token, card.slug);
    };

    goToEditCard = () => {
        const { slug } = this.props.card;
        this.props.dispatch(push(`/zw-admin/card-edit/${slug}`));
    }

    renderGlyph = (glyph, score) => {
        const classes = `fa fa-${glyph}`;
        const glyphs = [];
        const grayGlyph = 5 - score;
        let i;
        for (i = 0; i < score; i += 1) {
            glyphs.push(<span key={`glyph-${glyph}-${i}`} className={classes} />);
        }
        for (i = 0; i < grayGlyph; i += 1) {
            glyphs.push(<span key={`gray-glyph-${glyph}-${i}`} className={`${classes} gray`} />);
        }
        return (
            <div className="scoreGlyph">
                {glyphs}
            </div>
        );
    };

    render = () => {
        const { card, admin } = this.props;
        const adminBtns = [];
        if (admin) {
            const { slug } = card;
            adminBtns.push(<div key={`edit-btn-${slug}`} className="col-lg-2">
                <i className="cursor fa fa-pencil fa-2x"
                    onClick={this.goToEditCard}
                />
            </div>);
            adminBtns.push(<div key={`delete-btn-${slug}`} className="col-lg-2">
                <i className="cursor fa fa-times fa-2x"
                    onClick={this.deleteCard}
                />
            </div>);
        }
        return (
            <div className="panel panel-default card">
                <div className="panel-body">
                    <div className="row pull-right">
                        {adminBtns}
                    </div>
                    <div className="col-lg-10">
                        <h2>{card.title}</h2>
                        <p>{card.description}</p>
                    </div>
                    <div className="col-lg-2">
                        {this.renderGlyph('trash', card.waste_reduction_score)}
                        {this.renderGlyph('euro', card.cost_score)}
                        {this.renderGlyph('cog', card.difficulty_score)}
                    </div>
                </div>
            </div>
        );
    };
}

ShortCardView.defaultProps = {
    admin: false
};

ShortCardView.propTypes = {
    admin: PropTypes.bool.isRequired,
    card: PropTypes.shape({
        slug: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        waste_reduction_score: PropTypes.number.isRequired,
        difficulty_score: PropTypes.number.isRequired,
        cost_score: PropTypes.number.isRequired,
    }).isRequired,
    token: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    actions: PropTypes.shape({
        deleteCard: PropTypes.func.isRequired
    }).isRequired
};

const mapStateToProps = state => ({
    token: state.auth.token,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch),
    dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(ShortCardView);
export { ShortCardView as ShortCardViewNotConnected };
