import ResourceManager from '../../components/ResourceManager';
import { packages } from '../../api/resources';

const fields = [
  { key: 'image', label: 'Photo', type: 'image-file', uploadFieldName: 'image' },
  { key: 'name', label: 'Package name', required: true },
  { key: 'duration', label: 'Duration', required: true },
  { key: 'price', label: 'Price', type: 'number', required: true },
  { key: 'description', label: 'Description', type: 'textarea', required: true },
  { key: 'includedServices', label: 'Included services', type: 'tags' },
  { key: 'termsAndCondition', label: 'Terms & conditions', type: 'tags' },
  { key: 'featured', label: 'Feature on homepage', type: 'checkbox' },
  { key: 'active', label: 'Active', type: 'checkbox' },
];

const columns = [fields[0], fields[1], fields[2], fields[3]];

export default function AdminPackages() {
  return <ResourceManager title="Packages" resource={packages} fields={fields} columns={columns} permissionResource="packages" />;
}