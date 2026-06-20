# 프론트단에서 해볼 수 있는 실험 및 연습 모음

https://www.reacterry.com/portal/challenges

# GreatFrontend 에서 참고할 것들

### React 관련 코드 기반 인터뷰 대비

https://www.greatfrontend.com/questions/react-interview-questions

### React 관련 개념 기반 인터뷰 대비

핵심 키워드 : https://www.greatfrontend.com/react-interview-playbook/react-interview-preparation
https://www.greatfrontend.com/questions/react-interview-questions/quiz

---

# Best Practices 기반 React 라이브 코딩 문제

`.claude/skills/best-practices` 규칙을 기반으로 만들 수 있는 코딩 문제 목록

## 1. 비동기 처리 (Async) - CRITICAL

### 문제 1-1: Promise.all 병렬 처리
- **난이도**: 중
- **규칙**: `async-parallel`
- **설명**: 순차적으로 실행되는 API 호출을 병렬로 최적화하기
- **출제 형식**: 잘못된 코드를 주고 최적화하게 하기
```tsx
// Before: 3번의 순차 호출 (3초)
const user = await fetchUser()
const posts = await fetchPosts()
const comments = await fetchComments()

// After: 병렬 호출 (1초)
const [user, posts, comments] = await Promise.all([...])
```

### 문제 1-2: 데이터 의존성이 있는 병렬 처리
- **난이도**: 상
- **규칙**: `async-dependencies`
- **설명**: 일부 API가 다른 API 결과에 의존할 때 최적의 병렬화 구현
- **출제 형식**: 복잡한 의존성 그래프를 주고 최적화하게 하기

---

## 2. 번들 최적화 (Bundle) - CRITICAL

### 문제 2-1: Dynamic Import 구현
- **난이도**: 중
- **규칙**: `bundle-dynamic-imports`
- **설명**: 무거운 컴포넌트(차트, 에디터 등)를 동적 로딩으로 분리
- **출제 형식**: 정적 import를 동적 import로 변환하기
```tsx
// Before
import { HeavyChart } from './HeavyChart'

// After
const HeavyChart = dynamic(() => import('./HeavyChart'), { ssr: false })
```

### 문제 2-2: Barrel Import 최적화
- **난이도**: 하
- **규칙**: `bundle-barrel-imports`
- **설명**: index.ts barrel export를 직접 import로 변환
- **출제 형식**: 트리 쉐이킹이 안 되는 코드를 최적화하기

---

## 3. 리렌더링 최적화 (Re-render) - MEDIUM

### 문제 3-1: Lazy State Initialization
- **난이도**: 하
- **규칙**: `rerender-lazy-state-init`
- **설명**: useState 초기값에 비용이 큰 연산이 있을 때 함수 형태로 변환
- **출제 형식**: 매 렌더마다 실행되는 초기화 코드를 수정하기
```tsx
// Before (매 렌더마다 실행)
const [data, setData] = useState(JSON.parse(localStorage.getItem('data')))

// After (최초 1회만 실행)
const [data, setData] = useState(() => JSON.parse(localStorage.getItem('data')))
```

### 문제 3-2: Functional setState
- **난이도**: 중
- **규칙**: `rerender-functional-setstate`
- **설명**: stale closure 문제가 있는 코드를 함수형 setState로 수정
- **출제 형식**: 버그가 있는 카운터/리스트 컴포넌트 수정하기
```tsx
// Before (stale closure 위험)
const addItem = useCallback(() => {
  setItems([...items, newItem])
}, [items])

// After (안전)
const addItem = useCallback((newItem) => {
  setItems(curr => [...curr, newItem])
}, [])
```

### 문제 3-3: Memo를 활용한 Early Return
- **난이도**: 중
- **규칙**: `rerender-memo`
- **설명**: loading 상태에서도 비싼 연산이 실행되는 문제 해결
- **출제 형식**: 불필요한 연산을 피하도록 컴포넌트 분리하기

### 문제 3-4: Derived State (파생 상태)
- **난이도**: 중
- **규칙**: `rerender-derived-state`
- **설명**: 연속적인 값 변화에 리렌더링 줄이기 (useMediaQuery 구현)
- **출제 형식**: useWindowWidth() → useMediaQuery() 변환
```tsx
// Before (픽셀마다 리렌더)
const width = useWindowWidth()
const isMobile = width < 768

// After (불린 변경 시에만 리렌더)
const isMobile = useMediaQuery('(max-width: 767px)')
```

