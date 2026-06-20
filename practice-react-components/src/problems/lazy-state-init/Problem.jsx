import { useState } from 'react';

/**
 * 문제: 이 컴포넌트는 매 렌더링마다 buildSearchIndex()가 실행됩니다.
 * buildSearchIndex()가 최초 1회만 실행되도록 수정하세요.
 *
 * 힌트: useState의 초기값 전달 방식을 변경해보세요.
 */

// 비용이 큰 연산을 시뮬레이션하는 함수
function buildSearchIndex(items) {
  console.log('🔨 Building search index... (비용이 큰 연산)');

  // 실제로는 더 복잡한 인덱싱 로직이 들어갑니다
  const index = new Map();
  items.forEach((item) => {
    const words = item.name.toLowerCase().split(' ');
    words.forEach((word) => {
      if (!index.has(word)) {
        index.set(word, []);
      }
      index.get(word).push(item);
    });
  });

  return index;
}

// 샘플 데이터
const SAMPLE_ITEMS = [
  { id: 1, name: 'Apple iPhone 15 Pro' },
  { id: 2, name: 'Samsung Galaxy S24' },
  { id: 3, name: 'Google Pixel 8' },
  { id: 4, name: 'Apple MacBook Pro' },
  { id: 5, name: 'Microsoft Surface Pro' },
  { id: 6, name: 'Apple iPad Air' },
  { id: 7, name: 'Samsung Galaxy Tab' },
  { id: 8, name: 'Google Nest Hub' },
];

export default function FilteredList() {
  // ❌ 문제: 이 코드는 매 렌더링마다 buildSearchIndex()를 실행합니다
  const [searchIndex] = useState(buildSearchIndex(SAMPLE_ITEMS));
  const [query, setQuery] = useState('');

  // 검색 로직
  const results = query
    ? Array.from(searchIndex.get(query.toLowerCase()) || [])
    : SAMPLE_ITEMS;

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>제품 검색</h2>
      <p style={{ color: '#666', fontSize: '14px' }}>
        콘솔을 열고 "Building search index..." 로그가 몇 번 출력되는지
        확인하세요.
        <br />
        검색어를 입력할 때마다 로그가 출력되면 문제가 있는 것입니다!
      </p>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="검색어 입력 (예: apple, samsung, google)"
        style={{
          padding: '10px',
          fontSize: '16px',
          width: '300px',
          marginBottom: '20px',
        }}
      />

      <div>
        <h3>검색 결과 ({results.length}개)</h3>
        <ul>
          {results.map((item) => (
            <li key={item.id} style={{ padding: '5px 0' }}>
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
