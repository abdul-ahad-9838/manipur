import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Course from '@/models/Course';
import { protect } from '@/lib/auth';

export async function GET() {
  try {
    await dbConnect();
    // Only fetch fields needed for listing — exclude heavy fields like syllabus/objectives
    const courses = await Course.find({})
      .select('title specialisation icon description school category order isActive slug coverImage cardImage duration eligibility fee seats mode affiliation highlight')
      .sort({ order: 1, createdAt: -1 })
      .lean();
    return NextResponse.json(courses, {
      headers: { 'Cache-Control': 'no-store' }
    });
  } catch (error) {
    console.error('Get courses error:', error);
    return NextResponse.json({ 
      message: 'Failed to fetch courses',
      error: error.message 
    }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const user = await protect(request);
    if (!user) {
      return NextResponse.json({ message: 'Not authorized' }, { status: 401 });
    }

    const body = await request.json();
    
    // Validate required fields
    if (!body.title || !body.description) {
      return NextResponse.json({ 
        message: 'Title and description are required fields' 
      }, { status: 400 });
    }

    const course = new Course(body);
    const createdCourse = await course.save();
    return NextResponse.json(createdCourse, { status: 201 });
  } catch (error) {
    console.error('Create course error:', error);
    
    // Handle validation errors specifically
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return NextResponse.json({ 
        message: 'Validation failed', 
        errors: validationErrors 
      }, { status: 400 });
    }
    
    return NextResponse.json({ 
      message: error.message || 'Invalid data' 
    }, { status: 400 });
  }
}
