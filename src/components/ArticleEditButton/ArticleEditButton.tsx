import { Link } from "react-router-dom";

function ArticleEditButton({ slug }: { slug: string }) {
  return (
    <Link
      className="btn btn-sm btn-outline-secondary action-btn"
      to={`/editor/${slug}`}
    >
      <i className="ion-edit"></i>
      &nbsp; Edit Article
    </Link>
  );
}

export default ArticleEditButton;
