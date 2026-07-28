import ResourceManager from '../../components/ResourceManager';
import { blog } from '../../api/resources';

const fields = [
  { key: 'title', label: 'Title', required: true },
  { key: 'excerpt', label: 'Excerpt', type: 'textarea' },
  { key: 'content', label: 'Content', type: 'textarea', required: true },
];

export default function AdminBlog() {
  return <ResourceManager title="Blog" resource={blog} fields={fields} />;
}
