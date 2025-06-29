# Poultry Project Setup Guide

## Database Setup

1. **Create a `.env` file** in the root directory with the following content:

```env
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/poultry_db"
DIRECT_URL="postgresql://username:password@localhost:5432/poultry_db"

# Next.js Configuration
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
```

2. **Update the database URL** with your actual PostgreSQL credentials:
   - Replace `username` with your database username
   - Replace `password` with your database password
   - Replace `localhost:5432` with your database host and port
   - Replace `poultry_db` with your database name

## Database Migration

1. **Run the database migration** to create the tables:
```bash
npx prisma migrate dev --name init
```

2. **Generate Prisma Client** (if not already done):
```bash
npx prisma generate
```

## Running the Application

1. **Install dependencies** (if not already done):
```bash
npm install
```

2. **Start the development server**:
```bash
npm run dev
```

3. **Open your browser** and navigate to `http://localhost:3000`

## API Endpoints

- **POST `/api/form`** - Submit employee registration form
- **GET `/api/form`** - Fetch all employees

## Features

- ✅ Employee registration form with validation
- ✅ Database storage using Prisma + PostgreSQL
- ✅ Employee list display
- ✅ Form validation (client-side and server-side)
- ✅ Error handling and user feedback
- ✅ Responsive design

## Database Schema

The application uses the following database schema:

```prisma
model Employee {
  id                    String   @id @default(cuid())
  full_name            String
  age                  Int
  salary               Int
  work_employed_to_do  String
  aadhar_number        String   @unique
  phone_number         String
  gender               String
  marital_status       String
  created_at           DateTime @default(now())
  updated_at           DateTime @updatedAt
}
```

## Troubleshooting

1. **Database connection issues**: Make sure your PostgreSQL server is running and the connection string is correct
2. **Prisma errors**: Run `npx prisma generate` to regenerate the client
3. **Migration issues**: If you need to reset the database, run `npx prisma migrate reset` 