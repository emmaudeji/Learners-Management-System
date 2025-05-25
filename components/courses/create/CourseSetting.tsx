import { Button } from '@/components/ui/button'
import { Chapter, Course } from '@/types'
import React, { useState } from 'react'
import PriceForm from './PriceForm'
import Heading from '@/components/common/Heading'
import { ChevronDown, DollarSign } from 'lucide-react'
import { cn } from '@/lib/utils'
import StatusSelect from './StatusSelect'
import { appwriteConfig } from '@/lib/actions/config'
import IsFreeSetUp from './IsFreeSetup'

const CourseSetting = ({course, chapter}:{
    course:Course,   chapter: Chapter
}) => {
    //   const [type, setType] = useState<"pricing" | "chapter" >('pricing')  

      const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
    
      const toggleSection = (alias: string) => {
        setExpandedSections((prev) => ({
          ...prev,
          [alias]: !prev[alias],
        }));
      };
 
  return (
        <section  className="w-full space-y-8   pt-10">
 

            <section className="mx-auto max-w-4xl flex w-full flex-col items-center">

                <Heading icon={<DollarSign />} title='Setup accessibility for each chapter' />
                <section className="mx-auto w-full max-w-xl space-y-6 pt-8 border-b pb-4">
                    {course.sections?.length === 0 ? (
                    <p className="text-sm text-gray-400 italic">No sections available</p>
                    ) : (
                    course.sections.map((section, index) => {
                        const isExpanded = expandedSections[section.alias] ?? true;
                        return (
                        <div key={section.alias} className="   w-full  ">
                            <div className="flex items-center gap-2 p-2 bg-gray-100 ">
                                <p className="flex-1 font-semibold text-gray-600 uppercase  truncate">
                                    M-{index + 1}. {section.label}
                                </p>
                                <ChevronDown
                                    size={18}
                                    className={cn(
                                    "cursor-pointer transition-transform",
                                    !section.chapters.length && "text-gray-300 pointer-events-none",
                                    isExpanded && "rotate-180"
                                    )}
                                    onClick={() => toggleSection(section.alias)}
                                />
                            </div>

                            {isExpanded && (
                            <ul className="space-y-2 pt-2  divide-y">
                                {section.chapters.length === 0 ? (
                                <li className="text-center px-4   text-gray-400 italic  ">No chapters</li>
                                ) : (
                                section.chapters.map((chap) => (
                                    <li
                                    key={chap.alias}
                                    className={cn(
                                        "text-base  px-4 flex gap-2 py-2 rounded hover:bg-gray-100",
                                        chapter?.alias === chap.alias
                                        ? "text-green-600 font-medium bg-green-50"
                                        : "text-gray-700"
                                    )}
                                    >
                                        <p className="flex-1">{chap.label}</p>
                                        <div className="flex items-center gap-2">
                                            <StatusSelect collectionId={appwriteConfig.chaptersCollectionId} documentId={chap.alias} currentStatus={chap.status} />
                                            <IsFreeSetUp collectionId={appwriteConfig.chaptersCollectionId} documentId={chap.alias} currentIsFree={chap.isFree} />
                                        </div>
                                    </li>
                                ))
                                )}
                            </ul>
                            )}
                        </div>
                        );
                    })
                    )}
                </section>

            </section>


 

         

        </section>
  )
}

export default CourseSetting