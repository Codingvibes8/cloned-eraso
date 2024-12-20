import React, { createContext, useState } from 'react';

export const FileListContext = createContext(null);

export const FileListProvider = ({ children }) => {
    const [fileList_, setFileList_] = useState([]);

    return (
        <FileListContext.Provider value={{ fileList_, setFileList_ }}>
            {children}
        </FileListContext.Provider>
    );
};
