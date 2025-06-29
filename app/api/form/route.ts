import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// Initialize Prisma Client with error handling
let prisma: PrismaClient;

try {
  prisma = new PrismaClient({
    log: ['query', 'error', 'warn'],
  });
} catch (error) {
  console.error('Failed to initialize Prisma Client:', error);
  throw error;
}

// Interface for request body
interface EmployeeRequestBody {
  fullName: string;
  age: string;
  salary: string;
  workEmployedToDo: string;
  aadharNumber: string;
  phoneNumber: string;
  gender: string;
  maritalStatus: string;
}

// POST handler for employee registration
export async function POST(request: NextRequest) {
  console.log('POST request received');
  
  try {
    // Parse request body
    let body: EmployeeRequestBody;
    
    try {
      body = await request.json();
      console.log('Request body parsed:', { ...body, aadharNumber: '***HIDDEN***' });
    } catch (parseError) {
      console.error('Failed to parse request body:', parseError);
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    // Extract and validate required fields
    const {
      fullName,
      age,
      salary,
      workEmployedToDo,
      aadharNumber,
      phoneNumber,
      gender,
      maritalStatus
    } = body;

    // Check for missing fields
    const missingFields = [];
    if (!fullName?.trim()) missingFields.push('fullName');
    if (!age?.trim()) missingFields.push('age');
    if (!salary?.trim()) missingFields.push('salary');
    if (!workEmployedToDo?.trim()) missingFields.push('workEmployedToDo');
    if (!aadharNumber?.trim()) missingFields.push('aadharNumber');
    if (!phoneNumber?.trim()) missingFields.push('phoneNumber');
    if (!gender?.trim()) missingFields.push('gender');
    if (!maritalStatus?.trim()) missingFields.push('maritalStatus');

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Validate age
    const ageNum = parseInt(age);
    if (isNaN(ageNum) || ageNum < 18 || ageNum > 100) {
      return NextResponse.json(
        { error: 'Age must be a number between 18 and 100' },
        { status: 400 }
      );
    }

    // Validate salary
    const salaryNum = parseInt(salary);
    if (isNaN(salaryNum) || salaryNum <= 0) {
      return NextResponse.json(
        { error: 'Salary must be a positive number' },
        { status: 400 }
      );
    }

    // Validate Aadhar number
    if (!/^\d{12}$/.test(aadharNumber)) {
      return NextResponse.json(
        { error: 'Aadhar number must be exactly 12 digits' },
        { status: 400 }
      );
    }

    // Validate phone number
    if (!/^\d{10}$/.test(phoneNumber)) {
      return NextResponse.json(
        { error: 'Phone number must be exactly 10 digits' },
        { status: 400 }
      );
    }

    // Validate gender
    const validGenders = ['male', 'female', 'other'];
    if (!validGenders.includes(gender.toLowerCase())) {
      return NextResponse.json(
        { error: 'Gender must be male, female, or other' },
        { status: 400 }
      );
    }

    // Validate marital status
    const validMaritalStatuses = ['bachelor', 'married', 'has-family'];
    if (!validMaritalStatuses.includes(maritalStatus.toLowerCase())) {
      return NextResponse.json(
        { error: 'Marital status must be bachelor, married, or has-family' },
        { status: 400 }
      );
    }

    console.log('Validation passed, checking for existing employee');

    // Check if Aadhar number already exists
    try {
      const existingEmployee = await (prisma as any).employee.findUnique({
        where: {
          aadhar_number: aadharNumber
        }
      });

      if (existingEmployee) {
        console.log('Employee with Aadhar number already exists');
        return NextResponse.json(
          { error: 'An employee with this Aadhar number already exists' },
          { status: 409 }
        );
      }
    } catch (dbError) {
      console.error('Database error checking existing employee:', dbError);
      return NextResponse.json(
        { error: 'Database connection error' },
        { status: 500 }
      );
    }

    console.log('Creating new employee record');

    // Create new employee record
    try {
      const newEmployee = await (prisma as any).employee.create({
        data: {
          full_name: fullName.trim(),
          age: ageNum,
          salary: salaryNum,
          work_employed_to_do: workEmployedToDo.trim(),
          aadhar_number: aadharNumber,
          phone_number: phoneNumber,
          gender: gender.toLowerCase(),
          marital_status: maritalStatus.toLowerCase()
        }
      });

      console.log('Employee created successfully:', newEmployee.id);

      // Return success response
      return NextResponse.json(
        {
          message: 'Employee registered successfully',
          employee: {
            id: newEmployee.id,
            full_name: newEmployee.full_name,
            age: newEmployee.age,
            created_at: newEmployee.created_at
          }
        },
        { status: 201 }
      );

    } catch (createError: any) {
      console.error('Error creating employee:', createError);
      
      // Handle specific Prisma errors
      if (createError.code === 'P2002') {
        return NextResponse.json(
          { error: 'An employee with this Aadhar number already exists' },
          { status: 409 }
        );
      }
      
      return NextResponse.json(
        { error: 'Failed to create employee record' },
        { status: 500 }
      );
    }

  } catch (error: any) {
    console.error('Unexpected error in POST handler:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}

// GET handler for retrieving employees
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') || '10')));
    const skip = (page - 1) * limit;

    const [employees, totalCount] = await Promise.all([
      (prisma as any).employee.findMany({
        skip,
        take: limit,
        orderBy: {
          created_at: 'desc'
        },
        select: {
          id: true,
          full_name: true,
          age: true,
          salary: true,
          work_employed_to_do: true,
          phone_number: true,
          gender: true,
          marital_status: true,
          created_at: true,
          updated_at: true
          // Note: Excluding aadhar_number for security
        }
      }),
      (prisma as any).employee.count()
    ]);

    return NextResponse.json({
      employees,
      pagination: {
        page,
        limit,
        total: totalCount,
        totalPages: Math.ceil(totalCount / limit)
      }
    });

  } catch (error: any) {
    console.error('Error fetching employees:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch employees',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}