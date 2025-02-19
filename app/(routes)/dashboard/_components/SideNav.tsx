import { Archive, ChevronDown,  Github } from "lucide-react";
import Image from "next/image";
//Flag,
import React, { useContext, useEffect, useState } from "react";
import SideNavTopSection, { TEAM } from "./SideNavTopSection";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import SideNavBottomSection from "./SideNavBottomSection";
import { useConvex, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { FileListContext } from "@/app/_context/FilesListContext";


function SideNav() {
  const { user } = useKindeBrowserClient();

    const convex = useConvex();
    
 const createFile = useMutation(api.files.createFile);
 const [activeTeam, setActiveTeam] = useState<TEAM | any>();


 const [totalFiles, setTotalFiles] = useState<Number>();
 const { fileList_, setFileList_ } = useContext(FileListContext);



  useEffect(() => {
   activeTeam && getFiles();
  }, [activeTeam]);


  const onFileCreate = (fileName: string) => {
    if (!user?.email) {
      toast("Please sign in to create files");
      return;
    }
    
    createFile({
      fileName: fileName,
      teamId: activeTeam?._id,
      createdBy: user.email,
      archive: false,
      document: "",
      whiteboard: "",
    }).then(
      (resp) => {
        if (resp) {
          getFiles();
          toast("File created successfully!");
        }
      },
      (e) => {
        toast("Error while creating file");
      }
    );
  };
 
  const getFiles = async () => {

    const result = await convex.query(api.files.getFiles, {
      teamId: activeTeam?._id,
    });
    console.log(result);
    setFileList_(result);
    setTotalFiles(result?.length);
  };

  return (
    <div className="h-screen fixed w-72 borde-r border-[1px] p-6 flex flex-col bg-slate-300">
      <div className="flex-1">
        <SideNavTopSection
          user={user}
          setActiveTeam={(activeTeam: TEAM) => setActiveTeam(activeTeam)}
        />
      </div>

      <div>
         <SideNavBottomSection
         totalFiles={totalFiles}
       onFileCreate={onFileCreate}
        /> 
      </div>
    </div>
  );
}

export default SideNav;
