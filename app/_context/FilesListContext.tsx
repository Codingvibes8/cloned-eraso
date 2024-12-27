import React, { createContext, useState } from 'react';

interface FileListContextType {
  fileList_: any[];
  setFileList_: React.Dispatch<React.SetStateAction<any[]>>;
}

export const FileListContext = createContext<FileListContextType>({
  fileList_: [],
  setFileList_: () => {},
});

interface FileListProviderProps {
  children: React.ReactNode;
}

export const FileListProvider: React.FC<FileListProviderProps> = ({ children }) => {
    const [fileList_, setFileList_] = useState<any[]>([]);

    return (
        <FileListContext.Provider value={{ fileList_, setFileList_ }}>
            {children}
        </FileListContext.Provider>
    );
};
