interface ColumnProps {
  data: string[],
}

function Column({ data }: ColumnProps) {
  return (
    <code>{data}</code>
  );
}

export default Column;