import React from 'react';
import { Modal, IconButton } from '@mui/material';

interface VideoModalProps {
  videoId: string;
  open: boolean;
  onClose: () => void;
}

const ModalTrailer: React.FC<VideoModalProps> = ({ videoId, open, onClose }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          height: '80%',
          backgroundColor: 'black',
          outline: 'none',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <IconButton
          style={{ alignSelf: 'flex-end', color: 'white' }}
          onClick={onClose}
        >
       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>

        </IconButton>
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </Modal>
  );
};

export default ModalTrailer;
