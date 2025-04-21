import { NextResponse } from 'next/server';
import { storeMarkdown, getMarkdownById } from '@/lib/cache';

export async function POST(request: Request) {
  const { markdown } = await request.json();
  
  try {
    const id = storeMarkdown(markdown);
    return NextResponse.json({ id }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to store markdown' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  if (!id) {
    return NextResponse.json(
      { error: 'ID parameter is required' },
      { status: 400 }
    );
  }
  
  try {
    const markdown = getMarkdownById(id);
    if (!markdown) {
      return NextResponse.json(
        { error: 'Content not found or expired' },
        { status: 404 }
      );
    }
    return NextResponse.json({ markdown }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to retrieve content' },
      { status: 500 }
    );
  }
}