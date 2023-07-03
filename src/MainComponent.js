import React, { useEffect, useState } from "react";

export default function MainComponent() {
  const [openStatus, setOpenStatus] = useState(false);
  const [lastChecked, setLastChecked] = useState(new Date().toLocaleString());
  const [lastOpenTime, setLastOpenTime] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      getServerStatus();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <h1>
        Server Status: {openStatus ? "OPEN~!~!~!~!~!~!~!~!~!~!~!~!~!~!~!~!~!~!~!~!~!~!~!~!~!~!~!~!~!~!~!" : "closed"}
      </h1>
      <button onClick={getServerStatus}>Click me to check now</button>
      <br />
      <p>Last checked: {lastChecked}</p>
      <p>Last open time: {lastOpenTime || "N/A"}</p>
    </>
  );

  async function getServerStatus() {
    var url = "https://api.guildwars2.com/v2/worlds?id=1005";
    console.log("Calling: ", url);
    var result;
    await fetch(url)
      .then((r) => r.json())
      .then((data) => (result = data));

    console.log("Data is: ", result);

    setLastChecked(new Date().toLocaleString());

    if (result.population === "Full") {
      document.body.style.backgroundColor = "white";
      setOpenStatus(false);
      document.title = "closed";
    } else if (result.text === "too many requests") {
      setOpenStatus(false);
      document.title = "too many requests lol";
    } else {
      document.body.style.backgroundColor = "limegreen";
      setOpenStatus(true);
      document.title = "OPEN!!!!!!!!!!!!!!!!!!!!!";
      setLastOpenTime(new Date().toLocaleString());
    }
  }
}
