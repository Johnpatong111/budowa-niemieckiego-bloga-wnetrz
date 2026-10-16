import { revalidatePath } from 'next/cache'
import { publicationSchedule } from '@/lib/publication-schedule'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const authorization = request.headers.get('authorization')
  if (process.env.CRON_SECRET && authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  revalidatePath('/')
  revalidatePath('/sitemap.xml')
  for (const article of publicationSchedule) {
    revalidatePath(`/artikel/${article.slug}`)
    revalidatePath(`/kategorie/beleuchtung`)
    revalidatePath(`/kategorie/zuhause`)
    revalidatePath(`/kategorie/interieur`)
    revalidatePath(`/kategorie/garten`)
    revalidatePath(`/kategorie/ratgeber`)
  }

  return Response.json({ ok: true, checkedAt: new Date().toISOString() })
}
