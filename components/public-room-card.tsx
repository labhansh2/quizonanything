import React from 'react';
import Image from 'next/image';
import { Styles } from './types';

interface PublicRoom {
  id: string;
  name: string;
  topic: string;
  mode: string;
  difficulty: string;
  participants: number;
  creator: string;
  image: string;
}

interface PublicRoomCardProps {
  room: PublicRoom;
  styles: Styles;
  onJoinRoom: (roomId: string) => void;
}

const PublicRoomCard: React.FC<PublicRoomCardProps> = ({
  room,
  styles,
  onJoinRoom
}) => {
  return (
    <div className={styles.roomCard} onClick={() => onJoinRoom(room.id)}>
      <div className={styles.roomImageContainer}>
        <Image
          src={room.image || '/placeholder.svg'}
          alt={room.name}
          className={styles.roomImage}
          width={300}
          height={300}
        />
        <div className={styles.roomParticipants}>
          <span className={styles.participantsIcon}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </span>
          {room.participants}
        </div>
      </div>
      <div className={styles.roomInfo}>
        <h3 className={styles.roomName}>{room.name}</h3>
        <p className={styles.roomTopic}>{room.topic}</p>
        <div className={styles.roomCreator}>by {room.creator}</div>
      </div>
    </div>
  );
};

export default PublicRoomCard;
