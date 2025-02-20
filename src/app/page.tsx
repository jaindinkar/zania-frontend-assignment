"use client";

import { useState } from "react";
import TableRow from "./TableRow";

interface DataItem {
  name: string;
  device: string;
  path: string;
  status: string;
}

const data: DataItem[] = [
  { name: "smss.exe", device: "Stark", path: "\\Device\\HarddiskVolume2\\Windows\\System32\\smss.exe", status: "scheduled" },
  { name: "netsh.exe", device: "Targaryen", path: "\\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe", status: "available" },
  { name: "uxtheme.dll", device: "Lanniester", path: "\\Device\\HarddiskVolume1\\Windows\\System32\\uxtheme.dll", status: "available" },
  { name: "cryptbase.dll", device: "Martell", path: "\\Device\\HarddiskVolume1\\Windows\\System32\\cryptbase.dll", status: "scheduled" },
  { name: "7za.exe", device: "Baratheon", path: "\\Device\\HarddiskVolume1\\temp\\7za.exe", status: "scheduled" }
];

export default function Datagrid() {
  // States
  const [selected, setSelected] = useState<number[]>([]);

  // Handler Functions
  const toggleSelectAll = () => {
    setSelected(selected.length === data.length ? [] : data.map((_, index) => index));
  };

  const toggleSelectRow = (index: number) => {
    setSelected((prev) => prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]);
  };

  const downloadAlert = () => {
    alert(selectedRows.map(row => `Name: ${row.name} Device: ${row.device} Path: ${row.path}`).join("\n"));
  };

  // Derived states.
  const isAllSelected = selected.length === data.length;
  const isSomeSelected = selected.length > 0 && selected.length < data.length;
  const selectedCount = selected.length;

  const selectedRows = selected.map((i) => data[i]);
  const canDownload = selectedRows.length ? (selectedRows.every((row) => row.status === "available")) : false;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Datagrid</h2>
      <div className="border rounded-lg overflow-hidden shadow-sm">
        <div className="p-3 border-b flex items-center">
          <input
            type="checkbox"
            className="mr-2"
            checked={isAllSelected}
            ref={(el) => el && (el.indeterminate = isSomeSelected)}
            onChange={toggleSelectAll}
          />
          <span>{selectedCount > 0 ? `${selectedCount} Selected` : "None Selected"}</span>
          <button
            className={`ml-auto px-4 py-1 rounded text-white ${canDownload ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400 cursor-not-allowed"
              }`}
            disabled={!canDownload}
            onClick={() => downloadAlert()}
          >
            Download Selected
          </button>
        </div>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="p-2 w-10"></th>
              <th className="p-2">Name</th>
              <th className="p-2">Device</th>
              <th className="p-2">Path</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <TableRow
                key={index}
                item={item}
                index={index}
                isSelected={selected.includes(index)}
                toggleSelectRow={toggleSelectRow}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
