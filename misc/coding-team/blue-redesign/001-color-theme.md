# 001 — 색상 테마 변경 (푸른 계열)

## Context
현재 `quartz.config.ts`의 색상 팔레트가 모노크롬 + 레드 액센트(`#c83232`)로 설정되어 있다. 밝고 청량한 푸른 계열로 변경해야 한다.

## Objective
라이트/다크 모드 모두 푸른 계열 색상으로 교체한다.

## Scope
- `quartz.config.ts` — `theme.colors.lightMode` / `theme.colors.darkMode` 값 변경
- `quartz/styles/custom.scss` — 하드코딩된 색상이 있으면 함께 수정 (현재는 없을 것으로 예상)

## 색상 방향

### 라이트 모드
- 배경(`light`): 깨끗한 흰색 또는 아주 살짝 푸른 흰색
- 액센트(`secondary`): 선명하지만 눈에 편한 블루 (예: `#2563eb` 계열)
- 호버(`tertiary`): secondary보다 약간 밝은 블루
- `highlight` / `textHighlight`: 블루 기반 반투명
- `gray`, `darkgray`, `dark` 등 텍스트 계열: 기존 모노크롬 톤 유지하되, 약간 쿨톤(블루 언더톤)으로 조정

### 다크 모드
- 배경(`light`): 짙은 네이비/다크 블루 (예: `#0f172a` ~ `#1e293b` 계열)
- 액센트(`secondary`): 밝은 스카이블루 (예: `#38bdf8` ~ `#60a5fa`)
- 나머지도 블루 톤 기반으로 조화롭게

## Non-goals
- 폰트 변경 없음
- 레이아웃 변경 없음
- 코드 하이라이팅 테마 변경 없음

## Constraints
- Quartz의 색상 토큰 구조(`light`, `lightgray`, `gray`, `darkgray`, `dark`, `secondary`, `tertiary`, `highlight`, `textHighlight`)를 그대로 사용
- 가독성 확보: 텍스트/배경 간 충분한 대비 유지
