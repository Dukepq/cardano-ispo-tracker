import fetchProjectByToken from "@/app/lib/fetchProjectByToken";
import styles from "./styles/ispo.module.css";
import Header from "./components/Header";
import { formatISPO } from "@/app/lib/formatISPOArray";
import Info from "./components/InfoArticle";
import type { Metadata, ResolvingMetadata } from "next";
import PoolCard from "./components/PoolCard";
import { PackageOpen } from "../../../../node_modules/lucide-react";
import { fetchAllProjects } from "@/app/lib/fetchIspoData";
import { notFound } from "next/navigation";

export const revalidate = 600;

type Params = {
  params: {
    ispo: string;
  };
};

export default async function Ispo({ params: { ispo } }: Params) {
  let projectInfo: ISPO;
  try {
    projectInfo = await fetchProjectByToken(ispo);
  } catch (err) {
    notFound();
  }
  const formattedProjectInfo = formatISPO(projectInfo);
  const { description, pools } = formattedProjectInfo;
  return (
    <div className={styles["page-wrapper"]}>
      <Header {...formattedProjectInfo} />
      <main className={styles.main}>
        <div className={styles["description-wrapper"]}>
          <article>
            {description && <h2>Description</h2>}
            {description &&
              description.split(".").map((entry, index, arr) => {
                if (index !== arr.length - 1)
                  return (
                    <p className={styles.description} key={index}>
                      {entry + "."}
                    </p>
                  );
              })}
          </article>
          <div className={styles["pool-cards-wrapper"]}>
            <h2>Stake Pools</h2>
            <ul>
              {pools.length > 0 ? (
                pools.map((pool) => {
                  return <PoolCard key={pool.poolId} {...pool} />;
                })
              ) : (
                <>
                  <PackageOpen width={50} height={50} />
                  <p>No pools found...</p>
                </>
              )}
            </ul>
          </div>
        </div>

        <Info {...formattedProjectInfo} />
      </main>
    </div>
  );
}

type MetadataProps = {
  params: { ispo: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params }: MetadataProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    const projectInfo = await fetchProjectByToken(params.ispo);
    const { name, token } = projectInfo;
    return {
      title: `${name} (${token}) ISPO`,
      description: `${name} (${token}) ISPO`,
    };
  } catch (err) {
    return {
      title: `C-ISPO`,
      description: `Token details`,
    };
  }
}

export async function generateStaticParams() {
  const projects = await fetchAllProjects();
  return projects.map((project) => ({
    ispo: project.token,
  }));
}
