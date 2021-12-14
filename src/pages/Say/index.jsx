import { connect } from 'react-redux';
import PageTitle from '../../components/Blog/Content/PageTitle';
import { avatarUrl } from '../../utils/constant';
import { setNavShow } from '../../redux/actions';
import moment from 'moment';
import useToTop from '../../hooks/useToTop';
import './index.css';

const Say = ({ says, setNavShow }) => {
    // 返回顶部
    useToTop(setNavShow);
    return (
        <>
            <PageTitle title="自言自语" />
            <div className="standard-page-box theme-color">
                {says.map(item => (
                    <div className="say-item" key={item._id}>
                        <div className="say-avatar-box animated bounceInLeft">
                            <img src={avatarUrl} alt="avatar" className="say-avatar" />
                        </div>

                        <div className="say-content-box">
                            <div className="animated bounceInRight">
                                <div className="say-content theme-color-1">
                                    {item.content}
                                    <span className="say-content-date theme-color-2 common-hover">
                                        {moment(item.date).format('YYYY-MM-DD HH:mm:ss')}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default connect(
    state => ({
        says: state.says,
    }),
    { setNavShow }
)(Say);
