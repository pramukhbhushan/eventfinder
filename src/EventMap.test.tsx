import { Event, EventCategory } from './EventMap';

describe('EventMap types', () => {
  test('Event interface has correct properties', () => {
    const event: Event = {
      id: 1,
      title: 'Test Event',
      date: '2024-11-15',
      time: '2:00 PM',
      description: 'Test description',
      category: 'Academic',
      position: [38.9869, -76.9426]
    };
    
    expect(event.id).toBe(1);
    expect(event.title).toBe('Test Event');
    expect(event.category).toBe('Academic');
    expect(event.position).toHaveLength(2);
  });

  test('EventCategory type accepts valid values', () => {
    const categories: EventCategory[] = ['Academic', 'Social', 'UMD Sponsored'];
    expect(categories).toHaveLength(3);
    expect(categories).toContain('Academic');
    expect(categories).toContain('Social');
    expect(categories).toContain('UMD Sponsored');
  });
});
