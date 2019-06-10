import * as React from "react";
import ContextBlockItem, { ContextBlockItemProps } from "./ContextBlockItem";

interface ContextBlockProps {
  grid?: string;
  className?: string;
  items?: ContextBlockItemProps[];
  children?: React.ReactNode;
}

const ContextBlock: React.FunctionComponent<ContextBlockProps> = ({
  grid,
  className,
  items,
  children,
}): React.ReactElement => {
  return (
    <div data-c-grid-item={grid}>
      <div className={className}>
        {items &&
          items.map(
            ({ id, title, subtext }): React.ReactElement => {
              return (
                <ContextBlockItem id={id} title={title} subtext={subtext} />
              );
            },
          )}
        {children}
      </div>
    </div>
  );
};

export default ContextBlock;
