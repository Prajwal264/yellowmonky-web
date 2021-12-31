import React, { useCallback } from 'react';
import Dropzone, { useDropzone } from 'react-dropzone';
import FileDropActive from '../file-drop-active/file-drop-active.component';
import PrimaryViewContent from './primary-view-content/primary-view-content.component';
import styles from './primary-view.module.scss';

interface Props {

}

const PrimaryView: React.FC<Props> = ({

}) => {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
  return (
    <div className={styles.fileDragDropContainer} {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ?
        <FileDropActive /> :
        <PrimaryViewContent />}
    </div>
  )
}

export default PrimaryView
