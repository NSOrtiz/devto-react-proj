import Layout from "@/components/Layout";
import AsideMenu from "@/components/AsideMenu";
import AllPosts from "./posts";


export default function principalPage(){
  return(
    <main className="bg-gray-100 w-full">
      <Layout>
        <section className="w-full h-full flex flex-row">
          <section className="m-2 w-1/4">
            <AsideMenu/>
          </section>
          <section className="m-2 w-2/4">
            <AllPosts/>
          </section>

        </section>
        
      </Layout>

    </main>
  )
}