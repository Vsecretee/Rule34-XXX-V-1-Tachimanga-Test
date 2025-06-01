async function search(query, page = 0) {
  const url = `https://rule34.xxx/index.php?page=dapi&s=post&q=index&limit=20&tags=${encodeURIComponent(query)}&pid=${page}`;
  const response = await fetch(url);
  const text = await response.text();

  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(text, "application/xml");

  const posts = xmlDoc.querySelectorAll("post");
  const results = [];

  posts.forEach(post => {
    results.push({
      title: post.getAttribute("tags"),
      imageUrl: post.getAttribute("file_url"),
      thumbnailUrl: post.getAttribute("preview_url")
    });
  });

  return results;
}
