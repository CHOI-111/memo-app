import React, { useState, useEffect } from 'react';
import './MemoItem.css';

function MemoItem({ memo, onEdit, onSave, onDelete }) {
  const [title, setTitle] = useState(memo.title || '');
  const [content, setContent] = useState(memo.content || '');

  useEffect(() => {
    setTitle(memo.title || '');
    setContent(memo.content || '');
  }, [memo]);

  const handleSave = () => {
    if (title.trim() || content.trim()) {
      onSave(memo.id, title.trim(), content.trim());
    }
  };

  const handleCancel = () => {
    setTitle(memo.title || '');
    setContent(memo.content || '');
    onSave(memo.id, memo.title || '', memo.content || '');
  };

  if (memo.isEditing) {
    return (
      <div className="memo-item editing">
        <div className="memo-form">
          <input
            type="text"
            className="memo-title-input"
            placeholder="제목을 입력하세요..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
          <textarea
            className="memo-content-input"
            placeholder="내용을 입력하세요..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={8}
          />
          <div className="memo-actions">
            <button className="save-btn" onClick={handleSave}>
              저장
            </button>
            <button className="cancel-btn" onClick={handleCancel}>
              취소
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="memo-item">
      <div className="memo-header">
        {memo.title ? (
          <h3 className="memo-title">{memo.title}</h3>
        ) : (
          <h3 className="memo-title empty">제목 없음</h3>
        )}
        <div className="memo-buttons">
          <button className="edit-btn" onClick={() => onEdit(memo.id)}>
            수정
          </button>
          <button className="delete-btn" onClick={() => onDelete(memo.id)}>
            삭제
          </button>
        </div>
      </div>
      {memo.content && (
        <div className="memo-content">{memo.content}</div>
      )}
      {!memo.title && !memo.content && (
        <div className="memo-content empty">내용이 없습니다.</div>
      )}
    </div>
  );
}

export default MemoItem;
