const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

// Configure marked options if needed (e.g. for safe parsing)
marked.setOptions({
  mangle: false,
  headerIds: false
});

const WORKSPACE_DIR = path.resolve(__dirname, '..');
const CONTENT_DIR = path.join(WORKSPACE_DIR, 'content', 'posts');
const TEMPLATE_PATH = path.join(WORKSPACE_DIR, 'templates', 'post_template.html');
const BLOG_DIR = path.join(WORKSPACE_DIR, 'stitch_editorial_tech_portfolio', 'blog_alex_chen_portfolio_refined');
const BLOG_POSTS_OUTPUT_DIR = path.join(BLOG_DIR, 'posts');
const BLOG_LIST_PATH = path.join(BLOG_DIR, 'code.html');

// Helper to parse frontmatter
function parsePost(fileContent) {
  const match = fileContent.match(/^---\r?\n([\s\S]+?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    return { metadata: {}, body: fileContent };
  }
  const frontmatterText = match[1];
  const body = match[2];
  const metadata = {};
  
  frontmatterText.split(/\r?\n/).forEach(line => {
    const idx = line.indexOf(':');
    if (idx !== -1) {
      const key = line.substring(0, idx).trim();
      const value = line.substring(idx + 1).trim().replace(/^['"]|['"]$/g, '');
      metadata[key] = value;
    }
  });

  return { metadata, body };
}

// Helper to format date for the list view (e.g. "May 10, 2026" -> "May 10<br>2026")
function formatListDate(dateStr) {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) {
    return dateStr.replace(', ', '<br>');
  }
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = months[d.getMonth()];
  const day = String(d.getDate()).padStart(2, '0');
  const year = d.getFullYear();
  return `${month} ${day}<br>${year}`;
}

function main() {
  console.log('Starting blog compilation...');

  // Ensure output directory exists
  if (!fs.existsSync(BLOG_POSTS_OUTPUT_DIR)) {
    fs.mkdirSync(BLOG_POSTS_OUTPUT_DIR, { recursive: true });
    console.log(`Created output directory: ${BLOG_POSTS_OUTPUT_DIR}`);
  }

  // Read post template
  if (!fs.existsSync(TEMPLATE_PATH)) {
    console.error(`Error: Post template not found at ${TEMPLATE_PATH}`);
    process.exit(1);
  }
  const template = fs.readFileSync(TEMPLATE_PATH, 'utf-8');

  // Read markdown files
  if (!fs.existsSync(CONTENT_DIR)) {
    console.error(`Error: Content posts directory not found at ${CONTENT_DIR}`);
    process.exit(1);
  }
  
  const files = fs.readdirSync(CONTENT_DIR).filter(file => file.endsWith('.md'));
  const posts = [];

  files.forEach(file => {
    const filePath = path.join(CONTENT_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const { metadata, body } = parsePost(content);
    const slug = path.basename(file, '.md');

    if (!metadata.title || !metadata.date || !metadata.readTime) {
      console.warn(`Warning: Missing required metadata in ${file}. Skipping.`);
      return;
    }

    if (metadata.draft === 'true' || metadata.draft === true) {
      console.log(`Skipping draft post: ${file}`);
      return;
    }

    // Convert markdown to HTML
    const htmlBody = marked.parse(body);

    // Populate post template
    let postHtml = template
      .replace(/\{\{title\}\}/g, metadata.title)
      .replace(/\{\{description\}\}/g, metadata.description || '')
      .replace(/\{\{date\}\}/g, metadata.date)
      .replace(/\{\{readTime\}\}/g, metadata.readTime)
      .replace(/\{\{content\}\}/g, htmlBody);

    const outputFilePath = path.join(BLOG_POSTS_OUTPUT_DIR, `${slug}.html`);
    fs.writeFileSync(outputFilePath, postHtml, 'utf-8');
    console.log(`Compiled post: ${slug}.html`);

    posts.push({
      slug,
      title: metadata.title,
      date: metadata.date,
      readTime: metadata.readTime,
      description: metadata.description || ''
    });
  });

  // Sort posts by date descending
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  // Generate HTML for blog list page
  let listItemsHtml = '';
  posts.forEach(post => {
    const formattedDate = formatListDate(post.date);
    listItemsHtml += `    <a class="bl-post" href="posts/${post.slug}.html">
      <div class="bl-date-col">${formattedDate}</div>
      <div>
        <div class="bl-post-title">${post.title}<span class="bl-arrow">↗</span></div>
        <div class="bl-post-desc">${post.description}</div>
      </div>
      <div class="bl-meta">${post.readTime}</div>
    </a>\n\n`;
  });

  // Inject list items into code.html
  if (!fs.existsSync(BLOG_LIST_PATH)) {
    console.error(`Error: Blog list page not found at ${BLOG_LIST_PATH}`);
    process.exit(1);
  }
  const blogListHtml = fs.readFileSync(BLOG_LIST_PATH, 'utf-8');

  const startTag = '<!-- BLOG_POSTS_START -->';
  const endTag = '<!-- BLOG_POSTS_END -->';
  const startIndex = blogListHtml.indexOf(startTag);
  const endIndex = blogListHtml.indexOf(endTag);

  if (startIndex === -1 || endIndex === -1) {
    console.error('Error: Could not find <!-- BLOG_POSTS_START --> and <!-- BLOG_POSTS_END --> comments in code.html');
    process.exit(1);
  }

  const updatedBlogListHtml = 
    blogListHtml.substring(0, startIndex + startTag.length) +
    '\n' + listItemsHtml + '    ' +
    blogListHtml.substring(endIndex);

  fs.writeFileSync(BLOG_LIST_PATH, updatedBlogListHtml, 'utf-8');
  console.log('Successfully updated blog list in code.html!');
  console.log(`Compiled ${posts.length} posts.`);
}

main();
