import ResourceManager from '../../components/ResourceManager';
import { menu } from '../../api/resources';

const fields = [
  { key: 'images', label: 'Photo', type: 'image-file', uploadFieldName: 'image' },
  { key: 'name', label: 'Item name', required: true },
  { key: 'category', label: 'Category', type: 'select', options: ['Nepali Cuisine', 'Local Special', 'Beverages', 'Dessserts', 'Snacks', 'Breakfast'] },
  { key: 'price', label: 'Price', type: 'number', required: true },
  { key: 'description', label: 'Description', type: 'textarea' },
  { key: 'veg', label: 'Vegetarian', type: 'checkbox' },
  { key: 'popular', label: 'Mark as popular', type: 'checkbox' },
  { key: 'available', label: 'Available', type: 'checkbox' },
];

const columns = [fields[0], fields[1], fields[2], fields[3]];

export default function AdminMenu() {
  return <ResourceManager title="Menu" resource={menu} fields={fields} columns={columns} permissionResource="menu" />;
}