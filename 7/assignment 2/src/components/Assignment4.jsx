import React, { useMemo, useState } from "react";

const Assignment4 = () => {
  const [words, setWords] = useState(0);
  const [newWord, setNewWord] = useState();

  const singleWord =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem earum explicabo rerum iste dolore, odit quisquam nulla dolores ex? Facere minima aperiam nulla";

  const wordArr = useMemo(() => {
    return singleWord.split(" ");
  }, []);
  //   console.log(wordArr);
  //   console.log(Math.random());

  const handleWord = () => {
    let word = [];
    for (let i = 0; i < words; i++) {
      word.push(wordArr[Math.floor(Math.random() * wordArr.length)]);
    }
    setNewWord(word.join(" "));
  };
  return (
    <>
      <input
        type="number"
        value={words}
        onChange={(e) => setWords(e.target.value)}
      />
      <button onClick={handleWord}>CLick to generate</button>
      <div>{newWord}</div>
    </>
  );
};

export default Assignment4;
