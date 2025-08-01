export interface GroupOrderChatRoom {
  chatRoomId: number;
  chatRoomTitle: string;
  unreadCount: number;
  recentChatContent: string;
  recentChatTime: string; // ISO format
  chatRoomType: "GROUP_ORDER";
  currentPeople: number;
  maxPeople: number;
  deadline: string; // ISO format
}

export interface RoommateChatRoom {
  chatRoomId: number;
  opponentNickname: string;
  lastMessage: string;
  lastMessageTime: string; // ISO8601 형식
  partnerId: number;
  partnerName: string;
}

export interface RoommateChat {
  roommateChattingRoomId: number;
  roommateChatId: number;
  userId: number;
  content: string;
  read: boolean;
}
