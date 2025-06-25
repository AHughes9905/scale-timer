export default interface TimeLog {
  user_id: number;
  scale_name: string;
  duration: number;
  created_at?: Date;
}