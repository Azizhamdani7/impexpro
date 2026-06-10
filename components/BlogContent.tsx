function inlineFormat(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>");
}

export function BlogContent({ content }: { content: string }) {
  const html = content
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => {
      if (block.startsWith("### ")) return `<h3>${inlineFormat(block.slice(4))}</h3>`;
      if (block.startsWith("## ")) return `<h2>${inlineFormat(block.slice(3))}</h2>`;
      if (block.startsWith("> ")) return `<blockquote>${inlineFormat(block.slice(2))}</blockquote>`;
      if (block.startsWith("- ")) {
        const items = block
          .split("\n")
          .map((item) => item.replace(/^- /, "").trim())
          .filter(Boolean)
          .map((item) => `<li>${inlineFormat(item)}</li>`)
          .join("");
        return `<ul>${items}</ul>`;
      }
      return `<p>${inlineFormat(block).replace(/\n/g, "<br>")}</p>`;
    })
    .join("");

  return <div className="blog-content" dangerouslySetInnerHTML={{ __html: html }} />;
}
