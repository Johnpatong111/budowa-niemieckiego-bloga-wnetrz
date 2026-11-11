import { revalidatePath } from 'next/cache'
import { publicationSchedule } from '@/lib/publication-schedule'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const authorization = request.headers.get('authorization')
  if (process.env.CRON_SECRET && authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  revalidatePath('/')
  revalidatePath('/artikel')
  revalidatePath('/sitemap.xml')
  revalidatePath('/kategorie/beleuchtung')
  revalidatePath('/kategorie/zuhause')
  revalidatePath('/kategorie/interieur')
  revalidatePath('/kategorie/garten')
  revalidatePath('/kategorie/ratgeber')
  for (const article of publicationSchedule) {
    revalidatePath(`/artikel/${article.slug}`)
  }

  return Response.json({ ok: true, checkedAt: new Date().toISOString() })
}
