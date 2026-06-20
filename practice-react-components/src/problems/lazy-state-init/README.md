# 문제 3-1: Lazy State Initialization

## 난이도: 하

## 관련 규칙: `rerender-lazy-state-init`

---

## 문제 설명

아래 `FilteredList` 컴포넌트는 성능 문제가 있습니다.

`buildSearchIndex()` 함수는 비용이 큰 연산(약 100ms)인데,
현재 코드에서는 **매 렌더링마다** 이 함수가 실행됩니다.

검색어를 입력할 때마다 컴포넌트가 리렌더링되고,
그때마다 `buildSearchIndex()`가 불필요하게 다시 실행됩니다.

---

## 요구사항

1. `buildSearchIndex()`가 **최초 1회만** 실행되도록 수정하세요
2. 기존 기능(검색)은 그대로 동작해야 합니다
3. `useMemo`를 사용하지 않고 `useState`만으로 해결하세요

---

## 힌트

- `useState`의 초기값으로 **함수를 전달**하면 어떻게 될까요?
- `useState(value)` vs `useState(() => value)`의 차이점은?

---

## 시작하기

```bash
# Problem.jsx 파일을 수정하세요
# Solution.jsx는 정답 참고용입니다
```

---

## 확인 방법

1. 콘솔에서 "Building search index..." 로그가 몇 번 출력되는지 확인
2. 검색어 입력 시 로그가 반복 출력되면 ❌ (아직 미해결)
3. 최초 1회만 출력되면 ✅ (해결!)
