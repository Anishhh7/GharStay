import ResourceManager from '../../components/ResourceManager';
import { faq } from '../../api/resources';

const fields = [
  { key: 'question', label: 'Question', required: true },
  { key: 'answer', label: 'Answer', type: 'textarea', required: true },
];

export default function AdminFAQ() {
  return <ResourceManager title="FAQ" resource={faq} fields={fields} />;
}
