import React, { useCallback, useEffect, useState } from "react";
import { EntrySchema } from "./types";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import EntryList from "./components/EntryList/EntryList";
import Editor from "./components/Editor/Editor";
import NewEntry from "./components/NewEntry/NewEntry";
import { deleteEntry, getEntries, postEntry, putEntry } from "./utils/requests";

enum EditorState {
  CLOSED = 0,
  NEW = 1,
  EDIT = 2,
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
    deleteEntry(id).then(refresh);
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

  const closeEditor = useCallback(() => {
    setEditorState(EditorState.CLOSED);
    setEditId(null);
    setContent("");
  }, []);

  const createEntry = useCallback(() => setEditorState(EditorState.NEW), []);

  function editEntry(entry: EntrySchema) {
    setContent(entry.content);
    setEditId(entry.id);
    setEditorState(EditorState.EDIT);
  }

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case "n": {
          if (editorState === EditorState.CLOSED) {
            e.preventDefault();
            createEntry();
          }
          break;
        }

        case "Escape": {
          if (editorState > EditorState.CLOSED) {
            closeEditor();
          }
          break;
        }

        default:
          break;
      }
    },
    [createEntry, closeEditor, editorState]
  );

  useEffect(() => {
    refresh();
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

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
