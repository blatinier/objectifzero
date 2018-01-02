import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import './style.scss';

import * as actionCreators from '../../actions/cards';


class ShortCardView extends Component {
    renderGlyph = (glyph, score) => {
        const classes = `glyphicon glyphicon-${glyph}`;
        const glyphs = [];
        let nbGlyph = 0;
        let grayGlyph = 0;
        let lastHalf = false;
        let i;
        if (score % 2 === 0) {
            nbGlyph = score / 2;
            grayGlyph = 5 - nbGlyph;
        } else {
            nbGlyph = Math.floor(score / 2);
            lastHalf = true;
            grayGlyph = 5 - nbGlyph - 1;
        }
        for (i = 0; i < nbGlyph; i += 1) {
            glyphs.push(<span key={`glyph-${glyph}-${i}`} className={classes} />);
        }
        if (lastHalf) {
            glyphs.push(<span key={`glyph-${glyph}-half`} className={`${classes} half`} />);
            glyphs.push(<span key={`glyph-${glyph}-half-2`} className={`${classes} other-half`} />);
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
        const { card } = this.props;
        return (
            <div className="panel panel-default card">
                <div className="panel-body">
                    <div className="col-lg-10">
                        <h2>{card.title}</h2>
                        <p>{card.description}</p>
                    </div>
                    <div className="col-lg-2">
                        {this.renderGlyph('trash', card.waste_reduction_score)}
                    </div>
                </div>
            </div>
        );
    };
}

ShortCardView.propTypes = {
    card: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        waste_reduction: PropTypes.number.isRequired,
        waste_reduction_score: PropTypes.number.isRequired,
        difficulty_score: PropTypes.number.isRequired,
        cost_score: PropTypes.number.isRequired,
    }).isRequired,
    // TODO usercard fetch
    //        token: PropTypes.string.isRequired,
    //        actions: PropTypes.shape({
    //            usercardsFetch: PropTypes.func.isRequired
    //        }).isRequired
};

const mapStateToProps = state => ({
    token: state.auth.token,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ShortCardView);
export { ShortCardView as ShortCardViewNotConnected };
