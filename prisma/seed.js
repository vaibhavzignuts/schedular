const { PrismaClient } = require('@prisma/client');
const { addDays, setHours, setMinutes, startOfDay } = require('date-fns');

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seeding process...');

  // Get the first user in the DB
  const user = await prisma.user.findFirst();
  if (!user) {
    console.error('No users found in the database. Please sign in to the app first to create a user record.');
    process.exit(1);
  }
  
  console.log(`Seeding data for user: ${user.name || user.username} (${user.id})`);

  // Clear existing dummy data if necessary (optional, doing it to ensure a clean state)
  await prisma.booking.deleteMany({ where: { userId: user.id } });
  await prisma.event.deleteMany({ where: { userId: user.id } });

  // 1. Create Appointment Types (Events)
  const eventTypes = [
    { title: 'New Patient Consultation', duration: 45, isVirtual: false, color: 'emerald', description: 'Initial consultation and intake.' },
    { title: 'Follow-up Visit', duration: 30, isVirtual: false, color: 'blue', description: 'Standard follow-up for existing patients.' },
    { title: 'Telehealth Consultation', duration: 30, isVirtual: true, color: 'purple', description: 'Virtual video consultation.' },
    { title: 'Annual Wellness Visit', duration: 60, isVirtual: false, color: 'orange', description: 'Comprehensive annual check-up.' },
    { title: 'Medication Management', duration: 15, isVirtual: true, color: 'purple', description: 'Quick check-in for medication refills.' },
  ];

  const createdEvents = [];
  for (const et of eventTypes) {
    const event = await prisma.event.create({
      data: {
        ...et,
        userId: user.id,
      }
    });
    createdEvents.push(event);
  }
  console.log(`Created ${createdEvents.length} event types.`);

  // 2. Generate Bookings across the next 6 days (including today)
  const today = startOfDay(new Date());
  let bookingCount = 0;

  const mockPatients = [
    { name: 'Sarah Wilson', email: 'sarah.w@example.com' },
    { name: 'John Miller', email: 'jmiller@example.com' },
    { name: 'Michael Brown', email: 'mbrown@example.com' },
    { name: 'Jessica Davis', email: 'jdavis@example.com' },
    { name: 'Robert Taylor', email: 'rtaylor@example.com' },
    { name: 'Emily Carter', email: 'ecarter@example.com' },
    { name: 'David Clark', email: 'dclark@example.com' },
  ];

  // Distribution of statuses
  const statuses = ['CONFIRMED', 'CHECKED_IN', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'NO_SHOW'];

  for (let i = 0; i < 6; i++) {
    const currentDate = addDays(today, i);
    
    // Create 4-6 bookings per day
    const numBookings = Math.floor(Math.random() * 3) + 4;
    
    // Starting around 9 AM
    let currentHour = 9;
    
    for (let b = 0; b < numBookings; b++) {
      const eventType = createdEvents[Math.floor(Math.random() * createdEvents.length)];
      const patient = mockPatients[Math.floor(Math.random() * mockPatients.length)];
      
      const startTime = setMinutes(setHours(currentDate, currentHour), 0);
      const endTime = new Date(startTime.getTime() + eventType.duration * 60000);
      
      // Determine status based on the date
      let status = 'CONFIRMED';
      if (i === 0) { // Today
        if (currentHour < 11) status = 'COMPLETED';
        else if (currentHour === 11) status = 'IN_PROGRESS';
        else if (currentHour === 12) status = 'CHECKED_IN';
        else status = 'CONFIRMED';
      } else if (i < 0) {
        status = 'COMPLETED';
      }

      // Randomly cancel or no-show some future/past ones
      if (Math.random() > 0.85) status = 'CANCELLED';
      else if (Math.random() > 0.9) status = 'NO_SHOW';

      await prisma.booking.create({
        data: {
          eventId: eventType.id,
          userId: user.id,
          name: patient.name,
          email: patient.email,
          startTime: startTime,
          endTime: endTime,
          status: status,
          meetLink: eventType.isVirtual ? 'https://meet.google.com/mock-link-123' : '',
          googleEventId: `mock-google-id-${i}-${b}`,
        }
      });
      
      bookingCount++;
      currentHour += 1; // Increment by 1 hour for the next booking
    }
  }

  console.log(`Created ${bookingCount} bookings over 6 days.`);
  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
