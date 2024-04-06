import { useContext } from "react";
import "../style/Column.css";
import { GlobalContext } from "./Context";

interface MemoryProps {
  data: string[]
}

function Memory({ data }: MemoryProps ) {
  const { CHARACTERS_PER_COLUMN } = useContext(GlobalContext)
  const chunks: string[] = [];
  for (let i = 0; i < data.length; i += CHARACTERS_PER_COLUMN) {
    const chunk = data.slice(i, i + CHARACTERS_PER_COLUMN).join('');
    chunks.push(chunk);
  }
  return (
    <div className="column">
      { chunks.map((line, index) =>
         <p key={index}>{Array.from(line).map(character =>
           <span className="characters">{character}</span>)}</p>)
      }
    </div>
  )
}

export default Memory;