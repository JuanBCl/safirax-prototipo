import { useEffect, useState } from "react";
import EntityPanel from "./EntityPanel";



export default function EntityPanelWrapper() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetch("/reports.json")
      .then((res) => res.json())
      .then(setReports)
      .catch(console.error);
  }, []);

  return <EntityPanel reports={reports} />;
}
