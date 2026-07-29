import ResourceManager from '../../components/ResourceManager';
import { testimonials } from '../../api/resources';

const fields = [
  { key: 'name', label: 'Guest name', required: true },
  { key: 'quote', label: 'Quote', type: 'textarea', required: true },
];

export default function AdminTestimonials() {
  return <ResourceManager title="Testimonials" resource={testimonials} fields={fields} />;
}
