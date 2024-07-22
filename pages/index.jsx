import Layout from "@/components/Layout";
import AsideMenu from "@/components/AsideMenu";
import AllPosts from "./posts";
import { Discuss } from "@/components/AsidePosts";
import { Watercooler } from "@/components/AsidePosts";
import { useEffect, useState } from "react";


export default function principalPage(){

  useEffect(()=>{
    document.title = "Dev Community";
  }, []);

  return(
    <main className="bg-gray-100 w-full">
      <Layout>
        <section className="w-full h-full flex flex-row">
          <section className="m-2 hidden md:block xl:pl-[3%] 2xl:pl-[7%] w-1/4">
            <AsideMenu/>
          </section>
          <section className="m-2 sm:w-full md:w-3/4 lg:w-2/4">
            <AllPosts/>
          </section>
          <section className="m-2 hidden lg:block xl:pr-[3%] 2xl:pr-[7%] w-1/4">
            <Discuss/>
            <Watercooler/>
          </section>

        </section>
        
      </Layout>

    </main>
  )
}