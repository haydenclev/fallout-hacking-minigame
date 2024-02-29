import { useContext } from "react";
import "../style/Column.css"
import { GlobalContext } from "./Context";


interface ColumnProps {
  charactersPerColumn: number;
  data: string[],
  isAddresses?: boolean,
}

function Column({ charactersPerColumn, data, isAddresses = false }: ColumnProps) {
  let chunks: string[] = [];
  if(!isAddresses) {
    for(let i = 0; i < data.length; i += charactersPerColumn) {
      const chunk = data.slice(i, i + charactersPerColumn).join('');
      chunks.push(chunk);
    }
  }
  return (
    <div className="column">
      {isAddresses ? 
        data.map((address, index) => <p className="address" key={index}>{address}</p>) :
         chunks.map((line, index) => <p key={index}>{line}</p>)
      }
    </div>
  );
}

export default Column;