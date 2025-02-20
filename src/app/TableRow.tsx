"use client";

interface DataItem {
  name: string;
  device: string;
  path: string;
  status: string;
}

interface TableRowProps {
  item: DataItem;
  index: number;
  isSelected: boolean;
  toggleSelectRow: (index: number) => void;
}

export default function TableRow({ item, index, isSelected, toggleSelectRow }: TableRowProps) {
  return (
    <tr className="border-b">
      <td className="p-2">
        <input type="checkbox" checked={isSelected} onChange={() => toggleSelectRow(index)} />
      </td>
      <td className="p-2">{item.name}</td>
      <td className="p-2">{item.device}</td>
      <td className="p-2">{item.path}</td>
      <td className="p-2 flex items-center">
        {item.status === "available" && <span className="h-3 w-3 bg-green-500 rounded-full mr-2"></span>}
        Available
      </td>
    </tr>
  );
}
