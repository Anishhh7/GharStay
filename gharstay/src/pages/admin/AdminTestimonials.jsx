import ResourceManager from '../../components/ResourceManager';
import { testimonials } from '../../api/resources';

const fields = [
  { key: 'customerName', label: 'Guest name', required: true },
  { key: 'rating', label: 'Rating (1-5)', type: 'number', required: true },
  { key: 'message', label: 'Message', type: 'textarea' },
  { key: 'approved', label: 'Approved (show on site)', type: 'checkbox' },
];

const columns = [fields[0], fields[1], fields[3]];

export default function AdminTestimonials() {
  return <ResourceManager title="Testimonials" resource={testimonials} fields={fields} columns={columns} permissionResource="testimonial" />;
}