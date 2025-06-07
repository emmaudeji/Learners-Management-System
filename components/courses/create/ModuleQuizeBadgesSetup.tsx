import ReusableLayout from '@/components/common/ReusableLayout'
import { Button } from '@/components/ui/button'
import { useCreateCourse } from '@/context/CreateCourseContext'
import { Award, ScrollText } from 'lucide-react'
import React, { useState } from 'react'
import ModuleQuizeSetup from './ModuleQuizeSetup'
import ModuleBadgeSetup from './ModuleBadgeSetup'

const ModuleQuizeBadgesSetup = () => {
      const {
        currentStepIndex,
        setCurrentStepIndex,
        chapter,
        course,

        sections,
        setSections
        
      } = useCreateCourse()

      const [type, setType] = useState('quiz') // 'badge' or 'quiz'
      const [selectedSection, setSelectedSection] = useState(sections[0] || null)


  return (
             <section className="pt-10 border">
               <div className="text-center w-full border-b pb-6 ">
                 <h5 className="text-2xl font-semibold mb-2">Module Badges & Quizzes Setup</h5>
                 <p className="text-muted-foreground mx-auto max-w-xl text-center">
                   Set up badges for each module to reward learners for completing all chapters and quizzes.
                 </p>
               </div>
   
               <ReusableLayout
                 sidebar={
                   <div className="   divide-y divide-gray-300 text-sm text-muted-foreground py-6">
                      <h6 className=" text-nowrap px-4 pb-4">Select a Module</h6>

                      <ul className=" divide-y">
                        {sections.map((section) => (
                          <li key={section.id} className="px-4 py-3 hover:bg-gray-100">
                            <p className="">{section.label}</p>
                            <div className="flex gap-2 pt-2 items-center">
                                <button onClick={() => { setType('badge'); setSelectedSection(section); }} className="border border-green-700 px-3 py-1 rounded-full text-xs text-green-700">
                                  Badge
                                </button>
                                <button onClick={() => { setType('quiz'); setSelectedSection(section); }} className="border border-blue-700 px-3 py-1 rounded-full text-xs text-blue-700">
                                  Quiz
                                </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                   </div>
                 }
               >
                <section className="px-6 py-4 space-y-6">
                    <div className="">
                        <h6 className="">{selectedSection.label}</h6>
                        <div className="flex gap-2 justify-self-end pt-2 items-center">
                            <Button variant={'outline'} onClick={() => { setType('badge'); }} className="border border-green-700 px-3 py-1 rounded-full text-xs text-green-700">
                                Create Badge
                            </Button >
                            <Button variant={'outline'} onClick={() => { setType('quiz');   }} className="border border-blue-700 px-3 py-1 rounded-full text-xs text-blue-700">
                                Create Quiz
                            </Button >
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                    <Award className="h-6 w-6 text-green-600" />
                    <h5 className="text-lg font-semibold">Create {type === 'badge' ? 'Module Badge' : 'Quiz'}</h5>
                    </div>
    
                    {/* Module Badge or Quiz Form */}
 
                    {type === 'badge' && (
                        <ModuleBadgeSetup onSelect={()=>{}}  />
                    )}
    
                    {type === 'quiz' && (
                        <ModuleQuizeSetup section={selectedSection} />
                    )}
                </section>
               </ReusableLayout>
             </section>
  )
}

export default ModuleQuizeBadgesSetup