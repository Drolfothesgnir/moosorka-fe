import { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { EntrySchema } from "./types";
import http from "./utils/http";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import EntryList from "./components/EntryList/EntryList";
import Editor from "./components/Editor/Editor";
import NewEntry from "./components/NewEntry/NewEntry";

enum EditorState {
  CLOSED = 0,
  NEW = 1,
  EDIT = 2,
}

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

async function putEntry(id: number, content: string) {
  return await http.put(`/record/${id}`, { content });
}

function App() {
  const [entries, setEntries] = useState<EntrySchema[]>([]);
  const [content, setContent] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.CLOSED
  );

  function refresh() {
    getEntries().then(setEntries);
  }

  function removeEntry(id: number) {
    deleteEntry(id).then((response) => {
      console.log(response);
      refresh();
    });
  }

  async function saveEntry() {
    if (editorState === EditorState.NEW) {
      const response = await postEntry(content);
      setEntries((oldEntries) => [response.data].concat(oldEntries));
    } else if (editorState === EditorState.EDIT && editId !== null) {
      const response = await putEntry(editId, content);
      setEntries((oldEntries) => {
        const entriesCopy = oldEntries.slice();
        const oldEntryIndex = oldEntries.findIndex(({ id }) => id === editId);
        entriesCopy[oldEntryIndex] = response.data;
        return entriesCopy;
      });
    }
    closeEditor();
  }

  function onContentChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setContent(e.target.value);
  }

  function closeEditor() {
    setEditorState(EditorState.CLOSED);
    setEditId(null);
    setContent("");
  }

  function createEntry() {
    setEditorState(EditorState.NEW);
  }

  function editEntry(entry: EntrySchema) {
    setContent(entry.content);
    setEditId(entry.id);
    setEditorState(EditorState.EDIT);
  }

  useEffect(() => {
    refresh();
  }, []);

  return (
    <>
      <Header />
      <Main>
        <EntryList
          entries={entries}
          onRemoveClick={removeEntry}
          onEditClick={editEntry}
        />
      </Main>
      {editorState > 0 ? (
        <Editor
          content={content}
          onContentChange={onContentChange}
          onSaveClick={saveEntry}
          onCloseClick={closeEditor}
        />
      ) : (
        <NewEntry onCLick={createEntry} />
      )}
    </>
  );
}

export default App;
