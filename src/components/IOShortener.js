import React, { useState, useEffect } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import baseUrl from './../config.js';
import Qrcode from "react-qr-code";

const IOShortener = () => {
  const [shortenLink, setShortenLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [longUrl, setLongUrl] = useState("");

  const handleClick = async () => {
    console.log(baseUrl);
    let result = await fetch(`${baseUrl}/generateShortUrl`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ longUrl: longUrl })
    })
    result = await result.json()
    console.log(result);

    if (result.status === false) {
      alert(result.message);
    } else {
      setShortenLink(result.data.shortUrl);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setCopied(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [copied]);

  return (
    <div className="inputContainer">
      <h1>
        Link <span>Swift</span>
      </h1>
      <div>
        <input
          type="text"
          placeholder="Input the URL to shorten it."
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
        />
        <button onClick={handleClick}>Shorten</button>
      </div>

      <>
        {shortenLink && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
            <div className="result">
              <p>{shortenLink}</p>

              <CopyToClipboard text={shortenLink} onCopy={() => setCopied(true)}>
                <button className={copied ? "copied" : ""}>Copy</button>
              </CopyToClipboard>

            </div>
            <div className="qr">
              <Qrcode value={shortenLink} size="200" />
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default IOShortener;
