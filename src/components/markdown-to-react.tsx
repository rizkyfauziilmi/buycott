import React from "react";

interface MarkdownToReactProps {
  markdown: string;
}

const MarkdownToReact: React.FC<MarkdownToReactProps> = ({ markdown }) => {
  const convertMarkdownToReactNode = (text: string): React.ReactNode => {
    // Convert bold text
    const boldRegex = /\*\*(.*?)\*\*/g;
    text = text.replace(boldRegex, '<span class="font-bold">$1</span>');

    // Remove [^1] [^1]:
    const removeRegex = /\[\^.*?\](?::)?/g;
    text = text.replace(removeRegex, '');

    // Convert links
    const linkRegex =
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
    text = text.replace(
      linkRegex,
      '<a href="$&" class="text-blue-500 hover:underline" target="_blank">[to the Article]</a>',
    );

    // Convert the string to a React node
    return <span dangerouslySetInnerHTML={{ __html: text }} />;
  };

  return <>{convertMarkdownToReactNode(markdown)}</>;
};

export default MarkdownToReact;
