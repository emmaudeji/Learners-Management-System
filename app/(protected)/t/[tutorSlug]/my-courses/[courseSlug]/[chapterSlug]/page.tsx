import { redirect } from 'next/navigation'
import { getDocumentById } from '@/lib/appwrite'
import { getCurrentUser } from '@/lib/actions/user.actions'
import { appwriteConfig } from '@/lib/actions/config'
import { Chapter } from '@/types'
import { ChapterWrapper } from '@/components/courses/create/ChapterWrapper'

const CourseSlugPage = async ({
  params,
}: {
  params: { courseSlug: string; tutorSlug: string; chapterSlug: string }
}) => {
  const documentId = (await params).chapterSlug
  const { data, error } = await getDocumentById<Chapter>(
    appwriteConfig.chaptersCollectionId,
    documentId
  )
// console.log({data})
  if (!data) {
    const user = await getCurrentUser()
    if(user){
      redirect(`/t/${user?.id}/my-courses`)
    }
    redirect(`/auth?q=sign-in`)
  }

  return (
    <main className="w-full">
      <header className="border-b px-6 pt-12 pb-4">
        <h2 className="text-2xl font-bold">Setup Chapter</h2>
        <p className="text-muted-foreground mt-1">Start by editing your chapter content below.</p>
      </header>

      <ChapterWrapper chapter={data!}  />
    </main>
  )
}

export default CourseSlugPage
