import { connect } from 'react-redux';
import { useEffect } from 'react';
import PageTitle from '../../components/Blog/Content/PageTitle';
import { avatarUrl } from '../../utils/constant';
import { setNavShow } from '../../redux/actions';
import moment from 'moment';
import './index.css';

const Say = props => {
    // 返回顶部
    useEffect(() => {
        window.scrollTo(0, 0);
        props.setNavShow(true);
    }, [props]);
    return (
        <>
            <PageTitle title="自言自语" />
            <div className="standard-page-box">
                {props.says.map(item => (
                    <div className="say-item" key={item._id}>
                        <div className="say-avatar-box animated bounceInLeft">
                            <img src={avatarUrl} alt="avatar" className="say-avatar" />
                        </div>

                        <div className="say-content-box">
                            <div className="animated bounceInRight">
                                <div className="say-content">
                                    {item.content}
                                    <span className="say-content-date common-hover">
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
