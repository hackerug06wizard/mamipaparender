import { NextRequest, NextResponse } from 'next/server';
import { getServerSupabaseClient } from '@/lib/supabase-client';

export async function GET(request: NextRequest) {
  try {
    const supabase = getServerSupabaseClient();

    const { data: categories, error } = await supabase
      .from('categories')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      return NextResponse.json(
        { error: 'Failed to fetch categories' },
        { status: 500 }
      );
    }

    return NextResponse.json({ categories }, { status: 200 });
  } catch (error) {
    console.error('Get categories error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check if admin is authenticated
    const cookies = request.cookies.get('admin_session');
    if (!cookies) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { name, description } = await request.json();

    if (!name) {
      return NextResponse.json(
        { error: 'Category name is required' },
        { status: 400 }
      );
    }

    const supabase = getServerSupabaseClient();
    const slug = name.toLowerCase().replace(/\s+/g, '-');

    const { data: category, error } = await supabase
      .from('categories')
      .insert({ name, description, slug })
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: error.message || 'Failed to create category' },
        { status: 400 }
      );
    }

    return NextResponse.json({ category }, { status: 201 });
  } catch (error) {
    console.error('Create category error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
