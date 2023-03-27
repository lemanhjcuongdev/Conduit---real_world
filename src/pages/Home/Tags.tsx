import { MouseEventHandler, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getTagsAPI } from "../../api/default";

interface ITagsProps {
  className?: string;
  handleSelectTag?: any;
}

function Tags(props: ITagsProps) {
  const { handleSelectTag } = props;

  const [tagList, setTagList] = useState<[] | null>(null);

  useEffect(() => {
    getTagsAPI().then((data) => {
      setTagList(data.tags);
    });
  }, []);

  return (
    <>
      <div className="sidebar">
        <p>Popular Tags</p>

        <div className="tag-list">
          {tagList === null
            ? "Loading ..."
            : tagList &&
              tagList.length !== 0 &&
              tagList.map((tag, index) => (
                <Link
                  key={index}
                  to=""
                  className="tag-pill tag-default"
                  onClick={(e) => handleSelectTag(tag)}
                >
                  {tag}
                </Link>
              ))}
        </div>
      </div>
    </>
  );
}

export default Tags;
