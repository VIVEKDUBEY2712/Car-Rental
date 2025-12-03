
const mongoose = require('mongoose');
const connectDB = require('./config/database');
const Car = require('./models/Car');
const User = require('./models/User');
const Ride = require('./models/Ride');


// Connect to MongoDB
connectDB();

const seedData = async () => {
  try {
    console.log('🗑  Clearing existing data...');
    await Car.deleteMany({});
    await User.deleteMany({});
    await Ride.deleteMany({});

    // Admin (Vivek)
    console.log('👤 Creating admin user...');
    const admin = await User.create({
      name: 'Vivek Dubey',
      email: 'dubeyvivek2712@gmail.com',
      password: 'Vivek@2712',
      phone: '+916387787339',
      role: 'admin'
    });

    // Regular Users
    console.log('👥 Creating regular users...');
    const users = await User.create([
      { name: 'Asha Sharma', email: 'asha.sharma@example.com', password: 'password123', phone: '+919800000001', role: 'user' },
      { name: 'Rohit Verma', email: 'rohit.verma@example.com', password: 'password123', phone: '+919800000002', role: 'user' },
      { name: 'Neha Singh', email: 'neha.singh@example.com', password: 'password123', phone: '+919800000003', role: 'user' },
      { name: 'Suresh Patil', email: 'suresh.patil@example.com', password: 'password123', phone: '+919800000004', role: 'user' },
      { name: 'Priya Rao', email: 'priya.rao@example.com', password: 'password123', phone: '+919800000005', role: 'user' }
    ]);

    // Cars (Delhi–Mathura–Agra belt)
    console.log('🚗 Creating cars...');
    const cars = await Car.create([
      {
        model: 'Tiago',
        brand: 'Tata',
        pricePerDay: 7050,
        pricePerHour: 500,
        location: 'Delhi',
        availability: true,
        images: ['https://www.mahaswayam.in/wp-content/uploads/2025/07/Tata-Tiago-1024x576.jpg'],
        description: 'Compact hatchback ideal for Delhi traffic. Great mileage and easy handling.',
        year: 2022,
        type: 'hatchback',
        seatingCapacity: 5,
        fuelType: 'petrol'
      },
      {
        model: 'Nexon EV',
        brand: 'Tata',
        pricePerDay: 8000,
        pricePerHour: 1020,
        location: 'Noida',
        availability: true,
        images: ['https://images.unsplash.com/photo-1623869675781-80aa31012a5a?w=800'],
        description: 'Electric SUV perfect for NCR commutes. Quiet and zero-emission ride.',
        year: 2023,
        type: 'suv',
        seatingCapacity: 5,
        fuelType: 'electric'
      },
      {
        model: 'Harrier',
        brand: 'Tata',
        pricePerDay: 9000,
        pricePerHour: 1400,
        location: 'Agra',
        availability: true,
        images: ['https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800'],
        description: 'Spacious SUV for Agra highway trips. Premium interiors and strong engine.',
        year: 2023,
        type: 'suv',
        seatingCapacity: 5,
        fuelType: 'diesel'
      },
      {
        model: 'Thar',
        brand: 'Mahindra',
        pricePerDay: 8500,
        pricePerHour: 1000,
        location: 'Mathura',
        availability: true,
        images: ['https://images.unsplash.com/photo-1581540222194-0def2dda95b8?w=800'],
        description: 'Off-road beast, perfect for rural drives around Mathura–Vrindavan.',
        year: 2023,
        type: 'suv',
        seatingCapacity: 4,
        fuelType: 'petrol'
      },
      {
        model: 'Scorpio N',
        brand: 'Mahindra',
        pricePerDay: 10000,
        pricePerHour: 1050,
        location: 'Vrindavan',
        availability: true,
        images: ['https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800'],
        description: 'Powerful SUV for family trips across UP region. Spacious and comfortable.',
        year: 2024,
        type: 'suv',
        seatingCapacity: 7,
        fuelType: 'diesel'
      },
      {
        model: 'Swift',
        brand: 'Maruti Suzuki',
        pricePerDay: 4000,
        pricePerHour: 600,
        location: 'Faridabad',
        availability: true,
        images: ['https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800'],
        description: 'Perfect small car for NCR travel — smooth, affordable, reliable.',
        year: 2022,
        type: 'hatchback',
        seatingCapacity: 5,
        fuelType: 'petrol'
      },
      {
        model: 'Dzire',
        brand: 'Maruti Suzuki',
        pricePerDay: 4005,
        pricePerHour: 450,
        location: 'Gurugram',
        availability: true,
        images: ['https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800'],
        description: 'Compact sedan ideal for Gurugram–Delhi business routes.',
        year: 2023,
        type: 'sedan',
        seatingCapacity: 5,
        fuelType: 'petrol'
      },
      {
        model: 'Brezza',
        brand: 'Maruti Suzuki',
        pricePerDay: 6500,
        pricePerHour: 990,
        location: 'Noida',
        availability: true,
        images: ['https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800'],
        description: 'Compact SUV with modern features — easy for long city runs.',
        year: 2023,
        type: 'suv',
        seatingCapacity: 5,
        fuelType: 'petrol'
      },
      {
        model: 'Altroz',
        brand: 'Tata',
        pricePerDay: 5000,
        pricePerHour: 800,
        location: 'Agra',
        availability: true,
        images: ['https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800'],
        description: 'Premium hatchback with solid safety and smooth ride quality.',
        year: 2022,
        type: 'hatchback',
        seatingCapacity: 5,
        fuelType: 'petrol'
      },
      {
        model: 'XUV700',
        brand: 'Mahindra',
        pricePerDay: 12000,
        pricePerHour: 1800,
        location: 'Delhi',
        availability: true,
        images: ['https://images.unsplash.com/photo-1584345604476-8ec5f5e8e8b6?w=800'],
        description: 'Luxury SUV with ADAS features — comfortable Delhi–Agra expressway trips.',
        year: 2024,
        type: 'suv',
        seatingCapacity: 7,
        fuelType: 'petrol'
      }
    ]);

    console.log(`✅ Created ${cars.length} cars`);

    // Rides (Delhi–Mathura–Agra belt)
    console.log('🚙 Creating ride shares...');
    const rides = await Ride.create([
      {
        owner: users[0]._id,
        car: cars[0]._id,
        startLocation: 'Delhi',
        endLocation: 'Mathura',
        date: new Date('2025-01-10'),
        time: '08:00 AM',
        availableSeats: 3,
        pricePerSeat: 12,
        description: 'Morning ride from Delhi to Mathura via Yamuna Expressway.'
      },
      {
        owner: users[1]._id,
        car: cars[2]._id,
        startLocation: 'Agra',
        endLocation: 'Delhi',
        date: new Date('2025-01-11'),
        time: '02:00 PM',
        availableSeats: 4,
        pricePerSeat: 15,
        description: 'Comfortable highway ride in Tata Harrier, afternoon departure.'
      },
      {
        owner: users[2]._id,
        car: cars[3]._id,
        startLocation: 'Mathura',
        endLocation: 'Vrindavan',
        date: new Date('2025-01-12'),
        time: '09:00 AM',
        availableSeats: 2,
        pricePerSeat: 5,
        description: 'Short drive for temple visit — Mahindra Thar open-roof experience.'
      },
      {
        owner: users[3]._id,
        car: cars[4]._id,
        startLocation: 'Vrindavan',
        endLocation: 'Agra',
        date: new Date('2025-01-14'),
        time: '07:00 AM',
        availableSeats: 3,
        pricePerSeat: 10,
        description: 'Early morning ride to Agra, drop near Taj Mahal west gate.'
      },
      {
        owner: users[4]._id,
        car: cars[9]._id,
        startLocation: 'Delhi',
        endLocation: 'Agra',
        date: new Date('2025-01-15'),
        time: '06:30 AM',
        availableSeats: 4,
        pricePerSeat: 18,
        description: 'Delhi to Agra expressway drive in Mahindra XUV700. Smooth and fast.'
      },
      {
        owner: users[1]._id,
        car: cars[6]._id,
        startLocation: 'Gurugram',
        endLocation: 'Noida',
        date: new Date('2025-01-18'),
        time: '09:30 AM',
        availableSeats: 3,
        pricePerSeat: 6,
        description: 'Office commute route — quick drive through expressway.'
      },
      {
        owner: users[0]._id,
        car: cars[5]._id,
        startLocation: 'Faridabad',
        endLocation: 'Delhi',
        date: new Date('2025-01-19'),
        time: '10:00 AM',
        availableSeats: 4,
        pricePerSeat: 5,
        description: 'Regular morning commute — affordable sharing ride.'
      },
      {
        owner: users[2]._id,
        car: cars[8]._id,
        startLocation: 'Agra',
        endLocation: 'Mathura',
        date: new Date('2025-01-22'),
        time: '04:00 PM',
        availableSeats: 2,
        pricePerSeat: 8,
        description: 'Evening return ride towards Mathura — light traffic time.'
      }
    ]);

    console.log(`✅ Created ${rides.length} rides`);

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📊 Summary:');
    console.log(`   - Admin: ${admin.name} (${admin.email})`);
    console.log(`   - Users: ${users.length} (password: password123 for all)`);
    console.log(`   - Cars: ${cars.length}`);
    console.log(`   - Rides: ${rides.length}`);
    console.log('\n🔐 Login Credentials:');
    console.log(`   Admin: ${admin.email} / Vivek@2712`);
    console.log('   Example user: asha.sharma@example.com / password123');
    console.log('');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedData();