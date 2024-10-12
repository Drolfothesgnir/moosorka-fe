import { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { EntrySchema } from "./types";
import http from "./utils/http";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import EntryList from "./components/EntryList/EntryList";
import Editor from "./components/Editor/Editor";

async function getEntries() {
  const response: AxiosResponse<EntrySchema[]> = await http.get("/record");

  return response.data;
}

async function deleteEntry(id: number) {
  const response = await http.delete(`/record/${id}`);
  return response;
}

async function postEntry(content: string) {
  return await http.post("/record", { content });
}

function App() {
  const [entries, setEntries] = useState<EntrySchema[]>([]);
  const [content, setContent] = useState("");

  function refresh() {
    getEntries().then(setEntries);
  }

  function removeEntry(id: number) {
    deleteEntry(id).then((response) => {
      console.log(response);
      refresh();
    });
  }

  function saveEntry() {
    postEntry(content).then(refresh);
  }

  function onContentChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setContent(e.target.value);
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
      <Editor
        content={content}
        onContentChange={onContentChange}
        onSaveCliked={saveEntry}
      />
    </>
  );
}

export default App;
