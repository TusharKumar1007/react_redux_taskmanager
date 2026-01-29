export const checkLinkExist = (string) => {
  return string.includes("https://") || string.includes("http://");
};

// export const hyperlinkDecorator = (string) => {
//   const strArr = string.split(" ");
//   return strArr.map((word, index) => {
//     if (word.startsWith("https://") || word.startsWith("http://")) {
//       return (
//         <span key={index}>
//           <span
//             className="text-blue-400">
//             {word}
//           </span>{" "}
//         </span>
//       );
//     }

//     return <span key={index}>{word} </span>;
//   });
// };

export function getHyperLink(string) {
  const strArr = string.split(" ");

  for (const str of strArr) {
    if (str.startsWith("https://") || str.startsWith("http://")) {
      return str;
    }
  }
  return null;
}
