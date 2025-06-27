import { Link } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import GridToolbar2 from "./GridToolbar2";

export type ReplayRow = {
  id: number;
  tier: string;
  p1: string;
  p2: string;
  score: string;
  date: string;
  link: string;
  team1: string;
  team2: string;
  turns: string;
  winner: string;
};

async function fetchCSV(filePath: string): Promise<ReplayRow[]> {
  try {
    const response = await fetch(filePath);
    const csvText = await response.text();
    const lines = csvText.split("\r\n");
    const data: ReplayRow[] = [];
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(",");
      if (values.length < 10) continue;
      const p1 = values[1];
      const p2 = values[2];
      const winner = values[9];
      const loser = p1 === winner ? p2 : p1;
      let score = values[3];
      if (p1 !== winner) {
        score = score.split("-").reverse().join(" - ");
      }
      const team1 = values[6];
      const team2 = values[7];
      const winningTeam = p1 === winner ? team1 : team2;
      const losingTeam = p1 === winner ? team2 : team1;
      const row: ReplayRow = {
        id: i,
        tier: values[0],
        p1: winner,
        p2: loser,
        score: score,
        date: values[4],
        link: values[5],
        team1: winningTeam,
        team2: losingTeam,
        turns: values[8],
        winner: values[9],
      };
      data.push(row);
    }
    return data;
  } catch (error) {
    console.error("Error fetching or parsing CSV:", error);
    return [];
  }
}

const columns: GridColDef[] = [
  { field: "date", headerName: "Date", type: "string", flex: 7 },
  { field: "tier", headerName: "Tier", flex: 10, width: 100 },
  { field: "p1", headerName: "Winner", flex: 10 },
  { field: "score", headerName: "Score", flex: 5, sortable: false },
  { field: "p2", headerName: "Loser", flex: 10 },
  { field: "team1", headerName: "Winning Team", sortable: false, flex: 30 },
  { field: "team2", headerName: "Losing Team", sortable: false, flex: 30 },
  {
    field: "link",
    headerName: "Link",
    flex: 20,
    renderCell: (params: any) => {
      const row = params.row as ReplayRow;
      return (
        <Link href={row.link} target="_blank" rel="noopener noreferrer">
          {row.link}
        </Link>
      );
    },
  },
];

const paginationModel = { page: 0, pageSize: 20 };

export function ReplayDatagrid() {
  const [rrows, setRrows] = useState([] as ReplayRow[]);

  useEffect(() => {
    fetchCSV("data.csv").then((rows) => setRrows(rows));
  }, []);

  return (
    <DataGrid
      rows={rrows}
      columns={columns}
      getRowId={(r) => r["id"] ?? ""}
      initialState={{ pagination: { paginationModel } }}
      pageSizeOptions={[10, 20, 50, 100]}
      checkboxSelection
      slots={{ toolbar: GridToolbar2 }}
      density="compact"
      sx={{ border: 0 }}
      style={{ width: "100%", height: "95%" }}
    />
  );
}
