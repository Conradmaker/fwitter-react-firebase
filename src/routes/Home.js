import Fweet from "components/Fweet";
import { dbService } from "mybase";
import React, { useEffect, useState } from "react";

export default function Home({ user }) {
  const [fweet, setFweet] = useState("");
  const [fweets, setFweets] = useState([]);

  useEffect(() => {
    dbService.collection("fweets").onSnapshot((s) => {
      const data = s.docs.map((v) => ({ id: v.id, ...v.data() }));
      setFweets(data);
    });
  }, []);
  const onSubmit = async (e) => {
    e.preventDefault();
    await dbService.collection("fweets").add({
      text: fweet,
      createdAt: Date.now(),
      creatorId: user.uid,
    });
    setFweet("");
  };
  const onChange = (e) => {
    setFweet(e.target.value);
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          value={fweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <button type="submit">Fweet</button>
      </form>
      <div>
        {fweets.map((v) => (
          <Fweet
            key={v.id}
            fweet={v}
            isOwner={v.creatorId === user.uid}
          ></Fweet>
        ))}
      </div>
    </>
  );
}
