import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET - Fetch all experience
export async function GET() {
  try {
    const { data, error } = await supabase.from('experience').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

// POST - Create new experience
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // Only insert allowed fields
    const insertData = {
      title: body.title,
      company: body.company,
      period: body.period,
      description: body.description,
      achievements: body.achievements,
      iconUrl: body.iconUrl,
      location: body.location,
      startDate: body.startDate,
      endDate: body.endDate,
    };
    const { data, error } = await supabase.from('experience').insert([insertData]).select().single();
    if (error) throw error;
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

// PUT - Update experience
export async function PUT(request: NextRequest) {
  try {
    const { id, ...rest } = await request.json();
    // Only update allowed fields
    const updateData = {
      title: rest.title,
      company: rest.company,
      period: rest.period,
      description: rest.description,
      achievements: rest.achievements,
      iconUrl: rest.iconUrl,
      location: rest.location,
      startDate: rest.startDate,
      endDate: rest.endDate,
    };
    const { error } = await supabase.from('experience').update(updateData).eq('id', id);
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

// DELETE - Delete experience
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Experience ID required' }, { status: 400 });
    const { error } = await supabase.from('experience').delete().eq('id', id);
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
} 