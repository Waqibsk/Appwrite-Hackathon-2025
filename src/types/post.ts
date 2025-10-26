export interface PostType {
  $id: string;
  name: string;
  lastseen: string;
  type: string;
  image: File | null;
  remarks: string;
  bounty?: string;
  category: string;
  priority: string;
  createdBy: string;
  resolved: boolean;
  spaceId: string;
  imageId: string;
}
