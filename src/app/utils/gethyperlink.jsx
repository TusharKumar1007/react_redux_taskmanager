const hyperLink = ["https://", "http://", ".com", ".org", ".app", ".net", ".ai", ".io", ".ir", ".in", ".world"]
export const checkLinkExist = (string) => {
  return hyperLink.some(word => string.toLowerCase().includes(word))
};

function checkValidity(word) {
  return hyperLink.some(w => word.startsWith(w)) || hyperLink.some(w => word.endsWith(w)) || hyperLink.some(w => word.includes(w))
}

export const hyperlinkDecorator = (string) => {
  const strArr = string.split(" ");
  return strArr.map((word, index) => {
    if (checkValidity(word)) {
      return (
        <span key={index}>
          <a
            href={word.startsWith("https://") || word.startsWith("http://") ? `${word}` : `https://${word}`}
            className="text-blue-400 hover:underline"
            target="_blank">
            {word.replace(/^https?:\/\//, "")}
          </a>{" "}
        </span>
      );
    }

    return <span key={index}>{word} </span>;
  });
};

export function getHyperLink(string) {
  const strArr = string.split(" ");

  for (const str of strArr) {
    if (checkValidity(str)) {
      return str.startsWith("https://") || str.startsWith("http://") ? `${str}` : `https://${str}`;
    }
  }
  return null;
}
