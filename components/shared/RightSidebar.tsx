import Link from 'next/link'
import React from 'react'
import RenderTag from './RenderTag'
import Image from 'next/image'

const hotQuestions = [
    {
        _id: 1,
        title: 'Best practices for data fetching in a Next.js application with Server-Side Rendering (SSR)?'
    },
    {
        _id: 2,
        title: 'Can I get the course for free?'
    },
    {
        _id: 3,
        title: 'Async/Await Function Not Handling Errors Properly'
    },
    {
        _id: 4,
        title: 'Redux Toolkit Not Updating State as Expected'
    },
    {
        _id: 5,
        title: 'How do I use express as a custom server in NextJS?'
    }
]

const popularTags = [
    {
        _id: 1,
        name: 'JavaScript',
        totalQuestions: 5,
    },
    {
        _id: 2,
        name: 'TypeScript',
        totalQuestions: 5,
    },
    {
        _id: 3,
        name: 'Next.js',
        totalQuestions: 10,
    },
    {
        _id: 4,
        name: 'React.js',
        totalQuestions: 10,
    },
    {
        _id: 5,
        name: 'MongoDB',
        totalQuestions: 5,
    },
]
function RightSidebar() {
  return (
    <section className='background-light900_dark200 light-border custom-scrollbar sticky right-0 top-0 flex h-screen w-[350px] flex-col overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden' >
        <div>
            <h3 className='h3-bold text-dark200_light900'>Top Questions</h3>
            <div className='mt-7 flex w-full flex-col gap-[30px]'>
                {hotQuestions.map((question) => (
                    <Link href={`/questions/${question._id}`} key={question._id}
                        className='flex cursor-pointer items-center justify-between gap-7'
                    >
                        <p>{question.title}</p>
                        <Image 
                            src={'/assets/icons/chevron-right.svg'}
                            alt='Chevron Right'
                            width={20}
                            height={20}
                            className='invert-colors'
                        />
                    </Link>
                ))}
            </div>
        </div>
        <div className='mt-16'>
            <h3 className='h3-bold text-dark200_light900'>Popular Tags</h3>
            {popularTags.map((tag) => (
                <RenderTag 
                    key={tag._id}
                    _id={tag._id}
                    name={tag.name}
                    totalQuestions={tag.totalQuestions}
                    showCount
                />
            ))}
        </div>
    </section>
  )
}

export default RightSidebar