import ResourceManager from '../../components/ResourceManager';
import { events } from '../../api/resources';

const fields = [
  { key: 'imageUrl', label: 'Photo', type: 'image' },
  { key: 'title', label: 'Event title', required: true },
  { key: 'date', label: 'Date', type: 'date', required: true },
  { key: 'description', label: 'Description', type: 'textarea' },
];

const columns = [fields[0], fields[1], fields[2]];

export default function AdminEvents() {
  return <ResourceManager title="Events" resource={events} fields={fields} columns={columns} />;
}
