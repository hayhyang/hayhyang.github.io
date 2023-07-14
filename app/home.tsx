import { PostsData } from "@/types";
import Link from "next/link";

interface HomeProps {
  posts: PostsData[];
}

const Home = ({ posts }: HomeProps) => {
  return (
    <section>
      <ul className="list">
        {posts.map(({ id, date, title }) => (
          <li key={id} className="item">
            <Link href={id} rel="noopener noreferrer">
              <h2>{title}</h2>
              <span>{date}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Home;
