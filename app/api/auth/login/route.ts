import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { getServerSupabaseClient } from '@/lib/supabase-client';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const supabase = getServerSupabaseClient();

    // Get admin from database
    const { data: admin, error } = await supabase
      .from('admins')
      .select('id, email, password_hash')
      .eq('email', email)
      .single();

    if (error || !admin) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, admin.password_hash);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Create response with session cookie
    const response = NextResponse.json(
      { success: true, admin: { id: admin.id, email: admin.email } },
      { status: 200 }
    );

    // Set session cookie (httpOnly, secure)
    response.cookies.set('admin_session', JSON.stringify({ id: admin.id, email: admin.email }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
