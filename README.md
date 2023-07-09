# Blog

### 개발환경

- [Next.js](https://nextjs.org/)
- gray-matter: `.md`의 frontmatter를 matter 메서드를 사용해 객체로 변환
- remark: `.md`을 javascript로 변환
- remark-html: remark로 파싱한 데이터를 html로 변환

### 구조

- `components`
  - `Layout.tsx` : 페이지 레이아웃
- `lib`
  - `posts.ts` : '\_\_posts' 경로의 마크다운 파일을 객체로 반환
- `pages` : Routes
  - `[id].tsx` : `/[id]` 경로의 post 상세페이지
  - `index.tsx` : `/` 경로의 post 목록페이지
- `styles` : css module
- `types` : 타입 정의

### 참고

[Pre-rendering and Data Fetching](https://nextjs.org/learn/basics/data-fetching)
<br />
[Dynamic Routes](https://nextjs.org/learn/basics/dynamic-routes)
