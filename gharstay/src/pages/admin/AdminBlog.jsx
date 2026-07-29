import ResourceManager from '../../components/ResourceManager';
import { blog } from '../../api/resources';

const fields = [
  { key: 'imageUrl', label: 'Cover photo', type: 'image' },
  { key: 'title', label: 'Title', required: true },
  { key: 'excerpt', label: 'Excerpt', type: 'textarea' },
  { key: 'content', label: 'Content', type: 'textarea', required: true },
];

const columns = [fields[0], fields[1]];

export default function AdminBlog() {
  return <ResourceManager title="Blog" resource={blog} fields={fields} columns={columns} />;
}
