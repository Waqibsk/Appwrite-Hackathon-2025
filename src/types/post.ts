export interface PostType {
  $id: string;
  name: string;
  lastSeen: string;
  image: File | null;
  remarks: string;
  bounty?: string;
  category: string;
  priority: string;
  createdBy: string;
  spaceId: string;
  imageId: string;
}
