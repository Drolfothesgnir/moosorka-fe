import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import moment from "moment";

type Entry = {
  id: number;
  content: string;
  created_at: string;
  updated_at: string | null;
};

async function getEntries() {
  const response: AxiosResponse<Entry[]> = await axios.get(
    "http://localhost:5000/record"
  );

  return response.data;
}

async function postEntry(content: string) {
  const response = await axios.post("http://localhost:5000/record", {
    content,
  });
  return response;
}

async function deleteEntry(id: number) {
  const response = await axios.delete(`http://localhost:5000/record/${id}`);
  return response;
}

function App() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [content, setContent] = useState<string>("");
  const [bgColor, setBgColor] = useState<string>("#ffffff");
  console.log(bgColor);

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
      <input
        type="color"
        value={bgColor}
        onChange={(e) => setBgColor(e.target.value)}
      />
      <ol>
        {entries.map(({ id, content, created_at }) => (
          <li key={id}>
            <h4>{moment.utc(created_at).local().format("LLLL")}</h4>
            <pre>{content}</pre>
            <button onClick={() => removeEntry(id)}>Remove entry</button>
          </li>
        ))}
      </ol>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <button onClick={submit}>Create entry</button>
    </div>
  );
}

export default App;
