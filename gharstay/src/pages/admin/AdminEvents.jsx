import ResourceManager from '../../components/ResourceManager';
import { events } from '../../api/resources';

const fields = [
  { key: 'images', label: 'Photo', type: 'image' },
  { key: 'name', label: 'Event name', required: true },
  { key: 'date', label: 'Date', type: 'date', required: true },
  { key: 'category', label: 'Category', type: 'select', options: ['Weddings', 'Corporate Events', 'Birthday', 'Family Gatherings', 'Cultural Programs'], required: true },
  { key: 'description', label: 'Description', type: 'textarea' },
  { key: 'active', label: 'Active', type: 'checkbox' },
];

const columns = [fields[0], fields[1], fields[2], fields[3]];

export default function AdminEvents() {
  return <ResourceManager title="Events" resource={events} fields={fields} columns={columns} permissionResource="events" />;
}