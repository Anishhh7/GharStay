import ResourceManager from '../../components/ResourceManager';
import { gallery } from '../../api/resources';

const fields = [
  { key: 'imageUrl', label: 'Photo', type: 'image', required: true },
  { key: 'caption', label: 'Caption', required: true },
  { key: 'category', label: 'Category' },
];

export default function AdminGallery() {
  return <ResourceManager title="Gallery" resource={gallery} fields={fields} />;
}
