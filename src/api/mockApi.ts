import { Blog } from '../redux/blogSlice';

// Mock Users Database
const users: { username: string; password: string; id: string }[] = [
  { username: 'testuser', password: 'password123', id: '1' },
];

// Mock Blogs Database
const blogs: Blog[] = Array.from({ length: 50 }, (_, index) => ({
  id: `${index + 1}`,
  title: `Sample Blog Post ${index + 1}`,
  image: `https://picsum.photos/seed/${index + 1}/600/400`,
  excerpt: `This is a brief summary of blog post ${index + 1}.`,
  content: `This is the full content of blog post ${index + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
}));

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

// Signup Function
export const signupApi = async (username: string, password: string) => {
  await delay(1000);

  const existingUser = users.find(user => user.username === username);
  if (existingUser) {
    throw new Error('User already exists');
  }

  const newUser = { username, password, id: `${users.length + 1}` };
  users.push(newUser);

  return { id: newUser.id, username: newUser.username };
};

// Login Function
export const loginApi = async (username: string, password: string) => {
  await delay(1000); // Simulate network delay

  const user = users.find(user => user.username === username && user.password === password);
  if (!user) {
    throw new Error('Invalid username or password');
  }

  return { id: user.id, username: user.username };
};

// Fetch Blogs Function with Pagination
export const fetchBlogsApi = async (page: number, limit: number) => {
  await delay(1000); // Simulate network delay

  const start = (page - 1) * limit;
  const end = page * limit;
  const paginatedBlogs = blogs.slice(start, end);
  const totalPages = Math.ceil(blogs.length / limit);

  return {
    blogs: paginatedBlogs,
    totalPages,
  };
};

// Fetch Single Blog Details
export const fetchBlogDetailApi = async (id: string) => {
  await delay(1000); // Simulate network delay

  const blog = blogs.find(blog => blog.id === id);
  if (!blog) {
    throw new Error('Blog not found');
  }

  return blog;
};
