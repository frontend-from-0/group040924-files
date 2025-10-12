import { CardCreateModal } from './CardCreateModal';

export default function Home() {
  return (
    <CardCreateModal
      isOpen={true}
      onClose={() => console.log('Replace with a real function')}
      deckId={'12323412421421'}
    />
  );
}
