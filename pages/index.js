import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export default function Home({ posts }) {
    console.log(posts);

    return <div className="min-h-screen bg-blue-500">hey! Whats up?</div>;
}

export function getStaticProps() {
    const postsPath = path.join(process.cwd(), 'posts');

    // Read the directory path and then only get the paths to the files
    // that are mdx files (e.g. that have .mdx).
    const postFilePaths = fs
        .readdirSync(postsPath)
        .filter((path) => /\.mdx?$/.test(path));

    const posts = postFilePaths.map((filePath) => {
        const source = fs.readFileSync(path.join(postsPath, filePath));
        const { content, data } = matter(source);

        console.log(content, data);

        return {
            content,
            data,
            filePath,
        };
    });

    return { props: { posts } };
}
