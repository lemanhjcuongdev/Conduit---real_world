import { memo, MouseEventHandler } from "react";

interface ITagProps {
  children: string;
  handleDelete: (tagIndex: number) => void;
  tagIndex: number;
}

const TagItem = memo((props: ITagProps) => {
  const { children, tagIndex, handleDelete } = props;

  return (
    <span
      ng-repeat="tag in $ctrl.article.tagList"
      className="tag-default tag-pill ng-binding ng-scope"
    >
      <i
        className="ion-close-round"
        ng-click="$ctrl.removeTag(tag)"
        onClick={(e) => handleDelete(tagIndex)}
      ></i>
      {children}
    </span>
  );
});

export default TagItem;
