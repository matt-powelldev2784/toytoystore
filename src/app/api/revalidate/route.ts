import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export const POST = async (req: NextRequest) => {
  const body = await req.json()
  const { path } = body

  if (!path || typeof path !== 'string') {
    return NextResponse.json({ error: 'Path is required' }, { status: 400 })
  }

  try {
    revalidatePath(path)
    return NextResponse.json({ revalidated: true }, { status: 200 })
  } catch (error) {
    console.error('Error revalidating:', error)
  }
}
