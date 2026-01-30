const hyperLink = ["https://", "http://", ".com", ".org", ".app", ".net", ".ai", ".io", ".ir", ".in", ".world"]
export const checkLinkExist = (string) => {
  return hyperLink.some(word => string.toLowerCase().includes(word))
};

export const hyperlinkDecorator = (string) => {
  const strArr = string.split(" ");
  return strArr.map((word, index) => {
    const hasValidStart = hyperLink.some(w => word.startsWith(w))
    const hasValidEnd = hyperLink.some(w => word.endsWith(w))
    if (hasValidEnd || hasValidStart) {
      return (
        <span key={index}>
          <a
            href={word.startsWith("https://") || word.startsWith("http://") ? `${word}` : `https://${word}`}
            className="text-blue-400 hover:underline"
            target="_blank">
            {word}
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
    if (str.startsWith("https://") || str.startsWith("http://")) {
      return str;
    }
  }
  return null;
}
