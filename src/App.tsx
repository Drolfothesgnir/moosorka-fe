import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { EntrySchema } from "./types";
import Entry from "./components/Entry/Entry";
import http from "./utils/http";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";

async function getEntries() {
  const response: AxiosResponse<EntrySchema[]> = await http.get("/record");

  return response.data;
}

async function postEntry(content: string) {
  const response = await http.post("/record", {
    content,
  });
  return response;
}

async function deleteEntry(id: number) {
  const response = await http.delete(`/record/${id}`);
  return response;
}

function App() {
  const [entries, setEntries] = useState<EntrySchema[]>([]);
  const [content, setContent] = useState<string>("");
  const [bgColor, setBgColor] = useState<string>("#ffffff");

  function refresh() {
    getEntries().then(setEntries);
  }

  function submit() {
    postEntry(content).then((response) => {
      console.log(response);
      refresh();
    });
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
    <div style={{ backgroundColor: bgColor }}>
      <Header />
      <Main>
        <input
          type="color"
          value={bgColor}
          onChange={(e) => setBgColor(e.target.value)}
        />
        <ol>
          {entries.map((entry) => (
            <Entry
              key={entry.id}
              entry={entry}
              onRemoveClick={() => removeEntry(entry.id)}
            />
          ))}
        </ol>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button onClick={submit}>Create entry</button>
      </Main>
    </div>
  );
}

export default App;
