import { useEffect, useState } from "react";
import EntityPanel from "./EntityPanel";

export default function EntityPanelWrapper() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("reports");
    if (stored) {
      setReports(JSON.parse(stored));
    } else {
      fetch("/reports.json")
        .then((res) => res.json())
        .then(setReports)
        .catch(console.error);
    }
  }, []);

  return <EntityPanel reports={reports} />;
}
