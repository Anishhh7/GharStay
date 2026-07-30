import ResourceManager from '../../components/ResourceManager';
import { gallery } from '../../api/resources';

const fields = [
  { key: 'url', label: 'Photo', type: 'image', required: true },
  { key: 'title', label: 'Title', required: true },
  { key: 'mediaType', label: 'Media type', type: 'select', options: ['Image', 'Video'], required: true },
  { key: 'category', label: 'Category', type: 'select', options: ['Rooms', 'Restaurant', 'Nature', 'Swimming Pool', 'Events', 'Resort Activities'] },
  { key: 'featured', label: 'Feature on homepage', type: 'checkbox' },
];

const columns = [fields[0], fields[1], fields[3]];

export default function AdminGallery() {
  return <ResourceManager title="Gallery" resource={gallery} fields={fields} columns={columns} permissionResource="gallery" />;
}