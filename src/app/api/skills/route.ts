import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET - Fetch all skills (with categories)
export async function GET() {
  try {
    const { data: categories, error: catError } = await supabase
      .from('skill_categories')
      .select('id, title, skills:skills(id, name, level)');
    if (catError) throw catError;
    return NextResponse.json({ success: true, data: categories });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

// POST - Create new skill category
export async function POST(request: NextRequest) {
  try {
    const { title, skills } = await request.json();
    const { data: category, error: catError } = await supabase
      .from('skill_categories')
      .insert([{ title }])
      .select()
      .single();
    if (catError) throw catError;
    // Insert skills if provided
    if (skills && skills.length > 0) {
      const skillsToInsert = skills.map((s: any) => ({ ...s, category_id: category.id }));
      const { error: skillsError } = await supabase.from('skills').insert(skillsToInsert);
      if (skillsError) throw skillsError;
    }
    return NextResponse.json({ success: true, data: category });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

// PUT - Update skill category
export async function PUT(request: NextRequest) {
  try {
    const { id, title, skills } = await request.json();
    const { error: catError } = await supabase
      .from('skill_categories')
      .update({ title })
      .eq('id', id);
    if (catError) throw catError;
    // Optionally update skills
    if (skills) {
      // 1. Get all existing skill IDs for this category
      const { data: existingSkills, error: fetchError } = await supabase
        .from('skills')
        .select('id')
        .eq('category_id', id);
      if (fetchError) throw fetchError;
      const existingIds = (existingSkills || []).map((s: any) => s.id);
      const updatedIds = skills.filter((s: any) => s.id).map((s: any) => s.id);
      // 2. Delete skills that are not in the updated list
      const toDelete = existingIds.filter((eid: number) => !updatedIds.includes(eid));
      if (toDelete.length > 0) {
        await supabase.from('skills').delete().in('id', toDelete);
      }
      // 3. Update or insert skills
      for (const skill of skills) {
        if (skill.id) {
          await supabase.from('skills').update(skill).eq('id', skill.id);
        } else {
          await supabase.from('skills').insert([{ ...skill, category_id: id }]);
        }
      }
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

// DELETE - Delete skill category and its skills
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Category ID required' }, { status: 400 });
    // Delete skills first
    await supabase.from('skills').delete().eq('category_id', id);
    // Delete category
    const { error: catError } = await supabase.from('skill_categories').delete().eq('id', id);
    if (catError) throw catError;
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
} 