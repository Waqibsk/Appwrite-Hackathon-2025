export interface PostType {
  name: string;
  lastSeen: string;
  image: File | null;
  remarks: string;
  bounty?: string;
  category: string;
  priority: string;
}
