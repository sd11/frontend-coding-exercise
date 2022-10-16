import React from "react";
import styled from "styled-components";

const List = styled.ul`
  background: white;
  border: 1px solid hsl(0, 0%, 80%);
  box-shadow: 0.5rem 0.5rem 1rem hsl(0, 0%, 90%);
  list-style: none;
  margin: 0;
  padding: 0;
  position: absolute;
  width: 100%;
  left: 0;
`;

const ListItem = styled.li`
  line-height: 1.5rem;
  margin: 0;
  padding: 0.5rem 1rem;

  &:hover {
    background: #fdc605;
  }
`;

const ItemDescription = styled.div`
  font-size: 1rem;
  color: #000;
`;

/**
 * <ResultsList
 *   items={[...]}
 *   onSelect={item => console.log(item.name)}
 *   className="MyResultsList"
 * />
 *
 * @prop {Array} items List of results of form { name: string, state: { abbreviation: string } }
 * @prop {Function} onSelect Callback to execute when item is selected, accepts object.
 * @prop {mixed} ... All other props will be forwarded to the container DOM node.
 */
export function ResultsList(props) {
  const { className, onSelect, items, ...otherProps } = props;

  return (
    <List {...otherProps}>
      {items && items.map(function(item, index) {
        return (
          <ListItem
            key={"item" + index}
            onClick={() => onSelect && onSelect(item)}
          >
            <ItemDescription>
              {item.name}, {item.state.abbreviation}
            </ItemDescription>
          </ListItem>
        );
      })}
    </List>
  );
}
