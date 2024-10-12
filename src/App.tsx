import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { EntrySchema } from "./types";
import http from "./utils/http";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import EntryList from "./components/EntryList/EntryList";

async function getEntries() {
  const response: AxiosResponse<EntrySchema[]> = await http.get("/record");

  return response.data;
}

async function deleteEntry(id: number) {
  const response = await http.delete(`/record/${id}`);
  return response;
}

function App() {
  const [entries, setEntries] = useState<EntrySchema[]>([]);

  function refresh() {
    getEntries().then(setEntries);
  }

  function removeEntry(id: number) {
    deleteEntry(id).then((response) => {
      console.log(response);
      refresh();
    });
  }

  useEffect(() => {
    refresh();
  }, []);

  return (
    <>
      <Header />
      <Main>
        <EntryList entries={entries} onRemoveClick={removeEntry} />
      </Main>
    </>
  );
}

export default App;
