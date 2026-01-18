import React, { useState, useEffect } from 'react';
import './App.css';
import MemoItem from './components/MemoItem';
import SearchBar from './components/SearchBar';

function App() {
  const [memos, setMemos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // 로컬 스토리지에서 메모 불러오기
  useEffect(() => {
    const savedMemos = localStorage.getItem('memos');
    if (savedMemos) {
      setMemos(JSON.parse(savedMemos));
    }
  }, []);

  // 메모가 변경될 때마다 로컬 스토리지에 저장
  useEffect(() => {
    localStorage.setItem('memos', JSON.stringify(memos));
  }, [memos]);

  // 새 메모 생성
  const handleNewMemo = () => {
    const newMemo = {
      id: Date.now(),
      title: '',
      content: '',
      isEditing: true,
      createdAt: new Date().toISOString(),
    };
    setMemos([newMemo, ...memos]);
  };

  // 메모 수정 모드 전환
  const handleEdit = (id) => {
    setMemos(memos.map(memo =>
      memo.id === id ? { ...memo, isEditing: true } : { ...memo, isEditing: false }
    ));
  };

  // 메모 저장
  const handleSave = (id, title, content) => {
    setMemos(memos.map(memo =>
      memo.id === id
        ? { ...memo, title, content, isEditing: false }
        : memo
    ));
  };

  // 메모 삭제
  const handleDelete = (id) => {
    setMemos(memos.filter(memo => memo.id !== id));
  };

  // 검색 필터링
  const filteredMemos = memos.filter(memo => {
    const query = searchQuery.toLowerCase();
    return (
      memo.title.toLowerCase().includes(query) ||
      memo.content.toLowerCase().includes(query)
    );
  });

  return (
    <div className="App">
      <div className="app-container">
        <header className="app-header">
          <h1>메모장</h1>
          <button className="new-memo-btn" onClick={handleNewMemo}>
            새 메모
          </button>
        </header>

        <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

        <div className="memos-container">
          {filteredMemos.length === 0 ? (
            <div className="empty-state">
              {searchQuery ? '검색 결과가 없습니다.' : '메모가 없습니다. 새 메모를 만들어보세요!'}
            </div>
          ) : (
            filteredMemos.map(memo => (
              <MemoItem
                key={memo.id}
                memo={memo}
                onEdit={handleEdit}
                onSave={handleSave}
                onDelete={handleDelete}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
