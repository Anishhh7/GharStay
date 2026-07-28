import ResourceManager from '../../components/ResourceManager';
import { events } from '../../api/resources';

const fields = [
  { key: 'title', label: 'Event title', required: true },
  { key: 'date', label: 'Date', type: 'date', required: true },
  { key: 'description', label: 'Description', type: 'textarea' },
];

export default function AdminEvents() {
  return <ResourceManager title="Events" resource={events} fields={fields} />;
}
