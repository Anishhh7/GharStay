import ResourceManager from '../../components/ResourceManager';
import { blog } from '../../api/resources';

const fields = [
  { key: 'coverImage', label: 'Cover photo', type: 'image' },
  { key: 'title', label: 'Title', required: true },
  { key: 'category', label: 'Category', type: 'select', options: ['Travel', 'Resort', 'Food', 'Events', 'Others'] },
  { key: 'content', label: 'Content', type: 'textarea', required: true },
  { key: 'metaTitle', label: 'Meta title (SEO)' },
  { key: 'metaDescription', label: 'Meta description (SEO)', type: 'textarea' },
  { key: 'published', label: 'Published', type: 'checkbox' },
];

const columns = [fields[0], fields[1], fields[2]];

export default function AdminBlog() {
  return <ResourceManager title="Blog" resource={blog} fields={fields} columns={columns} permissionResource="blog" />;
}