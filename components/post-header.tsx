const PostHeader = ({ title, date }: any) => {
  return (
    <>
      <h2>
        {title} <span>-&gt;</span>
      </h2>
      <span>{date}</span>
    </>
  );
};
