import ResourceManager from '../../components/ResourceManager';
import { packages } from '../../api/resources';

const fields = [
  { key: 'name', label: 'Package name', required: true },
  { key: 'price', label: 'Price', type: 'number', required: true },
  { key: 'duration', label: 'Duration' },
  { key: 'description', label: 'Description', type: 'textarea' },
];

export default function AdminPackages() {
  return <ResourceManager title="Packages" resource={packages} fields={fields} />;
}
