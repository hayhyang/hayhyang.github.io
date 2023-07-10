# Next.js로 마크다운 블로그 만들기

## :: 기본 개념, Pre-rendering and Data Fetching

### Pre-rendering

Next.js가 사전렌더링을 하는 방식은 크게 두 가지다.

#### SSG

빌드타임에 HTML을 생성하는 방법이다. 빌드 후에도 데이터가 바뀌지 않는 페이지에 적합하다.

#### SSR

각 요청마다 서버에서 HTML을 생성하는 방법이다. 동적으로 데이터가 바뀌는 경우에 적합하다.

> production모드에서는 빌드타임에만 실행되지만 development모드에서는 요청시마다 실행된다.

### Data Fetching

페이지 콘텐츠가 외부 데이터에 의존하는 경우 정적생성을 위해 다음과 같은 메서드를 사용한다.
모든 메서드는 페이지단에서만 사용할 수 있다. 페이지가 렌더링되기 전에 데이터가 주입되어야 하기 때문이다.

#### getServerSideProps

SSR방식으로 외부 데이터를 서버에서 받아와 초기 데이터로 설정하고 페이지로 전달한다. 페이지 요청시마다 실행된다. getStaticProps보다 성능이 떨어지지만 동적으로 데이터를 가져와 업데이트가 가능하다.(Dynamic Rendering)
이 메서드는 정말 필요할 때만 사용하는 것이 좋다. CDN에 캐싱되지 않기 때문에 느리다.
데이터를 미리 가져올 필요가 없다면 클라이언트 측에서 데이터를 가져오는 것도 좋다.

#### getStaticProps

정적사이트를 생성(SSG)할 때 사용하며 빌드타임에 실행되어 리액트 컴포넌트가 받을 props를 리턴한다.

```javascript
export const getStaticProps = async (context) => {
  const res = await fetch("https://...");
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
};
```

동적 경로를 사용하는 페이지라면 getStaticPaths 메서드를 함께 사용하여 정적으로 생성할 페이지의 경로를 지정해야 한다.

> getServerSideProps, getStaticProps의 매개변수와 반환값은 동일한 형태를 갖는다.
>
> #### 매개변수 context
>
> > params: 동적 경로 정보<br />
> > req: HTTP request object<br />
> > res: HTTP response object<br />
> > query: 쿼리 문자열<br />
> > preview: preview mode 여부
> > previewData: setPreviewData로 설정된 데이터<br />
>
> #### 반환값 return
>
> > props: 해당 컴포넌트(페이지)로 반환할 값<br />
> > redirect: 값 내부와 외부 리소스 리디렉션을 허용한다.<br />
> > notFound: Boolean, 404에러를 반환한다.<br />

#### getStaticPaths

동적 경로를 사용하는 페이지에서 정적사이트를 생성할 때(SSG) 이 메서드에서 지정한 모든 경로를 정적으로 pre-rendering한다.

```javascript
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          [id]: "...",
        },
      },
    ],
  };
};
```

> SSG 메서드는 빌드타임에만 실행되지만 development모드에서는 요청시마다 실행된다.

## :: 마크다운 블로그 만들기

블로그는 외부 데이터(\_\_posts의 .md)를 불러와야 하고 실시간 데이터 변동이 없는 정적 사이트 이므로 SSG방식이 적합하다.

### 마크다운 파일 생성

`\_\_posts` 경로의 `.md`파일을 생성한다.<br/>
`[파일명].md` -> 파일명이 페이지의 경로/데이터의 id가 된다.<br/>
마크다운 파일의 맨 위에는 메타데이터 섹션이 있다. 이를 `frontmatter`문법이라고 한다.<br/>
메타데이터 영역 이후에는 마크다운 문법으로 문서를 작성하면 된다.

```markdown
--- <!-- 메타데이터 섹션 시작 -->

title: "Page Ttitle"
date: "2020-01-01"

--- <!-- 메타데이터 섹션 끝 -->

Next.js blah blah
```

### 마크다운 데이터 파싱

`/lib` 경로에 `posts.ts`를 생성하여 파일 시스템에서 데이터를 가져온다.<br />
데이터를 파싱하는데 필요한 모듈은 다음과 같다.

- fs: 파일 입출력 처리, `\_\_posts` 경로의 `.md`파일을 읽어오는데 사용
- path: 파일 경로 컨트롤
- gray-matter: `.md`의 `frontmatter`를 `matter` 메서드를 사용해 data객체로 변환
- remark: `.md`을 javascript로 변환
- remark-html: remark로 파싱한 데이터를 html로 변환

fs, path는 node.js 내장 모듈이므로 별도의 설치가 필요없다. <br/>
gray-matter, remark, remark-html 을 설치해준다.

```
npm install gray-matter remark remark-html
```

```typescript
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "__posts");

// '/' 경로의 post 목록 데이터 가져오기
export function getSortedPostsData(): PostsData[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");

    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const {
      data: { title, date },
    } = matter(fileContents);

    return {
      id,
      title,
      date,
    };
  });

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}
```

```typescript
// 동적 경로 경로의 post 데이터 가져오기
import { remark } from "remark";
import html from "remark-html";

export async function getPostData(id: PostData["id"]): Promise<PostData> {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const {
    data: { title, date },
    content,
  } = matter(fileContents);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    id,
    contentHtml,
    title,
    date,
  };
}
```

```typescript
// 동적 경로에서 생성할 정적 페이지의 지정
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}
```

### 데이터를 컴포넌트에 주입

getStaticProps, getStaticPaths

data fetching method를 사용하여 컴포넌트에 props로 데이터를 전달한다.

- index.tsx

```typescript
export default function Home({ posts }: PostsProps) {...}

export const getStaticProps = async () => {
  const posts = getSortedPostsData();
  return {
    props: {
      posts,
    },
  };
};
```

- [id].tsx

```typescript
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};
interface IParams extends ParsedUrlQuery {
  id: string;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params as IParams;
  const post = await getPostData(id);

  return {
    props: {
      post,
    },
  };
};
```

### 참고

[Pre-rendering and Data Fetching](https://nextjs.org/learn/basics/data-fetching)
<br />
[Dynamic Routes](https://nextjs.org/learn/basics/dynamic-routes)
