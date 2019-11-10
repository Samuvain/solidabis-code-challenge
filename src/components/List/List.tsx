import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";

interface ListProps {
  items: string[];
  title: string;
  className: string;
}

const List: React.FC<ListProps> = ({ items, title, className }) => {
  if (!items || !items.length) return null;
  return (
    <div>
      <h3 className={className}>
        {title} ({items.length})
      </h3>
      <ListGroup>
        {items.map((item, i) => (
          <ListGroupItem key={i}>{item}</ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
};

export default List;
