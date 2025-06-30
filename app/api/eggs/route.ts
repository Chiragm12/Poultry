// pages/api/eggs.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') || '10')));
    const skip = (page - 1) * limit;

    const [eggRecords, totalCount] = await Promise.all([
      (prisma as any).EggInventory.findMany({
        skip,
        take: limit,
        orderBy: {
          created_at: 'desc'
        }
      }),
      (prisma as any).EggInventory.count()
    ]);

    return NextResponse.json({
      records: eggRecords,
      pagination: {
        page,
        limit,
        total: totalCount,
        totalPages: Math.ceil(totalCount / limit)
      }
    });

  } catch (error: any) {
    console.error('Error fetching egg inventory:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch egg inventory. Please try again.',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { crack_eggs, jumbo_eggs, normal_eggs } = body;
    
    if (crack_eggs === undefined || jumbo_eggs === undefined || normal_eggs === undefined) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate that all values are non-negative
    if (crack_eggs < 0 || jumbo_eggs < 0 || normal_eggs < 0) {
      return NextResponse.json(
        { error: 'All egg counts must be non-negative' },
        { status: 400 }
      );
    }

    // Create new egg record
    try {
      const newEggRecord = await (prisma as any).EggInventory.create({
        data: {
          date: new Date(),
          crack_eggs: crack_eggs,
          jumbo_eggs: jumbo_eggs,
          normal_eggs: normal_eggs,
          total_eggs: crack_eggs + jumbo_eggs + normal_eggs
        }
      });

      console.log('Egg inventory created successfully:', newEggRecord.id);

      return NextResponse.json(
        {
          message: 'Egg inventory saved successfully',
          record: {
            id: newEggRecord.id,
            date: newEggRecord.date,
            crack_eggs: newEggRecord.crack_eggs,
            jumbo_eggs: newEggRecord.jumbo_eggs,
            normal_eggs: newEggRecord.normal_eggs,
            total_eggs: newEggRecord.total_eggs,
            created_at: newEggRecord.created_at
          }
        },
        { status: 201 }
      );

    } catch (createError: any) {
      console.error('Error creating egg inventory:', createError);
      return NextResponse.json(
        { error: 'Failed to save egg inventory. Please try again.' },
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
