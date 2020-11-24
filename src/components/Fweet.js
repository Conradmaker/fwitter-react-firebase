import {dbService} from "mybase";
import React, {useState} from "react";

export default function Fweet({fweet, isOwner}) {
  const [editing, setEditing] = useState(false);
  const [newFweet, setNewFweet] = useState(fweet.text);
  const onDelete = async () => {
    const ok = window.confirm("are u sure you want to delete this fweet?");
    if (ok) {
      await dbService.doc(`fweets/${fweet.id}`).delete();
    } else {
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onChange = (e) => {
    setNewFweet(e.target.value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    await dbService.doc(`fweets/${fweet.id}`).update({
      text: newFweet,
    });
    setEditing(false);
  };
  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              value={newFweet}
              onChange={onChange}
              placeholder="what is ur edit "
            />
            <button type="submit">fweet</button>
          </form>
          <button onClick={toggleEditing}>cancel</button>
        </>
      ) : (
        isOwner && (
          <div>
            <h4>{fweet.text}</h4>
            <button onClick={onDelete}>delete</button>
            <button onClick={toggleEditing}>edit</button>
          </div>
        )
      )}
    </div>
  );
}
