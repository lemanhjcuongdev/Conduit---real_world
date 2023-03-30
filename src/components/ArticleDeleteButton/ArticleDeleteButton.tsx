/* eslint-disable no-restricted-globals */
import { useNavigate } from "react-router-dom";
import { deleteArticleDetailAPI } from "../../api/article";

interface IDeleteBtnProps {
  slug: string;
}

function ArticleDeleteButton(props: IDeleteBtnProps) {
  const { slug } = props;
  const navigate = useNavigate();

  const handleDeleteArticle = () => {
    if (confirm("Are you sure to delete this article?")) {
      deleteArticleDetailAPI(slug)
        .then(() => {
          navigate(`/`);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  return (
    <button
      className="btn btn-outline-danger btn-sm"
      onClick={handleDeleteArticle}
    >
      <i className="ion-trash-a"></i>
      &nbsp; Delete Article
    </button>
  );
}

export default ArticleDeleteButton;
