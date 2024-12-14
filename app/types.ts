export type UserType = {
  id: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  email: string;
  contact_id: string;
  address_id: string;
  username: string;
  role: string;
  profile_pic: string;
  email_verified_at: string | null;
  created_at: string;

}

export type PostType = {
  id: string;
  user_id: string;
  title: string;
  subtitle: string;
  summary: string;
  category: string;
  featured_image: string;
  main_content: string;
  created_at: string;
  updated_at: string;
  user: UserType;
}