/* eslint-disable no-restricted-globals */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getArticleDetailAPI, updateArticleDetailAPI } from "../../api/article";
import Input from "../../components/Input/Input";
import TextArea from "../../components/Input/TextArea";
import TagItem from "../../components/TagItem/TagItem";
import { IArticleObjectProps } from "../Article/types";

function EditorExistArticlePage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const [tagList, setTagList] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [tag, setTag] = useState<string>("");

  //change page's title
  document.title = "Editor - Conduit";

  const slugFromPathname = location.pathname.split("/").pop() || "";

  //use hook to navigate after create article
  const navigate = useNavigate();

  useEffect(() => {
    getArticleDetailAPI(slugFromPathname).then((data: IArticleObjectProps) => {
      setTitle(data.article.title);
      setDescription(data.article.description);
      setBody(data.article.body);
      setTagList(data.article.tagList);
    });
  }, []);

  const handleAddToList = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tag.trim() !== "") {
      if (tagList.indexOf(tag) === -1) {
        setTagList((prev) => [...prev, tag.trim()]);
        setTag("");
      }
    }
  };

  const handleDelete = (tagIndex: number) => {
    tagList.splice(tagIndex, 1);
    setTagList([...tagList]);
  };

  const handlePublishArticle = () => {
    const updatingArticle = {
      article: {
        title: title.trim(),
        description: description.trim(),
        body: body.trim(),
        tagList: tagList,
      },
    };
    updateArticleDetailAPI(slugFromPathname, updatingArticle).then(
      (data: IArticleObjectProps) => {
        navigate(`/articles/${data.article.slug}`);
      }
    );
  };

  return (
    <div className="editor-page">
      {title && (
        <>
          <div className="container page">
            <div className="row">
              <div className="col-md-10 offset-md-1 col-xs-12">
                <ul className="error-messages">{error && <li>{error}</li>}</ul>
                <form>
                  <fieldset>
                    <fieldset className="form-group">
                      <Input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Article Title"
                        value={title}
                        setValue={setTitle}
                        setError={setError}
                      />
                    </fieldset>
                    <fieldset className="form-group">
                      <Input
                        type="text"
                        className="form-control"
                        value={description}
                        setValue={setDescription}
                        placeholder="What's this article about?"
                      />
                    </fieldset>
                    <fieldset className="form-group">
                      <TextArea
                        className="form-control"
                        rows={8}
                        value={body}
                        setValue={setBody}
                        placeholder="Write your article (in markdown)"
                      ></TextArea>
                    </fieldset>
                    <fieldset className="form-group">
                      <Input
                        type="text"
                        className="form-control"
                        value={tag}
                        setValue={setTag}
                        placeholder="Enter tags"
                        handleAddToList={handleAddToList}
                      />
                      <div className="tag-list">
                        {tagList.length > 0 &&
                          tagList.map((tag, index) => (
                            <TagItem
                              key={index}
                              tagIndex={index}
                              handleDelete={handleDelete}
                            >
                              {tag}
                            </TagItem>
                          ))}
                      </div>
                    </fieldset>
                    <button
                      className="btn btn-lg pull-xs-right btn-primary"
                      type="button"
                      onClick={handlePublishArticle}
                    >
                      Publish Article
                    </button>
                  </fieldset>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default EditorExistArticlePage;
