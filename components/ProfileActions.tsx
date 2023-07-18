"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { deleteProject, fetchToken } from "@/lib/actions";

type Props = {
  projectId: string;
};

export default function ProfileActions({ projectId }: Props) {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const router = useRouter();

  const handleDeleteProject = async () => {
    setIsDeleting(true);
    const { token } = await fetchToken();

    try {
      await deleteProject(projectId, token);
      router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Link
        className="flexCenter edit-action_btn"
        href={`/edit-project/${projectId}`}
      >
        <Image src="/pencile.svg" alt="edit" width={15} height={15} />
      </Link>
      <button
        type="button"
        disabled={isDeleting}
        className={`flexCenter delete-action_btn ${
          isDeleting ? "bg-gray" : "bg-pimary-purple"
        }`}
        onClick={handleDeleteProject}
      >
        <Image src="/trasg.svg" alt="delete" width={15} height={15} />
      </button>
    </>
  );
}
