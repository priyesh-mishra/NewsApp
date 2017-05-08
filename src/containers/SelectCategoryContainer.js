import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectCategory } from '../actions/newsActions';
import NewsCategory from '../components/NewsCategory';

const mapStateToProps = state => ({
    selectedCategory: state
});

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        selectCategory
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(NewsCategory); 