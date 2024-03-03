"use client";

import styles from "../styles/ispo.module.css";
import Image from "next/image";
import Link from "next/link";
import { FormattedISPO } from "@/app/lib/formatISPOArray";
import { ExternalLink } from "../../../../../node_modules/lucide-react";
import base from "@/app/lib/routes";

export default function Header({
  logoImageURL,
  name,
  categories,
  shortDescription,
  websiteURL,
}: FormattedISPO) {
  return (
    <header className={styles.header}>
      {logoImageURL && (
        <Image
          alt="logo"
          unoptimized={true}
          src={logoImageURL}
          width={125}
          height={125}
          className={styles.logo}
        />
      )}
      <div className={styles["info-wrapper"]}>
        <ConditionalLink href={websiteURL}>
          <h1>{name}</h1>
          {websiteURL && <ExternalLink width={32} height={32} />}
        </ConditionalLink>

        <div className={styles.categories}>
          {categories &&
            categories.map((category, index) => {
              return <span key={index}>{category.name}</span>;
            })}
        </div>
        <p>{shortDescription}</p>
      </div>
    </header>
  );
}

function ConditionalLink({
  children,
  href,
  className,
}: {
  children: React.ReactNode;
  href?: string | undefined;
  className?: string;
  target?: string;
}) {
  if (href)
    return (
      <Link className={className} href={href} target="_blank">
        {children}
      </Link>
    );
  else return <div className={className}>{children}</div>;
}