### 문제 3-5: Effect를 Event Handler로 이동
- **난이도**: 중
- **규칙**: `rerender-move-effect-to-event`
- **설명**: 상태+effect로 모델링된 액션을 이벤트 핸들러로 변환
- **출제 형식**: submit 플래그 + effect 패턴을 직접 호출로 변경

### 문제 3-6: useSearchParams 구독 최적화
- **난이도**: 중상
- **규칙**: `rerender-defer-reads`
- **설명**: 콜백에서만 사용되는 searchParams를 on-demand로 읽기
- **출제 형식**: 불필요한 구독을 제거하기

---

## 4. 렌더링 성능 (Rendering) - MEDIUM

### 문제 4-1: 조건부 렌더링 버그 수정
- **난이도**: 하
- **규칙**: `rendering-conditional-render`
- **설명**: `&&` 연산자로 인한 0/NaN 렌더링 버그 수정
- **출제 형식**: count가 0일 때 "0"이 화면에 보이는 버그 수정
```tsx
// Before (count=0 일 때 "0" 렌더링)
{count && <Badge>{count}</Badge>}

// After
{count > 0 ? <Badge>{count}</Badge> : null}
```

---

## 5. JavaScript 성능 (JS) - LOW-MEDIUM

### 문제 5-1: Set/Map을 활용한 O(1) 탐색
- **난이도**: 하
- **규칙**: `js-set-map-lookups`
- **설명**: includes()를 사용한 O(n) 탐색을 Set으로 O(1)로 변환
- **출제 형식**: 필터링 로직 최적화하기
```tsx
// Before O(n)
const allowedIds = ['a', 'b', 'c']
items.filter(item => allowedIds.includes(item.id))

// After O(1)
const allowedIds = new Set(['a', 'b', 'c'])
items.filter(item => allowedIds.has(item.id))
```

### 문제 5-2: 배열 순회 최적화
- **난이도**: 중
- **규칙**: `js-combine-iterations`
- **설명**: 여러 번의 filter/map을 한 번의 순회로 합치기
- **출제 형식**: 3번 순회하는 코드를 1번으로 줄이기

---

## 6. Custom Hook 구현 문제

### 문제 6-1: useDebounce 구현
- **난이도**: 중
- **적용 규칙**: `advanced-use-latest`, `rerender-functional-setstate`
- **설명**: 검색 입력에 디바운스를 적용하는 훅 구현

### 문제 6-2: useLocalStorage 구현
- **난이도**: 중
- **적용 규칙**: `rerender-lazy-state-init`, `client-localstorage-schema`
- **설명**: localStorage와 동기화되는 상태 훅 구현

### 문제 6-3: useMediaQuery 구현
- **난이도**: 중상
- **적용 규칙**: `rerender-derived-state`, `client-event-listeners`
- **설명**: 미디어 쿼리 매칭 여부를 반환하는 훅 구현

### 문제 6-4: useKeyboardShortcut 구현
- **난이도**: 상
- **적용 규칙**: `client-event-listeners` (이벤트 리스너 중복 제거)
- **설명**: 전역 키보드 단축키를 처리하는 훅 구현

---

## 7. 종합 리팩토링 문제

### 문제 7-1: 비효율적인 컴포넌트 최적화
- **난이도**: 상
- **적용 규칙**: 복합
- **설명**: 여러 가지 안티패턴이 포함된 컴포넌트를 종합적으로 리팩토링
- **포함 안티패턴**:
  - 순차적 API 호출
  - 매 렌더마다 실행되는 초기화
  - stale closure
  - 불필요한 리렌더링

### 문제 7-2: TodoList 성능 최적화
- **난이도**: 중상
- **적용 규칙**: `rerender-memo`, `rerender-functional-setstate`, `js-set-map-lookups`
- **설명**: 1000개 아이템이 있는 TodoList의 성능 문제 해결

---

## 출제 형식 예시

### 형식 A: 버그 수정
> "다음 코드에서 버그를 찾고 수정하세요"

### 형식 B: 성능 최적화
> "다음 코드의 성능 문제를 분석하고 최적화하세요"

### 형식 C: 처음부터 구현
> "다음 요구사항을 만족하는 훅/컴포넌트를 구현하세요"

### 형식 D: 코드 리뷰
> "다음 코드를 리뷰하고 개선점을 제시하세요"
