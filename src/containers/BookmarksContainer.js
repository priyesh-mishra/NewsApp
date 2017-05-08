import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadBookmark } from '../actions/bookmarkActions';
import { addBookmark } from '../actions/bookmarkActions';
import NewsFeed from '../components/NewsFeed';
import { bookmarkedNewsSelector } from '../selectors/newsSelectors';

const mapStateToProps = state => ({
    news: bookmarkedNewsSelector(state)
});

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        loadBookmark,
        addBookmark
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(NewsFeed);