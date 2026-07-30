import ResourceManager from '../../components/ResourceManager';
import { rooms } from '../../api/resources';

const fields = [
  { key: 'images', label: 'Photos', type: 'images' },
  { key: 'roomName', label: 'Room name', required: true },
  { key: 'roomType', label: 'Room type', type: 'select', options: ['Single', 'Double', 'Deluxe'], required: true },
  { key: 'price', label: 'Price per night', type: 'number', required: true },
  { key: 'occupancy', label: 'Occupancy', type: 'number', required: true },
  { key: 'description', label: 'Description', type: 'textarea', required: true },
  { key: 'amenities', label: 'Amenities', type: 'tags' },
  { key: 'features', label: 'Features', type: 'tags' },
  { key: 'availability', label: 'Available for booking', type: 'checkbox' },
  { key: 'featured', label: 'Feature on homepage', type: 'checkbox' },
];

const columns = [fields[1], fields[2], fields[3]];

export default function AdminRooms() {
  return <ResourceManager title="Rooms" resource={rooms} fields={fields} columns={columns} permissionResource="rooms" />;
}