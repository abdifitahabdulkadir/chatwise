export const formatMessageContent = (content: string) => {
  // Escape HTML characters and format the content
  const formatted = content
    // Convert double asterisks to bold tags
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")

    // Convert single asterisks to list items
    .replace(/^\* (.*?)$/gm, "<li>$1</li>")

    // Convert numbered lists
    .replace(/^(\d+)\. (.*?)$/gm, "<li>$1. $2</li>")

    // Convert list containers
    .replace(/(<li>.*?<\/li>)(?=<li>|\s*$)/g, "<ul>$&</ul>")

    // Replace code blocks with <pre><code> for syntax highlighting
    .replace(/```([\s\S]*?)```/g, (match, code) => {
      return `<pre><code >${escapeHtml(code)}</code></pre>`;
    })

    // Replace new lines with <br/> for line breaks
    .replace(/\n/g, "<br/>");

  return formatted;
};

function escapeHtml(code: string) {
  return code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
    .replace(/\n/g, "<br>") // Replace newlines with <br>
    .replace(/\s/g, "&nbsp;"); // Replace spaces with non-breaking spaces for indentation
}
