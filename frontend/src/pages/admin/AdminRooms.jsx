import ResourceManager from '../../components/ResourceManager';
import { rooms } from '../../api/resources';

const fields = [
  { key: 'name', label: 'Room name', required: true },
  { key: 'price', label: 'Price per night', type: 'number', required: true },
  { key: 'capacity', label: 'Capacity', type: 'number' },
  { key: 'description', label: 'Description', type: 'textarea' },
];

export default function AdminRooms() {
  return <ResourceManager title="Rooms" resource={rooms} fields={fields} />;
}
