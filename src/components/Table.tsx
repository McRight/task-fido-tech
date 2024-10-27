// Types
import { ProcessedData } from '../types';

type TableProps = { data: ProcessedData[] };

// * NB: don't think it's worth making the headers dynamic in this case, since the "data" is already typed and I would use a library for handling the table anyway (something like "TanStack Table" which I have experience using)

function Table({ data }: TableProps) {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Notes</th>
          <th>Engineer ID</th>
          <th>Coords [0]</th>
          <th>Coords [1]</th>
        </tr>
      </thead>
      <tbody>
        {data.map((p) => (
          <tr key={p.id}>
            <td>{p.id}</td>
            <td>{p.notes}</td>
            <td>{p.engineerId}</td>
            <td>{p.coords[0]}</td>
            <td>{p.coords[1]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
