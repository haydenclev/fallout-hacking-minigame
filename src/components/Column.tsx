interface ColumnProps {
  data: string[],
}

function Column({ data }: ColumnProps) {
  return (
    <p>{data}</p>
  );
}

export default Column;