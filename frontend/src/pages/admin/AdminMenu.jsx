import ResourceManager from '../../components/ResourceManager';
import { menu } from '../../api/resources';

const fields = [
  { key: 'name', label: 'Item name', required: true },
  { key: 'category', label: 'Category', required: true },
  { key: 'price', label: 'Price', type: 'number' },
  { key: 'description', label: 'Description', type: 'textarea' },
];

export default function AdminMenu() {
  return <ResourceManager title="Menu" resource={menu} fields={fields} />;
}
