# Blog

### 개발환경

- [Next.js](https://nextjs.org/)

### 구조

- `components`
  - `Layout.tsx` : 페이지 레이아웃
- `lib`
  - `posts.ts` : '\_\_posts' 경로의 마크다운 파일을 객체로 반환
- `pages` : Routes
  - `[id].tsx` : post 상세페이지
  - `index.tsx` : post 목록페이지
- `styles` : css module
- `types` : 타입 정의

### 참고

- [Pre-rendering and Data Fetching](https://nextjs.org/learn/basics/data-fetching)
- [Dynamic Routes](https://nextjs.org/learn/basics/dynamic-routes)
