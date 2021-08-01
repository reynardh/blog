import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { setNavShow } from '../../../redux/actions';
import './index.css';

const ArticleAside = props => {
    const [tocArr, setTocArr] = useState([]);
    useEffect(() => {
        const reg = /(#+)\s+?(.+?)\n/g;
        let regExecRes = null;
        const toc = [];
        while ((regExecRes = reg.exec(props.content))) {
            toc.push({
                level: regExecRes[1].length,
                title: regExecRes[2],
            });
        }
        setTocArr(toc);
    }, [props]);
    return (
        // <div className="wow bounceInRight">
        <div className="aside-box">
            <ul className="aside-ul wow bounceInRight">
                {tocArr.map((item, index) => {
                    return (
                        <li
                            key={index}
                            className={
                                item.level === 2
                                    ? 'tocPadding24'
                                    : item.level === 3
                                    ? 'tocPadding48'
                                    : item.level === 4
                                    ? 'tocPadding72'
                                    : ''
                            }
                        >
                            <a
                                className="tocLink common-hover"
                                onClick={() => {
                                    props.setNavShow(false);
                                }}
                                href={`#${item.title.split('. ')[0]}-${item.title.split(' ')[1]}`}
                            >
                                {item.title}
                            </a>
                        </li>
                    );
                })}
            </ul>
        </div>
        // </div>
    );
};

export default connect(() => ({}), { setNavShow })(ArticleAside);
