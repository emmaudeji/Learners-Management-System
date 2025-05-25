"use client"
import { fields } from "@/constants"
import { appwriteConfig } from "@/lib/actions/config"
import { Chapter } from "@/types"
import { getOneRequest, getRequest } from "@/utils/api"
import { useEffect } from "react"

export const useChapters = ({chapter}:{chapter:Chapter}) => {

    // const fetchCourse = async () => {
    //     const {data, error} = await getOneRequest({
    //         body:{
    //             collectionId:appwriteConfig.coursesCollectionId,
    //             fields:fields.courses,
    //             // documentId:chapter.course.$id
    //         }
    //     })
    //     // console.log({data,error})
    // }
    // useEffect(() => {
    //   fetchCourse()
    // }, [])
    
    return null
}
