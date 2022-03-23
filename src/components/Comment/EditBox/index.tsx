import { useKeyPress, useMemoizedFn, useSafeState } from 'ahooks';
import { message } from 'antd';
import classNames from 'classnames';
import React, { useRef } from 'react';
import sanitizeHtml from 'sanitize-html';

import { DB } from '@/utils/apis/dbConfig';
import { setData } from '@/utils/apis/setData';
import {
  avatarArrLen,
  defaultCommentAvatar,
  defaultCommentAvatarArr
} from '@/utils/constant';
import { getRandomNum } from '@/utils/function';

import AdminBox from './AdminBox';
import Emoji from './Emoji';
import s from './index.scss';
import { useEmoji } from './useEmoji';

interface Props {
  msgRun?: Function;
  titleEng?: string;
}

const EditBox: React.FC<Props> = ({ msgRun, titleEng }) => {
  const nameRef = useRef(null);
  const [showAdmin, setShowAdmin] = useSafeState(false);
  const { textRef, text, setText, setStart } = useEmoji();

  const [name, setName] = useSafeState('');
  const [email, setEmail] = useSafeState('');
  const [link, setLink] = useSafeState('');
  const [avatar, setAvatar] = useSafeState('');

  const validateConfig = {
    name: {
      check: /^[\u4e00-\u9fa5_a-zA-Z0-9]{2,8}$/,
      content: name,
      errText: '昵称仅限中文、数字、字母，长度2~8！'
    },
    email: {
      check: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/,
      content: email,
      errText: '请输入正确的邮箱地址！'
    },
    link: {
      check: /^$|^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/,
      content: link,
      errText: '请输入正确的url，或不填！'
    },
    text: {
      check: /^[\s\S]*.*[^\s][\s\S]*$/,
      content: text,
      errText: '请输入内容再发布~'
    }
  };

  const validate = useMemoizedFn(() => {
    Object.keys(validateConfig).forEach(item => {
      const { check, errText, content } =
        validateConfig[item as keyof typeof validateConfig];
      if (!check.test(content!)) {
        message.error(errText);
        throw new Error('breakForEach');
      }
    });
  });

  const submit = useMemoizedFn(async () => {
    try {
      validate();

      const config = {
        DBName: DB.Msg,
        name: sanitizeHtml(name),
        email: sanitizeHtml(email),
        link: sanitizeHtml(link),
        content: sanitizeHtml(text),
        date: new Date().getTime(),
        avatar: avatar
          ? avatar
          : defaultCommentAvatarArr[getRandomNum(0, avatarArrLen - 1)],
        postTitle: titleEng!,
        replyId: ''
      };

      const isTrue = await setData(config);

      if (isTrue) {
        message.success('发布留言成功！');
        setText('');
        msgRun?.();
      } else {
        message.error('发布失败，请重试！');
      }
    } catch {}
  });

  useKeyPress(
    13,
    () => {
      if (name === 'admin') setShowAdmin(true);
    },
    {
      target: nameRef
    }
  );

  return (
    <div className={s.editBox}>
      <AdminBox
        showAdmin={showAdmin}
        setShowAdmin={setShowAdmin}
        setName={setName}
        setEmail={setEmail}
        setLink={setLink}
        setAvatar={setAvatar}
      />
      <div className={s.avatarBox}>
        <img src={avatar || defaultCommentAvatar} alt='avatar' className={s.editAvatar} />
      </div>
      <div className={s.editInputBox}>
        <div className={s.inputBox}>
          <div className={classNames(s.inputInfo, s.flex2)}>
            <div className={s.inputKey}>昵称</div>
            <input
              ref={nameRef}
              type='text'
              className={s.inputValue}
              placeholder='试试QQ号~'
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div className={classNames(s.inputInfo, s.flex3)}>
            <div className={s.inputKey}>邮箱</div>
            <input
              type='text'
              className={s.inputValue}
              placeholder='必填'
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className={classNames(s.inputInfo, s.flex3)}>
            <div className={s.inputKey}>网址</div>
            <input
              type='text'
              className={s.inputValue}
              placeholder='选填'
              value={link}
              onChange={e => setLink(e.target.value)}
            />
          </div>
        </div>

        <div className={s.textareaBox}>
          <textarea
            onSelect={() => setStart(textRef.current?.selectionStart as number)}
            ref={textRef}
            className={s.textarea}
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder='写点什么吗？&#10;可以在「昵称」处填写QQ号，自动获取「头像」和「QQ邮箱」！'
          />
        </div>
        <div className={s.commentBtns}>
          <Emoji />
          <div className={s.previewBtn}>预览</div>
          <div className={s.sendBtn} onClick={submit}>
            发布
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBox;
