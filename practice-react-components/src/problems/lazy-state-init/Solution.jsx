import { useState } from 'react';

/**
 * 정답: useState에 함수를 전달하면 최초 1회만 실행됩니다.
 *
 * useState(buildSearchIndex(SAMPLE_ITEMS))  ← 매 렌더마다 실행
 * useState(() => buildSearchIndex(SAMPLE_ITEMS))  ← 최초 1회만 실행
 *
 * 이것을 "Lazy Initialization" 또는 "Lazy State Initialization"이라고 합니다.
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
  // ✅ 해결: 함수를 전달하면 최초 1회만 실행됩니다
  const [searchIndex] = useState(() => buildSearchIndex(SAMPLE_ITEMS));
  const [query, setQuery] = useState('');

  // 검색 로직
  const results = query
    ? Array.from(searchIndex.get(query.toLowerCase()) || [])
    : SAMPLE_ITEMS;

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>제품 검색 (최적화됨)</h2>
      <p style={{ color: 'green', fontSize: '14px' }}>
        ✅ 콘솔에서 "Building search index..." 로그가 최초 1회만 출력됩니다.
        <br />
        검색어를 입력해도 더 이상 로그가 출력되지 않습니다!
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

      <div
        style={{
          marginTop: '30px',
          padding: '15px',
          backgroundColor: '#f5f5f5',
          borderRadius: '8px',
        }}
      >
        <h4>핵심 포인트</h4>
        <pre
          style={{
            backgroundColor: '#282c34',
            color: '#abb2bf',
            padding: '15px',
            borderRadius: '4px',
            overflow: 'auto',
          }}
        >
          {`// ❌ 매 렌더마다 실행 (값을 전달)
useState(buildSearchIndex(items))

// ✅ 최초 1회만 실행 (함수를 전달)
useState(() => buildSearchIndex(items))`}
        </pre>

        <h4 style={{ marginTop: '15px' }}>언제 사용해야 하나요?</h4>
        <ul>
          <li>localStorage/sessionStorage에서 값을 읽을 때</li>
          <li>복잡한 데이터 구조를 초기화할 때</li>
          <li>DOM에서 값을 읽을 때</li>
          <li>비용이 큰 계산이 필요할 때</li>
        </ul>

        <h4 style={{ marginTop: '15px' }}>언제 필요 없나요?</h4>
        <ul>
          <li>
            단순 primitive 값: <code>useState(0)</code>
          </li>
          <li>
            props 참조: <code>useState(props.value)</code>
          </li>
          <li>
            빈 객체/배열: <code>useState([])</code>
          </li>
        </ul>
      </div>
    </div>
  );
}
