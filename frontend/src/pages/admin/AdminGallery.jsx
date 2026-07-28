import ResourceManager from '../../components/ResourceManager';
import { gallery } from '../../api/resources';

const fields = [
  { key: 'caption', label: 'Caption', required: true },
  { key: 'category', label: 'Category' },
  { key: 'imageUrl', label: 'Image URL', required: true },
];

export default function AdminGallery() {
  return <ResourceManager title="Gallery" resource={gallery} fields={fields} />;
}
