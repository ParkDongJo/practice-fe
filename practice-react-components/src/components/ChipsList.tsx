import React from 'react'
const ELLIPSIS = '\u2026';

interface ChipListProps {
  chips?: { label: string }[];
  maxChips?: number;
  maxTextLength?: number;
}

interface ChipProps {
  label: string;
}

export const ChipsList = ({ chips, maxChips, maxTextLength }: ChipListProps) => {

  const exampleChip = { label: '1123456' };
  const index = 0;



  return (
    <section style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <div
        style={{
          border: '1px solid #bbb',
          padding: '4px',
          borderRadius: '4px',
         }}
         data-testid={`chip-${index}`}
         key={index}
      >
        {exampleChip.label}
      </div>
      <aside data-testid="exceeding-text">{0} more items</aside>
    </section>
  )
}

/*

표시되는 칩(chip)의 개수는 maxChips 파라미터에 의해 제한되어야 한다.

표시 가능한 칩의 최대 개수를 초과한 경우,
초과된 칩 개수를 aside 요소에
data-testid="exceeding-text" 속성과 함께 표시해야 한다.

각 칩 안의 텍스트 길이는 maxTextLength 파라미터로 제한되어야 한다.

칩 안의 텍스트가 maxTextLength를 초과할 경우,
마지막 허용 문자 뒤에 말줄임표(…) 를 붙여야 한다.

파라미터가 아예 전달되지 않았거나, chips 배열이 비어 있다면,
빈 React Fragment를 반환해야 한다.

다음과 같은 **엣지 케이스(예외 상황)**를 처리해야 한다:

컴포넌트에 데이터가 전달되지 않은 경우

chips 배열이 빈 배열인 경우

chips, maxChips, maxTextLength가 다양한 조합으로 전달되는 모든 경우

maxChips 또는 maxTextLength 값이 0 이하인 경우

App 컴포넌트와 ChipList 컴포넌트의 export 방식은 변경하지 말아야 한다.

ChipList 컴포넌트가 Unit Test(단위 테스트)의 대상이다.
App 컴포넌트는 Preview 탭에서 동작을 시뮬레이션하기 위한 용도이며,
Unit Test에서는 사용되지 않는다.

칩은 chips 배열에 주어진 순서대로 그대로 보여야 한다.
각 칩에는 올바른 index 값을 data-testid 속성에 넣어야 한다.
*/