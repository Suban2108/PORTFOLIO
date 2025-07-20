import { NextRequest, NextResponse } from 'next/server';
import { fetchLeetCodeStats } from '@/lib/leetcode';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get('username');

  if (!username) {
    return NextResponse.json({ error: 'Missing username parameter' }, { status: 400 });
  }

  try {
    const data = await fetchLeetCodeStats(username);
    if (!data) {
      return NextResponse.json({ error: 'No data found for user' }, { status: 404 });
    }
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch LeetCode stats' }, { status: 500 });
  }
} 