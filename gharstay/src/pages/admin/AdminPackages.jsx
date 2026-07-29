import ResourceManager from '../../components/ResourceManager';
import { packages } from '../../api/resources';

const fields = [
  { key: 'imageUrl', label: 'Photo', type: 'image' },
  { key: 'name', label: 'Package name', required: true },
  { key: 'price', label: 'Price', type: 'number', required: true },
  { key: 'duration', label: 'Duration' },
  { key: 'description', label: 'Description', type: 'textarea' },
];

const columns = [fields[0], fields[1], fields[2]];

export default function AdminPackages() {
  return <ResourceManager title="Packages" resource={packages} fields={fields} columns={columns} />;
}
