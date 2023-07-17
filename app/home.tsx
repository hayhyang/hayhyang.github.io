import Link from "next/link";

interface HomeProps {
  posts: any[];
}

const Home = ({ posts }: HomeProps) => {
  return (
    <section>
      <ul className="list">
        {posts.map(({ slug, date, title, excerpt }) => (
          <li key={slug} className="item">
            <Link as={`/${slug}`} href="/[slug]">
              <h3>{title}</h3>
              <p>{excerpt}</p>
              <span>{date}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Home;
